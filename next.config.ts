import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  devIndicators: false,
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
};

export default nextConfig;
