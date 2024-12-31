
import { createClient } from "@libsql/client/web"; // @see https://github.com/tursodatabase/libsql-client-ts/issues/184#issuecomment-2025317522
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { PrismaClient } from "@prisma/client";

const libsql = createClient({
  url: process.env.TURSO_DATABASE_URL ?? "",
  authToken: process.env.TURSO_AUTH_TOKEN,
});
const adapter = new PrismaLibSQL(libsql);

/**
 * Best practice for instantiating PrismaClient with Next.js
 *
 * @see https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
