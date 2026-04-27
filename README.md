# Firebase Scaffold

A production-ready GitHub template for new Firebase projects. Clone it, run `./init.sh`, and you're writing features in minutes.

## Stack

| Layer | Choice |
|---|---|
| Frontend | React 18 + Vite + TypeScript |
| Backend | Cloud Functions v2 (TypeScript, Node 20) |
| Database | Firestore |
| Auth | Firebase Auth (Email/Password + Google) |
| Hosting | Firebase Hosting (SPA) |
| Local dev | Firebase Emulator Suite |
| CI/CD | GitHub Actions (deploy on push to `main`) |

## Prerequisites

- [Node.js 20+](https://nodejs.org)
- [Firebase CLI](https://firebase.google.com/docs/cli): `npm install -g firebase-tools`
- Java 11+ (required by Firebase Emulator Suite)
- A Firebase project ([create one here](https://console.firebase.google.com))

## Quick start

```bash
# 1. Use this template on GitHub, then clone your new repo
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME

# 2. Run the init script (sets project ID, installs deps, creates .env)
./init.sh

# 3. Fill in your Firebase SDK config values in app/.env
#    Firebase Console → Project Settings → Your apps → SDK setup

# 4. Log in to Firebase (first time only)
firebase login

# 5. Start local development
npm run dev
```

Open:
- **App (HMR)**: http://localhost:5173
- **App (hosted)**: http://localhost:5000
- **Emulator UI**: http://localhost:4000

## Project structure

```
firebase-scaffold/
├── .github/workflows/deploy.yml   # CI/CD: deploy on push to main
├── app/                           # React + Vite frontend
│   ├── src/
│   │   ├── components/AuthGuard   # Route protection
│   │   ├── contexts/AuthContext   # Auth state via React context
│   │   ├── hooks/useAuth          # Typed useAuth() hook
│   │   ├── pages/Login + Home     # Example pages
│   │   └── services/              # firebase.ts, auth.ts, firestore.ts
│   └── .env.example
├── functions/                     # Cloud Functions v2 (TypeScript)
│   └── src/
│       ├── admin.ts               # firebase-admin singleton
│       ├── auth/onUserCreated     # Creates user doc on signup
│       └── api/hello              # Example onCall function
├── firebase.json                  # Hosting + Functions + Firestore + Emulators
├── firestore.rules                # Secure by default
└── init.sh                        # Post-clone setup script
```

## Environment variables

Copy `app/.env.example` to `app/.env` and fill in values from the Firebase Console:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_USE_EMULATOR=false   # set to true for local dev against emulators
```

Set `VITE_USE_EMULATOR=true` in development so the app talks to local emulators instead of production.

## Available scripts

From the repo root:

| Script | What it does |
|---|---|
| `npm run dev` | Start emulators + Vite dev server (concurrently) |
| `npm run build` | Production build of the frontend |
| `npm run deploy` | Build + `firebase deploy` (hosting + functions) |
| `npm run deploy:hosting` | Deploy hosting only |
| `npm run deploy:functions` | Deploy functions only |

## Deploying

```bash
npm run deploy
```

For the GitHub Actions CI/CD to work, add these secrets to your repo
(Settings → Secrets and variables → Actions):

| Secret | Where to get it |
|---|---|
| `FIREBASE_SERVICE_ACCOUNT` | Firebase Console → Project Settings → Service accounts → Generate new private key |
| `VITE_FIREBASE_API_KEY` | Firebase Console → Project Settings → Your apps → SDK setup |
| `VITE_FIREBASE_AUTH_DOMAIN` | (same) |
| `VITE_FIREBASE_PROJECT_ID` | (same) |
| `VITE_FIREBASE_STORAGE_BUCKET` | (same) |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | (same) |
| `VITE_FIREBASE_APP_ID` | (same) |

## Extending

**Add a new Cloud Function:**
```typescript
// functions/src/api/myFunction.ts
import { https } from "firebase-functions/v2";
export const myFunction = https.onCall({ cors: true }, async (request) => {
  return { result: "..." };
});
// Then add: export { myFunction } from "./api/myFunction"; in index.ts
```

**Add a new Firestore collection:**
Update `firestore.rules` to add read/write rules for the new collection path.

**Add a new auth provider:**
In `app/src/services/auth.ts`, import and configure the provider (e.g. `GithubAuthProvider`), then wire it into `AuthContext`.

## License

MIT
