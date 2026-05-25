"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import IDCSection from "@/components/sections/IDCSection";
import DesignSection from "@/components/sections/DesignSection";
import BusinessSection from "@/components/sections/BusinessSection";
import FeedSection from "@/components/sections/FeedSection";
import AboutSection from "@/components/sections/AboutSection";

/* ── 模块全屏视图容器 ────────────────────────────── */
function ModuleView({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 64,
        left: 0,
        right: 0,
        bottom: 0,
        overflowY: "auto",
        overflowX: "hidden",
        // 独立滚动容器，防止滚动穿透
        WebkitOverflowScrolling: "touch",
      }}
    >
      {children}
    </div>
  );
}

/* ── Footer ───────────────────────────────────────── */
function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "28px 24px",
        textAlign: "center",
      }}
    >
      <p style={{ fontSize: 12, color: "var(--muted-foreground)" }}>
        &copy; 2026 Natee &middot; 个人知识体系 &middot; 持续构建中
      </p>
    </footer>
  );
}

/* ── 主入口 ────────────────────────────────────────── */
export default function Home() {
  const [activeView, setActiveView] = useState("overview");

  return (
    <main>
      <Navbar activeView={activeView} onNavigate={setActiveView} />

      {/* ── 总览页：保持长滚动 ── */}
      {activeView === "overview" && (
        <>
          <HeroSection onNavigate={setActiveView} />
          <Footer />
        </>
      )}

      {/* ── IDC 行业模型：独立全屏视图 ── */}
      {activeView === "idc" && (
        <ModuleView>
          <IDCSection standalone />
        </ModuleView>
      )}

      {/* ── 设计实践模型：独立全屏视图 ── */}
      {activeView === "design" && (
        <ModuleView>
          <DesignSection standalone />
        </ModuleView>
      )}

      {/* ── 商业价值分析：独立全屏视图 ── */}
      {activeView === "business" && (
        <ModuleView>
          <BusinessSection standalone />
        </ModuleView>
      )}

      {/* ── 动态信息：独立全屏视图 ── */}
      {activeView === "feed" && (
        <ModuleView>
          <FeedSection standalone />
        </ModuleView>
      )}

      {/* ── 关于我：独立全屏视图 ── */}
      {activeView === "about" && (
        <ModuleView>
          <AboutSection standalone />
        </ModuleView>
      )}
    </main>
  );
}
