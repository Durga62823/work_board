import NextAuth from "next-auth";

const { auth } = NextAuth({
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
    error: "/auth/login",
    verifyRequest: "/auth/verify-email",
  },
  callbacks: {
    async authorized({ auth }) {
      return !!auth?.user;
    },
  },
});

export { auth };
