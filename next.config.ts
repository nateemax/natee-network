import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 静态导出，避免 RSC 流式传输兼容性问题
  output: "export",
  // 禁用图片优化（静态导出需要）
  images: {
    unoptimized: true,
  },
  // 确保 trailing slash 一致
  trailingSlash: true,
};

export default nextConfig;
