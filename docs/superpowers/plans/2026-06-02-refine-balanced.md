# Refine lp-dedaristore (Balanced) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix backend security issues, remove unused dependencies, and polish UI for production deployment to store.dedariautomation.com via Cloudflare Pages.

**Architecture:** Static React frontend (read config.json directly, no API calls) deployed to Cloudflare Pages. FastAPI backend is minimal/unused by frontend — only fix for correctness. Frontend bundle cleaned up by removing ~14 unused packages and 7 unused UI files.

**Tech Stack:** React 19, CRACO, Tailwind CSS, framer-motion, FastAPI, MongoDB (Motor)

---

## File Map

**Modified:**
- `backend/server.py` — fix CORS default, fix deprecated @app.on_event → lifespan
- `frontend/src/index.js` — remove QueryClientProvider wrapper (react-query unused)
- `frontend/package.json` — remove 14 unused packages

**Deleted:**
- `frontend/src/components/ui/calendar.jsx` — only uses react-day-picker (unused in app)
- `frontend/src/components/ui/command.jsx` — only uses cmdk (unused in app)
- `frontend/src/components/ui/form.jsx` — only uses react-hook-form (unused in app)
- `frontend/src/components/ui/drawer.jsx` — only uses vaul (unused in app)
- `frontend/src/components/ui/sonner.jsx` — only uses next-themes/sonner (unused in app)
- `frontend/src/components/ui/resizable.jsx` — only uses react-resizable-panels (unused in app)
- `frontend/src/components/ui/input-otp.jsx` — only uses input-otp (unused in app)

**UI Polish:**
- `frontend/src/components/sections/FloatingWhatsApp.jsx` — move from left to right (standard UX)

---

## Task 1: Fix Backend CORS

**Files:**
- Modify: `backend/server.py:72-76`

- [ ] **Step 1: Update CORS middleware**

Replace:
```python
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)
```

With:
```python
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', 'http://localhost:3000').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)
```

- [ ] **Step 2: Commit**

```bash
git add backend/server.py
git commit -m "fix: restrict CORS default to localhost instead of wildcard"
```

---

## Task 2: Fix Deprecated FastAPI Lifespan

**Files:**
- Modify: `backend/server.py`

- [ ] **Step 1: Add asynccontextmanager import**

At top of file, change:
```python
from fastapi import FastAPI, APIRouter
```
To:
```python
from contextlib import asynccontextmanager
from fastapi import FastAPI, APIRouter
```

- [ ] **Step 2: Add lifespan function before app = FastAPI()**

Add this block right before `app = FastAPI()`:
```python
@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    client.close()
```

- [ ] **Step 3: Wire lifespan into FastAPI**

Change:
```python
app = FastAPI()
```
To:
```python
app = FastAPI(lifespan=lifespan)
```

- [ ] **Step 4: Remove the old shutdown handler**

Delete these lines at the bottom of the file:
```python
@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
```

- [ ] **Step 5: Commit**

```bash
git add backend/server.py
git commit -m "fix: migrate from deprecated on_event to lifespan context manager"
```

---

## Task 3: Remove Unused UI Component Files

**Files:**
- Delete: 7 files in `frontend/src/components/ui/`

These files are only used internally (import from 3rd-party packages) and are never imported anywhere in `frontend/src/` app code.

- [ ] **Step 1: Delete unused UI files**

```bash
rm frontend/src/components/ui/calendar.jsx
rm frontend/src/components/ui/command.jsx
rm frontend/src/components/ui/form.jsx
rm frontend/src/components/ui/drawer.jsx
rm frontend/src/components/ui/sonner.jsx
rm frontend/src/components/ui/resizable.jsx
rm frontend/src/components/ui/input-otp.jsx
```

- [ ] **Step 2: Verify no broken imports**

```bash
grep -r "ui/calendar\|ui/command\|ui/form\|ui/drawer\|ui/sonner\|ui/resizable\|ui/input-otp" frontend/src/ --include="*.jsx" --include="*.js"
```

Expected: no output (zero matches).

- [ ] **Step 3: Commit**

```bash
git add -u frontend/src/components/ui/
git commit -m "chore: remove unused shadcn UI component files"
```

---

## Task 4: Remove Unused Packages from package.json

**Files:**
- Modify: `frontend/package.json`
- Modify: `frontend/src/index.js`

- [ ] **Step 1: Update index.js — remove QueryClientProvider**

Replace the entire content of `frontend/src/index.js` with:
```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import App from "@/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

- [ ] **Step 2: Remove unused packages**

```bash
cd frontend && yarn remove \
  recharts \
  react-router-dom \
  react-hook-form \
  @hookform/resolvers \
  zod \
  react-day-picker \
  date-fns \
  input-otp \
  vaul \
  cmdk \
  next-themes \
  sonner \
  react-resizable-panels \
  @tanstack/react-query \
  swr \
  dayjs \
  lodash \
  @types/lodash
```

- [ ] **Step 3: Verify build succeeds**

```bash
cd frontend && yarn build 2>&1 | tail -20
```

Expected: `The build folder is ready to be deployed.` with no errors.

- [ ] **Step 4: Commit**

```bash
git add frontend/package.json frontend/src/index.js frontend/yarn.lock
git commit -m "chore: remove 18 unused packages, simplify index.js"
```

---

## Task 5: UI Polish — FloatingWhatsApp Position

**Files:**
- Modify: `frontend/src/components/sections/FloatingWhatsApp.jsx:21`

WhatsApp floating buttons are universally placed on the **right** side. Current position (`left-5`) is non-standard and may confuse users.

- [ ] **Step 1: Move button from left to right**

In `FloatingWhatsApp.jsx`, change line 21:
```jsx
className={`fixed z-50 bottom-5 left-5 sm:left-6 sm:bottom-6 transition-all duration-300 ${
```
To:
```jsx
className={`fixed z-50 bottom-5 right-5 sm:right-6 sm:bottom-6 transition-all duration-300 ${
```

- [ ] **Step 2: Commit**

```bash
git add frontend/src/components/sections/FloatingWhatsApp.jsx
git commit -m "fix: move floating WhatsApp button to right side (standard UX)"
```

---

## Task 6: Verify Final Build & Push to GitHub

- [ ] **Step 1: Run final build**

```bash
cd frontend && yarn build 2>&1 | tail -20
```

Expected: `The build folder is ready to be deployed.`

- [ ] **Step 2: Check build folder size**

```bash
du -sh frontend/build/
```

- [ ] **Step 3: Push all changes to GitHub**

```bash
git push origin main
```

Expected: All 5 commits pushed successfully.

---

## Deploy to Cloudflare Pages (Post-Plan)

After this plan completes, deploy via Cloudflare Pages dashboard:
1. Go to Cloudflare Pages → Create project → Connect to Git → select `ekanarotama/lp-dedaristore`
2. Build settings:
   - **Framework preset:** Create React App
   - **Build command:** `cd frontend && yarn build`
   - **Build output directory:** `frontend/build`
3. Set custom domain: `store.dedariautomation.com`
