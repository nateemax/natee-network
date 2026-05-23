"use client";

import { useState } from "react";

/* ── 数据：设计实践模型 ─────────────────────────────────────── */
interface DesignCase {
  id: string;
  title: string;
  category: string;
  cover: string; // emoji as cover placeholder
  tags: string[];
  summary: string;
  tools: string[];
  outcome: string;
}

const CASES: DesignCase[] = [
  {
    id: "d1", title: "B 端数据平台设计系统",
    category: "B端设计", cover: "📊",
    tags: ["设计系统", "数据可视化", "组件库"],
    summary: "为大型企业数据平台构建统一设计系统，涵盖 60+ 基础组件、12 种图表模板、4 套主题模式。通过设计 Token 驱动开发落地，实现设计师与工程师零摩擦协作。",
    tools: ["Figma Variables", "Storybook", "React+Aria", "Design Tokens"],
    outcome: "开发效率提升 52%，设计一致性评分从 62 升至 94",
  },
  {
    id: "d2", title: "移动支付 App 体验重塑",
    category: "C端体验", cover: "📱",
    tags: ["用户体验", "服务设计", "A/B测试"],
    summary: "针对支付转化漏斗中的 7 个关键断点进行体验优化，运用服务蓝图 + JTBD 框架重新定义核心流程。上线后支付成功率提升 18%，NPS 从 34 升至 58。",
    tools: ["JTBD框架", "服务蓝图", "Figma原型", "Optimizely"],
    outcome: "支付转化率 +18%，NPS +24分",
  },
  {
    id: "d3", title: "SaaS  onboarding 流程优化",
    category: "C端体验", cover: "🚀",
    tags: ["新手引导", "留存优化", "行为设计"],
    summary: "重构 SaaS 产品的新用户引导流程，基于行为经济学原理设计渐进式激活路径。通过交互式 Checklist + 智能提示系统，将 Day-7 留存率从 31% 提升至 57%。",
    tools: ["行为设计框架", "Mixpanel", "Intro.js", "Userpilot"],
    outcome: "Day-7 留存 +26pct，Time-to-Value 缩短 40%",
  },
  {
    id: "d4", title: "品牌视觉识别系统升级",
    category: "品牌设计", cover: "🎨",
    tags: ["品牌策略", "视觉识别", "设计语言"],
    summary: "为成长期科技公司打造新一代品牌视觉体系，从战略定位出发推导视觉语言。建立 Logo 响应式系统、色彩心理学框架、图标语义标准，支持多场景一致表达。",
    tools: ["品牌金字塔", "色彩心理学", "Illustrator", "Logo响应式系统"],
    outcome: "品牌认知度提升 43%，设计应用效率 +65%",
  },
  {
    id: "d5", title: "设计系统文档与治理平台",
    category: "设计系统", cover: "📚",
    tags: ["设计治理", "文档体系", "版本管理"],
    summary: "搭建企业级设计系统文档平台，支持组件 API 文档、设计决策记录（ADR）、变更日志自动化。集成 GitHub Actions 实现设计 Token 同步，确保文档与代码永远一致。",
    tools: ["Markdown+MDX", "GitHub Actions", "Figma REST API", "Docsy"],
    outcome: "文档维护成本 -70%，新成员上手时间 -60%",
  },
  {
    id: "d6", title: "AI 辅助设计工作流",
    category: "AI设计", cover: "🤖",
    tags: ["生成式AI", "设计自动化", "提示工程"],
    summary: "将 Midjourney、v0.dev、Galileo AI 等工具整合进设计工作流，覆盖灵感探索、原型生成、设计评审三个阶段。建立提示词模板库与质量评估标准，AI 产出可用率从 12% 提升至 68%。",
    tools: ["Midjourney", "v0.dev", "Galileo AI", "提示词工程"],
    outcome: "概念探索时间 -75%，初稿产出速度 +3x",
  },
];

const CATEGORIES = ["全部", "B端设计", "C端体验", "品牌设计", "设计系统", "AI设计"];

interface ToolMatrixItem {
  phase: string;
  tools: { name: string; desc: string; status: "active" | "beta" | "roadmap" }[];
}

const TOOL_MATRIX: ToolMatrixItem[] = [
  {
    phase: "🔍 探索阶段",
    tools: [
      { name: "用户研究 Agent", desc: "自动生成访谈提纲、分析访谈记录、提取洞察", status: "active" },
      { name: "竞品分析 Agent", desc: "抓取竞品公开信息，生成 SWOT 与功能对比矩阵", status: "active" },
      { name: "JTBD 拆解工具", desc: "将用户需求转化为 Jobs-to-be-Done 框架", status: "beta" },
    ],
  },
  {
    phase: "🎨 设计阶段",
    tools: [
      { name: "Figma 智能组件", desc: "参数化组件库，支持主题切换与响应式预览", status: "active" },
      { name: "设计 Token 同步器", desc: "Figma ↔代码 Token 双向同步，零手动维护", status: "active" },
      { name: "AI 原型生成器", desc: "文字描述 → 交互原型，支持多人实时协作编辑", status: "beta" },
    ],
  },
  {
    phase: "🚀 交付阶段",
    tools: [
      { name: "设计评审 Agent", desc: "自动检测设计稿可用性问题，生成评审报告", status: "beta" },
      { name: "标注自动生成", desc: "设计稿 → 开发标注 + CSS 代码，一键导出", status: "active" },
      { name: "A/B 测试配置器", desc: "设计假设 → 实验方案 → 数据分析闭环", status: "roadmap" },
    ],
  },
];

/* ── 子组件 ────────────────────────────────────────────────── */

function CaseCard({ item, onClick }: { item: DesignCase; onClick: () => void }) {
  return (
    <div className="card" style={{ padding: 0, overflow: "hidden", cursor: "pointer" }} onClick={onClick}>
      {/* Cover area */}
      <div style={{
        height: 140,
        background: "linear-gradient(135deg, rgba(167,139,250,0.15), rgba(167,139,250,0.05))",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 48, borderBottom: "1px solid var(--border)",
      }}>
        {item.cover}
      </div>
      <div style={{ padding: "18px 20px" }}>
        <div style={{ fontSize: 10, color: "#a78bfa", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>{item.category}</div>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--foreground)", marginBottom: 8 }}>{item.title}</h3>
        <p style={{ fontSize: 12, color: "var(--muted-foreground)", lineHeight: 1.6, marginBottom: 12, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {item.summary}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
          {item.tags.map(t => (
            <span key={t} style={{ fontSize: 10, padding: "2px 7px", borderRadius: 999, border: "1px solid var(--border)", color: "var(--muted-foreground)" }}>{t}</span>
          ))}
        </div>
        <div style={{ fontSize: 11, color: "#a78bfa", fontWeight: 500 }}>查看详情 →</div>
      </div>
    </div>
  );
}

function CaseDetail({ item, open, onClose }: { item: DesignCase | null; open: boolean; onClose: () => void }) {
  if (!item) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: open ? "auto" : "none" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", opacity: open ? 1 : 0, transition: "opacity 0.3s" }} onClick={onClose} />
      <div style={{ position: "relative", width: "100%", maxWidth: 640, maxHeight: "85vh", overflowY: "auto", background: "#12121a", border: "1px solid var(--border)", borderRadius: 16, padding: "32px 28px", transform: open ? "scale(1)" : "scale(0.95)", opacity: open ? 1 : 0, transition: "all 0.3s cubic-bezier(.4,0,.2,1)", zIndex: 1 }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", color: "var(--muted-foreground)", fontSize: 20, cursor: "pointer" }}>✕</button>
        <div style={{ fontSize: 36, marginBottom: 12 }}>{item.cover}</div>
        <div style={{ fontSize: 10, color: "#a78bfa", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>{item.category}</div>
        <h3 style={{ fontSize: 22, fontWeight: 600, color: "var(--foreground)", marginBottom: 12 }}>{item.title}</h3>
        <p style={{ fontSize: 14, color: "var(--muted-foreground)", lineHeight: 1.8, marginBottom: 20 }}>{item.summary}</p>

        {/* Tools */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 11, color: "var(--muted-foreground)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>使用工具</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {item.tools.map(t => <span key={t} style={{ fontSize: 12, padding: "4px 10px", borderRadius: 999, border: "1px solid rgba(167,139,250,0.3)", color: "#a78bfa", background: "rgba(167,139,250,0.08)" }}>{t}</span>)}
          </div>
        </div>

        {/* Outcome */}
        <div className="card" style={{ padding: "14px 16px", borderLeft: "3px solid #3ecf8e" }}>
          <div style={{ fontSize: 11, color: "var(--muted-foreground)", marginBottom: 4 }}>项目成果</div>
          <div style={{ fontSize: 14, color: "#3ecf8e", fontWeight: 600 }}>{item.outcome}</div>
        </div>
      </div>
    </div>
  );
}

function ToolMatrixPanel() {
  return (
    <div className="card" style={{ padding: "24px", marginTop: 32 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", marginBottom: 4 }}>🛠 Agent 工具矩阵</div>
      <div style={{ fontSize: 12, color: "var(--muted-foreground)", marginBottom: 20 }}>覆盖设计全链路的智能工具，支持自然语言触发与自动化执行</div>

      {TOOL_MATRIX.map(group => (
        <div key={group.phase} style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", marginBottom: 10 }}>{group.phase}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
            {group.tools.map(t => (
              <div key={t.name} className="card" style={{ padding: "12px 14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)" }}>{t.name}</span>
                  <span style={{
                    fontSize: 10, padding: "1px 6px", borderRadius: 999,
                    background: t.status === "active" ? "rgba(62,207,142,0.12)" : t.status === "beta" ? "rgba(245,166,35,0.12)" : "rgba(255,255,255,0.06)",
                    color: t.status === "active" ? "#3ecf8e" : t.status === "beta" ? "#f5a623" : "var(--muted-foreground)",
                  }}>
                    {t.status === "active" ? "已上线" : t.status === "beta" ? "Beta" : "规划中"}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: "var(--muted-foreground)", lineHeight: 1.5 }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── 主组件 ────────────────────────────────────────────────── */

export default function DesignSection() {
  const [activeCat, setActiveCat] = useState("全部");
  const [detailCase, setDetailCase] = useState<DesignCase | null>(null);

  const filtered = activeCat === "全部" ? CASES : CASES.filter(c => c.category === activeCat);

  return (
    <section id="design" className="section" style={{ minHeight: "100vh", padding: "100px 24px", position: "relative", borderTop: "1px solid var(--border)" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 60% 40%, rgba(167,139,250,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 64, fontWeight: 700, color: "#a78bfa", opacity: 0.1, lineHeight: 1, fontVariantNumeric: "tabular-nums", marginBottom: -24, letterSpacing: "-0.04em" }}>03</div>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 500, color: "var(--foreground)", marginBottom: 12, letterSpacing: "-0.01em" }}>
            设计实践模型
          </h2>
          <p style={{ fontSize: 15, color: "var(--muted-foreground)", lineHeight: 1.7, maxWidth: 580, marginBottom: 28 }}>
            以经典设计案例为基底，结合真实实践场景与 Agent 工具矩阵，完成从策划到落地的全链路方案推演。
          </p>

          {/* Category filter */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                style={{
                  padding: "7px 16px", borderRadius: 999,
                  border: activeCat === c ? "1px solid #a78bfa" : "1px solid var(--border)",
                  background: activeCat === c ? "rgba(167,139,250,0.1)" : "transparent",
                  color: activeCat === c ? "#a78bfa" : "var(--muted-foreground)",
                  fontSize: 13, fontWeight: activeCat === c ? 600 : 400,
                  cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap",
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Case grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
          {filtered.map(item => (
            <CaseCard key={item.id} item={item} onClick={() => setDetailCase(item)} />
          ))}
        </div>

        {/* Tool Matrix */}
        <ToolMatrixPanel />

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 40 }}>
          {[
            { v: "60+", l: "设计案例", c: "#a78bfa" },
            { v: "30+", l: "Agent工具", c: "#3ecf8e" },
            { v: "12+", l: "行业覆盖", c: "#4f8ef7" },
            { v: "89%", l: "客户满意度", c: "#f5a623" },
          ].map(s => (
            <div key={s.l} className="card" style={{ padding: "18px 14px", textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: s.c, lineHeight: 1, marginBottom: 6 }}>{s.v}</div>
              <div style={{ fontSize: 11, color: "var(--muted-foreground)" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail modal */}
      <CaseDetail item={detailCase} open={!!detailCase} onClose={() => setDetailCase(null)} />
    </section>
  );
}
