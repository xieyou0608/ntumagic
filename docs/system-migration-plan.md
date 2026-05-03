# 劃位系統翻新評估

## 時間點

2026 台大魔夜 30 魔

## 背景

目前的劃位系統前後端分離，採用 MERN stack（MongoDB + Express + React + Node.js）：

- **前端 / 後端**：皆部署在 GCP App Engine
- **資料庫**：MongoDB Atlas

系統已有數年歷史，現況有幾個痛點：

- App Engine + MongoDB Atlas 的部署流程偏繁瑣，現在看來有點過時
- MongoDB Atlas 的免費專案如果一段時間沒使用，會被自動暫停，每年回來用時都要先處理

## 使用情境

- 使用者數量：**不到 1000 人**
- 使用頻率：**一年只會用一次**（過去 3 ～ 4 年皆是如此）
- 過去經驗：即使搶位子時有幾百人同時操作，也從未踩到 race condition

→ 結論：流量極小，不需要依賴很重的服務，整體系統可以「輕便化」，把維運成本壓到最低。

## 翻新方向

- **MongoDB 確定移除**
- 要選一套部署簡單、平常不用維護、需要時隨時能用的架構

## 候選方案

### 方案 1：Supabase PostgreSQL + Cloud Run / Firebase Functions + Firebase Hosting

- **資料庫**：Supabase 提供的 PostgreSQL（有免費額度）
- **後端**：Cloud Run 或 Firebase Functions
- **前端**：Firebase Hosting

**優點**

- PostgreSQL + SQL transaction 是業界標準，幾乎所有工程師都能看懂與維護
- 核心搶位子邏輯用 SQL transaction 寫起來很穩定、語意清楚
- 之後交接或讓其他人接手成本低

**缺點 / 風險**

- 服務分散在 Supabase + GCP / Firebase 兩邊，要管兩個帳號與兩套 quota
- **Supabase 免費方案的閒置政策對本情境很不友善**（詳見下方「Supabase Free Tier 閒置政策」一節）

### 方案 2：Firebase Firestore + Firebase Functions + Firebase Hosting（全 Firebase）

- **資料庫**：Firestore
- **後端**：Firebase Functions
- **前端**：Firebase Hosting

**優點**

- 全部都在 Firebase / Google 體系內，整合度高、部署單純
- **Firestore / Firebase 沒有「閒置就暫停」這種政策**，只要不超過免費額度就一直活著，最符合「一年用一次」的情境（詳見下方「Firebase 閒置政策」一節）
- 不用管伺服器、不用管 DB instance，平常完全零維護

**缺點 / 風險**

- Firestore 的交易邏輯（`runTransaction` / 樂觀鎖 + retry）跟傳統 SQL transaction 不太一樣，要稍微學一下
- 用在「搶位子」這種需要強一致性的場景，理論上要小心，但以本系統「幾百人同時搶」的量級判斷，問題應該不大
- 資料模型偏 NoSQL，要事先想好 schema，不像 SQL 那樣彈性 join
- **Cloud Functions 部署需要 Blaze（pay-as-you-go）方案**，必須綁信用卡；不過 Blaze 仍保留所有 Spark 的免費額度，以本系統的流量幾乎可以確定不會被收費（建議再加上 budget alert 保險）

**前端存取原則（重要）**

即使搬到 Firestore，**前端也不要直接讀寫 Firestore**，而是透過 Firebase Functions 提供 API：

- Firebase Functions 當成傳統後端使用，提供 GET / UPDATE 等 endpoint
- 好處：搶位子的核心邏輯（驗證、交易、防呆）集中在後端，安全性與可控性比較高
- 缺點：放棄了 Firestore 即時同步 / 直接 listen 的優勢，但對這個使用情境不重要

## 免費方案閒置政策比較

### Supabase Free Tier 閒置政策（2026 年現況）

| 階段                 | 行為                                                                 |
| -------------------- | -------------------------------------------------------------------- |
| 連續 7 天沒有活動    | 專案自動暫停（pause）                                                |
| 暫停後 90 天內       | 可以在 dashboard 一鍵 restore                                        |
| 超過 90 天沒 restore | 不能 restore，只能下載 logical backup + Storage 檔案，等於要重建專案 |

「活動」的判斷依據是 API 請求 / DB query 等實際流量。

**對本系統「一年只用一次」的意義：**

- 中間至少有 350+ 天閒置 → **每年都會超過 90 天的 restore 視窗**
- 等於每年使用前都要：下載備份 → 開新專案 → import 資料 → 重新設定 connection string、env、RLS policies
- 想避開只能：
  1. 升級 Pro Plan（$25 / 月，一年 $300，殺雞用牛刀）
  2. 排程一個 keep-alive heartbeat（例如 GitHub Actions 每 5 天打一次 `select 1`）— 可行但要額外維護

### Firebase 閒置政策

- **Firestore / Firebase 沒有「閒置就暫停」的官方政策**，沒人用就放著，下次直接用，狀態與資料都會保留
- 唯一限制是「超過免費額度時當月會被停用」，跟閒置完全無關 → 對「一年用一次」反而是優勢
- **但要注意：Cloud Functions 部署需要 Blaze 方案**（pay-as-you-go，要綁卡），Spark 免費方案已經不能 deploy functions
  - Blaze 仍然保留所有 Spark 的免費額度（Functions 每月 2M 次調用、Firestore 每天 50K 讀 / 20K 寫等）
  - 以本系統「一年一次、幾百人」的量級，幾乎不可能超出免費額度，預期實際費用 ≈ $0
  - 建議搭配 GCP **budget alert**（例如設 $1 就寄 email）當保險，避免有意外大量請求

→ 結論：閒置友善度上，Firebase **明顯優於** Supabase。

## 方案比較

考慮閒置政策後，兩方案的對比：

| 面向                   | 方案 1（Supabase + PG）              | 方案 2（全 Firebase）           |
| ---------------------- | ------------------------------------ | ------------------------------- |
| 一年只用一次的友善程度 | **低**（每年都要從 backup 重建專案） | **高**（沒人用也不會被動）      |
| 搶位子交易語意         | 直觀（標準 SQL）                     | 需熟悉 Firestore TX             |
| 部署 / 維運簡單度      | 中（兩個服務）                       | 高（單一平台）                  |
| 工程師接手難度         | 低                                   | 中                              |
| 是否需要綁信用卡       | 否                                   | 是（Blaze，但實質應該不會收費） |

## 決定

**採用方案 2：全 Firebase（Firestore + Firebase Functions + Firebase Hosting）。**

主要決定點：

1. **閒置友善度差距太大**：Supabase 每年都要從 backup 重建專案，維運成本不划算；Firebase 沒人用也不會被動，最符合「一年用一次」的情境
2. **Firestore 在小流量下能處理搶位子交易**：`runTransaction` 是樂觀鎖 + retry，只要 schema 設計成「一個座位一份 document」，不同座位之間完全不衝突；以本系統的量級不會有問題
3. **Firebase Functions 作為單一後端不會比 Cloud Run 差**：Functions Gen 2 底層就是 Cloud Run，差異主要在 deploy / wiring 上；單一平台的整合反而是優勢（一行 `firebase deploy` 處理 functions + hosting + firestore rules）
4. **唯一要接受的代價**：Blaze 方案要綁信用卡 + 第一次冷啟動（一年用一次的第一個使用者會等個幾秒，可在開放搶位前先打 warm-up 規避）

## 不採用的選項（避免日後又回頭問）

- **Cloud Run + Firestore（直接用 Cloud Run 而非 Firebase Functions）**：Functions Gen 2 底層就是 Cloud Run，但用 Firebase CLI deploy 時可以跟 Hosting / Firestore rules 一起一行搞定，整合度更好
- **Vercel + Neon / PlanetScale 等 serverless DB**：又要管兩個平台，且 Neon / PlanetScale 也都有閒置暫停或 trial 結束計費的問題，跟 Supabase 同類
- **自管 VM + SQLite / 傳統 Express server**：要管 OS、SSL、備份、監控，違背「輕便化」初衷
- **Cloudflare Workers + D1（hosted SQLite）**：可行但等於整個拋開 Firebase 生態，且 D1 的成熟度與生態仍在演進
- **Firebase Realtime Database**：跟 Firestore 同生態的另一個選擇，但 query 能力較弱、計費以連線時間 + 流量計算，不如 Firestore 直觀；新專案優先選 Firestore

## 待決定 / 後續事項

- **設定 Blaze + budget alert**（例如 $1 就寄 email）作為費用保險
- **Express → Firebase Functions 遷移與 Firestore 資料模型設計**：見 [implementation-research.md](./implementation-research.md)（新專案，不轉移舊資料，直接在 Firestore 重新生成空座位）
- **舊系統下線時程**：等新系統上線後再規劃
