"use client";
import { useEffect, useRef } from "react";

const STATS = [
  { value: "8+", label: "覆盖行业", color: "#4f8ef7" },
  { value: "30+", label: "模型框架", color: "#a78bfa" },
  { value: "12+", label: "Agent工具", color: "#3ecf8e" },
  { value: "5y+", label: "从业经验", color: "#f5a623" },
];

const TAGS = [
  "IDC行业分析", "设计策略", "商业价值评估", "Agent工具矩阵",
  "用户体验研究", "数字化转型", "产品设计", "市场洞察",
  "知识图谱", "智能决策",
];

const MODULES = [
  {
    id: "idc",
    icon: "◈",
    title: "IDC 行业模型",
    desc: "构建多行业知识框架，整合 Agent 解决方案",
    color: "#4f8ef7",
    bg: "rgba(79,142,247,0.08)",
    border: "rgba(79,142,247,0.2)",
  },
  {
    id: "design",
    icon: "◎",
    title: "设计实践模型",
    desc: "经典案例与 Agent 工具矩阵的全链路策划",
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.08)",
    border: "rgba(167,139,250,0.2)",
  },
  {
    id: "business",
    icon: "◐",
    title: "商业价值分析",
    desc: "真实案例价值解析与合理商业评估体系",
    color: "#3ecf8e",
    bg: "rgba(62,207,142,0.08)",
    border: "rgba(62,207,142,0.2)",
  },
  {
    id: "feed",
    icon: "◉",
    title: "动态信息",
    desc: "抓取行业讯息，持续驱动模型迭代更新",
    color: "#f5a623",
    bg: "rgba(245,166,35,0.08)",
    border: "rgba(245,166,35,0.2)",
  },
];

interface HeroSectionProps {
  onNavigate?: (view: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const navigateTo = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="overview"
      ref={sectionRef}
      className="section grid-bg"
      style={{
        minHeight: "100vh",
        paddingTop: 120,
        paddingBottom: 80,
        paddingLeft: 24,
        paddingRight: 24,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1100, width: "100%", margin: "0 auto" }}>
        {/* Badge */}
        <div
          className="fade-in-up delay-100"
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 28,
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 14px",
              borderRadius: 999,
              border: "1px solid rgba(79,142,247,0.3)",
              background: "rgba(79,142,247,0.08)",
              fontSize: 12,
              color: "#7fb3ff",
              fontWeight: 500,
            }}
          >
            <span
              className="pulse-dot"
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#4f8ef7",
                display: "inline-block",
              }}
            />
            最后更新 2026-05-24
          </span>
        </div>

        {/* Main heading */}
        <h1
          className="fade-in-up delay-200"
          style={{
            fontSize: "clamp(36px, 6vw, 72px)",
            fontWeight: 300,
            lineHeight: 1.1,
            textAlign: "center",
            marginBottom: 20,
            letterSpacing: "-0.02em",
            color: "var(--foreground)",
          }}
        >
          构建行业知识体系
          <br />
          <span className="gradient-text" style={{ fontWeight: 500 }}>
            驱动真实商业价值
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="fade-in-up delay-300"
          style={{
            textAlign: "center",
            fontSize: "clamp(14px, 2vw, 17px)",
            color: "var(--muted-foreground)",
            maxWidth: 580,
            margin: "0 auto 48px",
            lineHeight: 1.7,
            fontWeight: 300,
          }}
        >
          IDC 行业模型 × 设计实践框架 × 商业价值分析 × Agent 工具矩阵
          <br />
          一个不断生长的个人知识网络
        </p>

        {/* CTA Buttons */}
        <div
          className="fade-in-up delay-400"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            marginBottom: 72,
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => navigateTo("idc")}
            style={{
              padding: "11px 28px",
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 500,
              color: "#fff",
              background: "linear-gradient(135deg, #4f8ef7, #a78bfa)",
              border: "none",
              cursor: "pointer",
              transition: "opacity 0.15s, transform 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.opacity = "0.85";
              (e.target as HTMLElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.opacity = "1";
              (e.target as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            探索模型体系
          </button>
          <button
            onClick={() => navigateTo("about")}
            style={{
              padding: "10px 28px",
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 500,
              color: "var(--foreground)",
              background: "transparent",
              border: "1px solid var(--border-hover)",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.3)";
              (e.target as HTMLElement).style.background = "rgba(255,255,255,0.04)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.borderColor = "var(--border-hover)";
              (e.target as HTMLElement).style.background = "transparent";
            }}
          >
            了解更多 →
          </button>
        </div>

        {/* Stats Row */}
        <div
          className="fade-in-up delay-500"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
            marginBottom: 64,
          }}
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="card"
              style={{
                padding: "24px 20px",
                textAlign: "center",
                cursor: "default",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(28px, 4vw, 42px)",
                  fontWeight: 600,
                  color: stat.color,
                  lineHeight: 1,
                  marginBottom: 8,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--muted-foreground)",
                  fontWeight: 400,
                  letterSpacing: "0.04em",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div
          className="fade-in-up delay-500"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            justifyContent: "center",
            marginBottom: 72,
          }}
        >
          {TAGS.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 32,
          }}
        >
          <p
            style={{
              fontSize: 11,
              color: "var(--muted-foreground)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            模块导航
          </p>
        </div>

        {/* Module Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 16,
          }}
        >
          {MODULES.map((mod, i) => (
            <button
              key={mod.id}
              onClick={() => navigateTo(mod.id)}
              className="card fade-in-up"
              style={{
                padding: "24px",
                textAlign: "left",
                cursor: "pointer",
                border: `1px solid ${mod.border}`,
                background: mod.bg,
                animationDelay: `${0.1 * i + 0.5}s`,
                opacity: 0,
                display: "block",
                width: "100%",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(-3px)";
                el.style.boxShadow = `0 8px 32px ${mod.color}20`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  fontSize: 22,
                  color: mod.color,
                  marginBottom: 12,
                  lineHeight: 1,
                }}
              >
                {mod.icon}
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "var(--foreground)",
                  marginBottom: 6,
                }}
              >
                {mod.title}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--muted-foreground)",
                  lineHeight: 1.5,
                }}
              >
                {mod.desc}
              </div>
              <div
                style={{
                  marginTop: 16,
                  fontSize: 12,
                  color: mod.color,
                  fontWeight: 500,
                }}
              >
                进入 →
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          opacity: 0.4,
        }}
      >
        <div
          style={{
            width: 1,
            height: 40,
            background: "linear-gradient(to bottom, var(--foreground), transparent)",
          }}
        />
        <span style={{ fontSize: 10, color: "var(--muted-foreground)", letterSpacing: "0.1em" }}>
          SCROLL
        </span>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #overview [style*="grid-template-columns: repeat(4"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          #overview [style*="grid-template-columns: repeat(4"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
