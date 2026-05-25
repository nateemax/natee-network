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
        {/* Polyfill for older browsers (WeChat X5 kernel) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // globalThis polyfill
              if (typeof globalThis === 'undefined') {
                (function () {
                  if (typeof self !== 'undefined') { return self; }
                  if (typeof window !== 'undefined') { return window; }
                  if (typeof global !== 'undefined') { return global; }
                  throw new Error('Unable to locate global object');
                })().globalThis = (function () {
                  if (typeof self !== 'undefined') { return self; }
                  if (typeof window !== 'undefined') { return window; }
                  if (typeof global !== 'undefined') { return global; }
                  throw new Error('Unable to locate global object');
                })();
              }
            `,
          }}
        />
        {/* 使用本地字体，避免微信内置浏览器无法加载外部字体 */}
        <style>{`
          @font-face {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 300;
            font-display: swap;
            src: local('Inter Light'), local('Inter-Light');
          }
          @font-face {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: local('Inter Regular'), local('Inter-Regular');
          }
          @font-face {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 500;
            font-display: swap;
            src: local('Inter Medium'), local('Inter-Medium');
          }
          @font-face {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-display: swap;
            src: local('Inter SemiBold'), local('Inter-SemiBold');
          }
        `}</style>
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
