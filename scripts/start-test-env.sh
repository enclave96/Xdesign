#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")/.."

PORT="${PORT:-3000}"
LOG_DIR="${LOG_DIR:-/tmp/xdesign-test-env}"
mkdir -p "$LOG_DIR"

if command -v cloudflared &>/dev/null; then
  CLOUDFLARED=cloudflared
elif [ -x /tmp/cloudflared ]; then
  CLOUDFLARED=/tmp/cloudflared
else
  curl -sL https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /tmp/cloudflared
  chmod +x /tmp/cloudflared
  CLOUDFLARED=/tmp/cloudflared
fi

# Start app server if not already listening
if ! curl -sf "http://localhost:${PORT}/" >/dev/null 2>&1; then
  echo "Starting Xdesign on port ${PORT}..."
  npm run db:push >/dev/null 2>&1 || true
  PORT="$PORT" npm run start >"$LOG_DIR/server.log" 2>&1 &
  echo $! >"$LOG_DIR/server.pid"

  for _ in $(seq 1 30); do
    if curl -sf "http://localhost:${PORT}/" >/dev/null 2>&1; then
      break
    fi
    sleep 1
  done
fi

# Start tunnel if not already running
if ! pgrep -f "cloudflared tunnel --url http://localhost:${PORT}" >/dev/null 2>&1; then
  echo "Starting Cloudflare tunnel..."
  $CLOUDFLARED tunnel --url "http://localhost:${PORT}" >"$LOG_DIR/tunnel.log" 2>&1 &
  echo $! >"$LOG_DIR/tunnel.pid"
  sleep 5
fi

URL=$(rg -o 'https://[a-z0-9-]+\.trycloudflare\.com' "$LOG_DIR/tunnel.log" 2>/dev/null | tail -1 || true)
if [ -z "$URL" ]; then
  URL="https://customized-noticed-average-tech.trycloudflare.com"
fi

echo "$URL" >"$LOG_DIR/public-url.txt"
echo ""
echo "Xdesign test environment"
echo "========================"
echo "Public URL: $URL"
echo "Local URL:  http://localhost:${PORT}"
echo "Demo login: demo@xdesign.app / demo1234"
echo ""
echo "Logs: $LOG_DIR"
