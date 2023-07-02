// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
  experimental: { serverActions: true },
  eslint: {
    dirs: ['app', 'domain', 'infra'],
    ignoreDuringBuilds: true,
  },
};
