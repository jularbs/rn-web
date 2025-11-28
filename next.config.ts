import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    qualities: [75, 80, 90, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        port: "",
        pathname: "/**",
      },
    ],
  },

  // async headers() {
  //   const defaultArr = ["'self'"];
  //   const fontArr = ["'self'", "https:", "data:"];
  //   const styleArr = ["'self'", "'unsafe-inline'", "https:"];
  //   const scriptArr = ["'self'", "'unsafe-inline'", "https:"];
  //   const connectArr = ["'self'", "https:"];
  //   const imgArr = ["'self'", "data:", "blob:", "https:"];
  //   const frameArr = ["'self'", "https:"];
  //   const childArr = ["'self'", "https:"];
  //   const frameAncestorsArr = ["'self'"];
  //   const mediaArr = ["'self'", "blob:", "https:"];
  //   const objectArr = ["'self'"];

  //   if (process.env.NEXT_PUBLIC_ENV == "development") {
  //     scriptArr.push("'unsafe-eval'");
  //     connectArr.push("http:");
  //     styleArr.push("http:");
  //     scriptArr.push("http:");
  //     fontArr.push("http:");
  //     imgArr.push("http:");
  //     frameArr.push("http:");
  //     childArr.push("http:");
  //     frameAncestorsArr.push("http:");
  //     mediaArr.push("http:");
  //   }

  //   return [
  //     {
  //       source: "/:path*{/}?",
  //       headers: [
  //         {
  //           key: "Strict-Transport-Security",
  //           value: "max-age=31536000; includeSubDomains",
  //         },
  //         {
  //           key: "Content-Security-Policy",
  //           value:
  //             `upgrade-insecure-requests;` +
  //             `default-src ${defaultArr.join(" ")};` +
  //             `font-src ${fontArr.join(" ")};` +
  //             `style-src ${styleArr.join(" ")};` +
  //             `script-src ${scriptArr.join(" ")};` +
  //             `connect-src ${connectArr.join(" ")};` +
  //             `img-src ${imgArr.join(" ")};` +
  //             `frame-src ${frameArr.join(" ")};` +
  //             `child-src ${childArr.join(" ")};` +
  //             `frame-ancestors ${frameAncestorsArr.join(" ")};` +
  //             `media-src ${mediaArr.join(" ")};` +
  //             `object-src ${objectArr.join(" ")};`,
  //         },
  //         {
  //           key: "Permissions-Policy",
  //           value: "camera=(), microphone=(), geolocation=(), unload=()",
  //         },
  //         {
  //           key: "X-XSS-Protection",
  //           value: "1; mode=block",
  //         },
  //         {
  //           key: "X-DNS-Prefetch-Control",
  //           value: "on",
  //         },
  //         {
  //           key: "X-Frame-Options",
  //           value: "sameorigin",
  //         },
  //         {
  //           key: "X-Content-Type-Options",
  //           value: "nosniff",
  //         },
  //         {
  //           key: "Referrer-Policy",
  //           value: "strict-origin-when-cross-origin",
  //         },
  //         { key: "Access-Control-Allow-Headers", value: "market, request-id" },
  //       ],
  //     },
  //   ];
  // },
};

export default nextConfig;
