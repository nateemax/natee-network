#!/bin/bash
# natee-push - 一键提交并推送到 GitHub，触发 Vercel 部署
# 用法: ./natee-push "提交说明"

set -e

WORK_DIR="D:/AI/workbuddy_space/natee_Network"
COMMIT_MSG="${1:-自动更新}"

echo "📁 切换到工作目录: $WORK_DIR"
cd "$WORK_DIR"

echo "📊 当前状态:"
git status --short

echo ""
echo "➕ 添加所有变更..."
git add -A

echo "💾 提交: $COMMIT_MSG"
git commit -m "$COMMIT_MSG" || echo "⚠️  没有新变更，跳过提交"

echo "🚀 推送到 GitHub (触发 Vercel 部署)..."
git push origin main

echo "✅ 完成！Vercel 正在自动部署，约 1-2 分钟后可访问 https://natee-network.vercel.app/"
