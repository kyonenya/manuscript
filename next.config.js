// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
  experimental: {
    serverActions: true,
    serverActionsBodySizeLimit: '10mb',
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
};
