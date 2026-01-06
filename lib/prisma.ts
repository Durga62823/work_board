import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Check if we're in Edge Runtime (middleware)
const isEdgeRuntime = typeof (globalThis as any).EdgeRuntime !== "undefined";

export const prisma = isEdgeRuntime
  ? ({} as PrismaClient) // Return empty object in edge runtime
  : globalForPrisma.prisma ??
    new PrismaClient({
      log: ["error"],
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });

if (typeof process !== 'undefined' && process.env?.NODE_ENV !== "production" && !isEdgeRuntime) {
  globalForPrisma.prisma = prisma;
}
