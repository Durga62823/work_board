import { PrismaClient } from "@prisma/client";

// Check if we're in Edge Runtime
const isEdgeRuntime = typeof EdgeRuntime !== "undefined";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  !isEdgeRuntime &&
  (globalForPrisma.prisma ??
    new PrismaClient({
      log: [],
    }));

if (process.env.NODE_ENV !== "production" && !isEdgeRuntime) {
  globalForPrisma.prisma = prisma as PrismaClient;
}
