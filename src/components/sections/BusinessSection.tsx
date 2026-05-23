"use client";

import { useState } from "react";

/* ── 数据：商业价值分析 ─────────────────────────────────── */
interface Dimension {
  id: string;
  label: string;
  icon: string;
  color: string;
  desc: string;
  metrics: { label: string; value: string; bar: number }[];
}

const DIMENSIONS: Dimension[] = [
  {
    id: "asset", label: "资产价值", icon: "💰", color: "#4f8ef7",
    desc: "基于 IDC 行业模型，从资产估值、容量利用率、边际收益、REITs 证券化四个维度评估资产价值创造能力。",
    metrics: [
      { label: "估值精度", value: "±8%", bar: 82 },
      { label: "REITs 评分", value: "82/100", bar: 82 },
      { label: "容量利用率", value: "91%", bar: 91 },
      { label: "边际收益", value: "+23%", bar: 73 },
    ],
  },
  {
    id: "ops", label: "运营效率", icon: "⚡", color: "#a78bfa",
    desc: "基于 IDC 运营模型，评估 PUE 优化、智能运维成本削减、客户风险敞口管理等运营效率指标。",
    metrics: [
      { label: "PUE 优化", value: "1.08", bar: 88 },
      { label: "运维成本", value: "-32%", bar: 78 },
      { label: "SLA 达标", value: "99.97%", bar: 97 },
      { label: "风险预警", value: "94%", bar: 94 },
    ],
  },
  {
    id: "exp", label: "体验价值", icon: "✨", color: "#3ecf8e",
    desc: "基于设计实践模型，评估设计驱动增长、NPS 与客户留存、服务触点价值等体验维度商业价值。",
    metrics: [
      { label: "NPS 提升", value: "+24", bar: 96 },
      { label: "留存率", value: "+26pct", bar: 86 },
      { label: "转化提升", value: "+18%", bar: 78 },
      { label: "品牌认知", value: "+43%", bar: 73 },
    ],
  },
  {
    id: "eco", label: "生态杠杆", icon: "🔗", color: "#f5a623",
    desc: "基于设计系统模型，评估组件复用 ROI、协作效率、社区网络效应等生态级价值创造能力。",
    metrics: [
      { label: "复用 ROI", value: "340%", bar: 94 },
      { label: "协作效率", value: "+52%", bar: 82 },
      { label: " defects 下降", value: "-42%", bar: 78 },
      { label: "网络效应", value: "78/100", bar: 68 },
    ],
  },
];

interface CaseStudy {
  id: string;
  name: string;
  logo: string; // emoji placeholder
  dimension: string;
  score: number;
  tagline: string;
  analysis: string;
  highlights: { label: string; value: string; positive: boolean }[];
  risks: string[];
  source: string;
}

const CASES: CaseStudy[] = [
  {
    id: "c1", name: "万国数据 GDS", logo: "🏢",
    dimension: "asset", score: 82,
    tagline: "2025年首次全年盈利，IDC REITs 第一股",
    analysis: "万国数据 2025 年全年净利润 9.59 亿元，实现成立以来首次全年盈利。2026Q1 净利润 2.65 亿元（同比 +27%），但股价因「增收不增利」预期下跌 9.3%。核心风险：客户集中度（阿里/腾讯占比 >50%）、电力成本上涨、一线城市能耗指标收紧。资产价值评分 82/100，主要扣分项在客户集中度与政策风险。",
    highlights: [
      { label: "2025营收", value: "114.3亿元 (+10.8%)", positive: true },
      { label: "2025净利润", value: "9.59亿元 (首盈)", positive: true },
      { label: "2026Q1净利", value: "2.65亿元 (+27%)", positive: true },
      { label: "股价反应", value: "财报后 -9.3%", positive: false },
    ],
    risks: ["客户集中度风险（阿里+腾讯>50%）", "电力成本上涨压力", "一线城市能耗指标收紧", "REITs 折现率上行风险"],
    source: "GDS 2025年报 / 2026Q1财报 · 2026-05",
  },
  {
    id: "c2", name: "秦淮数据 Chindata", logo: "🌐",
    dimension: "asset", score: 92,
    tagline: "贝恩 31.6亿美元收购，中国超大规模 IDC 标杆",
    analysis: "秦淮数据（已更名 Qinhuai Data）被贝恩资本以 31.6 亿美元全现金收购并私有化。核心资产：799MW 运营容量、37 个数据中心、主要服务字节跳动（收入占比 >80%）。优势：超大规模定制、PUE 最优实践（1.1x）、河北/山西可再生能源优势。风险：单一客户依赖度极高，字节跳动议价权过强。资产价值评分 92/100，客户风险是主要扣分项。",
    highlights: [
      { label: "运营容量", value: "799MW", positive: true },
      { label: "数据中心数", value: "37个", positive: true },
      { label: "收购金额", value: "$31.6亿（全现金）", positive: true },
      { label: "字节占比", value: ">80% 收入", positive: false },
    ],
    risks: ["单一客户依赖（字节跳动>80%）", "超大规模定制退出风险", "可再生能源政策变动", "国际资本流动性风险"],
    source: "贝恩资本公告 / 秦淮数据年报 · 2025",
  },
  {
    id: "c3", name: "Airbnb", logo: "🛏️",
    dimension: "exp", score: 96,
    tagline: "设计思维拯救独角兽，从濒临破产到 3100 亿美元估值",
    analysis: "2009 年 Airbnb 濒临破产，三位创始人参加设计工作室后彻底转向设计驱动。关键设计决策：专业摄影服务（房源转化率 +300%）、信任体系设计（评价+验证+保险）、地图搜索交互革命。2011 年预订量 7 天内翻倍，2023 年 IPO 估值 3100 亿美元。体验价值评分 96/100，是设计驱动商业价值的教科书级案例。",
    highlights: [
      { label: "设计介入前", value: "周营收 $200（濒临破产）", positive: false },
      { label: "专业摄影后", value: "转化率 +300%", positive: true },
      { label: "7天翻倍", value: "2011年预订量爆炸增长", positive: true },
      { label: "IPO估值", value: "$3100亿（2023）", positive: true },
    ],
    risks: ["监管合规风险（全球各城市）", "信任体系被滥用风险", "房东-平台-房客三方利益平衡"],
    source: "Airbnb 官方史 / Harvard Business Review · 2023",
  },
  {
    id: "c4", name: "企业设计系统（Ant Design 等）", logo: "🧩",
    dimension: "eco", score: 94,
    tagline: "设计系统驱动开发效率革命，企业级 UI 标准范式",
    analysis: "Ant Design、Material Design、Fluent UI 等主流企业设计系统，通过组件复用、设计 Token、自动化文档，将开发效率提升 45-65%，设计-开发交付周期缩短 40-60%，缺陷率下降 30-50%。生态杠杆评分 94/100。关键是设计系统的治理机制（版本管理、破窗效应防控）决定长期 ROI。",
    highlights: [
      { label: "开发效率", value: "+45~65%", positive: true },
      { label: "交付周期", value: "-40~60%", positive: true },
      { label: "缺陷率", value: "-30~50%", positive: true },
      { label: "组件复用", value: "60-200+ 组件", positive: true },
    ],
    risks: ["设计系统治理成本高", "版本升级破窗效应", "过度统一导致品牌同质化"],
    source: "Thoughtworks 技术雷达 / 各设计系统官方文档 · 2024-2025",
  },
];

/* ── 子组件 ────────────────────────────────────────────── */

function DimensionCard({ dim, active, onClick }: { dim: Dimension; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="card"
      style={{
        padding: "18px 16px",
        textAlign: "left",
        cursor: "pointer",
        borderLeft: active ? `3px solid ${dim.color}` : "1px solid var(--border)",
        background: active ? `${dim.color}10` : undefined,
        width: "100%",
        transition: "all 0.2s",
      }}
    >
      <div style={{ fontSize: 22, marginBottom: 8 }}>{dim.icon}</div>
      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--foreground)", marginBottom: 4 }}>{dim.label}</div>
      <div style={{ fontSize: 11, color: "var(--muted-foreground)", lineHeight: 1.5 }}>{dim.desc.slice(0, 40)}...</div>
    </button>
  );
}

function DimensionDetail({ dim }: { dim: Dimension }) {
  return (
    <div className="card" style={{ padding: "28px", borderLeft: `3px solid ${dim.color}` }}>
      <div style={{ fontSize: 13, color: dim.color, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>{dim.icon} {dim.label}维度</div>
      <p style={{ fontSize: 14, color: "var(--muted-foreground)", lineHeight: 1.7, marginBottom: 20 }}>{dim.desc}</p>

      {/* Metrics bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {dim.metrics.map(m => (
          <div key={m.label}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 12, color: "var(--foreground)" }}>{m.label}</span>
              <span style={{ fontSize: 12, color: dim.color, fontWeight: 600 }}>{m.value}</span>
            </div>
            <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${m.bar}%`, background: dim.color, borderRadius: 2, transition: "width 0.6s ease" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CaseCard({ item, onClick }: { item: CaseStudy; onClick: () => void }) {
  const dimColor = DIMENSIONS.find(d => d.id === item.dimension)?.color || "#888";
  return (
    <div className="card" style={{ padding: "20px", cursor: "pointer" }} onClick={onClick}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 12 }}>
        <div style={{ fontSize: 32, lineHeight: 1 }}>{item.logo}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--foreground)" }}>{item.name}</h3>
            <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 999, background: `${dimColor}18`, color: dimColor, fontWeight: 600 }}>{item.score}/100</span>
          </div>
          <div style={{ fontSize: 12, color: "var(--muted-foreground)", lineHeight: 1.5 }}>{item.tagline}</div>
        </div>
      </div>

      {/* Highlights mini */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 6, marginBottom: 10 }}>
        {item.highlights.slice(0, 2).map(h => (
          <div key={h.label} style={{ fontSize: 11, color: h.positive ? "#3ecf8e" : "#f5a623" }}>
            <span style={{ color: "var(--muted-foreground)" }}>{h.label}:</span> {h.value}
          </div>
        ))}
      </div>

      <div style={{ fontSize: 11, color: dimColor, fontWeight: 500 }}>查看完整分析 →</div>
    </div>
  );
}

function CaseDetail({ item, open, onClose }: { item: CaseStudy | null; open: boolean; onClose: () => void }) {
  if (!item) return null;
  const dimColor = DIMENSIONS.find(d => d.id === item.dimension)?.color || "#888";
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: open ? "auto" : "none" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", opacity: open ? 1 : 0, transition: "opacity 0.3s" }} onClick={onClose} />
      <div style={{ position: "relative", width: "100%", maxWidth: 680, maxHeight: "88vh", overflowY: "auto", background: "#12121a", border: "1px solid var(--border)", borderRadius: 16, padding: "32px 28px", transform: open ? "scale(1)" : "scale(0.95)", opacity: open ? 1 : 0, transition: "all 0.3s", zIndex: 1 }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", color: "var(--muted-foreground)", fontSize: 20, cursor: "pointer" }}>✕</button>

        <div style={{ fontSize: 36, marginBottom: 10 }}>{item.logo}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <h3 style={{ fontSize: 22, fontWeight: 600, color: "var(--foreground)" }}>{item.name}</h3>
          <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 999, background: `${dimColor}18`, color: dimColor, fontWeight: 700 }}>价值评分 {item.score}/100</span>
        </div>
        <div style={{ fontSize: 13, color: dimColor, marginBottom: 16, fontWeight: 500 }}>{item.tagline}</div>

        <p style={{ fontSize: 14, color: "var(--muted-foreground)", lineHeight: 1.8, marginBottom: 20 }}>{item.analysis}</p>

        {/* Highlights */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 11, color: "var(--muted-foreground)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>关键指标</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
            {item.highlights.map(h => (
              <div key={h.label} className="card" style={{ padding: "10px 12px" }}>
                <div style={{ fontSize: 11, color: "var(--muted-foreground)", marginBottom: 2 }}>{h.label}</div>
                <div style={{ fontSize: 13, color: h.positive ? "#3ecf8e" : "#f5a623", fontWeight: 600 }}>{h.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Risks */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 11, color: "var(--muted-foreground)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>风险提示</div>
          {item.risks.map(r => (
            <div key={r} style={{ fontSize: 12, color: "var(--muted-foreground)", lineHeight: 1.8, paddingLeft: 12, position: "relative" }}>
              <span style={{ position: "absolute", left: 0, color: "#f5a623" }}>•</span> {r}
            </div>
          ))}
        </div>

        <div style={{ fontSize: 11, color: "var(--muted-foreground)", opacity: 0.6 }}>来源：{item.source}</div>
      </div>
    </div>
  );
}

/* ── 主组件 ────────────────────────────────────────────── */

export default function BusinessSection() {
  const [activeDim, setActiveDim] = useState(DIMENSIONS[0]);
  const [detailCase, setDetailCase] = useState<CaseStudy | null>(null);

  const dimCases = CASES.filter(c => c.dimension === activeDim.id);

  return (
    <section id="business" className="section" style={{ minHeight: "100vh", padding: "100px 24px", position: "relative", borderTop: "1px solid var(--border)" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 40% 60%, rgba(62,207,142,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 64, fontWeight: 700, color: "#3ecf8e", opacity: 0.1, lineHeight: 1, fontVariantNumeric: "tabular-nums", marginBottom: -24, letterSpacing: "-0.04em" }}>04</div>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 500, color: "var(--foreground)", marginBottom: 12, letterSpacing: "-0.01em" }}>
            商业价值分析
          </h2>
          <p style={{ fontSize: 15, color: "var(--muted-foreground)", lineHeight: 1.7, maxWidth: 600, marginBottom: 28 }}>
            基于前置模型的关键节点进行价值渲染，结合真实商业案例解析，提供可量化的商业评估与决策参考。
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginBottom: 32 }}>
          {DIMENSIONS.map(dim => (
            <DimensionCard key={dim.id} dim={dim} active={activeDim.id === dim.id} onClick={() => setActiveDim(dim)} />
          ))}
        </div>

        {/* Dimension detail */}
        <DimensionDetail dim={activeDim} />

        {/* Case studies for this dimension */}
        <div style={{ marginTop: 40 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: "var(--foreground)", marginBottom: 16 }}>
            相关商业案例
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 14 }}>
            {dimCases.length > 0 ? dimCases.map(c => (
              <CaseCard key={c.id} item={c} onClick={() => setDetailCase(c)} />
            )) : (
              <div style={{ color: "var(--muted-foreground)", fontSize: 13, gridColumn: "1/-1", padding: 24, textAlign: "center" }}>
                暂无属于「{activeDim.label}」维度的案例，请在其它维度查看
              </div>
            )}
          </div>
        </div>

        {/* All cases overview */}
        <div style={{ marginTop: 48 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: "var(--foreground)", marginBottom: 16 }}>全部案例概览</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
            {CASES.map(c => (
              <CaseCard key={c.id} item={c} onClick={() => setDetailCase(c)} />
            ))}
          </div>
        </div>
      </div>

      <CaseDetail item={detailCase} open={!!detailCase} onClose={() => setDetailCase(null)} />
    </section>
  );
}
