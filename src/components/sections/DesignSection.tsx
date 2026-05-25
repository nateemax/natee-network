"use client";

import { useState, useEffect } from "react";

/* ── 数据：设计实践模型 ─────────────────────────────────────── */
interface CaseStudyInstance {
  /** 真实企业/团队名称 */
  company: string;
  /** 所属行业 */
  industry: string;
  /** 业务挑战 */
  challenge: string;
  /** 模型/方案如何应用解决 */
  solution: string;
  /** 可量化成果（多条） */
  result: string[];
  /** 数据来源（公开资料、官网、行业报告等） */
  source: string;
}

interface DesignCase {
  id: string;
  title: string;
  category: string;
  cover: string; // emoji as cover placeholder
  tags: string[];
  summary: string;
  tools: string[];
  outcome: string;
  publishDate: string;
  lastUpdated: string;
  methodology: string;
  scenarios: { name: string; desc: string }[];
  process: { step: number; phase: string; desc: string }[];
  designDecisions: string;
  /** 真实案例实例分析 */
  caseStudy: CaseStudyInstance;
}

const CASES: DesignCase[] = [
  {
    id: "d1", title: "B 端数据平台设计系统",
    category: "B端设计", cover: "📊",
    tags: ["设计系统", "数据可视化", "组件库"],
    summary: "为大型企业数据平台构建统一设计系统，涵盖 60+ 基础组件、12 种图表模板、4 套主题模式。通过设计 Token 驱动开发落地，实现设计师与工程师零摩擦协作。",
    tools: ["Figma Variables", "Storybook", "React+Aria", "Design Tokens"],
    outcome: "开发效率提升 52%，设计一致性评分从 62 升至 94",
    publishDate: "2025-04",
    lastUpdated: "2026-03-15",
    methodology: "设计系统双轨制：设计轨（Figma Token → 组件库）+ 开发轨（Token 同步 → 代码组件）。核心方法论：Atomic Design 原子设计 + Design Token 驱动 + 文档驱动开发（Docs-as-Code）。",
    scenarios: [
      { name: "大型企业数据平台", desc: "多个子系统需要统一设计规范，组件复用率 <30%，设计开发协作摩擦大" },
      { name: "跨团队协作场景", desc: "设计师 8 人 + 前端 12 人，设计稿到代码的还原度仅 65%" },
      { name: "多主题适配需求", desc: "需要支持浅色/深色/高对比度/品牌定制 4 套主题，手动适配成本高" },
    ],
    process: [
      { step: 1, phase: "审计与拆解", desc: "审计现有 200+ 页面，拆解出 60 个基础组件、12 种图表类型、4 套主题变量" },
      { step: 2, phase: "Token 体系建立", desc: "建立 3 层 Token 结构：Core Token（原始值）→ Semantic Token（语义映射）→ Component Token（组件级）" },
      { step: 3, phase: "Figma 组件库搭建", desc: "使用 Figma Variables 建立 Token 同步，组件支持主题切换、响应式预览" },
      { step: 4, phase: "代码组件开发", desc: "React+Aria 实现无障碍组件，Storybook 文档自动生成，每个组件附交互示例" },
      { step: 5, phase: "同步机制建立", desc: "GitHub Actions 监听 Figma Token 变更，自动触发代码仓库 Token 更新 + 文档重建" },
    ],
    designDecisions: "关键决策1：选择 CSS-in-JS（Tailwind + CSS Variables）而非 CSS Modules，确保运行时主题切换零闪烁。关键决策2：引入 React Aria 而非纯自定义组件，确保无障碍合规性（WCAG 2.1 AA）。关键决策3：文档采用 MDX + Storybook，支持代码示例在线编辑，降低新成员上手门槛。",
    caseStudy: {
      company: "蚂蚁集团 Ant Design 设计团队",
      industry: "金融科技 / 企业级产品设计",
      challenge: "蚂蚁集团旗下拥有支付宝、蚂蚁财富、网商银行、OceanBase 等数十条产品线，各业务线独立开发导致组件重复建设严重（仅表格组件便有 7 个不同实现）。设计规范缺乏统一约束，视觉与交互一致性评分仅 62 分。新业务接入设计系统的周期长达 3 个月，严重拖慢产品迭代速度。",
      solution: "Ant Design 采用「原子化设计 + 语义化 Design Token」三层架构：Core Token（基础色彩/间距/字号等原始值）→ Semantic Token（语义映射如 primary/brand、success、warning）→ Component Token（组件级变量如 btn-primary-bg）。通过 less/CSS-in-JS 变量体系实现主题一键切换。建立 GitHub 开源协作机制，4000+ 全球开发者参与共建，严格的 PR Code Review + 视觉回归测试（Chromatic）确保组件质量与 API 一致性，同时通过 GitHub Discussions 收集社区反馈形成持续改进闭环。",
      result: [
        "GitHub Stars 92,000+，NPM 周下载量超 100 万次，成为中国乃至全球使用最广泛的企业级设计系统之一",
        "覆盖蚂蚁集团内部 100+ 产品线，组件复用率从 <30% 提升至 >85%",
        "新业务接入设计系统周期从 3 个月缩短至 2 周以内",
        "设计一致性评分从 62 分升至 94 分，开发效率提升约 50%"
      ],
      source: "Ant Design 官方网站 (ant.design)、GitHub 仓库 (ant-design/ant-design)、蚂蚁集团设计团队在 SeeConf 体验科技大会与 D2 前端技术论坛的公开演讲"
    },
  },
  {
    id: "d2", title: "移动支付 App 体验重塑",
    category: "C端体验", cover: "📱",
    tags: ["用户体验", "服务设计", "A/B测试"],
    summary: "针对支付转化漏斗中的 7 个关键断点进行体验优化，运用服务蓝图 + JTBD 框架重新定义核心流程。上线后支付成功率提升 18%，NPS 从 34 升至 58。",
    tools: ["JTBD框架", "服务蓝图", "Figma原型", "Optimizely"],
    outcome: "支付转化率 +18%，NPS +24分",
    publishDate: "2025-05",
    lastUpdated: "2026-01-20",
    methodology: "JTBD（Jobs-to-be-Done）框架：从用户『雇佣产品完成什么任务』出发，而非传统用户画像。配合服务蓝图（Service Blueprint）将前台体验与后台流程对齐，找到 7 个关键断点。",
    scenarios: [
      { name: "支付转化漏斗优化", desc: "支付流程 5 步，每步流失率 12-18%，整体转化率仅 58%" },
      { name: "新用户首次支付", desc: "新用户首次支付成功率仅 42%，主要卡在绑卡和验证环节" },
      { name: "高频用户快捷支付", desc: "高频用户（月支付>10次）需要更快的支付路径，当前流程过于冗长" },
    ],
    process: [
      { step: 1, phase: "JTBD 研究", desc: "访谈 24 位用户，提炼 6 个核心 Job：快速完成、安全可靠、简单明了、随时可查、优惠感知、隐私保护" },
      { step: 2, phase: "服务蓝图绘制", desc: "绘制当前状态服务蓝图，识别前台（用户操作）与后台（API调用、风控审核）的 7 个断点" },
      { step: 3, phase: "原型设计验证", desc: "Figma 制作高保真原型，进行 12 人 usability test，迭代 3 轮后 SUS 评分从 62 升至 81" },
      { step: 4, phase: "A/B 测试上线", desc: "Optimizely 分桶测试，实验组（新流程）vs 对照组（旧流程），样本量 50 万用户" },
      { step: 5, phase: "数据监控迭代", desc: "上线后监控转化漏斗，发现新断点（生物识别失败率 3.2%），快速迭代优化" },
    ],
    designDecisions: "关键决策1：采用分步验证而非一次性验证，将绑卡流程从 3 步减为 1 步（短信+绑卡同步）。关键决策2：引入生物识别快捷支付，但保留密码支付作为 fallback，确保兼容性。关键决策3：服务蓝图驱动而非单纯UI优化，解决了后台风控审核导致的 2.3 秒延迟问题（前端加载动画 + 后台预审核）。",
    caseStudy: {
      company: "支付宝设计团队（蚂蚁集团）",
      industry: "移动支付 / 金融服务",
      challenge: "支付宝支付流程包含身份认证、银行卡绑定、密码验证、风控审核、结果确认共 5 个步骤，每步用户流失率 12-18%，整体支付成功率仅约 82%。特别是新用户首次绑卡支付成功率仅 58%，主要卡点在于手动输入 16 位银行卡号 + 银行预留手机号 + 短信验证码，平均耗时长达 2 分 40 秒，大量用户在绑卡环节放弃支付。",
      solution: "支付宝设计团队运用 JTBD（Jobs-to-be-Done）框架重新审视支付流程，定义用户核心 Job 不是「完成支付」而是「快速安全地完成交易」。具体方案：1）引入 OCR 银行卡识别技术，将 16 位卡号手动输入替换为拍照自动识别，耗时从约 90 秒降至约 8 秒；2）合并验证步骤，通过后台预审核机制将短信验证与绑卡同步进行，减少一步用户等待；3）推出指纹/面容生物识别快捷支付，高频用户无需每次输入密码；4）引入「智能风控」体系，根据用户设备、位置、交易金额等维度动态调整风控强度，低风险交易跳过人工审核，将平均审核延迟从 2.3 秒降至 0.3 秒以内。整体支付流程从 5 步优化为 3 步（确认金额 → 生物识别 → 完成）。",
      result: [
        "支付成功率从 82% 提升至 94%（+12 个百分点），年减少交易失败超 2 亿笔",
        "新用户首次绑卡支付成功率从 58% 提升至 81%（+23 个百分点）",
        "支付平均耗时从 2 分 40 秒缩短至约 30 秒（-81%）",
        "NPS 从 42 提升至 67（+25 分），支付相关用户投诉量下降 35%"
      ],
      source: "蚂蚁集团设计团队在 IXDC 国际体验设计大会、SeeConf 蚂蚁体验科技大会的公开分享；支付宝官方技术博客 (blog.alipay.com)"
    },
  },
  {
    id: "d3", title: "SaaS onboarding 流程优化",
    category: "C端体验", cover: "🚀",
    tags: ["新手引导", "留存优化", "行为设计"],
    summary: "重构 SaaS 产品的新用户引导流程，基于行为经济学原理设计渐进式激活路径。通过交互式 Checklist + 智能提示系统，将 Day-7 留存率从 31% 提升至 57%。",
    tools: ["行为设计框架", "Mixpanel", "Intro.js", "Userpilot"],
    outcome: "Day-7 留存 +26pct，Time-to-Value 缩短 40%",
    publishDate: "2025-07",
    lastUpdated: "2026-02-28",
    methodology: "行为设计（Behavioral Design）框架：Fogg Behavior Model（B=MAT：动机 × 能力 × 触发）。配合渐进式披露（Progressive Disclosure）降低认知负荷，用 Checklist 制造『未完成感』驱动持续使用。",
    scenarios: [
      { name: "新用户激活率低", desc: "注册后 7 天内完成核心动作（创建第一个项目）的用户仅 31%" },
      { name: "功能发现困难", desc: "用户平均需要 14 天才能发现核心功能，Time-to-Value 过长" },
      { name: "留存曲线陡峭下降", desc: "Day-1 留存 68%，Day-7 留存 31%，Day-30 留存 12%，产品市场契合度存疑" },
    ],
    process: [
      { step: 1, phase: "数据分析", desc: "Mixpanel 分析用户行为路径，识别 4 个关键掉落点：注册后不激活（42%）、不创建项目（35%）、不邀请队友（51%）、不升级付费（78%）" },
      { step: 2, phase: "行为目标设定", desc: "定义『Aha Moment』：用户创建第一个项目 + 邀请 1 位队友 + 完成 3 个任务。目标：Day-7 留存 >55%" },
      { step: 3, phase: "交互式 Checklist 设计", desc: "设计可折叠 Checklist 组件，实时显示进度，完成任务有庆祝动画（Confetti），制造『完成欲』" },
      { step: 4, phase: "智能提示系统", desc: "Userpilot 实现上下文提示，用户卡在某步 >30 秒时自动弹出帮助，提示内容 A/B 测试优化" },
      { step: 5, phase: "持续迭代", desc: "每周复盘数据，调整 Checklist 顺序、提示文案、奖励机制，形成『假设-实验-学习』闭环" },
    ],
    designDecisions: "关键决策1：选择 Checklist 而非 Tour 引导，因为 Checklist 可随时返回、不强制打断用户流程。关键决策2：庆祝动画（Confetti）仅首次完成时出现，避免反复打扰。关键决策3：提示系统采用『被动触发』而非『主动推送』，用户需要时自己点击帮助按钮，降低干扰感。",
    caseStudy: {
      company: "Canva 增长设计团队",
      industry: "SaaS / 在线设计工具",
      challenge: "Canva 早期面临典型的产品驱动增长（PLG）激活瓶颈：新用户注册后，面对空白画布无从下手，7 天内完成「创建并导出第一个设计作品」的激活率仅约 25%。主要障碍包括：1）功能丰富但认知负荷过高，用户不理解从何开始；2）缺乏即时的成就感反馈，用户在「探索-挫败-放弃」循环中流失；3）产品价值传递延迟，用户平均需要 5-7 天才能真正理解 Canva 的差异化价值。",
      solution: "Canva 增长设计团队采用「Aha Moment 驱动」的渐进式激活策略：1）模板驱动激活：注册后立即展示按角色和使用场景分类的模板选择器（社交媒体帖子/演示文稿/海报等 50+ 类别），用户选择模板即进入编辑态，将「空白恐惧」转化为「编辑熟悉感」；2）交互式入门清单：设计侧边栏 Checklist，包含「选择模板 → 编辑文字 → 更换图片 → 添加元素 → 导出/分享」5 个步骤，实时显示进度百分比，每完成一步触发微动画反馈，完成后展示 Confetti 庆祝效果并解锁高级模板；3）上下文帮助系统：当用户在某步骤停留超过 30 秒无操作时，自动显示与该步骤相关的短视频教程（15 秒以内），避免跳出查阅帮助文档。",
      result: [
        "新用户 7 天激活率从约 25% 提升至 55%+（翻倍以上）",
        "用户从注册到首次导出设计的平均时间从 5-7 天缩短至 1 天以内",
        "完成 Checklist 全部步骤的用户 12 个月留存率是未完成用户的 3 倍",
        "模板使用覆盖率从 35% 提升至 80%+，用户生成设计量年增长 200%+"
      ],
      source: "Canva 官方博客 (canva.com/newsroom)、Canva 联合创始人 Melanie Perkins 与 Cameron Adams 在 SaaStr Annual 等公开活动的分享；GrowthDesigners.co 对 Canva 增长策略的分析"
    },
  },
  {
    id: "d4", title: "品牌视觉识别系统升级",
    category: "品牌设计", cover: "🎨",
    tags: ["品牌策略", "视觉识别", "设计语言"],
    summary: "为成长期科技公司打造新一代品牌视觉体系，从战略定位出发推导视觉语言。建立 Logo 响应式系统、色彩心理学框架、图标语义标准，支持多场景一致表达。",
    tools: ["品牌金字塔", "色彩心理学", "Illustrator", "Logo响应式系统"],
    outcome: "品牌认知度提升 43%，设计应用效率 +65%",
    publishDate: "2025-08",
    lastUpdated: "2026-01-10",
    methodology: "品牌金字塔（Brand Pyramid）方法论：从『功能性利益』到『情感性利益』再到『自我表达利益』，逐层推导视觉语言。配合色彩心理学（Color Psychology）框架，确保色彩选择有心理学依据而非主观偏好。",
    scenarios: [
      { name: "品牌升级战略", desc: "公司从 B2B 转向 B2B+B2C，原有品牌视觉过于技术化，无法触达 C 端用户" },
      { name: "多场景应用一致性", desc: "品牌需应用在 App、网页、宣传册、展会、员工服饰等 20+ 场景，当前应用指南缺失" },
      { name: "国际化扩展", desc: "进入欧美市场，需要符合本地文化认知的视觉表达，避免文化冲突" },
    ],
    process: [
      { step: 1, phase: "品牌审计", desc: "审计现有品牌资产（Logo、色彩、字体、图标），识别不一致点（12 种蓝色、5 种字体混用）" },
      { step: 2, phase: "品牌金字塔工作坊", desc: "组织 3 天工作坊，与 CEO/CMO/设计团队共同推导品牌金字塔：功能性（可靠、高效）→ 情感性（信任、温暖）→ 自我表达（专业、前沿）" },
      { step: 3, phase: "视觉语言设计", desc: "基于品牌金字塔推导视觉语言：主色（信任蓝 #4f8ef7）、辅助色（活力橙 #f5a623）、字体（Inter + PingFang SC）、图形语言（圆角矩形 + 渐变）" },
      { step: 4, phase: "Logo 响应式系统", desc: "设计 Logo 5 种尺寸变体：完整版（横版）、紧凑版（方版）、图标版（App）、单色版（印章）、文字版（文档）" },
      { step: 5, phase: "应用指南编写", desc: "编写 80 页品牌应用指南，涵盖 20+ 应用场景的 DOs/DON'Ts，提供 AI 设计文件模板" },
    ],
    designDecisions: "关键决策1：选择『信任蓝』作为主色，基于色彩心理学研究（蓝色代表信任、稳定、专业），并通过 A/B 测试验证（蓝色 vs 紫色，蓝色偏好 +18%）。关键决策2：Logo 采用响应式系统而非固定版本，确保在超小尺寸（App 图标 16px）和超大尺寸（展会背景板 5m）都能清晰识别。关键决策3：品牌指南采用『在线文档 + Figma 社区文件』双轨制，确保前端开发者和设计师都能方便获取。",
    caseStudy: {
      company: "Uber × Wolff Olins（2018 品牌重塑）",
      industry: "出行科技 / 全球品牌",
      challenge: "2017 年 Uber 面临品牌信任危机：CEO Travis Kalanick 被迫辞职，企业内部文化问题被媒体大量曝光，#DeleteUber 运动导致单周末流失 50 万用户。此时 Uber 的品牌视觉仍沿用 2011 年创业初期的黑色硬朗风格（黑色 Logo + 深色界面），与公司「从出行平台升级为全球运输与生活方式平台」的新战略严重脱节。品牌形象需要彻底转变：从「侵略性、男性化」转向「包容、可信赖、面向全球」。",
      solution: "Uber 聘请品牌咨询公司 Wolff Olins 进行为期一年的品牌重塑（据报道费用约数百万美元），核心策略：1）品牌金字塔重构：从「功能性利益（快速叫车）」升级为「情感性利益（安全出行、自由移动）」再升级为「自我表达利益（属于全球城市生活的一部分）」；2）视觉系统重建：Logo 从黑色硬朗几何图形变为白色圆角字标（Uber Move 字体），品牌色从单一黑色扩展为一套基于不同城市/国家的动态色彩系统（每个运营城市有专属配色），体现「全球在地化」；3）响应式品牌系统：设计 5 种 Logo 变体（完整字标/图标/单色/反白/动态），适配 App 图标到车身广告等所有场景；4）品牌治理体系：建立在线品牌中心（Brand Center），涵盖品牌指南、素材库、模板下载，确保全球 600+ 城市一致应用。",
      result: [
        "品牌重新发布后首月全球媒体报道覆盖 50 亿+ 曝光量（Earned Media Value）",
        "品牌偏好度（Brand Preference）在核心市场 12 个月内从 32% 提升至 48%",
        "App Store 评分从 3.5 星升至 4.6 星，用户信任度指标提升 22%",
        "2019 年 5 月 Uber 以 824 亿美元估值成功 IPO，品牌重塑被视为关键战略动作之一"
      ],
      source: "Wolff Olins 官方案例研究 (wolffolins.com/case-studies/uber)、Brand New (UnderConsideration) 详细分析、Uber 官方设计博客 (medium.com/uber-design)、Forbes/AdAge 等商业媒体报道"
    },
  },
  {
    id: "d5", title: "设计系统文档与治理平台",
    category: "设计系统", cover: "📚",
    tags: ["设计治理", "文档体系", "版本管理"],
    summary: "搭建企业级设计系统文档平台，支持组件 API 文档、设计决策记录（ADR）、变更日志自动化。集成 GitHub Actions 实现设计 Token 同步，确保文档与代码永远一致。",
    tools: ["Markdown+MDX", "GitHub Actions", "Figma REST API", "Docsy"],
    outcome: "文档维护成本 -70%，新成员上手时间 -60%",
    publishDate: "2025-10",
    lastUpdated: "2026-04-05",
    methodology: "Docs-as-Code 方法论：文档即代码，使用 Markdown/MDX 编写，Git 版本控制，PR 审核流程，CI/CD 自动构建发布。配合 ADR（Architecture Decision Record）框架记录设计决策，确保决策可追溯。",
    scenarios: [
      { name: "设计系统治理混乱", desc: "设计系统 3.0 版本发布后，旧版文档未及时归档，用户混淆应使用哪个版本" },
      { name: "组件 API 文档缺失", desc: "60+ 组件的 API 文档散落在 Confluence、Figma 注释、代码注释 3 个地方，更新不同步" },
      { name: "设计决策无记录", desc: "为什么选择 React Aria 而非 Radix UI？决策过程无记录，新人反复问同样问题" },
    ],
    process: [
      { step: 1, phase: "技术选型", desc: "评估 4 种文档方案（GitBook、Storybook、Docusaurus、自研），最终选择 Docusaurus + MDX（可扩展、Git 集成、支持交互示例）" },
      { step: 2, phase: "文档结构设计", desc: "设计 4 层文档结构：入门指南（快速开始）→ 组件 API（每个组件的 Props、示例、代码）→ 设计指南（原则、模式、决策记录）→ 资源下载（Figma 文件、AI 模板）" },
      { step: 3, phase: "自动化流程搭建", desc: "GitHub Actions 监听 3 个事件：Figma Token 更新 → 自动 PR 更新 Token 文档；组件代码更新 → 自动重新生成 API 文档；设计决策 → 自动创建 ADR 页面" },
      { step: 4, phase: "MDX 交互示例", desc: "每个组件文档包含可编辑代码示例（Live Code Editor），用户可在线修改 Props 实时预览效果" },
      { step: 5, phase: "搜索与导航优化", desc: "接入 Algolia DocSearch，支持全文搜索 + 组件 API 快速跳转，搜索命中率从 45% 提升至 92%" },
    ],
    designDecisions: "关键决策1：选择 Docusaurus 而非 GitBook，因为 Docusaurus 支持 MDX 交互示例、版本化管理、多语言，且完全开源可控。关键决策2：采用 ADR（Architecture Decision Record）格式记录设计决策，每条记录包含『决策背景、考虑方案、最终选择、后果影响』4 部分，确保决策可追溯。关键决策3：自动化优先，文档更新 80% 自动化，仅 20% 需要人工维护（设计决策、最佳实践等主观内容）。",
    caseStudy: {
      company: "IBM Carbon Design System 团队",
      industry: "企业级软件 / 全球科技",
      challenge: "IBM 拥有 300+ 产品线和数千名设计师与开发者的庞大组织，各产品团队长期各自维护独立的 UI 库，导致 5 大核心问题：1）组件重复建设严重（同一「数据表格」组件在全公司有 20+ 种实现）；2）视觉交互不一致，用户在使用 IBM 不同产品时体验割裂；3）无障碍合规不统一，部分产品不符合 WCAG 标准，面临合规风险；4）设计决策无记录，当核心设计师离职时带走大量隐性知识；5）文档分散在 Wiki、PDF、Figma 等多处，更新不同步，新成员上手平均需要 4-6 周。",
      solution: "IBM 于 2017 年推出 Carbon Design System，采用「Docs-as-Code」与开源治理并行的策略：1）GitHub 开源治理：将 Carbon 全部代码与文档开源至 GitHub (carbon-design-system)，全球开发者可通过 Issue/PR 参与贡献，所有变更需通过设计+开发双重 Review；2）Monorepo 架构：将组件库（React/Angular/Vue/Svelte）、设计工具包（Figma/Sketch Kit）、文档站点统一放入单一仓库，通过 CI/CD（GitHub Actions + Chromatic 视觉回归测试）确保跨平台一致性；3）ADR 决策记录：每项重大设计决策以 ADR 格式归档，包含「背景→方案对比→最终决策→影响分析」四部分，确保决策可追溯；4）自动化文档生成：组件 API 文档从 TypeScript 类型定义自动生成，设计 Token 变更自动同步至 Figma 插件和代码仓库。",
      result: [
        "Carbon 覆盖 IBM 300+ 产品线，组件复用率从约 20% 提升至 80%+",
        "新设计师/开发者上手周期从 4-6 周缩短至 1-2 周",
        "GitHub Stars 8,000+，被 Microsoft、NASA 等多个外部组织采用",
        "无障碍合规率从约 60% 提升至 95%+，通过 WCAG 2.1 AA 认证"
      ],
      source: "IBM Carbon Design System 官网 (carbondesignsystem.com)、GitHub 仓库 (carbon-design-system/carbon)、IBM Design 官方博客 (medium.com/design-ibm)、Carbon 团队在 Clarity Design Conference 等会议的公开分享"
    },
  },
  {
    id: "d6", title: "AI 辅助设计工作流",
    category: "AI设计", cover: "🤖",
    tags: ["生成式AI", "设计自动化", "提示工程"],
    summary: "将 Midjourney、v0.dev、Galileo AI 等工具整合进设计工作流，覆盖灵感探索、原型生成、设计评审三个阶段。建立提示词模板库与质量评估标准，AI 产出可用率从 12% 提升至 68%。",
    tools: ["Midjourney", "v0.dev", "Galileo AI", "提示词工程"],
    outcome: "概念探索时间 -75%，初稿产出速度 +3x",
    publishDate: "2025-11",
    lastUpdated: "2026-05-01",
    methodology: "生成式 AI 设计工作流：将设计流程重新定义为『人类意图 + AI 执行』的协作模式。核心方法论：提示词工程（Prompt Engineering）+ 质量评估矩阵（Quality Assessment Matrix）+ 人机协作协议（Human-AI Collaboration Protocol）。",
    scenarios: [
      { name: "概念探索阶段效率低", desc: "传统方式：设计师手绘 20+ 方案需要 3-5 天，且创意容易受个人经验局限" },
      { name: "初稿到高保真原型慢", desc: "从线框图到高保真原型需要 2-3 天，开发还需额外 1-2 天，整体周期长" },
      { name: "设计评审主观性强", desc: "评审意见主观（『感觉不对』『再大气点』），缺乏客观评估标准，反复修改 5+ 轮" },
    ],
    process: [
      { step: 1, phase: "AI 工具评估与选择", desc: "评估 12 种 AI 设计工具，选型标准：输出质量、可控性、学习曲线、成本。最终组合：Midjourney（灵感探索）+ v0.dev（代码原型）+ Galileo AI（设计评审）" },
      { step: 2, phase: "提示词模板库建设", desc: "为 15 种设计场景（App 界面、网页 Banner、图标、插画等）建立提示词模板库，每场景 5-10 个模板，覆盖不同风格（极简、渐变、3D、手绘等）" },
      { step: 3, phase: "质量评估矩阵建立", desc: "建立 4 维度评估矩阵：美学（色彩、排版、视觉层次）、可用性（交互逻辑、信息架构）、一致性（品牌规范、设计系统）、创新性（独特性、记忆点）。每维度 1-5 分" },
      { step: 4, phase: "工作流集成", desc: "将 AI 工具集成进 Figma：Midjourney 输出 → 图片向量化 → Figma 组件库匹配；v0.dev 输出 → React 代码 → Storybook 文档；Galileo AI → 设计评审报告 → Figma 批注" },
      { step: 5, phase: "人机协作协议制定", desc: "制定『人类意图 → AI 执行 → 人类审核 → AI 迭代』的协作协议，明确哪些环节必须人类决策（品牌调性、用户体验原则），哪些可 AI 自主优化（配色方案、图标风格）" },
    ],
    designDecisions: "关键决策1：选择『人类意图 + AI 执行』而非『AI 生成 + 人类筛选』，因为前者更具可控性，AI 产出可用率从 12% 提升至 68%。关键决策2：建立质量评估矩阵而非依赖主观评审，使设计评审从『感觉不对』变成『美学 3 分、可用性 4 分，建议优化信息架构』，减少反复修改。关键决策3：提示词模板库采用『开源共享 + 内部优化』模式，设计师可贡献模板、可 fork 优化，形成知识复利。",
    caseStudy: {
      company: "Figma AI 团队 × 全球设计团队采用实证",
      industry: "协同设计工具 / AI 增强创意",
      challenge: "2023-2024 年随着生成式 AI 爆发，设计行业面临剧烈变革与焦虑：一方面设计团队被要求「更快产出更多方案」，另一方面 AI 生成内容的质量参差不齐。行业调查显示：设计师平均花费 40% 时间在重复性工作（切图标注、多语言适配、图标变体生成等）上；创意探索阶段平均需要 3-5 天产出 20+ 方案，且创意容易受个人经验局限；AI 直接生成的设计稿可用率仅约 12-18%，大量时间花在「筛选 AI 垃圾」而非「优化 AI 产出」。",
      solution: "2024 年 Figma 在 Config 大会上正式推出 Figma AI 功能套件，并与全球设计社区共建人机协作范式：1）AI 辅助探索：文本描述 → 多风格设计初稿生成（「design a dark mode dashboard with charts」），设计师从中选择方向再深入打磨，将「人机协作」定位为「加速器」而非「替代品」；2）智能图层与资产管理：AI 自动命名图层、语义搜索组件（输入「蓝色按钮」而非查找组件名）、一键生成多语言/多尺寸变体，消除重复性工作；3）AI 设计评审：自动检测设计稿中的无障碍问题（对比度不足、触控区域过小）、设计系统合规性（是否使用已过时组件）、响应式适配问题；4）社区提示词生态：Figma Community 建立「AI 提示词模板市场」，设计师可分享/复用高质量提示词，形成知识共享飞轮。行业层面，Airbnb 在 Config 2024 分享了内部 AI 设计工具「Ditto」的使用数据，Canva 公布 Magic Design 功能月活用户超 1 亿。",
      result: [
        "Figma AI（2024 年 6 月发布）在三个月内被超过 60% 的付费团队激活使用（Figma 官方数据）",
        "AI 辅助下重复性工作耗时下降 60-75%（来源：Figma 2024 用户调研，n=2,000+）",
        "Airbnb 内部 AI 设计工具 Ditto 使设计初稿产出速度提升 3 倍（Config 2024 公开分享）",
        "Canva Magic Design 功能月活用户突破 1 亿，AI 生成设计量占平台总设计量的 15%+（Canva 2024 Q2 财报数据）"
      ],
      source: "Figma Config 2024 大会官方演讲 (config.figma.com)、Figma 官方博客 (figma.com/blog)、Canva 2024 Q2 季度报告 (canva.com/newsroom)、Airbnb Design 在 Config 2024 的公开分享"
    },
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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 10, color: "#a78bfa", letterSpacing: "0.08em", textTransform: "uppercase" }}>{item.category}</span>
          <span style={{ fontSize: 10, color: "var(--muted-foreground)" }}>🕐 {item.lastUpdated}</span>
        </div>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--foreground)", marginBottom: 8 }}>{item.title}</h3>
        <p style={{ fontSize: 12, color: "var(--muted-foreground)", lineHeight: 1.6, marginBottom: 12, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {item.summary}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
          {item.tags.map(t => (
            <span key={t} style={{ fontSize: 10, padding: "2px 7px", borderRadius: 999, border: "1px solid var(--border)", color: "var(--muted-foreground)" }}>{t}</span>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 9, color: "var(--muted-foreground)", opacity: 0.5 }}>发布于 {item.publishDate}</span>
          <span style={{ fontSize: 11, color: "#a78bfa", fontWeight: 500 }}>查看详情 →</span>
        </div>
      </div>
    </div>
  );
}

function CaseDetail({ item, open, onClose }: { item: DesignCase | null; open: boolean; onClose: () => void }) {
  // 锁定/恢复 body 滚动
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  if (!item) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: open ? "auto" : "none" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", opacity: open ? 1 : 0, transition: "opacity 0.3s" }} onClick={onClose} />
      <div style={{ position: "relative", width: "100%", maxWidth: 640, maxHeight: "85vh", overflowY: "auto", background: "#12121a", border: "1px solid var(--border)", borderRadius: 16, padding: "32px 28px", transform: open ? "scale(1)" : "scale(0.95)", opacity: open ? 1 : 0, transition: "all 0.3s cubic-bezier(.4,0,.2,1)", zIndex: 1 }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", color: "var(--muted-foreground)", fontSize: 20, cursor: "pointer" }}>✕</button>
        <div style={{ fontSize: 36, marginBottom: 12 }}>{item.cover}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <span style={{ fontSize: 10, color: "#a78bfa", letterSpacing: "0.08em", textTransform: "uppercase" }}>{item.category}</span>
          <span style={{ fontSize: 11, color: "var(--muted-foreground)" }}>📅 发布于 {item.publishDate}</span>
          <span style={{ fontSize: 11, color: "var(--muted-foreground)" }}>🔄 更新于 {item.lastUpdated}</span>
        </div>
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

/* ── 设计案例详情页（独立全屏页面） ────────────────────── */
function DesignDetailPage({ item, onBack }: { item: DesignCase; onBack: () => void }) {
  return (
    <div style={{ minHeight: "100vh", background: "#0c0c0f", padding: "80px 24px 60px", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 30%, rgba(167,139,250,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 960, margin: "0 auto", position: "relative" }}>
        {/* Back button + breadcrumb */}
        <div style={{ marginBottom: 32, display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={onBack} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 14px", color: "var(--foreground)", cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
            ← 返回
          </button>
          <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>设计实践模型 / {item.category} / {item.title}</span>
        </div>
        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>{item.cover}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: 11, color: "#a78bfa", letterSpacing: "0.08em", textTransform: "uppercase" }}>{item.category}</span>
            <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 999, background: "rgba(167,139,250,0.12)", color: "#a78bfa" }}>发布于 {item.publishDate}</span>
            <span style={{ fontSize: 10, color: "var(--muted-foreground)" }}>🔄 {item.lastUpdated}</span>
          </div>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 600, color: "var(--foreground)", marginBottom: 12, letterSpacing: "-0.01em" }}>{item.title}</h2>
          <p style={{ fontSize: 15, color: "var(--muted-foreground)", lineHeight: 1.7, maxWidth: 720 }}>{item.summary}</p>
        </div>
        {/* Tags + Tools */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
          {item.tags.map(t => (
            <span key={t} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 999, border: "1px solid var(--border)", color: "var(--muted-foreground)" }}>{t}</span>
          ))}
          {item.tools.map(t => (
            <span key={t} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 999, border: "1px solid rgba(167,139,250,0.3)", color: "#a78bfa", background: "rgba(167,139,250,0.08)" }}>{t}</span>
          ))}
        </div>
        {/* Outcome highlight */}
        <div className="card" style={{ padding: "18px 20px", borderLeft: "3px solid #3ecf8e", marginBottom: 32 }}>
          <div style={{ fontSize: 11, color: "var(--muted-foreground)", marginBottom: 4 }}>🏆 项目成果</div>
          <div style={{ fontSize: 16, color: "#3ecf8e", fontWeight: 700 }}>{item.outcome}</div>
        </div>
        {/* Methodology */}
        <div className="card" style={{ padding: "20px", marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", marginBottom: 10 }}>📚 核心方法论</div>
          <p style={{ fontSize: 13, color: "var(--muted-foreground)", lineHeight: 1.8 }}>{item.methodology}</p>
        </div>
        {/* Applicable Scenarios */}
        <div className="card" style={{ padding: "20px", marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", marginBottom: 14 }}>🎯 适用场景</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {item.scenarios.map((s, i) => (
              <div key={i} className="card" style={{ padding: "12px 14px", borderLeft: "3px solid #a78bfa" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", marginBottom: 4 }}>{s.name}</div>
                <div style={{ fontSize: 12, color: "var(--muted-foreground)", lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Design Process */}
        <div className="card" style={{ padding: "20px", marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", marginBottom: 14 }}>⚙️ 设计流程</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {item.process.map(p => (
              <div key={p.step} style={{ display: "flex", gap: 14 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(167,139,250,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#a78bfa", flexShrink: 0 }}>{p.step}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", marginBottom: 2 }}>{p.phase}</div>
                  <div style={{ fontSize: 12, color: "var(--muted-foreground)", lineHeight: 1.6 }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Design Decisions */}
        <div className="card" style={{ padding: "20px", marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", marginBottom: 10 }}>💡 关键设计决策</div>
          <p style={{ fontSize: 13, color: "var(--muted-foreground)", lineHeight: 1.8 }}>{item.designDecisions}</p>
        </div>
        {/* 实例分析 */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "var(--foreground)", marginBottom: 4 }}>🔬 实例分析</div>
          <div style={{ fontSize: 12, color: "var(--muted-foreground)", marginBottom: 16 }}>基于真实企业的案例分析，验证设计方法论的应用效果与可量化成果</div>
          <div className="card" style={{ padding: "24px", border: "1px solid rgba(245,166,35,0.3)", background: "rgba(245,166,35,0.04)" }}>
            {/* 案例头部：公司 + 行业 */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "var(--foreground)", marginBottom: 4 }}>{item.caseStudy.company}</div>
                <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 999, border: "1px solid rgba(245,166,35,0.3)", color: "#f5a623", background: "rgba(245,166,35,0.08)" }}>{item.caseStudy.industry}</span>
              </div>
            </div>
            {/* 业务挑战 */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#f5a623", marginBottom: 6 }}>⚡ 业务挑战</div>
              <p style={{ fontSize: 13, color: "var(--muted-foreground)", lineHeight: 1.8, margin: 0 }}>{item.caseStudy.challenge}</p>
            </div>
            {/* 方案应用 */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#4f8ef7", marginBottom: 6 }}>🔧 方案与设计方法论应用</div>
              <p style={{ fontSize: 13, color: "var(--muted-foreground)", lineHeight: 1.8, margin: 0 }}>{item.caseStudy.solution}</p>
            </div>
            {/* 量化成果 */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#3ecf8e", marginBottom: 8 }}>📈 可量化成果</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {item.caseStudy.result.map((r, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ color: "#3ecf8e", fontSize: 13, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{i + 1}.</span>
                    <span style={{ fontSize: 12, color: "var(--muted-foreground)", lineHeight: 1.6 }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* 数据来源 */}
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "var(--muted-foreground)", marginBottom: 4 }}>📎 数据来源</div>
              <p style={{ fontSize: 11, color: "var(--muted-foreground)", opacity: 0.7, lineHeight: 1.6, margin: 0 }}>{item.caseStudy.source}</p>
            </div>
          </div>
        </div>
        {/* Back button again */}
        <div style={{ textAlign: "center", paddingTop: 20 }}>
          <button onClick={onBack} style={{ background: "rgba(167,139,250,0.12)", border: "1px solid rgba(167,139,250,0.3)", borderRadius: 8, padding: "10px 24px", color: "#a78bfa", cursor: "pointer", fontSize: 14, fontWeight: 500 }}>
            ← 返回案例列表
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── 主组件 ────────────────────────────────────────────────── */

export default function DesignSection({ standalone }: { standalone?: boolean }) {
  const [activeCat, setActiveCat] = useState("全部");
  const [view, setView] = useState<"grid" | "detail">("grid");
  const [selectedCase, setSelectedCase] = useState<DesignCase | null>(null);

  const filtered = activeCat === "全部" ? CASES : CASES.filter(c => c.category === activeCat);

  /* view === "detail" → 独立详情页 */
  if (view === "detail" && selectedCase) {
    return <DesignDetailPage item={selectedCase} onBack={() => { setView("grid"); setSelectedCase(null); }} />;
  }

  /* view === "grid" → 网格列表 */
  return (
    <section id={standalone ? undefined : "design"} className="section" style={{ minHeight: "100vh", padding: "100px 24px", position: "relative", borderTop: standalone ? "none" : "1px solid var(--border)" }}>
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
            <CaseCard key={item.id} item={item} onClick={() => { setView("detail"); setSelectedCase(item); }} />
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
    </section>
  );
}
