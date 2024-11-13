/** @type {import('next').NextConfig} */

/*
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
*/

const withMarkdoc = require('@markdoc/next.js');

module.exports = withMarkdoc(/* options */)({
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
  pageExtensions: ['md', 'mdoc', 'js', 'jsx', 'ts', 'tsx']
});