import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
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
