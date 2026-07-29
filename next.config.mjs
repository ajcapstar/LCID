/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  output: 'export',
  basePath: '/LCID',
  assetPrefix: '/LCID',
  env: {
    NEXT_PUBLIC_BASE_PATH: '/LCID',
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
