#!/bin/bash
set -e
cd "$(dirname "$0")/.."

echo "Starting Xdesign..."
npm run db:push
npm run build
npm run start &
SERVER_PID=$!

sleep 3

if command -v cloudflared &>/dev/null; then
  CLOUDFLARED=cloudflared
elif [ -x /tmp/cloudflared ]; then
  CLOUDFLARED=/tmp/cloudflared
else
  curl -sL https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /tmp/cloudflared
  chmod +x /tmp/cloudflared
  CLOUDFLARED=/tmp/cloudflared
fi

echo "Creating public tunnel..."
$CLOUDFLARED tunnel --url http://localhost:3000

wait $SERVER_PID
