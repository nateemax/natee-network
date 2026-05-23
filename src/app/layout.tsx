import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Natee | IDC行业 · 设计实践 · 商业价值",
  description: "构建行业模型、设计实践与商业价值分析的个人知识体系",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Background glow orbs */}
        <div
          className="bg-glow"
          style={{
            width: 600,
            height: 600,
            top: "-200px",
            left: "-200px",
            background: "radial-gradient(circle, rgba(79,142,247,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="bg-glow"
          style={{
            width: 500,
            height: 500,
            top: "30%",
            right: "-150px",
            background: "radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)",
          }}
        />
        <div
          className="bg-glow"
          style={{
            width: 400,
            height: 400,
            bottom: "10%",
            left: "20%",
            background: "radial-gradient(circle, rgba(62,207,142,0.08) 0%, transparent 70%)",
          }}
        />
        {children}
      </body>
    </html>
  );
}
