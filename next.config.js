/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/payment",
      },
    ];
  },
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        pathname: '/redqteam.com/isomorphic-furyroad/public/**',
      },
      {
        protocol: 'https',
        hostname: 'gentledog.s3.ap-northeast-2.amazonaws.com'
      },
    ],
  },
  env: {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    BASE_API_URL: process.env.BASE_API_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    KAKAO_CLIENT_ID: process.env.KAKAO_CLIENT_ID,
    KAKAO_CLIENT_SECRET: process.env.KAKAO_CLIENT_SECRET,
    NAVER_CLIENT_ID: process.env.NAVER_CLIENT_ID,
    NAVER_CLIENT_SECRET: process.env.NAVER_CLIENT_SECRET,
    TOSS_PAYMENTS_SECRET_KEY: process.env.TOSS_PAYMENTS_SECRET_KEY,
    TOSS_PAYMENTS_CLIENT_KEY: process.env.TOSS_PAYMENTS_CLIENT_KEY,
    COOLSMS_API_KEY: process.env.COOLSMS_API_KEY,
    COOLSMS_API_SECRET: process.env.COOLSMS_API_SECRET,
  },
  images: {
    domains: ['gentledog.s3.ap-northeast-2.amazonaws.com', 'loremflickr.com', 'https://static.toss.im']
  }
};

module.exports = nextConfig;
