#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# scripts/start-emulator.sh
# KrimeWatch — Firebase Firestore Emulator launcher for local Linux development
#
# Usage:
#   bash scripts/start-emulator.sh          # start emulator (foreground)
#   bash scripts/start-emulator.sh --bg     # start emulator in background
#
# Requirements: Node.js >= 18, npm, Java 11+ (for Firebase Emulator Suite)
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
BG=false

# ── Parse flags ──────────────────────────────────────────────────────────────
for arg in "$@"; do
  case "$arg" in
    --bg) BG=true ;;
    -h|--help)
      echo "Usage: bash scripts/start-emulator.sh [--bg]"
      echo "  --bg   Start emulator in background (writes PID to .emulator.pid)"
      exit 0 ;;
  esac
done

# ── Check Node.js ─────────────────────────────────────────────────────────────
if ! command -v node &>/dev/null; then
  echo "[ERROR] Node.js not found. Install Node.js >= 18 first."
  exit 1
fi

NODE_MAJOR=$(node -e "process.stdout.write(String(process.versions.node.split('.')[0]))")
if [ "$NODE_MAJOR" -lt 18 ]; then
  echo "[ERROR] Node.js >= 18 required (found $(node --version))."
  exit 1
fi

# ── Check Java (required by Firebase Emulator Suite) ─────────────────────────
if ! command -v java &>/dev/null; then
  echo "[WARN] Java not found. Firebase Emulator Suite requires Java 11+."
  echo "       Install with:  sudo apt-get install -y default-jre"
  echo "       Then re-run this script."
  exit 1
fi

# ── Install Firebase CLI if missing ──────────────────────────────────────────
if ! command -v firebase &>/dev/null; then
  echo "[INFO] Firebase CLI not found. Installing globally via npm..."
  npm install -g firebase-tools
  echo "[INFO] Firebase CLI installed: $(firebase --version)"
else
  echo "[INFO] Firebase CLI found: $(firebase --version)"
fi

# ── Install project dependencies if needed ───────────────────────────────────
if [ ! -d "$PROJECT_DIR/node_modules" ]; then
  echo "[INFO] node_modules not found. Running npm install..."
  (cd "$PROJECT_DIR" && npm install)
fi

# ── Copy .env.emulator → .env if .env does not exist ─────────────────────────
if [ ! -f "$PROJECT_DIR/.env" ] && [ -f "$PROJECT_DIR/.env.emulator" ]; then
  cp "$PROJECT_DIR/.env.emulator" "$PROJECT_DIR/.env"
  echo "[INFO] Copied .env.emulator → .env"
fi

# ── Start the emulator ────────────────────────────────────────────────────────
cd "$PROJECT_DIR"

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "  KrimeWatch Firestore Emulator"
echo "  Firestore UI : http://localhost:4000"
echo "  Firestore API: http://localhost:8080"
echo "  Auth Emulator: http://localhost:9099"
echo "  Press Ctrl+C to stop"
echo "═══════════════════════════════════════════════════════════"
echo ""

if [ "$BG" = true ]; then
  firebase emulators:start --only firestore,auth --project krimewatch-emulator \
    > "$PROJECT_DIR/.emulator.log" 2>&1 &
  EMULATOR_PID=$!
  echo "$EMULATOR_PID" > "$PROJECT_DIR/.emulator.pid"
  echo "[INFO] Emulator started in background (PID $EMULATOR_PID)"
  echo "[INFO] Logs: $PROJECT_DIR/.emulator.log"
  echo "[INFO] Stop with: kill \$(cat $PROJECT_DIR/.emulator.pid)"
else
  exec firebase emulators:start --only firestore,auth --project krimewatch-emulator
fi
