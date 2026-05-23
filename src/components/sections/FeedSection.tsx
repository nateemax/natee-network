"use client";

import { useState } from "react";

/* ── 数据：动态信息流 ─────────────────────────────────────── */
type Priority = "P0" | "P1" | "P2";
type Impact = "extreme" | "high" | "medium";

interface InfoItem {
  id: string;
  priority: Priority;
  impact: Impact;
  title: string;
  summary: string;
  source: string;
  date: string;
  tags: { type: "industry" | "model" | "risk" | "case"; label: string }[];
  relatedModel?: string;
  actionRequired: boolean;
}

const INFO_ITEMS: InfoItem[] = [
  {
    id: "i1", priority: "P0", impact: "extreme",
    title: "AI算力 vs 电力约束：2026年数据中心能耗预警",
    summary: "工信部预测2026年中国数据中心总能耗将突破4000亿千瓦时，占全国用电量5.2%。AI大模型训练集群（万卡级）单集群功耗超100MW，相当于一座中型城市。多地已暂停新建数据中心审批，电力成本上涨20-35%。直接影响PUE优化模型与容量规划模型的参数假设。",
    source: "工信部 / 中国信通院 · 2026-05",
    date: "2026-05-20",
    tags: [
      { type: "industry", label: "IDC" },
      { type: "model", label: "PUE优化模型" },
      { type: "model", label: "容量规划模型" },
      { type: "risk", label: "电力短缺风险" },
    ],
    relatedModel: "PUE能效优化模型",
    actionRequired: true,
  },
  {
    id: "i2", priority: "P1", impact: "high",
    title: "万国数据2026Q1净利2.65亿但股价跌9.3%",
    summary: "GDS发布2026Q1财报：营收29.1亿元（+8.7% YoY），净利润2.65亿元（+27% YoY）。但股价当日下跌9.3%，市场担忧电力成本上升压缩利润率，以及一线城市能耗指标收紧影响扩产节奏。影响资产估值模型中电力成本敏感性参数，以及REITs折现率假设。",
    source: "GDS 2026Q1财报 / 雪球 · 2026-05-15",
    date: "2026-05-15",
    tags: [
      { type: "case", label: "GDS扭亏" },
      { type: "model", label: "资产估值模型" },
      { type: "risk", label: "估值风险" },
    ],
    relatedModel: "IDC资产估值与REITs模型",
    actionRequired: true,
  },
  {
    id: "i3", priority: "P1", impact: "high",
    title: "2025中国算力市场规模达8351亿元，同比+30%",
    summary: "中国信通院数据：2025年中国算力市场规模8351亿元，同比增长30%。其中智能算力占比提升至65%，国产AI芯片市占率突破25%。河北/山西/内蒙古承接京津冀外溢需求，可再生能源优势明显。影响容量规划模型中区域权重参数，以及IDC选址模型的政策红利系数。",
    source: "中国信通院《中国算力发展报告》· 2026-04",
    date: "2026-04-28",
    tags: [
      { type: "industry", label: "算力市场" },
      { type: "model", label: "容量规划模型" },
      { type: "model", label: "选址规划模型" },
      { type: "industry", label: "政策红利" },
    ],
    relatedModel: "数据中心选址与规划模型",
    actionRequired: false,
  },
  {
    id: "i4", priority: "P1", impact: "high",
    title: "中科曙光 scaleX 超大规模智算集群亮相",
    summary: "中科曙光发布scaleX 10K液冷智算集群，支持10,000张国产AI芯片互联，PUE<1.12，单机柜功率密度80kW。标志着国产AI基础设施进入万卡时代，对IDC冷却架构模型提出新参数基准，液冷技术占比假设需上调至60%+。",
    source: "中科曙光发布会 / 36Kr · 2026-05-10",
    date: "2026-05-10",
    tags: [
      { type: "industry", label: "AI训练" },
      { type: "model", label: "PUE优化模型" },
      { type: "industry", label: "液冷技术" },
      { type: "industry", label: "技术突破" },
    ],
    relatedModel: "PUE能效优化模型",
    actionRequired: false,
  },
  {
    id: "i5", priority: "P1", impact: "high",
    title: "首批数据中心REITs上市，资本化路径正式打通",
    summary: "2025年12月，首批2只数据中心REITs在沪深交易所正式上市，首发募资总额58亿元，上市首日平均涨幅28.6%。估值逻辑：EBITDA收益率5.8-6.5%，资本化率4.2-4.8%。影响资产估值模型中REITs路径可行性评分，以及上市周期假设（现可缩短至10个月）。",
    source: "沪深交易所 / 中国证监会 · 2025-12",
    date: "2025-12-25",
    tags: [
      { type: "industry", label: "REITs" },
      { type: "model", label: "资产估值模型" },
      { type: "case", label: "GDS扭亏" },
      { type: "industry", label: "金融创新" },
    ],
    relatedModel: "IDC资产估值与REITs模型",
    actionRequired: false,
  },
  {
    id: "i6", priority: "P0", impact: "extreme",
    title: "秦淮数据被贝恩31.6亿美元收购，行业整合加速",
    summary: "贝恩资本以31.6亿美元全现金收购秦淮数据并私有化退市。交易EV/EBITDA倍数14.2x，反映IDC资产在AI时代的稀缺性溢价。但字节跳动收入占比>80%的单一客户风险需重新评估。影响商业价值分析中Chindata案例评分（客户风险权重上调），以及对标分析基准。",
    source: "贝恩资本公告 / 路透社 · 2025-11",
    date: "2025-11-18",
    tags: [
      { type: "case", label: "秦淮数据并购" },
      { type: "model", label: "资产估值模型" },
      { type: "risk", label: "客户集中度" },
      { type: "industry", label: "M&A风险" },
    ],
    relatedModel: "IDC资产估值与REITs模型",
    actionRequired: true,
  },
  {
    id: "i7", priority: "P2", impact: "medium",
    title: "2025 UI/UX设计趋势：AI辅助设计成为主流",
    summary: "Figma《2025设计实践报告》：78%的设计师已使用AI工具辅助工作，主要场景为灵感探索（62%）、原型生成（48%）、设计评审（35%）。AI生成设计稿的可用率从2024年的9%提升至2025年的31%。影响设计实践模型中AI设计工作流工具的优先级排序。",
    source: "Figma 《2025 Design Practice Report》· 2025-09",
    date: "2025-09-15",
    tags: [
      { type: "industry", label: "AI设计工具" },
      { type: "model", label: "体验价值模型" },
      { type: "industry", label: "设计趋势" },
    ],
    relatedModel: "AI辅助设计工作流",
    actionRequired: false,
  },
  {
    id: "i8", priority: "P2", impact: "medium",
    title: "Figma 2026配置器更新：变量绑定与代码同步增强",
    summary: "Figma发布2026年重大更新：Variables支持多维度主题切换、Dev Mode新增CSS-in-JS导出、Figma to Code精度提升40%。对设计系统模型中工具矩阵的「设计Token同步器」工具形成直接竞争，需评估是否调整工具推荐优先级。",
    source: "Figma Release Notes · 2026-03",
    date: "2026-03-20",
    tags: [
      { type: "industry", label: "设计系统" },
      { type: "model", label: "设计系统治理" },
      { type: "industry", label: "工具升级" },
    ],
    relatedModel: "设计系统文档与治理平台",
    actionRequired: false,
  },
  {
    id: "i9", priority: "P2", impact: "medium",
    title: "Adobe 2025创意趋势：生成式AI与设计效率",
    summary: "Adobe《2025创意趋势报告》：Firefly生成式AI已嵌入Photoshop/Illustrator/InDesign全流程，设计师使用AI后概念探索时间缩短75%，初稿产出速度提升3倍。但42%的设计师担忧版权问题。影响设计实践模型中AI工具矩阵的版权风险提示权重。",
    source: "Adobe 《2025 Creative Trends》· 2025-10",
    date: "2025-10-08",
    tags: [
      { type: "industry", label: "AI生成" },
      { type: "model", label: "体验价值模型" },
      { type: "risk", label: "版权风险" },
    ],
    relatedModel: "AI辅助设计工作流",
    actionRequired: false,
  },
  {
    id: "i10", priority: "P1", impact: "high",
    title: "万国数据2025全年扭亏为盈，净利润9.59亿元",
    summary: "GDS 2025年全年营收114.32亿元（+10.8% YoY），净利润9.59亿元，首次实现全年盈利。IDC REITs路径打通、一线城市能耗指标稀缺性、AI算力需求爆发是三大驱动力。影响商业价值分析中GDS案例评分，资产价值维度从75分上调至82分。",
    source: "GDS 2025年报 · 2026-03-25",
    date: "2026-03-25",
    tags: [
      { type: "case", label: "GDS扭亏" },
      { type: "model", label: "资产估值模型" },
      { type: "industry", label: "IDC行业" },
    ],
    relatedModel: "IDC资产估值与REITs模型",
    actionRequired: true,
  },
];

const PRIORITY_LABEL: Record<Priority, string> = { P0: "紧急", P1: "重要", P2: "关注" };
const PRIORITY_COLOR: Record<Priority, string> = { P0: "#ef4444", P1: "#f5a623", P2: "#3ecf8e" };

/* ── 子组件 ────────────────────────────────────────────── */

function TagPill({ tag }: { tag: InfoItem["tags"][0] }) {
  const colorMap: Record<string, string> = {
    industry: "#4f8ef7",
    model: "#a78bfa",
    risk: "#ef4444",
    case: "#3ecf8e",
  };
  return (
    <span
      style={{
        fontSize: 10,
        padding: "2px 7px",
        borderRadius: 999,
        background: `${colorMap[tag.type] || "#888"}15`,
        color: colorMap[tag.type] || "#888",
        border: `1px solid ${colorMap[tag.type] || "#888"}30`,
        whiteSpace: "nowrap",
      }}
    >
      {tag.label}
    </span>
  );
}

function InfoCard({ item, onClick }: { item: InfoItem; onClick: () => void }) {
  const pColor = PRIORITY_COLOR[item.priority];
  return (
    <div
      className="card"
      style={{
        padding: "20px",
        cursor: "pointer",
        borderLeft: `3px solid ${pColor}`,
        position: "relative",
        opacity: item.actionRequired ? 1 : 0.85,
      }}
      onClick={onClick}
    >
      {/* Priority badge + date */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
        <span style={{
          fontSize: 10, padding: "2px 8px", borderRadius: 999,
          background: `${pColor}18`, color: pColor, fontWeight: 700, letterSpacing: "0.04em",
        }}>
          {item.priority} {PRIORITY_LABEL[item.priority]}
        </span>
        {item.actionRequired && (
          <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 999, background: "rgba(239,68,68,0.12)", color: "#ef4444", fontWeight: 600 }}>
            需行动
          </span>
        )}
        <span style={{ fontSize: 10, color: "var(--muted-foreground)", marginLeft: "auto" }}>{item.date}</span>
      </div>

      <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--foreground)", marginBottom: 8, lineHeight: 1.4 }}>{item.title}</h3>
      <p style={{ fontSize: 12, color: "var(--muted-foreground)", lineHeight: 1.6, marginBottom: 14, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
        {item.summary}
      </p>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
        {item.tags.map(t => <TagPill key={t.label + t.type} tag={t} />)}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 10, color: "var(--muted-foreground)", opacity: 0.6 }}>来源：{item.source}</span>
        <span style={{ fontSize: 11, color: "#f5a623", fontWeight: 500 }}>查看详情 →</span>
      </div>
    </div>
  );
}

function InfoDetail({ item, open, onClose }: { item: InfoItem | null; open: boolean; onClose: () => void }) {
  if (!item) return null;
  const pColor = PRIORITY_COLOR[item.priority];
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: open ? "auto" : "none" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", opacity: open ? 1 : 0, transition: "opacity 0.3s" }} onClick={onClose} />
      <div style={{ position: "relative", width: "100%", maxWidth: 660, maxHeight: "88vh", overflowY: "auto", background: "#12121a", border: "1px solid var(--border)", borderRadius: 16, padding: "32px 28px", transform: open ? "scale(1)" : "scale(0.95)", opacity: open ? 1 : 0, transition: "all 0.3s", zIndex: 1 }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", color: "var(--muted-foreground)", fontSize: 20, cursor: "pointer" }}>✕</button>

        {/* Priority + date */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 999, background: `${pColor}18`, color: pColor, fontWeight: 700 }}>{item.priority} {PRIORITY_LABEL[item.priority]}</span>
          <span style={{ fontSize: 11, color: "var(--muted-foreground)" }}>{item.date}</span>
          {item.actionRequired && <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 999, background: "rgba(239,68,68,0.15)", color: "#ef4444", fontWeight: 600 }}>需采取行动</span>}
        </div>

        <h3 style={{ fontSize: 22, fontWeight: 600, color: "var(--foreground)", marginBottom: 14, lineHeight: 1.3 }}>{item.title}</h3>
        <p style={{ fontSize: 14, color: "var(--muted-foreground)", lineHeight: 1.8, marginBottom: 20 }}>{item.summary}</p>

        {/* Tags */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 11, color: "var(--muted-foreground)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>关联标签</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {item.tags.map(t => <TagPill key={t.label + t.type} tag={t} />)}
          </div>
        </div>

        {/* Related model */}
        {item.relatedModel && (
          <div className="card" style={{ padding: "12px 16px", borderLeft: "3px solid #a78bfa", marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: "var(--muted-foreground)", marginBottom: 2 }}>关联模型</div>
            <div style={{ fontSize: 13, color: "#a78bfa", fontWeight: 600 }}>{item.relatedModel}</div>
          </div>
        )}

        {/* Source */}
        <div style={{ fontSize: 11, color: "var(--muted-foreground)", opacity: 0.6 }}>来源：{item.source}</div>
      </div>
    </div>
  );
}

/* ── 主组件 ────────────────────────────────────────────── */

export default function FeedSection() {
  const [activePriority, setActivePriority] = useState<Priority | "all">("all");
  const [detailItem, setDetailItem] = useState<InfoItem | null>(null);

  const filtered = activePriority === "all" ? INFO_ITEMS : INFO_ITEMS.filter(i => i.priority === activePriority);

  const priorityCounts = {
    all: INFO_ITEMS.length,
    P0: INFO_ITEMS.filter(i => i.priority === "P0").length,
    P1: INFO_ITEMS.filter(i => i.priority === "P1").length,
    P2: INFO_ITEMS.filter(i => i.priority === "P2").length,
  };

  return (
    <section id="feed" className="section" style={{ minHeight: "100vh", padding: "100px 24px", position: "relative", borderTop: "1px solid var(--border)" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 70% 50%, rgba(245,166,35,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 64, fontWeight: 700, color: "#f5a623", opacity: 0.1, lineHeight: 1, fontVariantNumeric: "tabular-nums", marginBottom: -24, letterSpacing: "-0.04em" }}>05</div>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 500, color: "var(--foreground)", marginBottom: 12, letterSpacing: "-0.01em" }}>
            动态信息
          </h2>
          <p style={{ fontSize: 15, color: "var(--muted-foreground)", lineHeight: 1.7, maxWidth: 600, marginBottom: 28 }}>
            持续抓取与核心模型高度关联的经济、市场、政策、文化等领域讯息，动态分析并推动模型可用性迭代。
          </p>

          {/* Priority filter */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {(["all", "P0", "P1", "P2"] as const).map(p => (
              <button
                key={p}
                onClick={() => setActivePriority(p)}
                style={{
                  padding: "7px 16px", borderRadius: 999,
                  border: activePriority === p ? `1px solid ${p === "all" ? "#f5a623" : PRIORITY_COLOR[p]}` : "1px solid var(--border)",
                  background: activePriority === p ? (p === "all" ? "rgba(245,166,35,0.1)" : `${PRIORITY_COLOR[p]}18`) : "transparent",
                  color: activePriority === p ? (p === "all" ? "#f5a623" : PRIORITY_COLOR[p]) : "var(--muted-foreground)",
                  fontSize: 13, fontWeight: activePriority === p ? 600 : 400,
                  cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap",
                }}
              >
                {p === "all" ? "全部" : `${p} ${PRIORITY_LABEL[p]}`} <span style={{ opacity: 0.5 }}>· {priorityCounts[p]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Info grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 14 }}>
          {filtered.map(item => (
            <InfoCard key={item.id} item={item} onClick={() => setDetailItem(item)} />
          ))}
        </div>

        {/* Footer hint */}
        <div style={{ marginTop: 40, textAlign: "center", fontSize: 12, color: "var(--muted-foreground)", opacity: 0.5 }}>
          动态信息流持续更新中 · 数据来源：工信部 / 信通院 / 公司公告 / 行业研报
        </div>
      </div>

      <InfoDetail item={detailItem} open={!!detailItem} onClose={() => setDetailItem(null)} />
    </section>
  );
}
