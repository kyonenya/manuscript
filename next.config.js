// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
    dynamicIO: true,
    useCache: true,
  },
  eslint: {
    dirs: ['app', 'domain', 'infra'],
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      'utf-8-validate': false,
      bufferutil: false,
    };
    return config;
  },
  /** @see https://github.com/tursodatabase/libsql-client-ts/issues/184#issuecomment-2679453393 */
  serverExternalPackages: ['@prisma/adapter-libsql'],
};
