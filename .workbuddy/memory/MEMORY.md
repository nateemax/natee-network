# MEMORY.md - 个人网站项目长期记忆

## 项目概况
- **项目名称**：个人网站（Natee 知识体系）
- **路径**：`D:/AI/workbuddy_space/natee_Network`
- **技术栈**：Next.js 16 + Tailwind CSS v4 + TypeScript
- **视觉风格**：深色主题，蓝紫绿渐变点缀，半透明卡片，无第三方 UI 库

## 六大模块规划
1. **总览 Hero** ✅ 已完成（2026-05-23）
2. **IDC 行业模型** - 模型卡片矩阵 + 侧边抽屉 + Agent方案
3. **设计实践模型** - 画廊 + 工具矩阵 + 案例详情页
4. **商业价值分析** - 力导向图 + ROI估算器 + 案例时间轴
5. **动态信息** - RSS抓取 + 信息流 + 关联标签（需后端）
6. **个人简介 & 联系方式** ✅ 骨架完成

## 设计决策
- 主色调：`--accent-blue: #4f8ef7`，辅色：`#a78bfa`（紫）、`#3ecf8e`（绿）、`#f5a623`（橙）
- 背景色：`#0c0c0f`（深黑）
- 卡片：`rgba(255,255,255,0.04)` 背景 + `rgba(255,255,255,0.08)` 边框
- 字体：Inter + PingFang SC（系统中文字体回退）

## 技术踩坑
- npm 11.9.0 + 含 beta 版本的 package-lock.json 会报 `Invalid Version` 错误
- 解决：删除 lock 文件重新 install
- shadcn CLI 不兼容 Next.js 16 / Tailwind v4，直接手写组件

## 开发服务器
- `D:/AI/openclaw/Node.js/npm.cmd run dev` 在项目目录执行
- 默认跑在 http://localhost:3000
