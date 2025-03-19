/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/weather',
  images: {
    unoptimized: true,
  },
  // Disable server-side rendering for GitHub Pages
  trailingSlash: true,
}

module.exports = nextConfig 