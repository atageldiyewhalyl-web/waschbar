import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.178.156"],
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
