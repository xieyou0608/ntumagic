# 台大魔幻之夜劃位系統

線上劃位系統，每年活動使用一次。2026 起翻新成全 Firebase 架構（Firestore + Functions + Hosting），前後端 mono-repo。

## 重要文件（開工前必讀）

- [docs/system-migration-plan.md](docs/system-migration-plan.md) — 翻新方案決定（為何選 Firebase、不選 Supabase / Data Connect / SQLite 等）
- [docs/implementation-research.md](docs/implementation-research.md) — Firestore 資料模型 / Functions 實作 / 各種設計取捨

任何重大改動前先讀這兩份；不要繞過。

## 系統使用情境

- **不到 1000 人使用、一年只用一次**
- audience 不需要帳號，只填 email + 收驗證信（驗證連結每次劃位都附）
- admin 是**共用單一帳號**（Firebase Auth Email/Password + ID Token），由負責人交接密碼
- **不轉移舊資料**：每年活動都是全新狀態，重跑 seed 產出空座位
- 上一代 MERN 版本 archive 在 [ntumagic-server (archived)](https://github.com/xieyou0608/ntumagic-server)

## 目錄速覽

- `web/` — 前端（CRA + React 17 + MUI + Redux Toolkit + axios + react-router-dom 6）
- `functions/` — Firebase Functions (Node 20)
  - `index.js` — 入口 `exports.api = onRequest(app)`
  - `app.js` — Express app，掛載 `/api/seats /api/audience /api/admin`
  - `lib/` — firestore / email / phases / tokens / auth-middleware
  - `routes/` — 各 endpoint
- `scripts/` — 本機腳本
  - `generate-seats.js` — **場地座位定義（換劇場時改這裡）**
  - `seed-seats.js` — 寫進 Firestore（吃 ADC 認證）
- `docs/` — 翻新研究 + 流程圖
- `firestore.rules` — 預設全拒，所有 IO 走 Functions（client SDK 摸不到 DB）
- `firestore.indexes.json` — composite index `(floor, area, row, col)`
- `firebase.json` — 描述 functions + hosting + firestore + emulators

## 開發習慣

- **換劇場** = 改 `scripts/generate-seats.js` + 重跑 `node scripts/seed-seats.js --reset`，DB schema / API / 前端都不用動
- **階段時間**（測試 / NTU 優先 / 公開）兩處 hardcode 要同步：[functions/lib/phases.js](functions/lib/phases.js) 跟 [web/src/pages/BookingPage.jsx](web/src/pages/BookingPage.jsx)。後端是真正的 gate，前端只做 UX 提示
- **寄信文案 + 匯款資訊**：hardcode 在 [functions/lib/email.js](functions/lib/email.js)；每年活動改這裡
- **booking transaction**：[functions/routes/seats.js](functions/routes/seats.js)，6 張上限由後端擋；座位用 query (floor, area, row, col) lookup（不用 doc id 直查），詳見 implementation-research.md 2.3 / 2.4
- **doc id 用 Firestore auto-id**：座位身分靠 query 找，admin 改 area 是單純 update（不用刪舊 doc + 寫新 doc）
- **Secret 走 Cloud Secret Manager**：`GMAIL_PASSWORD` / `EMAIL_HASH_SECRET`；非機敏走 `functions/.env`

## 本機 emulator

```sh
firebase emulators:start --only functions,firestore,auth,hosting
# Hosting + API: http://localhost:5005
# UI: http://localhost:4000
```

Seed emulator 的 Firestore：

```sh
FIRESTORE_EMULATOR_HOST=127.0.0.1:8080 GOOGLE_CLOUD_PROJECT=ntu-magic-night node scripts/seed-seats.js
```

Functions emulator 用的 secret 走 `functions/.secret.local`（已 gitignore，僅本機 dummy 值）；env 走 `functions/.env.local` 或 `functions/.env`。

## 部署

```sh
cd web && npm run build && cd ..
firebase deploy
```

一行推 functions + hosting + firestore rules / indexes。
