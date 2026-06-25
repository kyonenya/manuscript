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
};

export default config;
