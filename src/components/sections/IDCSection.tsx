"use client";

import { useState, useRef, useEffect } from "react";

/* ── 数据：IDC 行业模型 ────────────────────────────────────────────── */
const CATEGORIES = [
  { id: "infra", label: "基础设施管理", pct: 70, color: "#4f8ef7" },
  { id: "it",    label: "IT 业务运营",   pct: 20, color: "#a78bfa" },
  { id: "agent", label: "Agent 智能加持", pct: 10, color: "#3ecf8e" },
];

interface ModelCard {
  id: string;
  cat: string;
  title: string;
  tags: string[];
  summary: string;
  metrics: { label: string; value: string; trend: "up" | "down" | "flat" }[];
  agentTools: string[];
}

const MODELS: ModelCard[] = [
  // ── 基础设施管理 70% ──
  {
    id: "m1", cat: "infra", title: "数据中心选址与规划模型",
    tags: ["区位评估", "政策合规", "TCO优化"],
    summary: "基于电力成本、网络延迟、政策补贴、自然灾害风险四维评估体系，结合REITs资本化路径，输出最优选址方案。应用于京津冀、长三角、粤港澳三大城市群案例。",
    metrics: [
      { label: "评估维度", value: "12", trend: "flat" },
      { label: "准确率", value: "94%", trend: "up" },
      { label: "降本空间", value: "18%", trend: "up" },
    ],
    agentTools: ["选址评分Agent", "政策雷达Agent", "TCO模拟器"],
  },
  {
    id: "m2", cat: "infra", title: "PUE 能效优化模型",
    tags: ["能效管理", "液冷技术", "碳足迹"],
    summary: "融合气候数据、IT负载曲线、冷却系统特性，构建动态PUE预测与优化框架。支持风冷/液冷/相变材料一体系评估，给出分阶段改造路线图。",
    metrics: [
      { label: "PUE下限", value: "1.08", trend: "down" },
      { label: "节电率", value: "32%", trend: "up" },
      { label: "ROI周期", value: "2.1年", trend: "down" },
    ],
    agentTools: ["PUE预测Agent", "冷却策略Agent", "碳核算Agent"],
  },
  {
    id: "m3", cat: "infra", title: "容量规划与调度模型",
    tags: ["容量预测", "资源调度", "SLA保障"],
    summary: "基于历史负载、业务增长曲线、季节性波动，构建多时间粒度容量预测引擎。支持机架/电力/冷却三维联合调度，最大化资源利用率同时保持SLA达标。",
    metrics: [
      { label: "利用率", value: "91%", trend: "up" },
      { label: "SLA达标", value: "99.97%", trend: "up" },
      { label: "预测误差", value: "<4%", trend: "down" },
    ],
    agentTools: ["容量预测Agent", "调度优化Agent", "瓶颈诊断Agent"],
  },
  {
    id: "m4", cat: "infra", title: "IDC 安全与合规模型",
    tags: ["等保2.0", "数据安全", "应急响应"],
    summary: "覆盖物理安全、网络安全、数据合规三大层面，内置等保2.0/ISO27001/SOC2映射矩阵。自动生成合规差距报告与整改优先级清单，降低合规风险。",
    metrics: [
      { label: "合规覆盖率", value: "96%", trend: "up" },
      { label: "漏洞修复", value: "<24h", trend: "down" },
      { label: "审计通过", value: "100%", trend: "flat" },
    ],
    agentTools: ["合规扫描Agent", "漏洞优先级Agent", "审计报告Agent"],
  },
  {
    id: "m5", cat: "infra", title: "IDC 资产估值与 REITs 模型",
    tags: ["资产估值", "REITs路径", "资本化"],
    summary: "基于EBITDA、CAPEX、电价趋势、区域供需，构建DCF+可比交易双轨估值框架。内置中国IDC REITs合规路径检查器，输出资产证券化可行性评分。",
    metrics: [
      { label: "估值精度", value: "±8%", trend: "down" },
      { label: "REITs评分", value: "82/100", trend: "up" },
      { label: "上市周期", value: "14个月", trend: "down" },
    ],
    agentTools: ["DCF估值Agent", "REITs合规Agent", "可比交易Agent"],
  },

  // ── IT 业务运营 20% ──
  {
    id: "m6", cat: "it", title: "多云管理与成本优化模型",
    tags: ["多云编排", "FinOps", "资源治理"],
    summary: "统一管理跨云厂商资源，基于 usage pattern 自动推荐 RI/SP 购买策略，识别僵尸资源与过度配置。集成国内主流云厂商API，实现成本可视化与优化建议自动推送。",
    metrics: [
      { label: "成本节省", value: "27%", trend: "up" },
      { label: "云厂商", value: "6+", trend: "flat" },
      { label: "ROI", value: "340%", trend: "up" },
    ],
    agentTools: ["成本分析Agent", "RI推荐Agent", "治理自动化Agent"],
  },
  {
    id: "m7", cat: "it", title: "IT 服务交付与 SLA 管理模型",
    tags: ["服务交付", "SLA监控", "客户成功"],
    summary: "端到端服务交付流程建模，从工单接入到验收归档全链路追踪。内置SLA违规预警机制，自动识别高风险工单并推荐干预措施，提升客户满意度。",
    metrics: [
      { label: "SLA达标率", value: "99.2%", trend: "up" },
      { label: "MTTR", value: "1.8h", trend: "down" },
      { label: "客户满意度", value: "4.7/5", trend: "up" },
    ],
    agentTools: ["SLA监控Agent", "工单分流Agent", "客户健康度Agent"],
  },

  // ── Agent 智能加持 10% ──
  {
    id: "m8", cat: "agent", title: "IDC Agent 工具矩阵总控",
    tags: ["Agent编排", "工具市场", "自动化流程"],
    summary: "统一调度前述所有Agent工具，支持自然语言触发工作流。内置工具市场含30+预置Agent，支持自定义工具接入。提供执行追踪、效果评估、持续优化闭环。",
    metrics: [
      { label: "Agent数量", value: "30+", trend: "up" },
      { label: "自动化率", value: "68%", trend: "up" },
      { label: "人工介入", value: "-75%", trend: "down" },
    ],
    agentTools: ["编排引擎", "工具市场", "效果评估Dashboard"],
  },
  {
    id: "m9", cat: "agent", title: "知识图谱与推理引擎",
    tags: ["知识图谱", "因果推理", "决策支持"],
    summary: "构建IDC领域知识图谱，覆盖设备-机房-园区-城市-政策五级实体关系。支持因果推理（如'限电政策→PUE压力→改造紧急度'），为决策提供可解释依据。",
    metrics: [
      { label: "实体数", value: "12K+", trend: "up" },
      { label: "关系边", value: "45K+", trend: "up" },
      { label: "推理准确率", value: "89%", trend: "up" },
    ],
    agentTools: ["图谱构建Agent", "因果推理Agent", "决策解释Agent"],
  },
];

/* ── 子组件 ────────────────────────────────────────────────────────── */

function CategoryBar({ cat, active, onClick }: { cat: typeof CATEGORIES[0]; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 18px",
        borderRadius: 999,
        border: active ? `1px solid ${cat.color}` : "1px solid var(--border)",
        background: active ? `${cat.color}18` : "transparent",
        color: active ? cat.color : "var(--muted-foreground)",
        fontSize: 13,
        fontWeight: active ? 600 : 400,
        cursor: "pointer",
        transition: "all 0.2s",
        whiteSpace: "nowrap",
      }}
    >
      {cat.label} <span style={{ opacity: 0.6 }}>{cat.pct}%</span>
    </button>
  );
}

function ModelDrawer({ model, open, onClose }: { model: ModelCard | null; open: boolean; onClose: () => void }) {
  if (!model) return null;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        pointerEvents: open ? "auto" : "none",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          opacity: open ? 1 : 0,
          transition: "opacity 0.3s",
        }}
        onClick={onClose}
      />
      {/* Drawer */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 680,
          maxHeight: "85vh",
          overflowY: "auto",
          background: "#12121a",
          border: "1px solid var(--border)",
          borderBottom: "none",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: "32px 28px",
          transform: open ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.35s cubic-bezier(.4,0,.2,1)",
          zIndex: 1,
        }}
      >
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", color: "var(--muted-foreground)", fontSize: 20, cursor: "pointer" }}>✕</button>

        <div style={{ fontSize: 11, color: "#4f8ef7", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
          {CATEGORIES.find(c => c.id === model.cat)?.label}
        </div>
        <h3 style={{ fontSize: 22, fontWeight: 600, color: "var(--foreground)", marginBottom: 12 }}>{model.title}</h3>
        <p style={{ fontSize: 14, color: "var(--muted-foreground)", lineHeight: 1.8, marginBottom: 24 }}>{model.summary}</p>

        {/* Metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
          {model.metrics.map(m => (
            <div key={m.label} className="card" style={{ padding: "14px 12px", textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: m.trend === "up" ? "#3ecf8e" : m.trend === "down" ? (m.label.includes("误差") || m.label.includes("修复") || m.label.includes("MTTR") || m.label.includes("周期") || m.label.includes("估值精度") ? "#3ecf8e" : "#f5a623") : "var(--foreground)", lineHeight: 1, marginBottom: 4 }}>
                {m.value} {m.trend === "up" ? "↑" : m.trend === "down" ? "↓" : "→"}
              </div>
              <div style={{ fontSize: 11, color: "var(--muted-foreground)" }}>{m.label}</div>
            </div>
          ))}
        </div>

        {/* Agent Tools */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 11, color: "var(--muted-foreground)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>Agent 工具</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {model.agentTools.map(t => (
              <span key={t} style={{ padding: "5px 12px", borderRadius: 999, fontSize: 12, border: "1px solid rgba(62,207,142,0.3)", color: "#3ecf8e", background: "rgba(62,207,142,0.08)" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 主组件 ────────────────────────────────────────────────────────── */

export default function IDCSection() {
  const [activeCat, setActiveCat] = useState<string>("infra");
  const [drawerModel, setDrawerModel] = useState<ModelCard | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const filtered = activeCat === "all" ? MODELS : MODELS.filter(m => m.cat === activeCat);

  return (
    <section
      id="idc"
      ref={sectionRef}
      className="section"
      style={{
        minHeight: "100vh",
        padding: "100px 24px",
        position: "relative",
        borderTop: "1px solid var(--border)",
      }}
    >
      {/* BG accent */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 20% 50%, rgba(79,142,247,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 64, fontWeight: 700, color: "#4f8ef7", opacity: 0.1, lineHeight: 1, fontVariantNumeric: "tabular-nums", marginBottom: -24, letterSpacing: "-0.04em" }}>02</div>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 500, color: "var(--foreground)", marginBottom: 12, letterSpacing: "-0.01em" }}>
            IDC 行业模型
          </h2>
          <p style={{ fontSize: 15, color: "var(--muted-foreground)", lineHeight: 1.7, maxWidth: 580, marginBottom: 28 }}>
            构建覆盖多行业的知识框架，整合行业建模方法论与 Agent 解决方案，形成可复用、可演化的行业洞察体系。
          </p>

          {/* Category filter */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <CategoryBar cat={{ id: "all", label: "全部模型", pct: 100, color: "#4f8ef7" }} active={activeCat === "all"} onClick={() => setActiveCat("all")} />
            {CATEGORIES.map(c => (
              <CategoryBar key={c.id} cat={c} active={activeCat === c.id} onClick={() => setActiveCat(c.id)} />
            ))}
          </div>
        </div>

        {/* Model grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 16 }}>
          {filtered.map((model) => {
            const catMeta = CATEGORIES.find(c => c.id === model.cat);
            return (
              <div
                key={model.id}
                className="card"
                style={{ padding: "24px", cursor: "pointer", borderLeft: `3px solid ${catMeta?.color || "#4f8ef7"}` }}
                onClick={() => setDrawerModel(model)}
              >
                {/* Cat badge */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 999, background: `${catMeta?.color}18`, color: catMeta?.color, fontWeight: 600, letterSpacing: "0.04em" }}>
                    {catMeta?.label}
                  </span>
                </div>

                <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--foreground)", marginBottom: 8 }}>{model.title}</h3>
                <p style={{ fontSize: 13, color: "var(--muted-foreground)", lineHeight: 1.6, marginBottom: 16, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {model.summary}
                </p>

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                  {model.tags.map(t => (
                    <span key={t} style={{ fontSize: 11, padding: "2px 8px", borderRadius: 999, border: "1px solid var(--border)", color: "var(--muted-foreground)" }}>{t}</span>
                  ))}
                </div>

                {/* Mini metrics */}
                <div style={{ display: "flex", gap: 12, fontSize: 12 }}>
                  {model.metrics.slice(0, 2).map(m => (
                    <div key={m.label}>
                      <span style={{ color: m.trend === "up" ? "#3ecf8e" : m.trend === "down" ? "#f5a623" : "var(--foreground)", fontWeight: 600 }}>{m.value}</span>
                      <span style={{ color: "var(--muted-foreground)", marginLeft: 4 }}>{m.label}</span>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 14, fontSize: 12, color: "#4f8ef7", fontWeight: 500 }}>
                  查看详情 →
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Drawer */}
      <ModelDrawer model={drawerModel} open={!!drawerModel} onClose={() => setDrawerModel(null)} />
    </section>
  );
}
