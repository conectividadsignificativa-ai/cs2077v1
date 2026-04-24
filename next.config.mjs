/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'export',
  distDir: 'dist',
  // Si se despliega en un path como /repo-name/, descomentar y ajustar:
  // basePath: '/cs2077v',
}

export default nextConfig
