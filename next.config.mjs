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

if (process.env.NODE_ENV === 'development') {
  nextConfig.redirects = async () => {
    return [
      {
        source: '/',
        destination: '/LCID',
        permanent: true,
        basePath: false,
      },
    ];
  };
}

export default nextConfig;
