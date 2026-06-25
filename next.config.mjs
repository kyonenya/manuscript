// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const config = {
  cacheComponents: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
    staleTimes: {
      dynamic: 180,
    },
  },
  /** @see https://github.com/tursodatabase/libsql-client-ts/issues/184#issuecomment-2679453393 */
  serverExternalPackages: ['@prisma/adapter-libsql'],
};

export default config;
