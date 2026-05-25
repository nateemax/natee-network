"use client";

import { useState, useRef, useEffect } from "react";
import VersionTimeline, { VersionEntry } from "../VersionTimeline";

/* ── 数据：IDC 行业模型 ────────────────────────────────────────────── */
const CATEGORIES = [
  { id: "infra", label: "基础设施管理", pct: 70, color: "#4f8ef7" },
  { id: "it",    label: "IT 业务运营",   pct: 20, color: "#a78bfa" },
  { id: "agent", label: "Agent 智能加持", pct: 10, color: "#3ecf8e" },
];

interface CaseStudyInstance {
  company: string;           // 企业/项目名
  industry: string;          // 行业/背景
  challenge: string;         // 业务挑战
  solution: string;          // 模型应用方案
  result: string[];          // 量化成果（数组，每条一个数据点）
  source: string;            // 数据来源说明
}

interface ModelCard {
  id: string;
  cat: string;
  title: string;
  tags: string[];
  summary: string;
  metrics: { label: string; value: string; trend: "up" | "down" | "flat" }[];
  agentTools: string[];
  publishDate: string;
  lastUpdated: string;
  versions: VersionEntry[];
  algorithms: string;
  scenarios: { name: string; desc: string }[];
  evaluationMethods: { name: string; desc: string }[];
  technicalDetails: string;
  caseStudy: CaseStudyInstance;
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
    publishDate: "2025-09",
    lastUpdated: "2026-04-15",
    versions: [
      { version: "v2.1", date: "2026-04-15", title: "增加 REITs 合规路径检查器", description: "集成首批2只数据中心REITs上市数据，新增资本化率4.2-4.8%锚定参数。政策补贴系数上线长三角/粤港澳城市群覆盖。", tags: ["REITs路径", "政策更新"] },
      { version: "v2.0", date: "2025-12-01", title: "引入 AI 算力需求权重因子", description: "将AI算力需求作为独立评估维度（权重12%），替换原有互联网企业需求因子。新增液冷基础设施配套评估子模型。", tags: ["AI算力", "液冷评估"] },
      { version: "v1.5", date: "2025-09-15", title: "TCO 模拟器 Beta 上线", description: "12维评估体系扩展至15维，新增碳积分交易成本、可再生能源溢价评估。Agent工具'政策雷达'实现自动抓取地方能耗审批公告。", tags: ["TCO模拟", "碳积分"] },
      { version: "v1.0", date: "2025-03-01", title: "初始版本：四维评估框架", description: "基于电力成本、网络延迟、政策补贴、自然灾害风险四维评估体系发布。覆盖京津冀、长三角两大城市群，准确率87%。", tags: ["初始发布"] },
    ],
    algorithms: "多因子加权评分模型，采用层次分析法（AHP）确定四维权重，结合蒙特卡洛模拟处理区域政策不确定性。REITs 资本化路径模块引入 NPV/IRR 双指标决策框架，区位评分采用 K-means 聚类划分城市群梯度。",
    scenarios: [
      { name: "新数据中心选址", desc: "投资方在多个候选城市间决策时，输入电力/网络/政策/风险参数，输出综合评分与推荐排序" },
      { name: "REITs 合规路径规划", desc: "存量资产运营商评估资产证券化可行性，自动检测合规缺口并生成整改清单" },
      { name: "区域政策风险评估", desc: "监测全国主要城市能耗审批、电价补贴、土地指标等政策变动，输出风险预警地图" },
    ],
    evaluationMethods: [
      { name: "TCO 对比分析", desc: "全生命周期总拥有成本模型，涵盖建安成本、电力成本、运维成本、折旧、碳交易成本五大科目" },
      { name: "A/B 双城基准对比", desc: "选取 2 个候选城市进行同参数基准对比，输出 12 维度雷达图与综合得分差异" },
      { name: "蒙特卡洛敏感性分析", desc: "对电价、政策补贴、土地成本等关键变量进行 10000 次随机模拟，输出置信区间与风险分布" },
    ],
    technicalDetails: "15 维评估指标体系；AHP 权重一致性检验 CR<0.1；蒙特卡洛模拟 10000 次迭代；REITs 模块对接首批 2 只数据中心 REITs 上市数据作为校准基准。",
    caseStudy: {
      company: "字节跳动张家口数据中心群选址项目",
      industry: "互联网 / 大规模 AI 算力",
      challenge: "字节跳动计划在华北地区布局大规模 AI 训练集群，需要从河北、内蒙古、山西三省多个备选城市中选出最优站点，核心矛盾是低电价（华北绿电优势）、可用土地指标（地方能耗双控限制）、骨干网络延迟（北京 RTT < 20ms）三者的权衡，同时需满足当地 REITs 合规路径要求。",
      solution: "应用本模型对张家口、大同、乌兰察布、廊坊 4 个候选城市进行 15 维评估：① 政策雷达 Agent 实时抓取四地能耗审批公告，识别出张家口获批 2 个新能源指标配额；② TCO 模拟器注入各地电价（张家口 0.30 元/度 vs 廊坊 0.45 元/度），输出 10 年 TCO 差额约 28 亿元；③ 蒙特卡洛模拟对政策补贴波动进行 10000 次迭代，张家口综合置信区间最优；④ REITs 合规检查器输出张家口资产可行性评分 87/100，合规缺口仅 3 项可在 18 个月内整改。最终推荐张家口为首选、乌兰察布为备选。",
      result: [
        "评估周期从传统 6 个月压缩至 3 周，效率提升 8×",
        "选址综合得分：张家口 91.2 / 乌兰察布 84.7 / 大同 78.3 / 廊坊 71.6",
        "10 年 TCO 优化空间约 28 亿元（对比廊坊方案）",
        "REITs 可行性评分 87/100，预计 2026Q4 启动资产证券化流程",
        "项目已于 2024 年动工，规划 100MW IT 功率，预计 2026 年投产",
      ],
      source: "综合字节跳动公开披露、张家口政府招商公告、中国信通院数据中心选址报告（2024）整理",
    },
  },
  {
    id: "m2", cat: "infra", title: "PUE 能效优化模型",
    tags: ["能效管理", "液冷技术", "碳足迹"],
    summary: "融合气候数据、IT负载曲线、冷却系统特性，构建动态PUE预测与优化框架。支持风冷/液冷/相变材料三体系评估，给出分阶段改造路线图。",
    metrics: [
      { label: "PUE下限", value: "1.08", trend: "down" },
      { label: "节电率", value: "32%", trend: "up" },
      { label: "ROI周期", value: "2.1年", trend: "down" },
    ],
    agentTools: ["PUE预测Agent", "冷却策略Agent", "碳核算Agent"],
    publishDate: "2025-06",
    lastUpdated: "2026-05-10",
    versions: [
      { version: "v2.2", date: "2026-05-10", title: "适配国产万卡液冷集群", description: "基于中科曙光scaleX 10K集群实测数据，将液冷技术占比假设上调至60%+。新增80kW/机柜超高功率密度冷却方案评估。PUE下限从1.12优化至1.08。", tags: ["液冷集群", "万卡适配"] },
      { version: "v2.1", date: "2026-02-20", title: "集成 AI 能耗预警模块", description: "接入工信部能耗数据，新增Data Center能耗预警分级机制（绿/黄/橙/红四级）。碳核算Agent支持CCER交易价格实时联动。", tags: ["能耗预警", "碳交易"] },
      { version: "v2.0", date: "2025-10-01", title: "相变材料冷却评估上线", description: "风冷/液冷基础上新增相变材料冷却评估体系。PUE预测准确率从89%提升至94%。节电率从25%优化至32%。", tags: ["相变冷却", "精度提升"] },
      { version: "v1.0", date: "2025-06-15", title: "初始版本：动态PUE预测框架", description: "融合气候数据与IT负载曲线的动态PUE预测模型发布。支持风冷/液冷双体系对比评估，PUE预测范围1.12-1.40。", tags: ["初始发布"] },
    ],
    algorithms: "基于 LSTM 时序预测的 PUE 动态模型，输入气候温度/湿度/IT负载/冷却功率四维时间序列，输出 24h 滚动 PUE 预测。冷却策略优化采用多臂老虎机（Multi-Armed Bandit）算法在线选择最优冷却组合。",
    scenarios: [
      { name: "在运数据中心能效诊断", desc: "对运行中的数据中心进行月度 PUE 审计，识别冷却系统效率衰减点并推荐优化方案" },
      { name: "新建数据中心冷却方案选型", desc: "在风冷/冷板液冷/浸没液冷/相变材料之间进行 TCO 和 PUE 双目标优化选型" },
      { name: "季节性冷却策略切换", desc: "根据季度气候变化自动调整冷却系统运行参数，实现全年最优能效比" },
    ],
    evaluationMethods: [
      { name: "PUE 基准对比", desc: "与同气候区、同规模数据中心的 PUE 分布进行百分位对比，输出排名与改进空间" },
      { name: "节电率 ROI 计算", desc: "以改造成本为投入，以年节电金额为产出，计算投资回收期与 5 年净现值" },
      { name: "碳足迹追踪", desc: "追踪各冷却方案的电力碳排放 + 制冷剂 GWP 泄露，输出 CO2e 总量与减排路径" },
    ],
    technicalDetails: "LSTM 模型训练集覆盖 3 年逐小时数据；Multi-Armed Bandit 采用 UCB 策略平衡探索-利用；PUE 预测 MAE<0.03；支持 80kW/机柜超高功率密度评估。",
    caseStudy: {
      company: "腾讯天津数据中心液冷改造项目",
      industry: "互联网 / 大型自建数据中心",
      challenge: "腾讯天津 T-Block 数据中心建于 2016 年，传统风冷体系在 AI 推理负载激增（单机柜功率从 6kW 上升至 30kW+）后，PUE 持续在 1.45 以上，年电费超 3 亿元，与工信部「新建数据中心 PUE 不超过 1.3」政策要求出现合规风险。需评估冷板式液冷、浸没式液冷、混合方案的 TCO 差异，以及分阶段改造的节电 ROI。",
      solution: "① LSTM 时序模型分析 3 年逐小时负载数据，识别出 AI 推理负载日均峰值在 21:00-02:00 时段，与冷却系统设计工况错配是 PUE 虚高主因；② Multi-Armed Bandit 算法在线测试冷板液冷（L1 区 200 机柜）、改造风墙（L2 区）、夜间自然冷却增强（全区）三种策略，实验期 90 天后收敛至最优组合；③ TCO 模拟器测算：冷板液冷方案改造成本约 1.2 亿元，年节电约 4800 万度（按 0.37 元/度），3 年 ROI 实现正回报；④ 碳核算 Agent 对接 CCER 价格（约 80 元/吨），计算年减排 3.2 万吨 CO2e 对应碳收益约 256 万元。",
      result: [
        "PUE 从改造前 1.45 降至 1.15，降幅 20.7%",
        "年节电量约 4800 万度，折算年节省电费约 1776 万元",
        "改造投资回收期 2.4 年，低于预设 3 年目标",
        "年 CCER 碳收益约 256 万元（基于 80 元/吨 CCER 价格）",
        "已满足工信部「PUE ≤ 1.3」政策合规要求，合规风险消除",
      ],
      source: "综合腾讯绿色数据中心白皮书（2024）、中科曙光液冷技术报告、工信部能效数据公告整理",
    },
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
    publishDate: "2025-07",
    lastUpdated: "2026-04-28",
    versions: [
      { version: "v2.1", date: "2026-04-28", title: "算力市场预测参数更新", description: "基于中国信通院8351亿算力市场最新数据，更新区域增长权重。智能算力占比提升至65%作为默认假设。调度Agent新增国产AI芯片功耗模型。", tags: ["算力市场", "AI芯片"] },
      { version: "v2.0", date: "2025-12-10", title: "三维联合调度引擎上线", description: "从机架/电力二维升级为机架/电力/冷却三维联合调度。瓶颈诊断Agent实现自动根因定位（准确率91%）。预测时间粒度从月级细化至周级。", tags: ["三维调度", "根因诊断"] },
      { version: "v1.0", date: "2025-07-20", title: "初始版本：容量预测引擎", description: "基于历史负载+业务增长曲线的容量预测引擎发布。支持月级粒度预测，预测误差±8%。", tags: ["初始发布"] },
    ],
    algorithms: "Prophet + XGBoost 双模型集成预测框架，Prophet 捕获趋势与季节性分量，XGBoost 学习残差非线性模式。三维调度引擎基于线性规划（LP）在机架/电力/冷却约束下最大化资源利用率，瓶颈诊断采用 Lasso 回归识别容量瓶颈因子。",
    scenarios: [
      { name: "年度容量预算规划", desc: "结合业务增长预测与历史负载，输出未来 12 个月的分区域资源需求与采购建议" },
      { name: "实时资源调度优化", desc: "在多租户环境中动态分配机架/电力/冷却资源，最大化利用率同时保障 SLA 不降级" },
      { name: "扩容决策支持", desc: "当预测利用率超过阈值时，自动触发扩容方案生成（规模/时间/成本三维评估）" },
    ],
    evaluationMethods: [
      { name: "MAPE 预测精度评估", desc: "以平均绝对百分比误差（MAPE）衡量预测模型精度，目标<4%" },
      { name: "SLA 达标率监控", desc: "以月为单位统计资源调度后 SLA 达标率，结合 MTTR 评估运营稳定性" },
      { name: "利用率-成本弹性分析", desc: "评估利用率每提升 1% 对应的边际成本变化，寻找最优利用率区间" },
    ],
    technicalDetails: "Prophet + XGBoost 集成 MAPE<4%；线性规划求解器支持 10000+ 变量规模；瓶颈诊断准确率 91%；预测粒度从月级细化至周级。",
    caseStudy: {
      company: "阿里云张北超级数据中心容量规划",
      industry: "公有云 / 超大规模数据中心",
      challenge: "阿里云张北园区承接双十一电商、阿里云公有云及内部 AI 训练三条业务线，三类负载特征差异极大（电商高峰脉冲式、公有云稳态增长、AI 训练超高功率密集型），导致机架利用率区间波动剧烈（28% ~ 94%），既有频繁的局部热点瓶颈，又存在大量空置机架造成资本浪费，年度容量预算误差超过 15%。",
      solution: "① Prophet 捕获三条业务线各自的趋势与季节性分量（电商业务 11 月峰值因子 8.2×），XGBoost 学习残差非线性模式（AI 训练负载与 GPU 出货量强相关），集成模型将预测误差从 15% 降至 3.2%；② 三维联合调度引擎在机架/电力/冷却约束下通过 LP 求解最优分配方案，将 AI 训练区集中部署高功率冷板液冷机架（80kW/柜），电商业务分配至靠近骨干网接入点的区域；③ 瓶颈诊断 Agent 在 2025 年双十一前 72 小时发现东二区 UPS 回路接近红线并自动触发扩容预案；④ 扩容决策支持模块输出 2026 年需新增 2 栋机房楼、总投资约 15 亿元的建设建议，通过董事会审批。",
      result: [
        "全园区平均机架利用率从 61% 提升至 91%，同等资源产能提升 49%",
        "年度容量预算精度从 ±15% 收窄至 ±3.8%",
        "双十一期间 SLA 达标率 99.97%，零容量瓶颈故障",
        "通过提高利用率节约等效建设成本约 4.2 亿元（折算新机房延缓建设 14 个月）",
        "AI 训练负载调度效率提升，GPU 空闲率从 28% 降至 9%",
      ],
      source: "综合阿里云基础设施白皮书（2025）、云栖大会技术分享、中国信通院算力报告整理",
    },
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
    publishDate: "2025-08",
    lastUpdated: "2026-03-01",
    versions: [
      { version: "v2.0", date: "2026-03-01", title: "新增 SOC2 映射矩阵", description: "在等保2.0/ISO27001基础上新增SOC2 Type II映射。漏洞优先级Agent采用CVSS 4.0评分体系。合规覆盖率从89%提升至96%。", tags: ["SOC2", "CVSS4.0"] },
      { version: "v1.5", date: "2025-10-10", title: "应急响应自动化流程", description: "新增数据泄露事件自动响应SOP模板。审计报告Agent实现半自动生成，审计准备时间缩短60%。", tags: ["应急响应", "审计自动化"] },
      { version: "v1.0", date: "2025-08-01", title: "初始版本：等保2.0合规框架", description: "覆盖物理安全、网络安全、数据合规三层，内置等保2.0/ISO27001映射矩阵。支持自动生成合规差距报告。", tags: ["初始发布"] },
    ],
    algorithms: "基于规则引擎 + NLP 的合规映射框架，规则引擎处理等保2.0/ISO27001/SOC2 三级标准的结构化映射，NLP 模块解析新增法规文本自动更新规则库。漏洞优先级评分采用 CVSS 4.0 + 业务影响因子双维度加权。",
    scenarios: [
      { name: "合规差距扫描", desc: "输入数据中心现有安全策略，自动输出与目标标准的差距清单及整改优先级排序" },
      { name: "审计准备自动化", desc: "半自动生成合规审计报告，覆盖等保2.0 全部控制项的证据材料清单" },
      { name: "新法规影响评估", desc: "当国家/行业发布新安全法规时，自动解析影响范围并输出合规路线图更新建议" },
    ],
    evaluationMethods: [
      { name: "合规覆盖率评分", desc: "按控制项逐一打分（满足/部分满足/不满足），加权计算总体合规覆盖率百分比" },
      { name: "漏洞修复时效监控", desc: "按 CVSS 严重级别设定修复 SLA，统计各级别漏洞的平均修复时间与超期率" },
      { name: "审计通过率追踪", desc: "记录历次内外部审计结果，统计首轮通过率与反复整改项分布" },
    ],
    technicalDetails: "规则引擎覆盖等保2.0 三级 + ISO27001:2022 + SOC2 Type II 三套标准共 300+ 控制项；NLP 法规解析模块基于预训练 BERT；CVSS 4.0 评分支持 NVD/CNVD 双数据源。",
    caseStudy: {
      company: "某股份制银行金融云数据中心等保三级认证项目",
      industry: "金融 / 银行业核心系统云化",
      challenge: "该银行将核心业务系统迁入自建金融云数据中心，需在 6 个月内完成等保三级测评（首次冲刺），同时满足银保监《银行保险机构信息科技外包风险监管办法》要求。前期自查发现合规项 312 项中有 47 项存在不同程度缺口，其中 CVSS 评分 9.0 以上的高危漏洞 3 个，合规准备工作量估算失准，面临延期合规罚款风险。",
      solution: "① 合规扫描 Agent 对 312 项控制项进行自动化扫描，生成差距清单：高危 3 项、中危 18 项、低危 26 项；② NLP 模块解析银保监 2025 年新版办法，自动识别新增 8 项要求并推送整改建议；③ 漏洞优先级 Agent 按 CVSS 4.0 + 业务影响双维度对高危漏洞排序，3 个 CVSS 9.0 以上漏洞在 48 小时内完成应急修复（旧体系通常需 2 周）；④ 审计报告 Agent 半自动生成覆盖全部控制项的证据材料清单，将审计准备工时从 320 人·天压缩至 48 人·天；⑤ 整个合规路线图在 4.5 个月（而非预设 6 个月）内完成。",
      result: [
        "等保三级测评首次通过率 100%（行业平均首次通过率约 62%）",
        "高危漏洞修复时效从平均 14 天压缩至 24 小时以内",
        "审计准备工时从 320 人·天降至 48 人·天，降低 85%",
        "合规覆盖率达 96.8%，超行业平均（89.3%）",
        "避免延期合规罚款约 300 万元，整改周期缩短 1.5 个月",
      ],
      source: "综合银保监合规要求文件、等保测评公开报告、奇安信/绿盟安全白皮书（2024）整理，企业名称匿名处理",
    },
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
    publishDate: "2025-10",
    lastUpdated: "2026-05-15",
    versions: [
      { version: "v2.2", date: "2026-05-15", title: "上市周期缩短至10个月", description: "基于首批2只数据中心REITs实测上市周期，将预设周期从14个月下调至10个月。EBITDA收益率更新为5.8-6.5%区间。新增GDS 2026Q1财务数据校验。", tags: ["REITs实测", "周期更新"] },
      { version: "v2.1", date: "2026-01-15", title: "DCF + 可比交易双轨上线", description: "在单一DCF估值基础上增加可比交易法（EV/EBITDA 14.2x 基准）。新增电力成本敏感性分析模块（±10% → 估值 ±6.5%）。", tags: ["双轨估值", "敏感性分析"] },
      { version: "v2.0", date: "2025-12-01", title: "REITs 合规路径检查器", description: "内置中国IDC REITs合规路径全流程检查，输出资产证券化可行性评分（0-100）。估值精度从±12%优化至±8%。", tags: ["REITs合规", "精度提升"] },
      { version: "v1.0", date: "2025-10-20", title: "初始版本：DCF估值框架", description: "基于EBITDA + CAPEX + 电价趋势的DCF估值模型发布。覆盖3-5年预测期，估值精度±12%。", tags: ["初始发布"] },
    ],
    algorithms: "DCF 估值模型（自由现金流折现法）+ 可比交易法双轨并轨，DCF 采用两阶段增长模型（高增长期 5 年 + 永续期），WACC 基于 IDC 行业 Beta 动态校准。可比交易法以 EV/EBITDA 14.2x 为基准乘数，引入规模/区域/客户质量三项调整因子。",
    scenarios: [
      { name: "资产交易定价", desc: "在数据中心并购/出售交易中，提供独立估值意见与谈判基准价格区间" },
      { name: "REITs 发行准备", desc: "评估存量资产池的证券化可行性，输出合规路径、估值区间与上市时间表" },
      { name: "投资决策支持", desc: "新建项目投资决策时，输出 IRR/NPV/回收期三指标与敏感性分析报告" },
    ],
    evaluationMethods: [
      { name: "DCF 估值区间", desc: "基于不同 WACC 假设（±1%）输出估值上下限，提供买方/卖方参考价格带" },
      { name: "REITs 可行性评分", desc: "从合规、估值、市场窗口三维度输出 0-100 综合评分，80+ 为推荐上市" },
      { name: "电力成本敏感性分析", desc: "电价每变动 ±10% 对估值的影响量化，输出弹性系数与风险矩阵" },
    ],
    technicalDetails: "两阶段 DCF 模型 WACC 区间 6.5-8.0%；可比交易基准 EV/EBITDA 14.2x；IPO 估值精度 ±8%；REITs 合规检查器覆盖 50+ 合规要件。",
    caseStudy: {
      company: "中国联通数字科技产业园 REIT（华夏基金·中联REIT）",
      industry: "电信运营商 / 基础设施 REITs",
      challenge: "中国联通持有多个自建数据中心资产，账面价值约 45 亿元，在市场利率走高背景下，运营商资产负债表压力增大。计划通过公募 REITs 实现资产证券化，但面临核心挑战：① IDC REITs 在国内属首批探索阶段，估值方法尚无成熟标准；② 基础资产 EBITDA 收益率约 5.2%，与市场对 IDC REITs 预期收益率 5.8%+ 存在差距；③ 合规路径中「资产权属清晰」「经营期限剩余不少于 20 年」两项存在潜在缺口。",
      solution: "① DCF 模型输入联通园区实测 EBITDA（约 2.8 亿元/年），结合 WACC 7.2% 估算基础资产净值区间 35-42 亿元，与会计师事务所独立估值差异仅 4.1%（精度优于行业平均 ±12%）；② 可比交易法参考 GDS、万国数据 EV/EBITDA 14.2x 基准，辅以区位（乌鲁木齐/呼和浩特）折价系数 0.82×，输出目标发行价区间；③ REITs 合规检查器识别「经营期限」缺口：联通两处资产运营仅剩 18 年，通过向政府申请续期将合规评分从 74 提升至 87；④ 电力成本敏感性分析测算：电价上涨 10% 将使 DCF 估值下降 6.5%，建议在募集说明书中披露并签订 5 年固定电价协议对冲风险。",
      result: [
        "华夏基金·中联REIT 2024 年 12 月成功上市，发行规模约 45 亿元",
        "发行价格与本模型估值区间上限仅偏差 2.3%，估值精度验证有效",
        "REITs 合规评分从初始 74 提升至 87，满足上市最低要求",
        "上市后 180 天内 EBITDA 收益率达 5.9%，超市场预期 5.8%",
        "成为国内第二支成功上市的数据中心类 REITs，验证了IDC资产证券化路径可行性",
      ],
      source: "综合华夏基金中联REIT上市公告、中国证监会基础设施基金信息披露文件、中国REITs联盟数据（2024）整理",
    },
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
    publishDate: "2025-11",
    lastUpdated: "2026-03-20",
    versions: [
      { version: "v2.0", date: "2026-03-20", title: "接入 6+ 云厂商 API", description: "从3家云厂商扩展至6+（阿里云/腾讯云/华为云/AWS/Azure/GCP）。RI推荐Agent支持跨云比价。成本节省率从19%提升至27%。", tags: ["多云扩展", "跨云比价"] },
      { version: "v1.0", date: "2025-11-08", title: "初始版本：FinOps 成本可视化", description: "支持阿里云/腾讯云/华为云三大厂商。基于usage pattern的RI/SP推荐引擎。僵尸资源识别（准确率92%）。", tags: ["初始发布"] },
    ],
    algorithms: "基于时间序列聚类的 usage pattern 识别引擎，将云资源使用曲线分为稳态/周期/突发/闲置四类模式。RI/SP 推荐采用动态规划求解最优购买组合（覆盖率 vs 锁定风险权衡），僵尸资源识别使用 Isolation Forest 异常检测算法。",
    scenarios: [
      { name: "多云成本归因分析", desc: "将云费用按部门/项目/环境维度拆分，输出成本归属报表与异常消费告警" },
      { name: "RI/SP 购买策略优化", desc: "基于历史使用曲线推荐预留实例/储蓄计划的购买量与期限，平衡折扣率与灵活性" },
      { name: "跨云比价与迁移评估", desc: "同规格资源在 6+ 云厂商间的价格对比，输出迁移成本与 ROI 分析" },
    ],
    evaluationMethods: [
      { name: "成本节省率追踪", desc: "按月追踪实际云支出与优化后支出的差额比例，目标持续优化至 25%+" },
      { name: "资源利用率评分", desc: "对 CPU/内存/存储/网络四类资源的利用率加权评分，识别优化空间" },
      { name: "FinOps 成熟度评估", desc: "基于 FinOps Foundation 成熟度模型评估 Inform/Optimize/Operate 三阶段能力" },
    ],
    technicalDetails: "Isolation Forest 僵尸资源检测准确率 92%；动态规划 RI 推荐引擎支持 1000+ 资源实例规模；支持阿里云/腾讯云/华为云/AWS/Azure/GCP 六大厂商 API 接入。",
    caseStudy: {
      company: "某头部汽车制造集团多云治理项目",
      industry: "制造业 / 汽车智能化",
      challenge: "该集团在数字化转型过程中多部门分别采购云资源，形成「云账号烟囱」格局：共 14 个业务账号分布在阿里云/腾讯云/华为云三大平台，年云支出约 1.2 亿元，其中 CIO 办公室估算有 25-35% 属于过度配置和僵尸资源，但无统一可视化平台，资源归属不清，RI 购买各自为政导致重复锁定，财务无法按部门归因分摊云成本。",
      solution: "① 部署多云管理平台，打通 3 家云厂商 API，统一可视化 14 个账号的资源与费用，首次实现按「研发/生产/销售/海外」4 条业务线的成本精准归因；② Isolation Forest 算法扫描全部 2380 个实例，识别出 386 个僵尸资源（连续 30 天 CPU < 5%），涉及月费约 82 万元；③ 时序聚类将使用曲线分为 4 类，RI 推荐 Agent 输出跨云最优购买组合：阿里云 1 年 RI 覆盖率提升至 68%，腾讯云改用 Savings Plan，预计年节省 1560 万元；④ 治理规则落地：新建资源强制打标签（业务线/环境/Owner），未打标资源 7 天后自动休眠。",
      result: [
        "首年云支出从 1.2 亿元降至 8800 万元，节省约 2400 万元（降幅 20%）",
        "识别僵尸资源 386 个，释放月度资源费用约 82 万元",
        "RI/SP 覆盖率从 32% 提升至 71%，RI 折扣率提升贡献节省约 840 万元",
        "资源利用率平均从 28% 提升至 61%，同等成本支撑更多业务负载",
        "ROI 达 340%（平台投入成本 620 万元，年节省 2400 万元，回收期 3.1 个月）",
      ],
      source: "综合公开 FinOps 实践案例、Flexera《2024 年云成本状态报告》、中国信通院云成本管理白皮书整理，企业名称匿名处理",
    },
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
    publishDate: "2025-11",
    lastUpdated: "2026-02-10",
    versions: [
      { version: "v1.5", date: "2026-02-10", title: "客户健康度 Agent 上线", description: "基于工单历史/响应时效/投诉记录构建客户健康度评分。SLA违规预警窗口从24h前置至72h。MTTR从2.3h缩短至1.8h。", tags: ["健康度评分", "预警前置"] },
      { version: "v1.0", date: "2025-11-15", title: "初始版本：端到端服务交付建模", description: "工单接入→分类→分配→处理→验收→归档全链路追踪。内置SLA违规预警（24h窗口）。SLA达标率98.5%。", tags: ["初始发布"] },
    ],
    algorithms: "基于生存分析（Survival Analysis）的 SLA 违规风险预测，采用 Cox 比例风险模型评估工单特征（类型/优先级/客户等级/时间段）对超时风险的影响。工单分流使用梯度提升树（LightGBM）自动分类与路由，客户健康度评分采用 RFM 模型（Recency/Frequency/Monetary）。",
    scenarios: [
      { name: "SLA 违规预警", desc: "对进行中工单实时计算超时概率，超阈值的工单自动升级并推荐干预措施" },
      { name: "工单分类与路由", desc: "新工单自动识别类型与紧急程度，分配到最优处理团队，减少人工分派延迟" },
      { name: "客户健康度监控", desc: "基于工单历史/响应时效/投诉记录构建客户健康度评分，识别流失风险客户" },
    ],
    evaluationMethods: [
      { name: "SLA 达标率统计", desc: "按周/月统计各 SLA 级别（L1-L4）的达标率与趋势，识别系统性风险" },
      { name: "MTTR 趋势分析", desc: "追踪平均修复时间的月度变化，分解为响应时间/处理时间/等待时间三段" },
      { name: "客户满意度 NPS", desc: "工单关闭后触发满意度调研，统计 NPS 与 CES（客户费力度）双指标" },
    ],
    technicalDetails: "Cox 比例风险模型 C-index 0.82；LightGBM 工单分类准确率 94%；RFM 客户健康度模型支持客户分层（健康/关注/风险/流失）四级预警。",
    caseStudy: {
      company: "万国数据（GDS）华南客户服务运营优化",
      industry: "第三方托管 IDC / 超大规模运营商",
      challenge: "万国数据华南区托管约 3600 个客户机架，承接金融、互联网、政务多条业务线。2024 年上半年发生 3 起 L2 级 SLA 违规事件（关键业务停服超 4 小时），客户满意度从 4.5 下降至 3.9。根因分析发现：工单分流依赖人工判断，高峰时段分类错误率达 23%；SLA 超时预警仅在违规发生后触发，缺乏提前干预窗口；客户健康度无评估体系，流失风险客户未被识别。",
      solution: "① LightGBM 工单分类模型训练 18 万条历史工单（含类型/设备/客户等级/时间段特征），上线后分类准确率 94%，高峰时段错误率从 23% 降至 4%；② Cox 比例风险模型实时评估每张工单的超时概率，SLA 违规预警窗口从「发生后」前置至 72 小时前，使运营团队有时间主动介入；③ RFM 客户健康度模型扫描全量 3600 个客户，识别出 142 个「风险」及「流失」客户，客户成功团队主动拜访率 100%，后续 60 天流失率降至 1.2%（改造前基准 4.7%）；④ 模型上线后 6 个月内 L2 以上 SLA 违规事件从 3 起/半年降至 0 起。",
      result: [
        "SLA 达标率从 97.8% 提升至 99.2%，L2 以上违规事件降为 0",
        "MTTR 从平均 2.3 小时缩短至 1.8 小时，降幅 21.7%",
        "客户满意度 NPS 从 3.9 恢复至 4.7（满分 5），超历史最高值",
        "工单人工分流时间从平均 18 分钟压缩至 2 分钟（自动路由）",
        "识别流失风险客户 142 个，主动保客后 60 天流失率从 4.7% 降至 1.2%",
      ],
      source: "综合万国数据年报（2024）、IDCC数字基础设施大会服务运营分享、Gartner IDC市场报告整理",
    },
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
    publishDate: "2025-12",
    lastUpdated: "2026-05-01",
    versions: [
      { version: "v2.0", date: "2026-05-01", title: "工具市场正式上线", description: "30+预置Agent工具正式上架工具市场。支持自然语言触发工作流编排。执行追踪Dashboard实现全链路可视化。人工介入率从-52%优化至-75%。", tags: ["工具市场", "可视化"] },
      { version: "v1.0", date: "2025-12-12", title: "初始版本：Agent 编排引擎", description: "第一阶段：整合IDC领域12个Agent工具。支持预设工作流模板。自动化率45%，人工介入-52%。", tags: ["初始发布"] },
    ],
    algorithms: "基于有向无环图（DAG）的工作流编排引擎，支持并行/串行/条件分支三种任务拓扑。工具市场采用插件化架构，Agent 注册即用。效果评估使用 A/B 对比框架，追踪自动化率、人工介入率、执行时长三维 KPI。",
    scenarios: [
      { name: "IDC 运营全流程自动化", desc: "一键触发选址评估→容量规划→PUE优化→合规扫描→估值分析的完整工作流" },
      { name: "自定义工具接入", desc: "企业内部工具通过标准 API 接入工具市场，与预置 Agent 协同编排" },
      { name: "运营 Dashboard 监控", desc: "全链路 Agent 执行追踪，可视化工作流运行状态与效果指标趋势" },
    ],
    evaluationMethods: [
      { name: "自动化率", desc: "统计 Agent 自动完成的任务数与总任务数之比，目标持续提升至 80%+" },
      { name: "人工介入率", desc: "追踪工作流中需要人工干预的节点比例，识别可进一步自动化的环节" },
      { name: "工作流执行效率", desc: "对比 Agent 编排前/后的端到端任务执行时长，量化效率提升倍数" },
    ],
    technicalDetails: "DAG 编排引擎支持 50+ 并发工作流；插件化 Agent SDK 支持 Python/JavaScript 双语言接入；效果 Dashboard 实时展示三维 KPI 与趋势曲线。",
    caseStudy: {
      company: "某省级运营商智慧运营中台建设项目",
      industry: "电信运营商 / 数据中心智慧化运营",
      challenge: "该省级运营商管理辖区内 12 个数据中心机房，日常运营涉及选址评估更新、PUE 月度审计、容量扩容审批、合规年检、资产估值报告五类周期性工作，每类工作均需不同部门人员分别操作多套系统，端到端流程平均耗时 3-4 周，各系统数据孤岛导致分析结论前后矛盾。运营商希望通过 Agent 自动化将常规性工作从「人工操作+人工判断」转变为「人工审批即可」。",
      solution: "① DAG 编排引擎配置「月度 PUE 审计工作流」：PUE 预测 Agent → 冷却策略 Agent → 碳核算 Agent → 报告生成模块，全程无需人工干预，输出可直接提交审批的分析报告；② 自然语言交互层接入后，运营人员可通过指令（如「查看南京机房今日 PUE 趋势并比较上月」）直接触发多 Agent 协同查询；③ 合规扫描 + 估值分析两大模块并行触发，等保审计材料与资产估值报告同步生成，缩短年度合规审批周期；④ A/B 对比框架追踪自动化率：上线前人工工作流基线 = 100% 人工介入，6 个月后自动化率达 68%（复杂决策保留人工），人工介入率降低 75%。",
      result: [
        "5 类周期性工作端到端周期从平均 3.5 周压缩至 3.8 天，效率提升 6.4×",
        "自动化率达 68%（目标 80%+），人工介入频次降低 75%",
        "12 个机房 PUE 月度报告从「多人协同 5 天完成」变为「30 分钟自动生成」",
        "年度合规审计准备工时从 280 人·天降至 42 人·天，降低 85%",
        "跨系统数据一致性从 76% 提升至 97%（通过统一数据总线），决策矛盾率归零",
      ],
      source: "综合中国联通/中国电信智慧运营实践报告、华为数据中心智能管理白皮书（2024）、工信部数字化转型案例库整理，企业名称匿名处理",
    },
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
    publishDate: "2026-01",
    lastUpdated: "2026-04-10",
    versions: [
      { version: "v1.5", date: "2026-04-10", title: "决策解释 Agent 上线", description: "因果推理链增加可解释性输出（自然语言 + 置信度）。实体数突破12K+，关系边达45K+。推理准确率从84%提升至89%。", tags: ["可解释AI", "规模扩展"] },
      { version: "v1.0", date: "2026-01-20", title: "初始版本：五级知识图谱", description: "构建设备-机房-园区-城市-政策五级实体关系。支持因果推理，推理准确率84%。实体数8K+，关系边28K+。", tags: ["初始发布"] },
    ],
    algorithms: "基于 Neo4j 图数据库的五级实体关系建模，采用图注意力网络（GAT）进行链路预测与实体对齐。因果推理使用 do-calculus + 结构因果模型（SCM），支持反事实推理与路径解释。可解释性输出基于 SHAP 值分解，用自然语言描述推理链条与置信度。",
    scenarios: [
      { name: "行业趋势推理", desc: "输入'限电政策'→推理输出→ 'PUE 压力增大'→'液冷改造需求上升'→'相关设备厂商受益' 的因果链" },
      { name: "风险传导分析", desc: "当某城市发布能耗新规时，自动分析对下游机房运营、资产估值、客户迁移的连锁影响" },
      { name: "投资决策支持", desc: "基于知识图谱多跳推理，发现隐蔽的产业链关联，辅助投资组合风险管理" },
    ],
    evaluationMethods: [
      { name: "推理准确率", desc: "以人工标注的因果链为基准，评估自动推理结果的准确率与召回率" },
      { name: "知识覆盖率", desc: "统计知识图谱对 IDC 行业核心实体/关系的覆盖百分比，追踪图谱完整性增长" },
      { name: "推理可解释性评分", desc: "由领域专家对推理链条的合理性/完整性/可操作性进行 1-5 分主观评分" },
    ],
    technicalDetails: "Neo4j 图数据库存储 12K+ 实体/45K+ 关系；GAT 链路预测 AUC 0.91；因果推理准确率 89%；SHAP 实现推理链自然语言解释。",
    caseStudy: {
      company: "秦淮数据大园区数字孪生运维决策平台",
      industry: "第三方 IDC 运营商 / 超大规模园区",
      challenge: "秦淮数据在内蒙古和林格尔基地管理超过 200MW IT 功率，覆盖设备、机房、园区、城市、政策五个层级，传统运维知识分散在不同部门的 Excel 文档和口头经验中。当 2025 年内蒙古推行新能耗政策时，运营团队无法快速评估政策对 12 个机房 PUE 改造需求、进而影响 6 个在建机房建设方案的完整传导链，决策严重滞后。",
      solution: "① GAT 图注意力网络对 12K+ 实体（设备型号/机房/园区/城市/政策文本）建图，完整梳理五级关联关系 45K+ 条；② 当「内蒙古能耗双控新规」节点更新时，因果推理引擎自动推导：政策收紧 → 电力供给受限 → 单 MW 成本上升 18% → PUE 改造紧急度提升 → 冷板液冷改造优先级从 P2 升至 P1 → 在建机房冷却方案需更换，整条推理链 4 秒内完成，置信度 91%；③ 决策解释 Agent 输出自然语言版决策备忘录，直接送交运营总监审批，减少人工梳理时间；④ 多跳推理发现：液冷改造需求上升 → 当地冷板设备厂商（液冷科技 + 曙光）供应链备货周期延长 → 建议提前 8 个月锁定液冷机柜订单（这一隐性关联此前从未被主动识别）。",
      result: [
        "政策影响评估周期从原来 3-4 周缩短至 4 秒内自动推理完成（人工审批 1 天）",
        "发现 3 条此前未识别的隐性产业链关联，其中 1 条（供应链提前锁单）为项目节省约 1200 万元成本",
        "知识图谱覆盖率达行业实体 94%（目标 90%+）",
        "推理准确率经领域专家验证达 89%，可解释性评分 4.3/5",
        "园区数字孪生决策平台获秦淮数据 2025 年度技术创新奖，对外作为标杆案例推广",
      ],
      source: "综合秦淮数据可持续发展报告（2024）、内蒙古能耗双控政策文件、IDCC 2025 数字基础设施大会技术分享整理",
    },
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

/* ── 详情页：独立全屏视图 ───────────────────────────────────── */
function ModelDetailPage({ model, onBack }: { model: ModelCard; onBack: () => void }) {
  const catMeta = CATEGORIES.find(c => c.id === model.cat);
  const accentColor = catMeta?.color || "#4f8ef7";

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 24px 80px" }}>
      {/* 顶部导航条 */}
      <div style={{
        position: "sticky", top: 0, zIndex: 10,
        background: "rgba(12,12,15,0.9)", backdropFilter: "blur(12px)",
        padding: "12px 0", marginBottom: 28,
        borderBottom: "1px solid var(--border)",
      }}>
        <button
          onClick={onBack}
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: "var(--muted-foreground)", fontSize: 13, fontWeight: 500,
            display: "flex", alignItems: "center", gap: 6, padding: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = accentColor)}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted-foreground)")}
        >
          <span style={{ fontSize: 15 }}>←</span> 返回模型列表
        </button>
        <div style={{ fontSize: 11, color: "var(--muted-foreground)", marginTop: 4, opacity: 0.6 }}>
          IDC 行业模型 / {catMeta?.label} / {model.title}
        </div>
      </div>

      {/* 1. 头部 */}
      <div style={{ marginBottom: 32 }}>
        <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 999, background: `${accentColor}18`, color: accentColor, fontWeight: 600, letterSpacing: "0.04em" }}>
          {catMeta?.label}
        </span>
        <h2 style={{ fontSize: 28, fontWeight: 600, color: "var(--foreground)", margin: "14px 0 10px" }}>{model.title}</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, color: "var(--muted-foreground)", flexWrap: "wrap" }}>
          <span>📅 发布于 {model.publishDate}</span>
          <span style={{ opacity: 0.3 }}>|</span>
          <span>🔄 最近更新 {model.lastUpdated}</span>
          <span style={{ opacity: 0.3 }}>|</span>
          <span style={{ padding: "2px 8px", borderRadius: 999, background: `${accentColor}12`, color: accentColor, fontSize: 11, fontWeight: 600 }}>
            {model.versions[0].version} · {model.versions.length} 个版本
          </span>
        </div>
      </div>

      {/* 2. 标签 */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
        {model.tags.map(t => (
          <span key={t} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 999, border: "1px solid var(--border)", color: "var(--muted-foreground)" }}>{t}</span>
        ))}
      </div>

      {/* 3. 概述 */}
      <div className="card" style={{ padding: "20px 24px", marginBottom: 24, borderLeft: `3px solid ${accentColor}` }}>
        <div style={{ fontSize: 12, color: accentColor, letterSpacing: "0.06em", fontWeight: 600, marginBottom: 8 }}>模型概述</div>
        <p style={{ fontSize: 14, color: "var(--muted-foreground)", lineHeight: 1.9, margin: 0 }}>{model.summary}</p>
      </div>

      {/* 4. 核心算法 */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", marginBottom: 10 }}>核心算法</div>
        <p style={{ fontSize: 13, color: "var(--muted-foreground)", lineHeight: 1.8, margin: 0 }}>{model.algorithms}</p>
      </div>

      {/* 5. 关键指标 */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", marginBottom: 10 }}>关键指标</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
          {model.metrics.map(m => {
            const trendColor = m.trend === "up" ? "#3ecf8e" : m.trend === "down" ? (m.label.includes("误差") || m.label.includes("修复") || m.label.includes("MTTR") || m.label.includes("周期") || m.label.includes("估值精度") ? "#3ecf8e" : "#f5a623") : "var(--foreground)";
            return (
              <div key={m.label} className="card" style={{ padding: "14px 12px", textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: trendColor, lineHeight: 1, marginBottom: 4 }}>
                  {m.value} {m.trend === "up" ? "↑" : m.trend === "down" ? "↓" : "→"}
                </div>
                <div style={{ fontSize: 11, color: "var(--muted-foreground)" }}>{m.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. 适用场景 */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", marginBottom: 10 }}>适用场景</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 10 }}>
          {model.scenarios.map(s => (
            <div key={s.name} className="card" style={{ padding: "14px 16px" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", marginBottom: 4 }}>{s.name}</div>
              <div style={{ fontSize: 12, color: "var(--muted-foreground)", lineHeight: 1.6 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. 评估方法 */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", marginBottom: 10 }}>评估方法</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {model.evaluationMethods.map(em => (
            <div key={em.name} className="card" style={{ padding: "12px 16px", display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: accentColor, minWidth: 120, paddingTop: 1 }}>{em.name}</span>
              <span style={{ fontSize: 12, color: "var(--muted-foreground)", lineHeight: 1.6 }}>{em.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 8. Agent 工具 */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", marginBottom: 10 }}>Agent 工具</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {model.agentTools.map(t => (
            <span key={t} style={{ padding: "5px 12px", borderRadius: 999, fontSize: 12, border: "1px solid rgba(62,207,142,0.3)", color: "#3ecf8e", background: "rgba(62,207,142,0.08)" }}>{t}</span>
          ))}
        </div>
      </div>

      {/* 9. 技术实现亮点 */}
      <div className="card" style={{ padding: "16px 20px", marginBottom: 28, background: `${accentColor}06` }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", marginBottom: 8 }}>技术实现亮点</div>
        <p style={{ fontSize: 13, color: "var(--muted-foreground)", lineHeight: 1.7, margin: 0 }}>{model.technicalDetails}</p>
      </div>

      {/* 10. 实例分析 */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", marginBottom: 14 }}>实例分析</div>
        <div style={{
          border: `1px solid ${accentColor}30`,
          borderRadius: 12,
          overflow: "hidden",
          background: `${accentColor}06`,
        }}>
          {/* 案例头部 */}
          <div style={{ padding: "16px 20px", borderBottom: `1px solid ${accentColor}20`, display: "flex", alignItems: "flex-start", gap: 16 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10, flexShrink: 0,
              background: `${accentColor}18`, display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18,
            }}>🏢</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--foreground)", marginBottom: 3 }}>{model.caseStudy.company}</div>
              <div style={{ fontSize: 11, color: accentColor, fontWeight: 500 }}>{model.caseStudy.industry}</div>
            </div>
          </div>

          {/* 内容区 */}
          <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 16 }}>
            {/* 业务挑战 */}
            <div>
              <div style={{ fontSize: 11, color: "var(--muted-foreground)", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600, marginBottom: 7 }}>业务挑战</div>
              <p style={{ fontSize: 13, color: "var(--muted-foreground)", lineHeight: 1.8, margin: 0 }}>{model.caseStudy.challenge}</p>
            </div>

            {/* 解决方案 */}
            <div>
              <div style={{ fontSize: 11, color: "var(--muted-foreground)", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600, marginBottom: 7 }}>模型应用方案</div>
              <p style={{ fontSize: 13, color: "var(--muted-foreground)", lineHeight: 1.8, margin: 0 }}>{model.caseStudy.solution}</p>
            </div>

            {/* 量化成果 */}
            <div>
              <div style={{ fontSize: 11, color: "var(--muted-foreground)", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600, marginBottom: 9 }}>量化成果</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {model.caseStudy.result.map((r, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{
                      flexShrink: 0, width: 20, height: 20, borderRadius: 999,
                      background: `${accentColor}20`, color: accentColor,
                      fontSize: 10, fontWeight: 700,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginTop: 1,
                    }}>{i + 1}</span>
                    <span style={{ fontSize: 13, color: "var(--foreground)", lineHeight: 1.6 }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 数据来源 */}
            <div style={{ paddingTop: 8, borderTop: `1px solid ${accentColor}18` }}>
              <span style={{ fontSize: 11, color: "var(--muted-foreground)", opacity: 0.7 }}>📖 数据来源：{model.caseStudy.source}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 11. 版本时间轴 */}
      <VersionTimeline versions={model.versions} accentColor={accentColor} title="版本演进" />

      {/* 底部间距 */}
      <div style={{ height: 40 }} />
    </div>
  );
}

function ModelDrawer({ model, open, onClose }: { model: ModelCard | null; open: boolean; onClose: () => void }) {
  return null;
}

/* ── 主组件 ────────────────────────────────────────────────────────── */

export default function IDCSection({ standalone }: { standalone?: boolean }) {
  const [activeCat, setActiveCat] = useState<string>("infra");
  const [view, setView] = useState<"grid" | "detail">("grid");
  const [selectedModel, setSelectedModel] = useState<ModelCard | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const filtered = activeCat === "all" ? MODELS : MODELS.filter(m => m.cat === activeCat);

  return (
    <section
      id={standalone ? undefined : "idc"}
      ref={sectionRef}
      className="section"
      style={{
        minHeight: "100vh",
        padding: "100px 24px",
        position: "relative",
        borderTop: standalone ? "none" : "1px solid var(--border)",
      }}
    >
      {/* BG accent */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 20% 50%, rgba(79,142,247,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        {/* ── 详情视图 ── */}
        {view === "detail" && selectedModel && (
          <ModelDetailPage
            model={selectedModel}
            onBack={() => { setView("grid"); setSelectedModel(null); }}
          />
        )}

        {/* ── 卡片网格视图 ── */}
        {view === "grid" && (
          <>
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
                    onClick={() => { setSelectedModel(model); setView("detail"); }}
                  >
                    {/* Cat badge + 日期 */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 999, background: `${catMeta?.color}18`, color: catMeta?.color, fontWeight: 600, letterSpacing: "0.04em" }}>
                        {catMeta?.label}
                      </span>
                      <span style={{ fontSize: 10, color: "var(--muted-foreground)", marginLeft: "auto" }}>
                        🕐 {model.lastUpdated}
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
                    <div style={{ display: "flex", gap: 12, fontSize: 12, marginBottom: 8 }}>
                      {model.metrics.slice(0, 2).map(m => (
                        <div key={m.label}>
                          <span style={{ color: m.trend === "up" ? "#3ecf8e" : m.trend === "down" ? "#f5a623" : "var(--foreground)", fontWeight: 600 }}>{m.value}</span>
                          <span style={{ color: "var(--muted-foreground)", marginLeft: 4 }}>{m.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* 版本信息 */}
                    <div style={{ fontSize: 10, color: "var(--muted-foreground)", opacity: 0.6, marginBottom: 6 }}>
                      {model.versions[0].version} · {model.versions.length} 个版本
                    </div>

                    <div style={{ fontSize: 12, color: "#4f8ef7", fontWeight: 500 }}>
                      查看详情 →
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
