import { type DefaultSession } from "next-auth";
import type { UserRole } from "@/lib/db/enums";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      status?: string;
      role: UserRole;
    };
    rememberMe?: boolean;
  }

  interface User {
    status?: string;
    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    status?: string;
    role?: UserRole;
    rememberMe?: boolean;
    sessionExpiresAt?: number;
  }
}
