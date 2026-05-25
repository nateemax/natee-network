"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "总览", href: "#overview" },
  { label: "IDC模型", href: "#idc" },
  { label: "设计实践", href: "#design" },
  { label: "商业价值", href: "#business" },
  { label: "动态信息", href: "#feed" },
  { label: "关于我", href: "#about" },
];

interface NavbarProps {
  activeView?: string;
  onNavigate?: (view: string) => void;
}

export default function Navbar({ activeView: propView, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = propView || "overview";

  useEffect(() => {
    // 只有总览页才监听 body 滚动来判断 navbar 背景
    if (active === "overview") {
      const onScroll = () => setScrolled(window.scrollY > 40);
      window.addEventListener("scroll", onScroll);
      onScroll(); // 初始化检查
      return () => window.removeEventListener("scroll", onScroll);
    } else {
      setScrolled(true); // 非总览页始终显示背景
    }
  }, [active]);

  const handleClick = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    if (onNavigate) {
      onNavigate(id);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "nav-blur border-b"
          : "border-b border-transparent"
      )}
      style={{
        background: scrolled ? "rgba(12,12,15,0.85)" : "transparent",
        borderColor: scrolled ? "var(--border)" : "transparent",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => handleClick("#overview")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "linear-gradient(135deg, #4f8ef7, #a78bfa)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              fontWeight: 600,
              color: "#fff",
            }}
          >
            N
          </div>
          <span style={{ fontWeight: 500, fontSize: 15, color: "var(--foreground)" }}>
            Natee
          </span>
          <span
            style={{
              fontSize: 11,
              color: "var(--muted-foreground)",
              borderLeft: "1px solid var(--border)",
              paddingLeft: 10,
              marginLeft: 2,
            }}
          >
            知识体系
          </span>
        </button>

        {/* Desktop nav */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
          className="hidden-mobile"
        >
          {NAV_ITEMS.map((item) => {
            const id = item.href.replace("#", "");
            return (
              <button
                key={item.href}
                onClick={() => handleClick(item.href)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: active === id ? 500 : 400,
                  color: active === id ? "var(--foreground)" : "var(--muted-foreground)",
                  background: active === id ? "rgba(255,255,255,0.07)" : "transparent",
                  border: active === id ? "1px solid var(--border)" : "1px solid transparent",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  if (active !== id) {
                    (e.target as HTMLElement).style.color = "var(--foreground)";
                    (e.target as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (active !== id) {
                    (e.target as HTMLElement).style.color = "var(--muted-foreground)";
                    (e.target as HTMLElement).style.background = "transparent";
                  }
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={() => handleClick("#about")}
            style={{
              padding: "7px 16px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 500,
              color: "#fff",
              background: "linear-gradient(135deg, #4f8ef7, #a78bfa)",
              border: "none",
              cursor: "pointer",
              transition: "opacity 0.15s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "0.85")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "1")}
          >
            联系合作
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
