/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/weather',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig 