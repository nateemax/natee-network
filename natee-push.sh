#!/bin/bash
# natee-push - 一键提交并推送到 GitHub，触发 Vercel 部署
# 用法: ./natee-push "提交说明"

set -e

WORK_DIR="D:/AI/workbuddy_space/natee_Network"
COMMIT_MSG="${1:-自动更新}"

echo "📂 切换到工作目录: $WORK_DIR"
cd "$WORK_DIR"

echo "📊 当前状态:"
git status -s 2>/dev/null || git status --short

if [ -z "$(git status -s 2>/dev/null)" ]; then
  echo "⚠️  没有新变更，无需提交"
  echo "🚀 直接推送（如有远程更新）..."
  git pull --rebase origin main 2>/dev/null || true
  git push origin main
  echo "✅ 完成！"
  exit 0
fi

echo ""
echo "➕ 添加所有变更..."
git add -A

echo "💾 提交: $COMMIT_MSG"
git commit -m "$COMMIT_MSG"

echo "🚀 推送到 GitHub (触发 Vercel 部署)..."
git push origin main

echo ""
echo "✅ 完成！Vercel 正在自动部署"
echo "   👉 https://natee-network.vercel.app/"
