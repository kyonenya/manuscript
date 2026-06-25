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
  },
};

export default config;
