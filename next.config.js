/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/weather' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/weather/' : '',
  images: {
    unoptimized: true,
  },
  // Disable server-side rendering for GitHub Pages
  trailingSlash: true,
}

module.exports = nextConfig 