import { PrismaAdapter } from "@auth/prisma-adapter";
import { type NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { prisma } from "@/lib/prisma";
import { getRedis } from "@/lib/redis";
import { logger } from "@/lib/logger";
import { signInSchema } from "@/lib/validations/auth";
import { getRequestIp, getRequestUserAgent } from "@/lib/request";

const REMEMBERED_MAX_AGE = 60 * 60 * 24 * 30; // 30 days
const DEFAULT_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

const authConfig: NextAuthConfig = {
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  adapter: PrismaAdapter(prisma) as any, // Type cast to avoid TS version mismatch
  session: {
    strategy: "jwt",
    maxAge: REMEMBERED_MAX_AGE,
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
    error: "/auth/login",
    verifyRequest: "/auth/verify-email",
  },
  useSecureCookies: process.env.NODE_ENV === "production",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        rememberMe: { label: "Remember Me", type: "checkbox" },
      },
      async authorize(credentials) {
        if (!prisma || typeof prisma === "boolean") {
          throw new Error("Database not available");
        }

        const parsed = signInSchema.safeParse({
          email: credentials?.email,
          password: credentials?.password,
          rememberMe:
            credentials?.rememberMe === "true" ||
            credentials?.rememberMe === true,
        });

        if (!parsed.success) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email },
        });

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const { verifyPassword } = await import("@/lib/auth-utils");
        const isValidPassword = await verifyPassword(
          parsed.data.password,
          user.password
        );
        if (!isValidPassword) {
          throw new Error("Invalid credentials");
        }

        if (!user.emailVerified) {
          throw new Error("Email not verified");
        }

        return {
          id: user.id,
          email: user.email,
          name:
            user.firstName ??
            user.name ??
            `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
          image: user.image,
          status: user.status,
          role: user.role,
          rememberMe: parsed.data.rememberMe,
        };
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      allowDangerousEmailAccountLinking: true,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, credentials }) {
      // Skip if Prisma is not available (Edge Runtime)
      if (!prisma || typeof prisma === "boolean") {
        console.warn("Prisma not available in Edge Runtime");
        return true;
      }

      // For credentials provider, validate the user exists
      if (account?.provider === "credentials") {
        return !!user.id;
      }

      // For OAuth providers - handle account linking manually before adapter checks
      if (account && account.provider !== "credentials" && user.email) {
        console.log(`🔍 OAuth sign-in for: ${user.email}`);
        
        try {
          // Check if this exact OAuth account exists
          const existingOAuthAccount = await prisma.account.findUnique({
            where: {
              provider_providerAccountId: {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            },
          });

          // Check if user exists by email
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
            include: { accounts: true }, // Include all accounts
          });

          if (existingUser) {
            console.log(`✅ User found: ${existingUser.id} with role: ${existingUser.role}`);
            
            // Check if user has ANY account for this provider (different providerAccountId)
            const userHasProviderAccount = existingUser.accounts.some(
              acc => acc.provider === account.provider
            );

            if (userHasProviderAccount && !existingOAuthAccount) {
              // User has a different OAuth account for same provider - delete old one, create new
              console.log(`🔄 User has existing ${account.provider} account, replacing with new one`);
              await prisma.account.deleteMany({
                where: {
                  userId: existingUser.id,
                  provider: account.provider,
                },
              });
              console.log(`✅ Old ${account.provider} account deleted`);
            } else if (existingOAuthAccount && existingOAuthAccount.userId !== existingUser.id) {
              // Account exists but linked to different user, re-link it to the correct user
              console.log(`🔄 Re-linking account from ${existingOAuthAccount.userId} to ${existingUser.id}`);
              await prisma.account.update({
                where: {
                  provider_providerAccountId: {
                    provider: account.provider,
                    providerAccountId: account.providerAccountId,
                  },
                },
                data: {
                  userId: existingUser.id,
                  access_token: account.access_token,
                  expires_at: account.expires_at,
                  refresh_token: account.refresh_token,
                  id_token: account.id_token,
                  scope: account.scope,
                  token_type: account.token_type,
                },
              });
              console.log(`✅ Account re-linked successfully`);
            }
            
            // Update user object with database fields for JWT
            user.id = existingUser.id;
            (user as any).role = existingUser.role;
            (user as any).status = existingUser.status;
            (user as any).emailVerified = existingUser.emailVerified;
          } else {
            console.log(`➕ New user - adapter will create`);
            // Set default role for new users
            (user as any).role = "EMPLOYEE";
            (user as any).status = "ACTIVE";
          }

          return true;
        } catch (error) {
          console.error("❌ Error in signIn callback:", error);
          return false;
        }
      }

      return true;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl + "/dashboard";
    },
    async jwt({ token, user, account }) {
      console.log("🔧 JWT callback triggered", { 
        hasUser: !!user, 
        hasAccount: !!account,
        userId: user?.id,
        tokenId: token.id 
      });
      
      if (user) {
        token.id = user.id as string;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
        token.status = (user as { status?: string }).status ?? token.status;
        token.role = (user as { role?: any }).role ?? token.role;
        token.rememberMe =
          (user as { rememberMe?: boolean }).rememberMe ?? false;
        const now = Math.floor(Date.now() / 1000);
        token.sessionExpiresAt =
          now + (token.rememberMe ? REMEMBERED_MAX_AGE : DEFAULT_MAX_AGE);

        // For OAuth sign-ins, fetch the role from the database
        if (
          account &&
          account.provider !== "credentials" &&
          user.id &&
          prisma
        ) {
          const dbUser = await prisma.user.findUnique({
            where: { id: user.id },
            select: { role: true, status: true },
          });
          if (dbUser) {
            token.role = dbUser.role;
            token.status = dbUser.status;
          }
        }
        
        console.log("✅ JWT token created with role:", token.role);
      }

      if (account) {
        token.provider = account.provider;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.status = token.status as string;
        session.user.role = token.role as any;
        session.user.image = token.picture as string | undefined;
      }

      session.rememberMe = Boolean(token.rememberMe);
      const expiration =
        (token.sessionExpiresAt as number | undefined) ??
        Math.floor(Date.now() / 1000) + DEFAULT_MAX_AGE;
      session.expires = new Date(expiration * 1000).toISOString() as any;
      return session;
    },
    async authorized({ auth }) {
      return !!auth?.user;
    },
  },
  events: {
    async signIn({ user }) {
      // Skip if Prisma is not available (Edge Runtime)
      if (!prisma) return;

      try {
        const ip = await getRequestIp();
        const userAgent = await getRequestUserAgent();

        await prisma.user.update({
          where: { id: user.id },
          data: {
            lastLogin: new Date(),
            lastLoginIp: ip,
            lastLoginUserAgent: userAgent,
          },
        });

        try {
          const redis = getRedis();
          if (redis) {
            await redis.set(
              `session:last:${user.id}`,
              {
                lastLogin: new Date().toISOString(),
                ip,
                userAgent,
              },
              {
                ex: REMEMBERED_MAX_AGE,
              }
            );
          }
        } catch (redisError) {
          console.warn(
            "Redis unavailable, skipping session cache:",
            redisError
          );
        }
      } catch (error) {
        console.error("Failed to persist login metadata:", error);
      }
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
