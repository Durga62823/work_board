import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/lib/db/schema";

const globalForDb = globalThis as unknown as {
  pgClient?: ReturnType<typeof postgres>;
  db?: ReturnType<typeof drizzle>;
};

const connectionString = process.env.DATABASE_URL ?? process.env.DIRECT_DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL or DIRECT_DATABASE_URL is not set");
}

const pgClient =
  globalForDb.pgClient ??
  postgres(connectionString, {
    prepare: false,
    ssl: "require",
  });

export const db = globalForDb.db ?? drizzle(pgClient, { schema });

if (process.env.NODE_ENV !== "production") {
  globalForDb.pgClient = pgClient;
  globalForDb.db = db;
}
