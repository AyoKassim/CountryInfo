/** @type {import('next').NextConfig} */
const nextConfig = {}

//module.exports = nextConfig

module.exports = {
    basePath: '/github-pages',
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'localhost.com',
          port: '',
          pathname: '/account123/**',
        },
      ],
    },
  }
