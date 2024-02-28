/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'keylime.neto.com.au',
          port: '',
          pathname: '/assets/**',
        },
      ],
    },
  }

module.exports = nextConfig
