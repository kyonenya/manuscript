import { PrismaClient } from '@prisma/client';

/**
 * Best practice for instantiating PrismaClient with Next.js
 *
 * @see https://github.com/prisma/docs/issues/1391#issue-823740187
 */

// add prisma to the NodeJS global type
interface CustomNodeJsGlobal extends NodeJS.Global {
  prisma: PrismaClient;
}

// Prevent multiple instances of Prisma Client in development
declare const global: CustomNodeJsGlobal;

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') global.prisma = prisma;
