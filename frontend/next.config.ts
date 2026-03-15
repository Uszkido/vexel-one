import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow images from all external sources (for dynamic AI-generated content)
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }
    ]
  },
  // Expose backend URL to the browser
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
    NEXT_PUBLIC_AI_URL: process.env.NEXT_PUBLIC_AI_URL || 'http://localhost:8000',
  },
};

export default nextConfig;
