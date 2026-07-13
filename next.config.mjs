/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  output: 'export',
  basePath: '/LCID',
  assetPrefix: '/LCID',
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
