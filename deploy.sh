#!/bin/bash

set -e  # Exit on any error

echo "🚀 Deploying Express App..."

# Go to script's directory (repo root)
SCRIPT_DIR="$(dirname "$0")"
cd "$SCRIPT_DIR" || { echo "❌ Failed to enter script directory: $SCRIPT_DIR"; exit 1; }

# Get current branch name
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD) || { echo "❌ Failed to get git branch"; exit 1; }
echo "📥 Pulling latest code from branch: $CURRENT_BRANCH"
git pull origin "$CURRENT_BRANCH" || { echo "❌ Git pull failed"; exit 1; }

# Set PM2 process name based on branch
if [ "$CURRENT_BRANCH" = "beta" ]; then
    PM2_PROCESS_NAME="beta-backend"
    echo "📌 Branch is 'beta' → Using PM2 process name: $PM2_PROCESS_NAME"
else
    PM2_PROCESS_NAME="backend"
    echo "📌 Branch is '$CURRENT_BRANCH' → Using PM2 process name: $PM2_PROCESS_NAME"
fi

# Cleanup old build
echo "🧹 Removing old build..."
rm -rf dist || echo "⚠️ No dist folder to remove or already removed."

# Install & Build
echo "📦 Installing dependencies with Bun..."
bun install || { echo "❌ Bun install failed"; exit 1; }

echo "🔨 Building project..."
bun run build || { echo "❌ Build failed"; exit 1; }

# 🔧 Optional: Generate dynamic ecosystem config (only if needed)
# Remove this block if you're using a static ecosystem.config.cjs
cat > ecosystem.config.cjs << EOF
module.exports = {
	apps: [
		{
			name: "$PM2_PROCESS_NAME",
			script: "dist/index.js",
			interpreter: "bun",
			watch: false,
			ignore_watch: [
				"node_modules",
				"dist",
				"logs",
				".git",
				"tmp"
			],
			env_file: "./.env"
		}
	]
};
EOF
echo "🔧 Generated ecosystem.config.cjs for $PM2_PROCESS_NAME"

# PM2: Reload or Start
if pm2 describe "$PM2_PROCESS_NAME" &> /dev/null; then
    echo "🔄 Reloading existing PM2 process: $PM2_PROCESS_NAME"
    pm2 reload "$PM2_PROCESS_NAME" || { echo "❌ PM2 reload failed"; exit 1; }
else
    echo "🆕 Starting new PM2 process: $PM2_PROCESS_NAME"
    pm2 start ecosystem.config.cjs --no-daemon || { echo "❌ PM2 start failed"; exit 1; }
fi

echo "✅ Deployment successful for branch '$CURRENT_BRANCH' → Process: $PM2_PROCESS_NAME"