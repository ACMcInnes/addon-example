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

// const path = require('path');
// console.log(`path: ${path.join(__dirname, '..')}`);

const withMarkdoc = require('@markdoc/next.js');

module.exports = withMarkdoc(/* options */)({
  outputFileTracingRoot: __dirname,
  turbopack: {
    root: __dirname,
    // ...
  },
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
