"use client";

import { useState, useEffect } from "react";

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
  publishDate: string;
  lastUpdated: string;
  methodology: string;
  scenarios: { name: string; desc: string }[];
  process: { step: number; phase: string; desc: string }[];
  businessDecisions: string;
  /** 产业链位置：上游（设备/芯片/电力）、中游（IDC运营/云厂商）、下游（互联网/金融/制造用户） */
  chainPosition: "upstream" | "midstream" | "downstream";
  /** 区域：国内 / 国际 */
  region: "domestic" | "international";
  /** 关联的 IDC 行业模型 ID（m1-m9） */
  relatedModels: string[];
}

const CASES: CaseStudy[] = [
  /* ═══════════════ 资产价值维度（6 案例）═══════════════ */
  {
    id: "c1", name: "万国数据 GDS", logo: "🏢",
    dimension: "asset", score: 82,
    chainPosition: "midstream", region: "domestic",
    relatedModels: ["m5", "m7", "m1"],
    tagline: "中国第三方IDC龙头，2025年首次全年盈利，IDC REITs 破冰者",
    analysis: "万国数据 2025 年全年营收 114.3 亿元（+10.8%），实现成立以来首次全年净利润 9.59 亿元。2026 年 Q1 净利润 2.65 亿元（+27% YoY），但市场因「增收不增利预期」在财报发布后股价下跌 9.3%。核心矛盾：收入增长受制于能耗指标（一线城市新批机柜趋严），利润增长受制于电力成本上涨与客户议价权（阿里+腾讯收入占比超 50%）。REITs 进程是估值重估的关键催化剂——若 REITs 成功发行，可将重资产出表释放资本金，估值锚点从 PB 切换至 AFFO 倍数。",
    highlights: [
      { label: "2025营收", value: "114.3亿元 (+10.8%)", positive: true },
      { label: "2025净利润", value: "9.59亿元（首盈）", positive: true },
      { label: "2026Q1净利", value: "2.65亿元 (+27%)", positive: true },
      { label: "财报后股价", value: "当日 -9.3%", positive: false },
    ],
    risks: ["阿里+腾讯收入占比 >50%，客户集中度过高", "一线城市能耗指标收紧，扩产受限", "电力市场化改革推高运营成本", "REITs 折现率受利率环境影响"],
    source: "GDS 2025 年报（2026年3月发布）/ 2026Q1 季报；港交所披露文件",
    publishDate: "2026-03-25", lastUpdated: "2026-05-15",
    methodology: "IDC 资产估值框架：DCF（现金流折现）+ NAV（净资产价值 + 机柜价值重估）+ REITs 可比倍数（AFFO Multiple）",
    scenarios: [
      { name: "REITs 发行可行性评估", desc: "评估 REITs 底层资产包质量、租户结构、租金覆盖率与市场利率环境" },
      { name: "机柜资产价值重估", desc: "基于地理位置、客户合约期限、PUE 水平的机柜级估值模型" },
    ],
    process: [
      { step: 1, phase: "财务建模", desc: "采集近 3 年财报数据，构建 DCF 现金流预测模型，关键假设：收入 CAGR 12%、EBITDA 率 48-52%" },
      { step: 2, phase: "机柜级资产估值", desc: "按地理位置（一线/卫星城/边远）与上架率（满载/爬坡/空置）分类估值，参考市场交易可比价格" },
      { step: 3, phase: "REITs 可比分析", desc: "对标 Equinix（AFFO 倍数 24x）、Digital Realty（21x），给予折价系数 0.65-0.80" },
      { step: 4, phase: "敏感性分析", desc: "关键变量：电力涨价 ±15%、客户流失率 ±5%、折现率 ±100bp 对估值的敏感性" },
    ],
    businessDecisions: "核心商业决策：优先推动 REITs 发行以释放资产价值（而非继续举债扩张），同时通过分散客户结构降低集中度风险。REITs 若成功，预计可释放 50-80 亿元资本金用于新项目投资。",
  },
  {
    id: "c2", name: "秦淮数据 Chindata", logo: "🌐",
    dimension: "asset", score: 92,
    chainPosition: "midstream", region: "domestic",
    relatedModels: ["m1", "m9"],
    tagline: "贝恩 31.6 亿美元私有化，中国超大规模定制化 IDC 标杆",
    analysis: "秦淮数据（已更名 Qinhuai Data Group）2023 年被贝恩资本以 31.6 亿美元（全现金）收购并私有化。核心资产：运营容量 799MW（截至 2023 年）、37 个数据中心、主要集中在河北/山西可再生能源富集区。最大客户字节跳动贡献收入超 80%。核心优势在于超大规模定制化交付能力（从签约到交付 6-9 个月）和区位能源成本优势（张家口/大同风电+光伏直供，电价低于一线城市 30-40%）。PUE 达行业最优 1.1x 水平。但客户集中度过高是最大隐忧——字节跳动若自建或切换供应商，将带来系统性风险。",
    highlights: [
      { label: "运营容量", value: "799MW（2023）", positive: true },
      { label: "数据中心", value: "37 个", positive: true },
      { label: "私有化金额", value: "$31.6亿（全现金）", positive: true },
      { label: "字节收入占比", value: ">80%", positive: false },
    ],
    risks: ["单一客户集中度 >80%（字节跳动）", "定制化资产退出流动性差", "可再生能源补贴政策不确定性", "贝恩退出策略（再上市/出售）影响管理稳定性"],
    source: "贝恩资本官方公告（2023年8月）/ 秦淮数据招股书（IPO前）",
    publishDate: "2025-11-18", lastUpdated: "2026-01-15",
    methodology: "超大规模定制化 IDC 估值框架：contractual revenue visibility + LTV/CAC + 客户集中度折价系数",
    scenarios: [
      { name: "超大规模定制化 IDC 估值", desc: "基于长期合约现金流高度可预测性，采用 DCF + 合约价值折现" },
      { name: "私有化退出估值", desc: "贝恩以 6.5x EV/EBITDA 收购，对表海外可比 Equinix 14x、Digital Realty 13x" },
    ],
    process: [
      { step: 1, phase: "合约现金流分析", desc: "基于字节跳动长期合约（10-15年）测算合约期内确定性现金流，识别续约风险节点" },
      { step: 2, phase: "能源成本优势量化", desc: "对比一线城市电价（0.8-1.0 元/kWh）vs 河北可再生能源（0.45-0.55 元/kWh），量化区位溢价" },
      { step: 3, phase: "客户集中度折价建模", desc: "参考行业并购先例，客户占比 >80% 给予 15-25% 估值折价" },
    ],
    businessDecisions: "贝恩私有化的核心逻辑：中国市场 IDC 估值被显著低估（秦淮私有化估值 6.5x EV/EBITDA vs 全球平均 12-14x），通过私有化+运营优化+再上市套利。关键假设：字节跳动需求持续增长 + 可再生能源政策稳定。",
  },
  {
    id: "c3", name: "Equinix", logo: "🌍",
    dimension: "asset", score: 95,
    chainPosition: "midstream", region: "international",
    relatedModels: ["m5", "m7", "m1"],
    tagline: "全球最大 colocation 与互连平台，260+ 数据中心覆盖 33 国，REIT 标杆",
    analysis: "Equinix 是全球数据中心行业的「黄金标准」——市值超 $900 亿，2025 年预计营收约 $90 亿（2024 实际：$81.8 亿，Q1 2025: $22.3 亿）。其核心商业模式是「房地产 + 互连 + 云入口」三位一体：460,000+ 条物理交叉连接构成护城河，客户一旦接入就很难迁移（切换成本极高）。REIT 结构自 2015 年转换以来，AFFO 每股年化增长 12%。对比中国 IDC 公司，Equinix 的估值溢价来自：1）全球分布分散单一区域风险；2）互连收入占比 18%+ 且持续增长；3）租户多元化（前 10 大客户占比 <25%）。固定资产组合中 Tier-1 市场（北美+欧洲）占比 >80%，新兴市场（亚太/拉美）为增长引擎。",
    highlights: [
      { label: "2025年化营收", value: "~$90亿", positive: true },
      { label: "全球DC数", value: "260+（33国）", positive: true },
      { label: "交叉连接数", value: "460,000+", positive: true },
      { label: "AFFO CAGR", value: "12%/年（2015-2025）", positive: true },
    ],
    risks: ["利率上行影响 REIT 估值与融资成本", "云厂商自建DC可能减少 colocation 需求", "亚太市场竞争加剧（GDS/秦淮低价策略）", "汇率波动影响非美收入"],
    source: "Equinix 2024 年报（SEC 10-K）/ 2025 Q1 季报；Nareit REIT 行业报告",
    publishDate: "2026-02-20", lastUpdated: "2026-05-01",
    methodology: "REIT 估值框架：AFFO（调整后经营现金流）× 行业倍数 + 互连业务 DCF 独立估值",
    scenarios: [
      { name: "全球 IDC REITs 比较估值", desc: "Equinix vs Digital Realty vs CyrusOne — AFFO 倍数、股息率、增长率三维对比" },
      { name: "亚太区域投资价值评估", desc: "Equinix 亚太市场份额 <10%，但增速 20%+/年，独立估值" },
    ],
    process: [
      { step: 1, phase: "REIT 财务分析", desc: "AFFO 拆解：机柜租赁收入（75%）+ 互连（18%）+ 其他（7%），分别建模增长率" },
      { step: 2, phase: "互连生态估值", desc: "Metcalfe's Law 应用：互连节点价值 ∝ n²，460k+ 交叉连接的网络效应价值独立评估" },
      { step: 3, phase: "可比交易对标", desc: "并购交易可比：Digital Realty 收购 Interxion ($8.4B, 2019)、KKR 收购 CyrusOne ($15B, 2021)" },
    ],
    businessDecisions: "Equinix 的长期战略：从「出租机柜」转向「出售互连」——互连收入持续增长驱动估值溢价。2024 年以 $1.5B 收购菲律宾/印尼资产扩展东南亚。关键决策：始终保持 REIT 结构以最大化税后现金流分配。",
  },
  {
    id: "c4", name: "Digital Realty", logo: "🏗️",
    dimension: "asset", score: 90,
    chainPosition: "midstream", region: "international",
    relatedModels: ["m3", "m5"],
    tagline: "全球第二大 IDC REIT，PlatformDIGITAL 战略推动互连转型",
    analysis: "Digital Realty 全球运营 300+ 数据中心（25+ 国家），2025 年预计营收约 $57 亿（2024 实际：$54.5 亿）。2019 年以 $84 亿收购欧洲 Interxion 后成为欧洲最大 colocation 提供商。近年战略转型：从纯「批发机房」（Wholesale）向「互连平台」（PlatformDIGITAL）升级——效仿 Equinix 模式，提高互连收入占比以改善利润率与估值倍数。但转型阵痛明显：AFFO 倍数长期低于 Equinix（18-20x vs 24-26x），市场对其互连转型执行力存疑。与 Equinix 的关键区别：Digital Realty 批发业务占比更高（~40% vs Equinix ~15%），这意味着增长更依赖大客户合约而非互连生态。",
    highlights: [
      { label: "2025年化营收", value: "~$57亿", positive: true },
      { label: "全球DC数", value: "300+（25国）", positive: true },
      { label: "AFFO倍数", value: "18-20x（低于EQIX）", positive: false },
      { label: "互连收入占比", value: "~10%（目标15%+）", positive: false },
    ],
    risks: ["批发业务占比高导致利润率低于 Equinix", "欧洲能源危机推高运营成本", "互连转型执行风险", "利率环境对高杠杆 REIT 的压力"],
    source: "Digital Realty 2024 年报 / 2025 Q1 季报；Nareit 行业数据",
    publishDate: "2026-03-10", lastUpdated: "2026-05-05",
    methodology: "Wholesale → Interconnection 转型估值：批发业务用 DCF，互连业务用可比倍数 + 网络效应溢价",
    scenarios: [
      { name: "互连转型估值提升路径", desc: "若互连收入占比从 10%→18%，AFFO 倍数可从 18x→22x，估值提升 20%+" },
      { name: "批发大客户流失风险压力测试", desc: "模拟 Top-3 客户不续约对 AFFO 的影响（-8% ~ -15%）" },
    ],
    process: [
      { step: 1, phase: "业务线拆分建模", desc: "批发（Wholesale）vs colocation vs 互连三个业务线独立建模增长率和利润率" },
      { step: 2, phase: "互连价值量化", desc: "计算每个机柜的互连收入密度（$/cabinet/month），对比 Equinix 水平找差距" },
      { step: 3, phase: "可比 REIT 估值矩阵", desc: "Equinix (24x)、Digital Realty (19x)、CyrusOne (私有化前 18x) — 分析估值差异驱动因素" },
    ],
    businessDecisions: "Digital Realty 的核心挑战：批发→互连转型需要大量 Capex 投入（建设互连节点），但 REIT 结构要求高分红率，资本配置存在矛盾。关键决策：2019 年收购 Interxion 补齐欧洲互连版图，但整合效果尚未完全释放。",
  },
  {
    id: "c5", name: "世纪互联 VNET", logo: "🔗",
    dimension: "asset", score: 78,
    chainPosition: "midstream", region: "domestic",
    relatedModels: ["m1", "m5"],
    tagline: "中国老牌 IDC 运营商，批发+零售双模式，REITs 探路者",
    analysis: "世纪互联成立于 1996 年，是中国最早的第三方 IDC 运营商之一，2024 年营收约 74 亿元（+6.8%），自建+运营机柜超 80,000 个，NASDAQ 上市（代码 VNET）。核心业务分两线：批发型（大型互联网企业定制化DC）和零售型（中小企业 colocation）。2023-2024 年战略转向 AI 数据中心——新增机柜中 >60% 面向 GPU 高密度需求。但挑战明显：毛利率从 2022 年的 22.7% 降至 2024 年的 18.5%，主要受电力成本上涨和一线城市能耗指标竞价推高土地成本影响。REITs 探索进程落后于 GDS，主要因资产包质量（老旧机房占比高、零售客户分散）不及 GDS。",
    highlights: [
      { label: "2024营收", value: "~74亿元 (+6.8%)", positive: true },
      { label: "自营机柜", value: "80,000+", positive: true },
      { label: "毛利率趋势", value: "22.7%→18.5%", positive: false },
      { label: "AI 机柜占比", value: ">60% 新增", positive: true },
    ],
    risks: ["毛利率持续下行（电力成本+激烈竞争）", "REITs 资产包质量不及头部", "零售客户流失率高（~15%/年）", "AI 高密度需求是否持续存疑"],
    source: "世纪互联 2024 年报（SEC 20-F）/ 2025 Q1 季报",
    publishDate: "2026-04-10", lastUpdated: "2026-05-20",
    methodology: "零售+批发混合型 IDC 估值：批发用 DCF（合约现金流），零售用 EV/机柜 × 上架率调整",
    scenarios: [
      { name: "AI驱动增长评估", desc: "AI 数据中心需求爆发（2023-2025 CAGR >50%）对世纪互联收入结构的重塑" },
      { name: "零售业务估值", desc: "零售 colocation 的高利润率但高流失率——LTV/CAC 框架评估" },
    ],
    process: [
      { step: 1, phase: "业务线拆分", desc: "批发型（合约期 >3年，EBITDA 率 45%+）vs 零售型（合约期 1年，EBITDA 率 55%+）" },
      { step: 2, phase: "AI机柜溢价分析", desc: "GPU 机柜电力密度（10-40kW/柜）vs 传统（4-6kW/柜），单柜收入 3-5x 但电力成本也翻倍" },
      { step: 3, phase: "REITs 可行性评估", desc: "机柜年限分布（>10年占比 35%）、租户质量、合约到期结构对 REITs 资产包质量的影响" },
    ],
    businessDecisions: "世纪互联面临经典「转型困境」：传统业务现金牛增速放缓（6-8%），AI 数据中心是增长引擎但需巨额 Capex。关键决策：是否优先拆分优质资产 REITs 上市以回收资本（类似 GDS 策略），但需承受资产剥离对剩余业务的影响。",
  },
  {
    id: "c6", name: "数据港", logo: "📡",
    dimension: "asset", score: 85,
    chainPosition: "midstream", region: "domestic",
    relatedModels: ["m1", "m3"],
    tagline: "阿里云定制化 IDC 核心伙伴，上海上市超大规模运营商",
    analysis: "数据港（603881.SH）成立于 2009 年，以上海为总部，是国内领先的定制化超大规模 IDC 运营商。2024 年营收约 15.6 亿元（+6.2%），运营机柜约 70,000 个。核心模式：为阿里云提供「定制化建设 + 长期运维」一站式服务，阿里贡献收入占比约 90%。优势在于交付能力（从签约到交付 6-12 个月）、区位布局（长三角+京津冀+粤港澳）、运维体系成熟（获得 Uptime M&O 认证）。业务高度绑定阿里云既是优势（合约稳定 10-15 年）也是风险（客户集中度极高）。2024 年起探索非阿里客户拓展（某新能源车企、某头部电商），但进度缓慢。",
    highlights: [
      { label: "2024营收", value: "~15.6亿元", positive: true },
      { label: "运营机柜", value: "~70,000个", positive: true },
      { label: "阿里收入占比", value: "~90%", positive: false },
      { label: "Uptime认证", value: "M&O + Tier III", positive: true },
    ],
    risks: ["阿里收入占比 >90%，单客户风险极高", "定制化 DC 退出/转让难度大", "非阿里客户拓展进度慢", "上海总部区位受能耗指标限制"],
    source: "数据港 2024 年报（上交所）/ 2025 年公告",
    publishDate: "2026-04-20", lastUpdated: "2026-05-10",
    methodology: "定制化 IDC 估值：合约期内 DCF + 终值（基于替换/续约概率）+ 客户集中度折价",
    scenarios: [
      { name: "阿里云需求增长模型", desc: "阿里云营收 CAGR 15-20% 对数据港的机柜需求传导——弹性系数 0.6-0.8" },
      { name: "客户多元化价值释放", desc: "若非阿里客户占比从 10%→25%，估值折价系数可从 0.7→0.85，估值提升 ~20%" },
    ],
    process: [
      { step: 1, phase: "合约现金流分析", desc: "阿里 10-15 年合约的确定性现金流 DCF，假设续约概率 80%（超高粘性）" },
      { step: 2, phase: "定制化资产评估", desc: "定制化 DC 的市场替代价值——若阿里退出，资产可按数据中心通用标准重新出租的比例" },
      { step: 3, phase: "客户集中度压力测试", desc: "模拟阿里云增速放缓至 10% 或自建 DC 比例上升对数据港未来订单的影响" },
    ],
    businessDecisions: "数据港的战略矛盾：深度绑定阿里云获得稳定现金流（合约期内几乎无风险），但资本市场给予极高的客户集中度折价（PE 倍数仅 15-18x vs 行业 25-30x）。关键决策：是否应付出更高获客成本加速多元化以解除估值折价。",
  },

  /* ═══════════════ 运营效率维度（5 案例）═══════════════ */
  {
    id: "c7", name: "华为数字能源", logo: "⚡",
    dimension: "ops", score: 91,
    chainPosition: "upstream", region: "domestic",
    relatedModels: ["m2", "m8"],
    tagline: "数据中心供电与温控全栈方案，AI 高密度时代的能源底座",
    analysis: "华为数字能源是华为旗下聚焦数字能源基础设施的子公司，2024 年营收约 500 亿元（未独立上市，集团口径）。数据中心业务涵盖 UPS 不间断电源、智能温控（间接蒸发冷却、液冷）、智能配电（SmartLi UPS）、预制模块化数据中心（FusionDC）。在 AI 高密度算力时代，华为的 FusionDC 方案支持单柜 40kW+ 供电（传统方案仅 6-8kW），配合间接蒸发冷却将 PUE 控制在 1.15 以下。其智能锂电 UPS（SmartLi）将传统铅酸电池寿命从 3-5 年延长至 10-15 年，全生命周期成本降 30%。华为数字能源在全球数据中心电源市场份额约 25%（2024），与 Vertiv、施耐德构成三足鼎立。",
    highlights: [
      { label: "年营收", value: "~500亿元", positive: true },
      { label: "全球市场份额", value: "~25%", positive: true },
      { label: "单柜供电密度", value: "40kW+", positive: true },
      { label: "PUE 目标", value: "<1.15（FusionDC）", positive: true },
    ],
    risks: ["美国制裁限制芯片/元器件进口", "海外市场拓展受限（地缘政治）", "液冷方案标准尚未统一", "国内竞争加剧（Vertiv/施耐德本地化）"],
    source: "华为年报 2024 / 华为数字能源全球发布会 / IDC MarketScape 数据中心电源报告",
    publishDate: "2026-01-15", lastUpdated: "2026-05-01",
    methodology: "设备制造商价值评估：全球市场份额 × TAM（可寻址市场）× 技术溢价率 + 服务收入（重复收入占比）",
    scenarios: [
      { name: "AI 高密度供电 TAM 测算", desc: "AI 训练集群单柜功耗 40-100kW，2025-2030 全球 AI DC 供电设备 TAM CAGR 35%+" },
      { name: "液冷 vs 风冷转型评估", desc: "液冷方案渗透率从 2024 年 15%→2030 年 50%+，对华为收入结构的影响" },
    ],
    process: [
      { step: 1, phase: "市场规模测算", desc: "全球数据中心基础设施设备市场 2025 年约 $300 亿（供电+温控+配电），CAGR 12-15%" },
      { step: 2, phase: "竞争格局分析", desc: "华为 vs Vertiv vs 施耐德：产品线完整度、区域布局、技术路线差异" },
      { step: 3, phase: "技术溢价量化", desc: "SmartLi UPS 全生命周期成本对比铅酸电池：初装成本 +20% 但 10 年 TCO -30%" },
    ],
    businessDecisions: "华为数字能源的核心战略：以 FusionDC 预制模块化方案为锚，绑定客户的全生命周期服务（设计→交付→运维），将设备销售从一次性交易转变为长期服务合同。关键决策：自研液冷方案（而非收购），确保技术自主可控。",
  },
  {
    id: "c8", name: "Vertiv 维谛技术", logo: "🔋",
    dimension: "ops", score: 88,
    chainPosition: "upstream", region: "international",
    relatedModels: ["m2"],
    tagline: "全球关键基础设施龙头，AI 数据中心建设最大受益设备商",
    analysis: "Vertiv（NYSE: VRT）是全球领先的关键数字基础设施与持续解决方案供应商，2024 年营收约 $78 亿（+11%），市值突破 $400 亿。产品矩阵：UPS 不间断电源（市占率 #1）、热管理（精密空调+液冷，市占率 #2）、配电与开关设备、DCIM 监控软件、IT 机架与模块化数据中心。AI 数据中心建设是其最强增长催化剂——2024 年数据中心相关订单同比增长 60%+，订单积压（Backlog）超 $70 亿。Vertiv 的全球分布工厂（北美/欧洲/中国/印度）使其在地缘政治环境下具备「中国+1」供应链优势。对比华为（受限制裁），Vertiv 在欧美市场近乎「无竞争对手」状态。",
    highlights: [
      { label: "2024营收", value: "~$78亿 (+11%)", positive: true },
      { label: "订单积压", value: ">$70亿", positive: true },
      { label: "DC订单增速", value: "+60% YoY", positive: true },
      { label: "市值", value: ">$400亿", positive: true },
    ],
    risks: ["AI 建设周期见顶后订单下滑风险", "华为在亚太市场低价竞争", "供应链集中度（部分芯片依赖单一供应商）", "数据中心能效标准趋严推高合规成本"],
    source: "Vertiv 2024 年报（SEC 10-K）/ 2025 Q1 季报；Wall Street 分析师报告",
    publishDate: "2026-02-28", lastUpdated: "2026-05-10",
    methodology: "设备制造商估值：EV/EBITDA × 行业倍数 + 订单积压溢价 + AI 增长期权价值",
    scenarios: [
      { name: "AI 超周期下的订单可持续性", desc: "台积电/英伟达指引显示 AI Capex 至少持续至 2027-2028，Vertiv 受益期 3-5 年" },
      { name: "液冷技术路线押注", desc: "Vertiv 液冷方案（CDU + 冷板）vs 浸没式冷却——两种技术路线的市场渗透路径" },
    ],
    process: [
      { step: 1, phase: "订单积压分析", desc: "$70 亿+订单积压中 DC 相关占比 >70%，按交付周期 12-18 个月折算未来 1.5 年确定性收入" },
      { step: 2, phase: "利润池拆解", desc: "硬件（UPS/温控/配电，毛利率 35-40%）vs 服务（DCIM/运维，毛利率 55%+），服务占比增速决定长期利润率" },
      { step: 3, phase: "区域市场对标", desc: "北美（利润率最高，40%+）vs 亚太（华为竞争压低至 30%）vs 欧洲（30-35%）" },
    ],
    businessDecisions: "Vertiv 的关键战略：在 AI Capex 超级周期窗口内最大化市场份额（牺牲短期利润率换份额），待周期后半段通过服务收入（高利润重复收入）提升整体利润率。2024 年收购 CoolTera 强化液冷方案能力。",
  },
  {
    id: "c9", name: "腾讯 T-Block 液冷改造", logo: "❄️",
    dimension: "ops", score: 90,
    chainPosition: "midstream", region: "domestic",
    relatedModels: ["m2"],
    tagline: "PUE 从 1.45 降至 1.15，云厂商自建 DC 能效革命的中国标杆",
    analysis: "腾讯天津数据中心 T-Block 模块化方案是中国云厂商自建 DC 能效优化的标杆案例。改造前 PUE 1.45（行业中等水平），通过引入间接蒸发冷却+冷板液冷混合方案，将 PUE 压降至 1.15（业界领先，接近 Google 的 1.10）。关键技术路径：1）间接蒸发冷却替代传统冷冻水系统，全年自然冷却时间从 3 个月延长至 8-10 个月（天津气候条件）；2）高密度 GPU 集群采用冷板液冷，PUE 可压至 1.10 以内；3）T-Block 模块化架构实现「工厂预制+现场拼装」，建设周期从 18 个月缩短至 6 个月。按年耗电 2 亿 kWh 计算，PUE 从 1.45→1.15 年省电约 5,200 万 kWh（折合约 4,000 万元/年），投资回收期约 3 年。",
    highlights: [
      { label: "PUE 优化幅度", value: "1.45→1.15", positive: true },
      { label: "自然冷却时长", value: "3月→8-10月", positive: true },
      { label: "年省电费", value: "~4000万元/DC", positive: true },
      { label: "建设周期", value: "18月→6月", positive: true },
    ],
    risks: ["液冷方案运维复杂度高于风冷", "间接蒸发冷却受气候限制（南方适用性差）", "液冷泄漏风险导致硬件损坏", "技术迭代导致前期投资过快贬值"],
    source: "腾讯云官方技术博客 / ODCC 开放数据中心委员会白皮书 / 腾讯 2024 ESG 报告",
    publishDate: "2025-12-01", lastUpdated: "2026-03-15",
    methodology: "PUE 优化 ROI 模型：ΔPUE × 年用电量 × 电价 − 改造 Capex 摊销 = 年化 ROI（含碳收益/绿证收益）",
    scenarios: [
      { name: "全量推广规模效益", desc: "若腾讯全国 50+ DC 全部完成液冷改造，年省电费约 20 亿元" },
      { name: "碳交易收益附加", desc: "PUE 优化带来的碳减排可在碳交易市场出售，附加收益约占电费节省的 8-12%" },
    ],
    process: [
      { step: 1, phase: "能效基线采集", desc: "采集改造前 12 个月 PUE/PLF 数据，分季节/分负载建立基准线" },
      { step: 2, phase: "技术方案比选", desc: "间接蒸发冷却 vs 冷板液冷 vs 浸没式液冷 — CAPEX/OPEX/PUE 三维对比矩阵" },
      { step: 3, phase: "Capex/Opex 财务建模", desc: "改造投入（液冷 CDU + 管路改造 + 软件平台）÷ 年化电费节省 = 投资回收期" },
      { step: 4, phase: "分期实施与监控", desc: "先改造 2-3 个高负载 DC 验证效果，达标后滚动推广至全部机房" },
    ],
    businessDecisions: "腾讯的核心决策：将 PUE 优化从「运营成本削减」升级为「ESG 战略资产」——绿色数据中心可获取一线城市能耗指标审批优势、吸引 ESG 投资者、降低碳税风险。关键取舍：液冷改造需额外 Capex 投入（单机柜 +2-3 万元），但在 AI 高密度趋势下这是「不改造就被淘汰」的强制升级。",
  },
  {
    id: "c10", name: "施耐德电气", logo: "🏭",
    dimension: "ops", score: 87,
    chainPosition: "upstream", region: "international",
    relatedModels: ["m2"],
    tagline: "全球电气与数据中心配电巨头，EcoStruxure 智能平台引领零碳 DC",
    analysis: "施耐德电气（EPA: SU）是全球能效管理与自动化专家，2024 年营收约 €360 亿，数据中心业务是增长最快的板块（增速 15%+）。核心产品：中低压配电设备（市占率 #1 全球）、UPS（APC 品牌，市占率 #3）、数据中心基础设施管理 DCIM（EcoStruxure IT）、微电网与储能方案。与 Vertiv/华为的区别：施耐德强项在「配电全链路」而非单点设备——从电网接入到机柜末端 PDUs 的一体化方案，配合 EcoStruxure 软件平台实现全链路能效可视化。2024 年以 $8.5 亿收购液冷公司 Motivair，补齐全栈式液冷方案（从 CDU 到冷板到管路），正面挑战 Vertiv/华为在高密度供冷市场的地位。",
    highlights: [
      { label: "2024集团营收", value: "~€360亿", positive: true },
      { label: "DC业务增速", value: "+15%+", positive: true },
      { label: "收购Motivair", value: "$8.5亿（液冷）", positive: true },
      { label: "全球DC配电份额", value: "#1", positive: true },
    ],
    risks: ["集团体量庞大，DC 业务占比 <10% 导致战略聚焦不足", "软件平台（EcoStruxure）盈利能力待验证", "亚太市场华为竞争加剧", "欧洲能源转型政策影响中压配电需求结构"],
    source: "施耐德电气 2024 年报 / 2025 资本市场日 / 施耐德数据中心白皮书",
    publishDate: "2026-03-01", lastUpdated: "2026-05-15",
    methodology: "电气设备制造商估值：分业务线 EV/EBITDA（配电/ UPS/软件）加权平均 + 并购增长溢价",
    scenarios: [
      { name: "DC 配电 TAM 增长", desc: "AI DC 单机柜功耗从 6kW→40kW+，中压配电与 UPS 设备需求 5-8x 增长" },
      { name: "EcoStruxure 软件平台估值", desc: "软件/SaaS 估值（8-12x Revenue）vs 硬件（12-15x EBITDA），若软件占比提升将显著拉升集团估值" },
    ],
    process: [
      { step: 1, phase: "业务线拆分", desc: "数据中心业务 ≈€35 亿（占比 ~10%），但增速 15%+，是集团增长最快板块" },
      { step: 2, phase: "配电全链路价值分析", desc: "从电网接入（中压开关）→ 变压器 → 低压配电 → UPS → 机柜 PDU，全链路方案比单点设备溢价 20-30%" },
      { step: 3, phase: "收购整合评估", desc: "Motivair 液冷技术与施耐德配电/EcoStruxure 的协同效应——能否形成「供电+供冷+软件」一站式方案" },
    ],
    businessDecisions: "施耐德的数据中心战略：从「卖设备」升级为「卖方案+服务」——EcoStruxure 订阅收入 + 全生命周期运维服务才是长期利润引擎。关键决策：收购 Motivair 而非自研液冷，以时间换空间（比自研快 2-3 年）。",
  },
  {
    id: "c11", name: "阿里云张北数据中心", logo: "☁️",
    dimension: "ops", score: 89,
    chainPosition: "midstream", region: "domestic",
    relatedModels: ["m3", "m2"],
    tagline: "百万服务器集群，容量利用率从 61% 提升至 91% 的超大规模运营典范",
    analysis: "阿里云张北数据中心群是中国最大的单体云数据中心集群之一，规划容量超 30 万台服务器。通过智能容量规划与调度系统（天基/盘古），将服务器分配效率从 61% 提升至 91%，相当于在不新建 DC 的情况下释放了相当于 5 万台服务器的额外容量（节省 Capex 约 50-80 亿元）。关键手段：1）弹性调度：基于业务负载预测（618/双11 等峰值）动态分配计算/存储资源；2）混部技术：在线服务（低负载时段）与离线批处理任务共用同一物理机，CPU 利用率从 25%→55%；3）差异化 SLA：将业务按优先级分为 L0（核心交易）到 L3（测试开发），低优先级任务接受抢占式调度，释放的资源供给高优业务。PUE 优化方面，张北利用自然风冷（年均气温 2.6°C）将 PUE 控制在 1.15 以下。",
    highlights: [
      { label: "容量利用率", value: "61%→91%", positive: true },
      { label: "等效释放容量", value: "~5万台服务器", positive: true },
      { label: "CPU利用率", value: "25%→55%（混部）", positive: true },
      { label: "节省Capex", value: "~50-80亿元", positive: true },
    ],
    risks: ["混部技术增加调度复杂度与故障域", "弹性调度依赖准确的业务预测（预测偏差后果严重）", "自然风冷依赖气候（南方DC不适用）", "阿里云增速放缓可能降低利用率"],
    source: "阿里云技术博客 / 阿里巴巴 2024 年报 / ODCC 数据中心峰会公开演讲",
    publishDate: "2025-11-20", lastUpdated: "2026-04-15",
    methodology: "容量效率模型：资源利用率 × 等效成本节省 − 调度系统投入 = 净运营效率提升值",
    scenarios: [
      { name: "混部技术推广", desc: "若阿里云全球 DC 全部采用混部+弹性调度，利用率每提升 1pct ≈ 释放 3,000+ 台服务器" },
      { name: "AI 负载对调度的挑战", desc: "GPU 训练任务（持续数小时至数天）与在线服务混部的难度远高于 CPU 任务" },
    ],
    process: [
      { step: 1, phase: "资源利用率基线采集", desc: "全集群 CPU/内存/网络/存储利用率 7×24 监测，识别闲置资源池与波峰波谷模式" },
      { step: 2, phase: "业务分级与 SLA 设计", desc: "将业务按重要性和延迟敏感度分 L0-L3 四级，设计差异化调度策略与抢占规则" },
      { step: 3, phase: "弹性调度系统上线", desc: "天基调度系统实时监控负载，预测未来 1h/24h 资源需求，提前预热/回收资源" },
      { step: 4, phase: "持续优化", desc: "A/B 测试调度策略，监控 SLA 违规率（目标 <0.1%），逐步调高混部比例" },
    ],
    businessDecisions: "阿里云的容量规划哲学：与其「精确预测需求→提前建设」（预测总有误差），不如「适度超前建设 + 弹性调度最大化利用」。这本质上是在「冗余浪费」和「缺货损失」之间寻求最优平衡点。关键决策：天基/盘古调度系统是阿里云最核心的运营技术壁垒（非开源），其价值无法通过 Capex 简单衡量。",
  },

  /* ═══════════════ 体验价值维度（4 案例）═══════════════ */
  {
    id: "c12", name: "字节跳动", logo: "🎵",
    dimension: "exp", score: 88,
    chainPosition: "downstream", region: "domestic",
    relatedModels: ["m1", "m6"],
    tagline: "全球最大 IDC 租户之一，AI 时代数据中心需求的定义者",
    analysis: "字节跳动旗下拥有抖音/TikTok（日活 20 亿+）、今日头条、飞书等产品，是全球最大的 IDC 租户之一。据估算，字节跳动在中国境内运营的服务器规模超 100 万台（含自建和租赁），年 IDC 相关支出超 200 亿元。2023-2024 年 AI 大模型军备竞赛推动其 GPU 集群需求爆发——豆包大模型的训练集群需求推动张家口数据中心群产能扩张（从 200MW→600MW+）。字节跳动是秦淮数据最大客户（收入占比 >80%），同时也在扩展自有 DC 建设（火山引擎云），以降低对第三方 IDC 的依赖和成本。其 IDC 需求结构正在从「CPU 密集型（推荐/广告）」向「GPU 密集型（训练/推理）」快速转型。",
    highlights: [
      { label: "服务器规模", value: ">100万台（估）", positive: true },
      { label: "年IDC支出", value: ">200亿元（估）", positive: true },
      { label: "张家口产能扩张", value: "200MW→600MW+", positive: true },
      { label: "单一供应商依赖", value: "秦淮占比 >80%", positive: false },
    ],
    risks: ["AI 算力需求若放缓将导致大量 GPU 资产减值", "美国制裁可能限制高端 GPU 获取", "自建 DC 增加 Capex 负担", "数据合规（TikTok 海外DC）的地缘风险"],
    source: "公开媒体报道（The Information/36氪/晚点LatePost）/ 字节跳动火山引擎公开信息",
    publishDate: "2026-04-01", lastUpdated: "2026-05-20",
    methodology: "下游大租户价值模型：IDC 支出占营收比 × 自建比例趋势 × 供应商多样化成本收益分析",
    scenarios: [
      { name: "GPU 需求预测", desc: "豆包大模型 DAU 增长路径 → 推理 GPU 需求预估（CAGR 80%+ 至 2027）" },
      { name: "自建 vs 租赁决策", desc: "自建 TCO（$0.06/kWh 河北电 + $5M/MW 建设成本）vs 租赁 ($120/kW/月)，盈亏平衡点在 60-70% 利用率" },
    ],
    process: [
      { step: 1, phase: "算力需求建模", desc: "基于 DAU/推荐模型复杂度/内容量三维驱动，预测 2025-2028 算力需求 CAGR" },
      { step: 2, phase: "供应商集中度评估", desc: "秦淮（>80%）+ GDS（10%）+ 自建（<10%），评估单一供应商断供风险与替代方案" },
      { step: 3, phase: "自建经济性分析", desc: "自建 DC 5 年 TCO vs 租赁 5 年 TCO，考虑利用率、融资成本、技术折旧" },
    ],
    businessDecisions: "字节跳动的 IDC 战略：从「全部租赁」向「租建并举」转型，核心逻辑是降低对第三方 DC（尤其是秦淮）的依赖和议价劣势。火山引擎云的推出使自建 DC 有了外部变现出口（将闲置容量出售给外部客户）。关键风险：GPU 芯片供应受限（A100/H100 禁售）可能压缩算力增长空间。",
  },
  {
    id: "c13", name: "AWS（Amazon Web Services）", logo: "🟠",
    dimension: "exp", score: 97,
    chainPosition: "midstream", region: "international",
    relatedModels: ["m3", "m6"],
    tagline: "全球最大云服务商，年营收 $110B+，自研芯片+定制 DC 构建全栈壁垒",
    analysis: "AWS 2024 年营收 $107B（+19%），运营利润 $38B（利润率 35%+），是全球最赚钱的科技基础设施公司。AWS 在全球 33 个地理区域运营 105+ 可用区，基础设施 Capex 2024 年超 $70B（含 AI 相关）。AWS 的数据中心策略是「自建+租赁」混合：核心区域（北美/欧洲）以自建大园区为主（每园区 200MW+），新兴市场以租赁 colocation 快速覆盖。AWS 自研芯片（Graviton CPU + Trainium/Inferentia AI 芯片）使其在算力成本端对 NVIDIA 形成议价权——Graviton4 性价比比 x86 高 40%。Nitro 虚拟化平台 + 定制硬件使其单机柜效率高于行业 30-40%。对比国内云厂商，AWS 的利润率和规模优势源于更长的先发积累和全球需求池平滑效应。",
    highlights: [
      { label: "2024营收", value: "$107B (+19%)", positive: true },
      { label: "运营利润", value: "$38B (35%+利润率)", positive: true },
      { label: "2024基础设施Capex", value: ">$70B", positive: true },
      { label: "自研芯片性价比", value: "比x86高40%", positive: true },
    ],
    risks: ["AI 军备竞赛导致 Capex 占比过高侵蚀利润率", "全球多区域运营面临地缘监管风险", "Google Cloud / Azure 在 AI 领域激烈竞争", "客户多云策略可能削弱 AWS 定价权"],
    source: "Amazon 2024 年报（SEC 10-K）/ AWS re:Invent 2024 / Synergy Research 云市场报告",
    publishDate: "2026-02-10", lastUpdated: "2026-05-01",
    methodology: "云厂商价值评估：IaaS/PaaS 收入 × EV/Revenue 倍数 + 自研技术溢价 + 全球基础设施网络价值",
    scenarios: [
      { name: "AI 对 AWS 的影响", desc: "Amazon Bedrock + SageMaker + 自研芯片 — AI 能否成为 AWS 第二增长曲线" },
      { name: "基础设施利润率趋势", desc: "Capex/营收比从 2023 年 19%→2024 年 22%→2025 预计 24%，资本密度上升挤压利润率" },
    ],
    process: [
      { step: 1, phase: "业务线拆分", desc: "IaaS（EC2/S3）→ PaaS（Lambda/RDS）→ SaaS（Bedrock/Connect）三层利润率分析" },
      { step: 2, phase: "基础设施效率对标", desc: "AWS 单机柜营收产出（$/rack/yr）vs Google Cloud vs Azure，差距分析" },
      { step: 3, phase: "自研芯片 ROI", desc: "Graviton/Trainium 芯片研发投入 vs 从 Intel/NVIDIA 采购成本节省的 10 年现值分析" },
    ],
    businessDecisions: "AWS 的核心护城河不是数据中心规模，而是「定制化全栈」——从芯片（Graviton/Trainium）到虚拟化（Nitro）到调度（EC2）的垂直整合。这使得竞争对手无法简单通过「建更多 DC」来追赶。关键决策：2024 年加大自研 AI 芯片投入（Trainium2），降低对 NVIDIA 的依赖。",
  },
  {
    id: "c14", name: "快手科技", logo: "📹",
    dimension: "exp", score: 76,
    chainPosition: "downstream", region: "domestic",
    relatedModels: ["m6"],
    tagline: "短视频+AI 驱动的内容平台，IDC 成本优化是其盈利关键",
    analysis: "快手（1024.HK）2024 年营收约 1,270 亿元（+12%），经调整净利润 170 亿元。作为短视频+直播+电商的内容平台，快手的 IDC 与带宽成本（含服务器、带宽、CDN）占营收比约 10-12%（年化 130-150 亿元），是继人力成本后的第二大支出项。核心挑战：视频转码与 AI 推荐系统的算力需求持续增长（DAU 4 亿+），带宽成本因视频码率提升而逐年上升。快手的优化策略：1）自建转码芯片（SL200 视频处理芯片）替代通用 GPU 以降低转码成本；2）自建+租赁混合 IDC 策略，核心区域自建以降低单 bit 成本；3）CDN 多云调度，在自建 CDN + 第三方 CDN + P2P 传输之间动态切换，带宽成本三年降 25%+。",
    highlights: [
      { label: "2024营收", value: "1270亿元 (+12%)", positive: true },
      { label: "IDC+带宽成本占比", value: "~10-12%营收", positive: false },
      { label: "自研转码芯片", value: "SL200（降本）", positive: true },
      { label: "带宽成本降幅", value: "三年 -25%+", positive: true },
    ],
    risks: ["视频码率持续提升（4K/8K/HDR）推高带宽成本", "用户增长放缓导致基础设施利用率下降", "自研芯片成功与否不确定", "P2P CDN 的合规与用户体验风险"],
    source: "快手 2024 年报 / 快手技术博客 / 公开行业分析报告",
    publishDate: "2026-04-15", lastUpdated: "2026-05-20",
    methodology: "内容平台 IDC 成本模型：DAU × 人均观看时长 × bitrate × CDN单价 + 推荐系统 GPU 消耗",
    scenarios: [
      { name: "视频码率提升的成本影响", desc: "若 4K 渗透率从 5%→20%，带宽成本增加 35-50%，需通过自研芯片/高效编码补偿" },
      { name: "自研芯片 ROI", desc: "SL200 研发投入 vs 通用 GPU 采购成本节省，投资回收期约 2-3 年" },
    ],
    process: [
      { step: 1, phase: "成本结构拆解", desc: "IDC（机柜租赁/电费）30% + 带宽（CDN/专线）50% + 硬件（服务器/GPU）20%" },
      { step: 2, phase: "转码效率优化", desc: "自研 SL200 芯片 vs NVENC GPU 转码 — 单 bit 成本、转码速度、画质三维对比" },
      { step: 3, phase: "CDN 调度优化", desc: "自建 CDN（P95 带宽计费）vs 第三方 CDN（按流量）vs P2P（免费）的成本-质量平衡" },
    ],
    businessDecisions: "快手的核心策略：用技术投入（自研芯片/调度算法）降低基础设施对第三方供应商的依赖和成本。本质上是「用软件吃掉硬件成本」（类似 AWS 的 Nitro 思路，但规模较小）。关键决策：自研芯片是高投入高风险的长周期项目，需维持 3-5 年持续投入才能见效。",
  },
  {
    id: "c15", name: "Netflix", logo: "🎬",
    dimension: "exp", score: 85,
    chainPosition: "downstream", region: "international",
    relatedModels: ["m6"],
    tagline: "全面迁移至 AWS + 自建 Open Connect CDN，云原生基础设施的教科书案例",
    analysis: "Netflix 是全球最大的流媒体平台（订阅用户 2.8 亿+），2016 年完成了历时 7 年的全面 AWS 云迁移——是全球体量最大的单一 AWS 客户之一。Netflix 的基础设施哲学是「云负责计算，CDN 负责分发」：所有业务系统（推荐算法、用户管理、编码转码）跑在 AWS 上（年 AWS 支出估计 $1-1.5B），而视频内容分发通过自建的 Open Connect CDN（17,000+ 缓存节点部署在全球 ISP 机房内）完成，将 95%+ 的流量从云端卸载到边缘。这一架构使 Netflix 在带宽成本上实现了极致优化（Open Connect Appliance 免费部署给 ISP，换取零带宽费用）。此外，Netflix 是「混沌工程」的发明者——通过主动注入故障（Simian Army 工具套件）验证系统韧性，确保全球服务可用性 99.99%。",
    highlights: [
      { label: "订阅用户", value: "2.8亿+", positive: true },
      { label: "AWS年支出", value: "~$1-1.5B（估）", positive: true },
      { label: "Open Connect节点", value: "17,000+", positive: true },
      { label: "流量卸载比", value: "CDN承载95%+", positive: true },
    ],
    risks: ["AWS 单一依赖（切换成本极高）", "Open Connect 依赖 ISP 合作（合作稳定性存疑）", "视频码率升级（4K/8K/HDR）推高编码与缓存成本", "广告模式引入增加系统复杂度"],
    source: "Netflix Tech Blog / AWS re:Invent Netflix 技术分享 / Netflix 2024 年报",
    publishDate: "2026-05-01", lastUpdated: "2026-05-25",
    methodology: "流媒体基础设施 TCO 模型：云服务成本 + CDN 部署成本 + 编码/转码成本 + 混沌工程韧性溢价",
    scenarios: [
      { name: "全栈 AWS 的锁定效应评估", desc: "若从 AWS 迁移至多云架构，预估成本 $500M+ 和 3-5 年工期" },
      { name: "Open Connect 经济性量化", desc: "自建 CDN vs 全量使用第三方 CDN（Akamai/CloudFront）的成本差异 — 年节省 $500M+" },
    ],
    process: [
      { step: 1, phase: "云成本分析", desc: "AWS 支出按服务线拆分（EC2/网络/存储/AI）→ 识别成本优化空间（预留实例/Spot 实例）" },
      { step: 2, phase: "CDN 效率评估", desc: "Open Connect 的流量卸载比（95%+）vs 回源率（<5%）— 带宽成本节省量化" },
      { step: 3, phase: "韧性投资 ROI", desc: "混沌工程（Chaos Monkey/Chaos Kong）投入 vs 故障停机损失的期望值对比" },
    ],
    businessDecisions: "Netflix 基础设施战略的最大启示：「不是所有负载都适合云」。计算密集型（推荐算法/AI）用云，流量密集型（视频分发）用自建边缘——这种「混合智能」比「全云」或「全自建」都更经济。关键决策：Open Connect 的「免费部署给 ISP」看似增加了 Capex，但换来了零带宽费用的长期成本结构。",
  },

  /* ═══════════════ 生态杠杆维度（5 案例）═══════════════ */
  {
    id: "c16", name: "NVIDIA CUDA 生态", logo: "🟢",
    dimension: "eco", score: 98,
    chainPosition: "upstream", region: "international",
    relatedModels: ["m8"],
    tagline: "全球 AI 算力标准的定义者，CUDA 生态锁定效应堪比 Windows+Intel",
    analysis: "NVIDIA（NASDAQ: NVDA）2025 财年数据中心业务营收 $115B（+112% YoY），市值一度突破 $3T，成为全球最有价值的半导体公司。CUDA（Compute Unified Device Architecture）生态是 NVIDIA 最深的护城河——自 2006 年发布以来，累计投入 $30B+ 研发，构建了包含 400 万+ 开发者、3,000+ GPU 加速库、150+ SDK/框架的软件生态。在 AI 时代，「CUDA 锁定效应」成为数据中心关键商业变量：AI 模型开发者在 CUDA 上训练模型后，几乎不可能迁移至其他平台（AMD ROCm / Intel oneAPI），因为迁移成本（代码重写+性能优化+验证）远超硬件价格差异。NVIDIA 数据中心营收的 40%+ 来自大型云厂商（AWS/Azure/GCP），这些云厂商一方面大量采购 NVIDIA GPU，一方面也在自研 AI 芯片（Trainium/TPU），形成「竞争性依存」关系。",
    highlights: [
      { label: "DC业务营收", value: "$115B (FY2025)", positive: true },
      { label: "CUDA开发者", value: "400万+", positive: true },
      { label: "GPU加速库", value: "3,000+", positive: true },
      { label: "累计CUDA研发", value: ">$30B（估）", positive: true },
    ],
    risks: ["反垄断审查（全球多国监管关注）", "云厂商自研 AI 芯片加速替代", "AMD MI300X 挑战性能差距收窄", "AI 算力需求若放缓将导致估值回归"],
    source: "NVIDIA FY2025 年报 / GTC 2025 大会 / Mercury Research GPU 市场报告",
    publishDate: "2026-03-15", lastUpdated: "2026-05-25",
    methodology: "平台生态估值：开发者网络价值（Metcalfe's Law 修正）+ 软件收入（CUDA Enterprise）+ 硬件销售 − 竞争替代风险折价",
    scenarios: [
      { name: "CUDA 锁定效应量化", desc: "AI 模型迁移出 CUDA 的成本（代码重写 6-18 月 + 性能调优）vs 硬件价格差异的盈亏平衡分析" },
      { name: "云厂商自研芯片威胁评估", desc: "Google TPUv5 vs Trainium2 vs NVIDIA H200 — 性能/生态/成本的竞争力对比" },
    ],
    process: [
      { step: 1, phase: "生态规模度量", desc: "开发者数量、库数量、GitHub Star、学术论文引用等指标构建 AI 生态规模指数" },
      { step: 2, phase: "锁定效应量化", desc: "企业级 AI 工作负载从 CUDA→ROCm 的迁移 TCO 模型（代码量、性能差距、人力成本、时间成本）" },
      { step: 3, phase: "竞品替代分析", desc: "AMD MI300X/Intel Gaudi 3/云自研芯片在训练端和推理端的性能/成本对标" },
    ],
    businessDecisions: "NVIDIA 的商业策略是教科书级的平台生态案例：通过免费 CUDA 培育开发者（类似 Windows 兼容所有软件），硬件销售是生态的「收割」环节。关键决策：NVIDIA 持续每年投入 $6-8B 研发升级 CUDA 生态，绝不减少软件投入——软件壁垒的厚度决定了硬件溢价的持续期。",
  },
  {
    id: "c17", name: "Equinix Fabric（互连生态）", logo: "🕸️",
    dimension: "eco", score: 93,
    chainPosition: "midstream", region: "international",
    relatedModels: ["m7"],
    tagline: "全球最大数据中心互连平台，460,000+ 交叉连接的「网络效应飞轮」",
    analysis: "Equinix Fabric（原 Equinix Cloud Exchange Fabric）是全球最大的数据中心互连平台，连接分布在 50+ 都市圈的 Equinix IBX 数据中心。其核心价值是「软件定义互连」（SDI）——客户可通过一个门户网站在数分钟内建立与云服务商（AWS/Azure/GCP/OCI）、网络服务商、SaaS 平台、合作伙伴的私有虚拟连接，无需物理布线。460,000+ 条物理交叉连接 + 虚拟连接构成强大的网络效应：每新增一个客户/服务商，连接价值对所有现有参与者都增加（Meetcalfe 效应）。互连业务收入 2024 年约 $20 亿（占 Equinix 总营收 ~22%），增速 10-12%，利润率 65%+。互连生态的高利润率和高粘性（客户一旦接入很少断开）是 Equinix 估值倍数（AFFO 24x+）远超纯房地产 REITs（15-18x）的核心原因。",
    highlights: [
      { label: "互连收入", value: "~$20亿 (22%营收)", positive: true },
      { label: "物理交叉连接", value: "460,000+", positive: true },
      { label: "互连利润率", value: "65%+", positive: true },
      { label: "估值溢价", value: "vs纯REIT +40%", positive: true },
    ],
    risks: ["云厂商多云直连（AWS Direct Connect / Azure ExpressRoute）替代威胁", "SD-WAN 等虚拟化方案削弱物理互连价值", "城市级光纤互连的前期投入高", "反垄断关注（互连平台的市场支配地位）"],
    source: "Equinix 2024 年报 / Platform Equinix 白皮书 / Gartner 数据中心互连市场报告",
    publishDate: "2026-02-15", lastUpdated: "2026-05-01",
    methodology: "网络效应平台估值：交叉连接价值 ∝ n² × ARPU/连接 + 软件订阅收入（Fabric门户）",
    scenarios: [
      { name: "互连密度与数据中心估值", desc: "每机柜的交叉连接数（Cross-connect/rack）是数据中心估值溢价的关键指标——Equinix 10+ vs 行业平均 2-3" },
      { name: "云直连 vs Equinix Fabric", desc: "AWS Direct Connect 等云直连的性价比对比——Equinix Fabric 一站式多云接入的价值主张" },
    ],
    process: [
      { step: 1, phase: "网络效应建模", desc: "基于节点数量 n，互连价值 V ∝ n²，验证 Equinix 互连收入与节点数的幂律关系" },
      { step: 2, phase: "互连 ARPU 分析", desc: "物理交叉连接（月费 $300-500/port）vs 虚拟连接（月费 $100-200/VC），增长驱动力分析" },
      { step: 3, phase: "竞品替代分析", desc: "AWS Direct Connect 的覆盖范围（100+ 城市）vs Equinix Fabric（50+ 都市圈），客户选择逻辑" },
    ],
    businessDecisions: "Equinix 的商业飞轮：物理交叉连接 → 网络密度提升 → 吸引更多客户/服务商入驻 → 更多连接 → 网络价值指数增长。关键决策：持续投入 Capex 扩展互连节点（而非仅增加机柜），将数据中心从「房地产」变为「网络平台」。",
  },
  {
    id: "c18", name: "Ant Design 设计系统", logo: "🧩",
    dimension: "eco", score: 94,
    chainPosition: "downstream", region: "domestic",
    relatedModels: ["m8"],
    tagline: "全球最受欢迎的企业级设计系统，92k+ GitHub Stars 驱动开发效率革命",
    analysis: "Ant Design 是蚂蚁集团开源的企业级 UI 设计语言与 React 组件库，GitHub Stars 92,000+（全球前 20 开源项目），NPM 周下载量超 100 万次。生态价值体现在三个层面：1）对蚂蚁集团内部——覆盖 100+ 产品线，组件复用率从 <30%→85%+，新业务接入周期 3 个月→2 周；2）对中国开发者生态——成为企业级前端开发的事实标准，降低了全行业的设计开发协作成本；3）设计 Token 驱动的「设计开发一体化」工作流——Design Token 变更自动同步至 Figma 与代码仓库，形成「规范即代码」的协作范式。2024 年 Ant Design 5.0 发布，引入 CSS-in-JS（cssinjs）主题方案 + 响应式组件 + 无障碍增强。生态杠杆价值体现在：一个设计系统的优化可以同时提升数百个产品的体验和效率。",
    highlights: [
      { label: "GitHub Stars", value: "92,000+", positive: true },
      { label: "NPM周下载", value: "100万+", positive: true },
      { label: "内部产品覆盖", value: "100+产品线", positive: true },
      { label: "组件复用率", value: "<30%→85%+", positive: true },
    ],
    risks: ["生态碎片化（社区 fork 导致标准分裂）", "设计系统治理成本随规模线性增长", "版本升级「破窗效应」（一次不跟后续更难跟上）", "AI 生成式 UI 可能挑战组件库的存在价值"],
    source: "Ant Design 官网 / GitHub 仓库 / SeeConf 蚂蚁体验科技大会公开发言",
    publishDate: "2025-10-01", lastUpdated: "2026-04-10",
    methodology: "设计系统 ROI 框架：开发效率提升 × 人力成本 − 设计系统建设维护成本 = 净生态杠杆收益",
    scenarios: [
      { name: "设计系统 ROI 量化", desc: "假设 100 个团队 × 10 个前端开发 × 年人力成本 40 万元 × 效率提升 50% = 年化收益 2 亿元" },
      { name: "开源生态的正外部性", desc: "社区贡献者提交的 Bug 修复与功能增强对蚂蚁自身的价值——相当于额外 ~50 个免费开发者" },
    ],
    process: [
      { step: 1, phase: "开发效率基线采集", desc: "组件重复开发次数、设计稿→代码还原时间、新增页面平均工时" },
      { step: 2, phase: "设计 Token 同步效率", desc: "Token 变更从 Figma→代码的自动化同步延迟 vs 手动同步耗时" },
      { step: 3, phase: "生态贡献度量", desc: "外部 PR 数量、Issue 关闭率、社区插件/工具数量——社区活跃度指标" },
    ],
    businessDecisions: "蚂蚁集团的决策智慧：将内部设计系统开源所带来的「社区免费测试+贡献」远超「被竞品复制」的损失。开源不是成本中心，而是「众包 QA + 人才招聘磁铁 + 行业标准影响力」的杠杆工具。关键决策：维持 GitHub 的开放治理模式（而非封闭内部使用），确保生态的持续活力。",
  },
  {
    id: "c19", name: "阿里云无影 & 飞天 OS", logo: "💻",
    dimension: "eco", score: 86,
    chainPosition: "midstream", region: "domestic",
    relatedModels: ["m8"],
    tagline: "飞天操作系统 + 无影云电脑，国产化全栈云生态的底座",
    analysis: "阿里云飞天（Apsara）是阿里云自研的分布式计算操作系统，管理全球数百万台服务器，支撑双11、12306 等极端并发场景。无影（Wuying）是阿里云推出的云电脑/云应用平台，将桌面计算能力从本地迁移至云端（类似 AWS WorkSpaces + AppStream 的合体）。飞天的生态价值：「软件定义数据中心」——单集群可调度 10,000+ 台物理机，将物理资源利用率从传统 20-30% 提升至 50%+。无影的生态价值：将企业 IT 从「管理硬件」升级为「管理云资源」，典型客户可降低 IT 运维成本 40-60%。飞天的技术架构已在 2023 年通过中国电子技术标准化研究院认证，成为国产化「一云多芯」（x86+ARM+GPU 混合调度）的标杆。",
    highlights: [
      { label: "飞天集群规模", value: "10,000+台/集群", positive: true },
      { label: "资源利用率", value: "20-30%→50%+", positive: true },
      { label: "运维成本降幅", value: "40-60%（无影客户）", positive: true },
      { label: "国产化认证", value: "一云多芯", positive: true },
    ],
    risks: ["国产化OS生态碎片化（飞腾/鲲鹏/昇腾/海光多路线兼容成本高）", "无影云电脑市场教育成本高", "飞天vs华为欧拉/麒麟OS的竞争", "国际制裁限制高端硬件获取"],
    source: "阿里云官方文档 / 中国电子技术标准化研究院认证公告 / 阿里云峰会公开信息",
    publishDate: "2026-03-01", lastUpdated: "2026-05-15",
    methodology: "云平台生态估值：用户基础 × ARPU + 生态伙伴（ISV/SI）贡献收入 × 平台分成率",
    scenarios: [
      { name: "国产化替代 TAM 测算", desc: "中国政企 IT 国产化替代市场 2025-2030 CAGR 20%+，飞天/无影的目标市场份额 30-40%" },
      { name: "云电脑 vs 传统 PC", desc: "无影 5 年 TCO（¥2500/年）vs 传统 PC 5 年 TCO（¥4000/年+IT 运维人工），降本幅度分析" },
    ],
    process: [
      { step: 1, phase: "平台用户基础分析", desc: "飞天调度服务器规模、无影云电脑付费用户数、合作伙伴ISV数量" },
      { step: 2, phase: "生态收入拆解", desc: "IaaS（CPU/GPU租赁）、PaaS（中间件/数据库）、SaaS（无影/钉钉）三层收入结构与利润率" },
      { step: 3, phase: "国产化政策红利评估", desc: "央国企国产化替换时间表（2025-2027 关键窗口期）对飞天/无影的订单拉动测算" },
    ],
    businessDecisions: "阿里云的核心生态策略：「飞天下沉」——将飞天能力输出给行业 ISV 和系统集成商，通过生态伙伴覆盖政企市场。无影是「端侧」的入口产品，目标是将阿里云生态从「服务开发者」延伸至「服务最终用户」。关键决策：开源部分飞天组件（如 Dragonfly 镜像分发）吸引社区生态，降低客户锁定顾虑。",
  },
  {
    id: "c20", name: "Uptime Institute（行业标准）", logo: "📜",
    dimension: "eco", score: 88,
    chainPosition: "upstream", region: "international",
    relatedModels: ["m4"],
    tagline: "数据中心 Tier 认证标准的制定者，全球 IDC 行业的「信用评级机构」",
    analysis: "Uptime Institute 是全球数据中心行业最权威的认证与标准制定机构，创立于 1993 年。其 Tier 分类体系（Tier I-IV）是行业选址、设计、建设和运营的事实标准——获得 Tier III/Tier IV 认证的数据中心在招租时可获得 15-25% 的租金溢价。截至 2025 年，全球已有 2,500+ 数据中心获得 Uptime Tier 认证（含设计/建造/运营三种认证）。除认证外，Uptime 每年发布的《全球数据中心调查》是行业最权威的趋势报告之一（样本量 1,000+ 运营商）。对 IDC 投资者而言，Uptime 评级是评估资产质量的「信用分数」——Tier III+ 认证数据中心的估值溢价显著。其在 IDC 生态系统中的角色类似于金融市场的穆迪/标普。",
    highlights: [
      { label: "全球认证DC数", value: "2,500+", positive: true },
      { label: "Tier认证溢价", value: "租金+15-25%", positive: true },
      { label: "年度调查报告", value: "1,000+运营商", positive: true },
      { label: "成立时间", value: "1993年（30年+）", positive: true },
    ],
    risks: ["行业是否需要 Tier V（超 Tier IV 标准）存在争议", "中国等国家在推动本土认证标准（ODCC/国标）", "新兴冷却技术（液冷/浸没）缺乏成熟认证标准", "认证成本高（单个DC $100k+）限制中小运营商参与"],
    source: "Uptime Institute 官方网站 / 2025 全球数据中心调查 / Tier Standard: Topology 白皮书",
    publishDate: "2026-04-01", lastUpdated: "2026-05-20",
    methodology: "标准制定机构的生态价值：行业覆盖率 × 认证溢价 × 标准更新频率 × 公信力指数",
    scenarios: [
      { name: "Tier 认证的投资价值", desc: "Tier III vs Tier IV 认证的CAPEX增量 vs 租金溢价（+15-25%）→ ROI 分析" },
      { name: "中国认证标准对 Uptime 的挑战", desc: "ODCC/GB 50174 国标的推广可能侵蚀 Uptime 在中国市场的份额" },
    ],
    process: [
      { step: 1, phase: "认证市场分析", desc: "全球 Tier 认证 DC 的分布（北美 40% / 欧洲 25% / 亚太 20% / 其他 15%）" },
      { step: 2, phase: "认证溢价量化", desc: "Tier III vs 无认证 DC 的租金对比（控制位置、规模、年限变量后）——溢价 15-25%" },
      { step: 3, phase: "竞品标准比较", desc: "Uptime Tier vs TIA-942 vs BICSI 002 vs GB 50174 — 认证标准差异与互认程度" },
    ],
    businessDecisions: "Uptime Institute 的商业价值在于「信任中介」——通过独立第三方认证降低了 IDC 租赁市场的信息不对称，使有认证的优质资产获得合理溢价，推动行业向高质量方向发展。关键决策：是否在中国市场推动与 ODCC/国标的互认体系（扩大影响力 vs 稀释标准权威性）。",
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
  const chainLabel = item.chainPosition === "upstream" ? "上游" : item.chainPosition === "midstream" ? "中游" : "下游";
  const chainColor = item.chainPosition === "upstream" ? "#f5a623" : item.chainPosition === "midstream" ? "#4f8ef7" : "#3ecf8e";
  return (
    <div className="card" style={{ padding: "20px", cursor: "pointer" }} onClick={onClick}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 12 }}>
        <div style={{ fontSize: 32, lineHeight: 1 }}>{item.logo}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2, flexWrap: "wrap" }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--foreground)", margin: 0 }}>{item.name}</h3>
            <span style={{ fontSize: 9, padding: "1px 5px", borderRadius: 999, background: `${dimColor}18`, color: dimColor, fontWeight: 600 }}>{item.score}/100</span>
            <span style={{ fontSize: 9, padding: "1px 5px", borderRadius: 999, background: `${chainColor}12`, color: chainColor }}>{chainLabel}</span>
            <span style={{ fontSize: 9, padding: "1px 5px", borderRadius: 999, border: "1px solid var(--border)", color: "var(--muted-foreground)" }}>{item.region === "domestic" ? "🇨🇳" : "🌐"}</span>
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

      {/* Related models mini */}
      {item.relatedModels.length > 0 && (
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 10 }}>
          {item.relatedModels.map(m => (
            <span key={m} style={{ fontSize: 9, padding: "1px 5px", borderRadius: 999, background: "rgba(79,142,247,0.08)", color: "#4f8ef7", border: "1px solid rgba(79,142,247,0.2)" }}>{m}</span>
          ))}
        </div>
      )}

      {/* Date row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 10, color: "var(--muted-foreground)", opacity: 0.5 }}>📅 {item.publishDate}</span>
        <span style={{ fontSize: 11, color: dimColor, fontWeight: 500 }}>查看完整分析 →</span>
      </div>
    </div>
  );
}

/* ── 商业案例详情页（独立全屏页面） ────────────────────── */
function BusinessDetailPage({ item, onBack }: { item: CaseStudy; onBack: () => void }) {
  const dimColor = DIMENSIONS.find(d => d.id === item.dimension)?.color || "#888";
  const chainLabels: Record<string, { label: string; color: string }> = {
    upstream: { label: "上游 · 设备/芯片/能源", color: "#f5a623" },
    midstream: { label: "中游 · IDC运营/云服务", color: "#4f8ef7" },
    downstream: { label: "下游 · 互联网/金融/制造", color: "#3ecf8e" },
  };
  const regionLabels: Record<string, string> = {
    domestic: "🇨🇳 国内", international: "🌐 国际",
  };
  return (
    <div style={{ minHeight: "100vh", background: "#0c0c0f", padding: "80px 24px 60px", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 40% 60%, rgba(62,207,142,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 960, margin: "0 auto", position: "relative" }}>
        {/* Back button + breadcrumb */}
        <div style={{ marginBottom: 32, display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={onBack} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 14px", color: "var(--foreground)", cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
            ← 返回
          </button>
          <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>商业价值分析 / {item.name}</span>
        </div>
        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>{item.logo}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
            <h3 style={{ fontSize: 22, fontWeight: 600, color: "var(--foreground)", margin: 0 }}>{item.name}</h3>
            <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 999, background: `${dimColor}18`, color: dimColor, fontWeight: 700 }}>价值评分 {item.score}/100</span>
          </div>
          <div style={{ fontSize: 13, color: dimColor, marginBottom: 4, fontWeight: 500 }}>{item.tagline}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
            <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 999, background: `${chainLabels[item.chainPosition].color}18`, color: chainLabels[item.chainPosition].color, fontWeight: 600 }}>{chainLabels[item.chainPosition].label}</span>
            <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 999, border: "1px solid var(--border)", color: "var(--muted-foreground)" }}>{regionLabels[item.region]}</span>
            <span style={{ fontSize: 10, color: "var(--muted-foreground)", opacity: 0.5 }}>📅 {item.publishDate}</span>
            <span style={{ fontSize: 10, color: "var(--muted-foreground)", opacity: 0.5 }}>🔄 {item.lastUpdated}</span>
          </div>
          <p style={{ fontSize: 14, color: "var(--muted-foreground)", lineHeight: 1.8, marginBottom: 20 }}>{item.analysis}</p>
        </div>
        {/* Highlights */}
        <div className="card" style={{ padding: "18px 20px", borderLeft: `3px solid ${dimColor}`, marginBottom: 24 }}>
          <div style={{ fontSize: 11, color: "var(--muted-foreground)", marginBottom: 8 }}>📊 关键指标</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
            {item.highlights.map(h => (
              <div key={h.label} style={{ fontSize: 12, color: h.positive ? "#3ecf8e" : "#f5a623", fontWeight: 600 }}>{h.label}: {h.value}</div>
            ))}
          </div>
        </div>
        {/* Methodology */}
        <div className="card" style={{ padding: "20px", marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", marginBottom: 10 }}>📚 方法论</div>
          <p style={{ fontSize: 13, color: "var(--muted-foreground)", lineHeight: 1.8 }}>{item.methodology}</p>
        </div>
        {/* Scenarios */}
        <div className="card" style={{ padding: "20px", marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", marginBottom: 14 }}>🎯 分析场景</div>
          {item.scenarios.map((s, i) => (
            <div key={i} className="card" style={{ padding: "12px 14px", marginBottom: 8, borderLeft: `3px solid ${dimColor}` }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", marginBottom: 4 }}>{s.name}</div>
              <div style={{ fontSize: 12, color: "var(--muted-foreground)", lineHeight: 1.6 }}>{s.desc}</div>
            </div>
          ))}
        </div>
        {/* Process */}
        <div className="card" style={{ padding: "20px", marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", marginBottom: 14 }}>⚙️ 分析流程</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {item.process.map(p => (
              <div key={p.step} style={{ display: "flex", gap: 12 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: `${dimColor}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: dimColor, flexShrink: 0 }}>{p.step}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", marginBottom: 2 }}>{p.phase}</div>
                  <div style={{ fontSize: 12, color: "var(--muted-foreground)", lineHeight: 1.6 }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Business Decisions */}
        <div className="card" style={{ padding: "20px", marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", marginBottom: 10 }}>💡 关键商业决策</div>
          <p style={{ fontSize: 13, color: "var(--muted-foreground)", lineHeight: 1.8 }}>{item.businessDecisions}</p>
        </div>
        {/* Related IDC Models */}
        {item.relatedModels.length > 0 && (
          <div className="card" style={{ padding: "20px", marginBottom: 24, border: "1px solid rgba(79,142,247,0.25)", background: "rgba(79,142,247,0.03)" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", marginBottom: 4 }}>🔗 关联 IDC 行业模型</div>
            <div style={{ fontSize: 11, color: "var(--muted-foreground)", marginBottom: 12 }}>本案例涉及以下 IDC 行业模型（点击可跳转至对应模型详情）</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {item.relatedModels.map(mid => (
                <span key={mid} style={{ fontSize: 11, padding: "5px 12px", borderRadius: 999, border: "1px solid rgba(79,142,247,0.3)", color: "#4f8ef7", background: "rgba(79,142,247,0.08)", fontWeight: 500 }}>
                  {mid === "m1" ? "m1 选址规划" :
                   mid === "m2" ? "m2 PUE 优化" :
                   mid === "m3" ? "m3 容量规划" :
                   mid === "m4" ? "m4 安全合规" :
                   mid === "m5" ? "m5 REITs 估值" :
                   mid === "m6" ? "m6 多云成本" :
                   mid === "m7" ? "m7 SLA 管理" :
                   mid === "m8" ? "m8 Agent 矩阵" :
                   mid === "m9" ? "m9 知识图谱" : mid}
                </span>
              ))}
            </div>
          </div>
        )}
        {/* Risks */}
        <div className="card" style={{ padding: "20px", marginBottom: 32 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", marginBottom: 10 }}>⚠️ 风险提示</div>
          {item.risks.map(r => (
            <div key={r} style={{ fontSize: 12, color: "var(--muted-foreground)", lineHeight: 1.8 }}>• {r}</div>
          ))}
        </div>
        {/* Back button again */}
        <div style={{ textAlign: "center", paddingTop: 20 }}>
          <button onClick={onBack} style={{ background: `${dimColor}18`, border: `1px solid ${dimColor}30`, borderRadius: 8, padding: "10px 24px", color: dimColor, cursor: "pointer", fontSize: 14, fontWeight: 500 }}>
            ← 返回案例列表
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── 主组件 ────────────────────────────────────────────── */

export default function BusinessSection({ standalone }: { standalone?: boolean }) {
  const [activeDim, setActiveDim] = useState(DIMENSIONS[0]);
  const [chainFilter, setChainFilter] = useState<"all" | "upstream" | "midstream" | "downstream">("all");
  const [regionFilter, setRegionFilter] = useState<"all" | "domestic" | "international">("all");
  const [view, setView] = useState<"grid" | "detail">("grid");
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  const filteredCases = CASES.filter(c => {
    if (c.dimension !== activeDim.id) return false;
    if (chainFilter !== "all" && c.chainPosition !== chainFilter) return false;
    if (regionFilter !== "all" && c.region !== regionFilter) return false;
    return true;
  });

  /* view === "detail" → 独立详情页 */
  if (view === "detail" && selectedCase) {
    return <BusinessDetailPage item={selectedCase} onBack={() => { setView("grid"); setSelectedCase(null); }} />;
  }

  /* view === "grid" → 网格列表 */
  return (
    <section id={standalone ? undefined : "business"} className="section" style={{ minHeight: "100vh", padding: "100px 24px", position: "relative", borderTop: standalone ? "none" : "1px solid var(--border)" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 40% 60%, rgba(62,207,142,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 64, fontWeight: 700, color: "#3ecf8e", opacity: 0.1, lineHeight: 1, fontVariantNumeric: "tabular-nums", marginBottom: -24, letterSpacing: "-0.04em" }}>04</div>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 500, color: "var(--foreground)", marginBottom: 12, letterSpacing: "-0.01em" }}>
            商业价值分析
          </h2>
          <p style={{ fontSize: 15, color: "var(--muted-foreground)", lineHeight: 1.7, maxWidth: 680, marginBottom: 28 }}>
            覆盖 IDC 行业全产业链（上游设备·中游运营·下游应用），结合 20 家国内外标杆企业的真实商业数据与前置 IDC 模型、设计实践案例交叉验证，提供可量化的商业评估与决策参考。
          </p>
        </div>

        {/* Value Chain Overview */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 14, marginBottom: 32 }}>
          {[
            {
              title: "上游 · 设备/芯片/能源",
              color: "#f5a623",
              desc: "NVIDIA GPU、华为数字能源、Vertiv 配电、施耐德电气 — 为 IDC 产业链提供算力芯片与基础设施设备",
              count: CASES.filter(c => c.chainPosition === "upstream").length,
              highlights: ["NVIDIA 数据中心营收 $115B", "华为数字能源市占 ~25%", "Vertiv 订单积压 $70B+"],
            },
            {
              title: "中游 · IDC 运营/云服务",
              color: "#4f8ef7",
              desc: "Equinix、GDS、秦淮数据、AWS、阿里云 — 数据中心运营与云计算服务提供商构成产业链核心环节",
              count: CASES.filter(c => c.chainPosition === "midstream").length,
              highlights: ["Equinix AFFO CAGR 12%/年", "阿里云容量利用率 91%", "GDS 首盈 9.59 亿"],
            },
            {
              title: "下游 · 互联网/金融/制造",
              color: "#3ecf8e",
              desc: "字节跳动、快手、Netflix — 海量算力与数据存储的消费者，IDC 行业的最终价值锚点",
              count: CASES.filter(c => c.chainPosition === "downstream").length,
              highlights: ["字节服务器 >100 万台", "快手 IDC 成本 >130 亿/年", "Netflix CDN 17k+ 节点"],
            },
          ].map(chain => (
            <div key={chain.title} className="card" style={{ padding: "20px", borderLeft: `3px solid ${chain.color}` }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--foreground)" }}>{chain.title}</div>
                <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 999, background: `${chain.color}18`, color: chain.color, fontWeight: 600 }}>{chain.count} 家企业</span>
              </div>
              <p style={{ fontSize: 12, color: "var(--muted-foreground)", lineHeight: 1.6, marginBottom: 12 }}>{chain.desc}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {chain.highlights.map(h => (
                  <div key={h} style={{ fontSize: 11, color: chain.color }}>• {h}</div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Dimension selector */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginBottom: 32 }}>
          {DIMENSIONS.map(dim => (
            <DimensionCard key={dim.id} dim={dim} active={activeDim.id === dim.id} onClick={() => setActiveDim(dim)} />
          ))}
        </div>

        {/* Dimension detail */}
        <DimensionDetail dim={activeDim} />

        {/* Chain + Region filters */}
        <div style={{ marginTop: 40, marginBottom: 20, display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: "var(--foreground)" }}>相关商业案例</div>
          <div style={{ display: "flex", gap: 6 }}>
            {(["all", "upstream", "midstream", "downstream"] as const).map(c => (
              <button key={c} onClick={() => setChainFilter(c)}
                style={{
                  padding: "5px 12px", borderRadius: 999, fontSize: 11, cursor: "pointer",
                  border: chainFilter === c ? "1px solid #4f8ef7" : "1px solid var(--border)",
                  background: chainFilter === c ? "rgba(79,142,247,0.1)" : "transparent",
                  color: chainFilter === c ? "#4f8ef7" : "var(--muted-foreground)",
                  fontWeight: chainFilter === c ? 600 : 400,
                  transition: "all 0.2s",
                }}
              >{c === "all" ? "全部链条" : c === "upstream" ? "上游" : c === "midstream" ? "中游" : "下游"}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {(["all", "domestic", "international"] as const).map(r => (
              <button key={r} onClick={() => setRegionFilter(r)}
                style={{
                  padding: "5px 12px", borderRadius: 999, fontSize: 11, cursor: "pointer",
                  border: regionFilter === r ? "1px solid #a78bfa" : "1px solid var(--border)",
                  background: regionFilter === r ? "rgba(167,139,250,0.1)" : "transparent",
                  color: regionFilter === r ? "#a78bfa" : "var(--muted-foreground)",
                  fontWeight: regionFilter === r ? 600 : 400,
                  transition: "all 0.2s",
                }}
              >{r === "all" ? "全部区域" : r === "domestic" ? "🇨🇳 国内" : "🌐 国际"}</button>
            ))}
          </div>
        </div>

        {/* Case studies for this dimension (filtered) */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 14 }}>
          {filteredCases.length > 0 ? filteredCases.map(c => (
            <CaseCard key={c.id} item={c} onClick={() => { setView("detail"); setSelectedCase(c); }} />
          )) : (
            <div style={{ color: "var(--muted-foreground)", fontSize: 13, gridColumn: "1/-1", padding: 24, textAlign: "center" }}>
              暂无符合筛选条件的「{activeDim.label}」维度案例，请调整筛选条件
            </div>
          )}
        </div>

        {/* All cases overview */}
        <div style={{ marginTop: 48 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: "var(--foreground)", marginBottom: 16 }}>全部案例概览（20 家企业 · 4 个维度）</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
            {CASES.map(c => (
              <CaseCard key={c.id} item={c} onClick={() => { setView("detail"); setSelectedCase(c); }} />
            ))}
          </div>
        </div>

        {/* Stats row — updated for 20 cases */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 40 }}>
          {[
            { v: "20", l: "标杆企业", c: "#a78bfa" },
            { v: "上中下游", l: "全产业链覆盖", c: "#3ecf8e" },
            { v: "国内+国际", l: "全球视角", c: "#4f8ef7" },
            { v: "m1-m9 + d1-d6", l: "模型交叉验证", c: "#f5a623" },
          ].map(s => (
            <div key={s.l} className="card" style={{ padding: "18px 14px", textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: s.c, lineHeight: 1, marginBottom: 6 }}>{s.v}</div>
              <div style={{ fontSize: 11, color: "var(--muted-foreground)" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
