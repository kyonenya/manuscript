// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
  experimental: { serverActions: true },
  eslint: {
    dirs: ['app', 'componnents', 'domain', 'hooks', 'infra'],
    ignoreDuringBuilds: true,
  },
};
