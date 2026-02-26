/** @satisfies {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    qualities: [75, 80, 90, 100],
    remotePatterns: [
      new URL(process.env.NEXT_PUBLIC_BUCKET_URL ?? 'https://radyonatin-bucket.s3.ap-southeast-1.amazonaws.com'),
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
