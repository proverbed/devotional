#!/usr/bin/env bash
set -euo pipefail

echo ""
echo "=== Firebase Scaffold Init ==="
echo ""

# Prompt for project details
read -rp "Firebase project ID (from Firebase Console): " PROJECT_ID
read -rp "App display name (e.g. My Cool App): " APP_NAME

# Replace placeholder project ID in .firebaserc
sed -i.bak "s/YOUR_PROJECT_ID/${PROJECT_ID}/g" .firebaserc && rm .firebaserc.bak

# Replace placeholder app name in index.html
sed -i.bak "s/Firebase App/${APP_NAME}/g" index.html && rm index.html.bak

# Copy .env.example → .env
if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created .env — fill in your Firebase SDK config values."
fi

# Install dependencies
echo ""
echo "Installing root dependencies..."
npm install

echo "Installing functions dependencies..."
npm install --prefix functions

echo ""
echo "=== Done! ==="
echo ""
echo "Next steps:"
echo "  1. Fill in .env with your Firebase SDK config values"
echo "     (Firebase Console → Project Settings → Your apps → SDK setup)"
echo ""
echo "  2. Start local development:"
echo "     npm run serve"
echo "     (builds functions + starts Firebase emulators)"
echo ""
echo "     In a separate terminal:"
echo "     npm run dev"
echo "     (starts Vite dev server with HMR)"
echo ""
echo "  3. Open http://localhost:5173 (Vite HMR)"
echo "     Emulator UI: http://localhost:4000"
echo ""
echo "  4. When ready to deploy:"
echo "     npm run deploy"
echo ""
