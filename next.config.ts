import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  devIndicators: false,
  poweredByHeader: false,
  allowedDevOrigins: isDevelopment
    ? ["localhost", "127.0.0.1", "192.168.15.42", "192.168.15.42:3000"]
    : undefined,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "premiumretifica.com.br",
          },
        ],
        destination: "https://www.premiumretifica.com.br/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/fundorodape.webp",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=31536000, immutable, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/:path*\\.(png|jpg|jpeg|webp|ico)",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=31536000, immutable, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
