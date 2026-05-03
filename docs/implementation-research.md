# Firebase 實作研究

> **2026-05-03 修訂**：信箱驗證流程已整個移除（`/api/audience/verify`、`emailVerified` / `emailVerifyToken` 欄位、`EMAIL_HASH_SECRET` secret、前端 `VerifyPage`、後台「驗證」欄）。原因：實際運作後發現 admin 對「沒驗證但匯款進帳」的人還是要照常處理，這個訊號完全沒影響工作流，純粹增加觀眾困擾。下文所有提到 verify / `emailVerified` 的段落已就地修正，但保留歷史脈絡（哪些東西原本存在、為何拿掉）方便回溯。

## 文件定位

[system-migration-plan.md](./system-migration-plan.md) 已決定採用全 Firebase 架構（Firestore + Firebase Functions + Firebase Hosting）。本文件研究兩個主題：

1. 既有 Express server 怎麼遷移到 Firebase Functions
2. Firestore 資料模型怎麼設計（**新專案，不需要遷移舊資料**，只要在 Firestore 重新生成空的座位即可）

實作細節（檔案結構、deploy script、env 變數列表）等真的開始動工再寫。

## 系統使用情境補充

劃位流程設計上**沒有「使用者帳號」的概念**：

- **一般使用者（audience）**：
  - 只填 email + 個人資訊（姓名、電話、匯款帳號）+ 想劃的座位就送出
  - 系統寄一封劃位通知信給該 email（含座位 + 匯款資訊）
  - 沒有「註冊」、「登入」、「密碼」這些流程
  - ~~舊版有信箱驗證流程（點連結回打 `/api/audience/verify`）~~ → 2026-05-03 移除，admin 對未驗證 / 已驗證的觀眾處理流程完全相同
- **Admin**：
  - 整個系統 **一組共用帳號密碼**，由負責人員共用
  - 只有 admin 需要登入

→ 對 Auth 的影響：絕大多數使用者根本沒有帳號，只有 admin 那組要登入。

---

## 1. Express → Firebase Functions

### 1.1 兩種遷移模式

**模式 A：把整個 Express app 包成單一 Function（推薦）**

```js
const { onRequest } = require("firebase-functions/v2/https");
const app = require("./app"); // 你既有的 express app
exports.api = onRequest(app);
```

- 優點：route / middleware 結構幾乎不動，現有 `routes/auth-route.js`、`seat-route.js` 等可以直接搬過來
- 缺點：所有 endpoint 共用同一個 Function instance，cold start 影響範圍是整個 app
- 對本系統：**就是要這個**。流量小、route 不多，monolithic Function 最省心

**模式 B：每個 endpoint 各自一個 onCall / onRequest function**

- 優點：細粒度 deploy、scaling、權限
- 缺點：要重寫成 Firebase 慣用的 `onCall(handler)` 風格、middleware 模式不同
- 對本系統：殺雞用牛刀，不採用

### 1.2 各個現有元件怎麼搬

| 現有                           | Firebase Functions 上的對應                                    |
| ------------------------------ | -------------------------------------------------------------- |
| `express()` + routes           | 整個 app 包成一個 `onRequest` function（模式 A）               |
| `mongoose.connect`             | 改用 `firebase-admin` 的 `getFirestore()`，不用維護 connection |
| `Seat`, `User` mongoose models | 改用 `db.collection('seats')` / `db.collection('bookings')`    |
| `passport-jwt` middleware      | 移除；audience 不驗 token，admin 用 Firebase Auth ID Token     |
| `cors`                         | 直接保留，Express middleware 一樣可用                          |
| `nodemailer` (Gmail)           | 直接保留，Functions 可以打外部 SMTP                            |
| `dotenv`                       | Functions Gen 2 用 `.env` 檔 + `defineSecret` 處理敏感資訊     |
| `app.listen()`                 | **拿掉**，由 Functions runtime 接管                            |

### 1.3 Auth 重構：兩條路徑

由於只有 admin 需要登入，整個 Auth 拆成兩條：

#### Audience 路徑（不需要 Firebase Auth）

- 前端表單：email + 個人資料 + 想劃的座位 → 直接打 `POST /api/seats/booking`
- 不需要 token、不需要登入
- Function 端：
  - 跑 booking transaction 寫進 Firestore
  - **transaction commit 成功後**才寄出劃位通知信（寄信失敗只記 log 不回滾）
- 第二次劃位同 email：merge 既有 booking doc，只把 `emailSent` 重置成 `false` 提醒 admin 補寄付款通知信

→ 跟現有 Express 的邏輯幾乎一樣，只是把 `User` model + bcrypt password 那一坨刪掉。

> 原始設計含信箱驗證 round-trip（HMAC(email, SECRET) → `/api/audience/verify` → 設 `emailVerified: true`），2026-05-03 整個移除，原因見頂部 changelog。

#### Admin 路徑（用 Firebase Auth Email/Password）

- 在 Firebase Console 手動建一個 admin 帳號（**不開放註冊**，密碼由負責人交接）
- 前端 admin 頁用 `signInWithEmailAndPassword` 登入，拿 ID Token
- Function middleware：

  ```js
  const idToken = req.headers.authorization?.replace("Bearer ", "");
  const decoded = await admin.auth().verifyIdToken(idToken);
  if (decoded.email !== ADMIN_EMAIL) return res.status(403).send();
  ```

- 不需要 Custom Claims（只有一組 email，直接比對即可）
- 不需要 register / password reset 流程

#### 移除掉的東西

- `passport-jwt` + JWT 簽發
- bcrypt password hashing
- `User` collection 整個刪掉：不再有 user 概念，改用 `bookings`（每個 email 一筆，本質是訂單而非帳號）
- `User.role` 欄位（沒有 audience role 了）
- `/api/user/register`、`/api/user/login` 端點
- `User.verifyToken` 流程：原本翻新時改成 booking 層的 `emailVerified` 標記，2026-05-03 連這層也整個移除

### 1.4 環境變數 / Secret

Gen 2 Functions 的做法：

- 一般 config（如 `ADMIN_EMAIL`、`GMAIL_ACCOUNT`）：放專案根的 `.env` 或 `.env.<project>` 檔，deploy 時自動帶入
- 機敏（如 `GMAIL_PASSWORD`）：用 [Cloud Secret Manager](https://cloud.google.com/secret-manager) + `defineSecret('GMAIL_PASSWORD')`，在 function 上掛 `{ secrets: [...] }`
- 不要再用 Gen 1 的 `functions.config()`，已 deprecated

> 翻新時還有 `EMAIL_HASH_SECRET` secret 給驗證 token 用，2026-05-03 隨驗證流程一起移除。

### 1.5 冷啟動 / 第一個使用者體驗

一年用一次，第一個按下「進入劃位」的人一定會打到冷啟動（約 1 ～ 3 秒）。對策：

- 在開放搶位前，admin 先打一個 ping endpoint 把 Function 暖起來
- 或設定 `minInstances: 1`，但 24/7 預留 instance 會產生小額費用
- 對搶位場景：**開放前 5 分鐘 admin 手動 ping 一次最划算**

### 1.6 CORS / Domain

Functions 預設網址是 `https://<region>-<project>.cloudfunctions.net/api/...`。可以：

- 繼續用預設網址，前端 axios baseURL 指過去即可
- 或設 Firebase Hosting rewrites，把 `/api/**` rewrite 到 function，前後端同 origin（甚至省掉 CORS）

**建議搭配 Hosting rewrites**，前端就不用處理 CORS。

---

## 2. Firestore 資料模型設計

### 2.1 三種資料模型方案比較

[system-migration-plan.md](./system-migration-plan.md) 已決定採用「一個座位一份 document」這個方向（即下文的「模式 1」）。本節把當初考慮過的三種主流做法列出，記錄為何模式 1 勝出，避免日後又被回頭問。

#### 模式 1：每座位一份 doc（**推薦**）

```
seats/{seatId}      // seatId = "1-A-3-12" (floor-area-row-col)
  { area, row, col, floor, sold, buyerEmail, paid, bookedAt }
```

| 評估面向        | 結果                                                          |
| --------------- | ------------------------------------------------------------- |
| 寫入 hot spot   | 無（寫入分散到 600 個 doc）                                   |
| 換劇場          | **重跑 seed script 即可，schema 不動**                        |
| 一次活動成本    | ~$1（假設 1000 人 × 平均 fetch 3 次 × 600 座位 ≈ 1.8M reads） |
| Listener 必要性 | 不需要，前端按需 fetch 即可                                   |
| UX              | 送出時可能撞「位子已被劃走」錯誤 → 跟現有系統一樣，使用者習慣 |
| 程式碼複雜度    | 低                                                            |

#### 模式 2：單一 doc + listener

```
state/seatmap
  seats: { "1-A-3-12": {...}, "1-A-3-14": {...}, ... }
```

| 評估面向        | 結果                                            |
| --------------- | ----------------------------------------------- |
| 寫入 hot spot   | 有（所有 booking 都打同一份 doc，瞬間吞吐受限） |
| 換劇場          | 不影響 schema                                   |
| 一次活動成本    | ~$0.2（read 大幅減少）                          |
| Listener 必要性 | 是；前端 `onSnapshot` 訂閱                      |
| UX              | 即時，別人剛劃走的位子立刻 disable              |
| 程式碼複雜度    | 中（要處理 doc size 1MB 限制、map field 操作）  |

#### 模式 3：分片（按樓層拆成 N 個 doc）

```
state/floor1, state/floor2, ...
```

| 評估面向      | 結果                                      |
| ------------- | ----------------------------------------- |
| 寫入 hot spot | 緩解（吞吐 × N）                          |
| 換劇場        | **schema 跟著動**（樓層數變了要改前後端） |
| 程式碼複雜度  | 中高                                      |

#### 為何選模式 1

1. **換劇場零負擔**：南海劇場兩層、其他劇場可能單層或更多層 → 模式 1 通通只要重跑 seed
2. **沒有 hot spot 風險**：寫入分散到所有 seat doc，每筆 transaction 只鎖到使用者真的要劃的那 6 個
3. **成本可接受**：一次活動約 $1（讀取為主），閒置時 $0
4. **UX 跟現有系統一樣**：使用者已習慣「送出可能撞錯誤」的流程，不需要 listener
5. **不用學 listener / map field 操作**：Express 工程師對 collection 操作更熟悉

模式 2 / 3 留作 alternative，未來若需要強即時 UX 再考慮。

#### Hot spot 補充說明

Hot spot 是 Firestore 特有現象，因為它是分散式架構，單一 doc 住在單一 node 上，超過該 node 的處理能力就會出現衝突錯誤、latency 飆、寫入失敗。

對比：MongoDB / PostgreSQL 沒有「per-doc rate limit」概念，併發寫同一筆 row/doc 是用 lock 排隊處理（會慢，但不會失敗）。所以舊 Mongo 系統踩不到 hot spot，Firestore 上就要刻意避開。

→ 模式 1 把寫入分散到 600 個 doc，hot spot 風險自然消失。

### 2.2 為何不選 SQL 替代

雖然 [system-migration-plan.md](./system-migration-plan.md) 已決定走 Firestore，但研究模式 1 時又重新評估過 SQL 選項，記下結論避免日後走回頭路：

#### Supabase PostgreSQL

- 7 天閒置 → 暫停；90 天後 restore window 失效
- 對「一年用一次」每年都要從 backup 重建專案
- Workaround 是 GitHub Actions 維護 keep-alive heartbeat，但又多一個東西要管

#### Firebase Data Connect / SQL Connect

- 底層是 Cloud SQL（Firebase 包了 GraphQL-ish 層）
- 免費 trial 90 天，之後照 Cloud SQL 計費
- 最小規格 db-f1-micro = ~$9.37/月（一年 ≈ $112）
- **Cloud SQL 是 instance-based 計費，不管用不用都收錢**
- 比 Firestore 模式 1 的 $1 貴 100 倍以上
- 對「一年用一次」完全反向設計

→ **Firestore 模式 1 全方位最佳**：閒置 $0、活動 $1、實作簡單、換劇場零負擔。

### 2.3 推薦的 Firestore collections

```
seats/{autoId}            // doc id 用 Firestore auto-id（跟 Mongo ObjectId 思維一致）
  area: "S" | "A" | "B" | "C" | "X" | "M"   // 含 layout placeholder
  row: number              // sellable: 真實排數；X / M: 沒有座號意義
  col: number              // sellable: 真實座號；X / M: 沒有座號意義
  floor: 1 | 2
  sortIndex: number        // 在 generate_seats() output 中的 array index
  sold: boolean            // placeholder 也帶，永遠 false（schema 一致）
  buyerEmail: string | null
  paid: boolean
  bookedAt: Timestamp | null

bookings/{email}          // email 當 doc ID（小寫化）
  email: string
  username: string
  phone: string | null
  bankAccount: string
  emailSent: boolean       // admin 是否寄過付款通知信（劃新位會重置）
  createdAt: Timestamp
  updatedAt: Timestamp
  // 沒有 password / role / uid（沒有帳號概念）
  // 沒有 tickets[]（用 seats query 取代，永遠跟 seats 同步）
  // 2026-05-03 移除：emailVerified / emailVerifyToken（信箱驗證流程下線）
```

**設計要點：**

- `bookings/{email}` 用 email 當 doc ID：避免 race（同 email 不可能寫兩次）、查詢免 `where`
- 「我劃了哪些位子」用 `where('buyerEmail', '==', email)` query 取代 array 欄位
- **`seats` 用 Firestore auto-id**：跟 Mongo ObjectId 同概念，doc id 沒語意。座位身分靠 `(floor, area, row, col)` 的 query 取得（見 2.4）。好處：
  1. **admin 改 area 是單純 update**：`tx.update(seatRef, { area: newArea })`，doc id 不動。如果 doc id 是 composite key 的話，改 area 等於要刪舊 doc + 寫新 doc，凶險且不直覺
  2. **placeholder doc id 不撞**：X / M 的 (floor, area, row, col) 在 layout 規格中本來就允許重複（M / X 是視覺填充物，沒有獨立座號），用 auto-id 就一勞永逸
  3. **跟 Mongo 思維一致**：未來想換 DB 容易，也比較不會有讀 code 的人誤以為 doc id 一定要某種格式
- **整個 24×44 棋盤都進 DB**（含 X / M placeholder），前端 GET 一次拿全部 array slice 渲染。Placeholder 的 row / col 維持 generate_seats.js 原本「沒座號」的語意：
  - **X**（純空白格）：row=0、col 是借的（每段不同），前端 Seat.jsx 用 `area === "X"` 判斷不可選
  - **M**（row 標籤格）：row=真實排數（前端 `<RowSign>{row}</RowSign>` 顯示「第 N 排」）、col=0
  - **S/A/B/C**：row、col 都是真實座號（前端顯示 + booking query lookup 都靠這個）
- `sortIndex` 給 GET /api/seats 的 `orderBy` 用，前端 array 順序對齊 layout（舊 Mongo 系統靠 `sort({ _id: 1 })` + ObjectId 時間戳剛好對齊 insertion order；Firestore auto-id 字典序對不齊，所以顯式存一個 sortIndex）
- 修掉的 Mongo schema 問題：
  - `Seat.position` 冗餘欄位 → 拿掉
  - `User.tickets[]` 反正規化 → 用 query 取代，不會飄
  - `User` collection → 換成 `bookings`，無帳號概念

**為什麼不採 composite key 作為 doc id**（中途考慮過但推翻）：

曾一度設計成 `seats/{floor}-{area}-{row}-{col}` 讓 booking 可以 `db.doc(...)` 直查 O(1)。後來發現兩個致命傷：(1) admin 端有改 area 的需求（A 改 B、B 改 X），doc id 包含 area 就要寫成「刪舊 doc + 寫新 doc」的 transaction，凶險且違反直覺；(2) X / M placeholder 在 layout 規格本來就允許 (floor, area, row, col) 重複，硬要強行為它們編出唯一座標違反「placeholder 沒座號」的語義。Auto-id + query 多花 ~20–30ms 的 lookup 完全可以接受（一年用一次幾百人）。

**為什麼不採「placeholder bake 進前端」**（本來的初版設計）：

最早是想 placeholder 不存 DB、前端維護 layout 規格。實作時發現代價太大：前端 `Auditorium` 用 array slice 切 grid，需要完整 24×44 array，意味著前端要再寫一份跟 server `generate-seats.js` 同步的 layout 定義，換劇場時兩邊都要改。把 placeholder 進 DB（總共 ~1056 doc）成本可忽略（一次活動成本仍 ~$1），換取前端 0 改動 + layout 定義單一來源。

### 2.4 搶位子 transaction 寫法

把現有 Mongo `updateMany` + 樂觀鎖那段搬到 `runTransaction`。Firestore 規則：

- **必須先讀後寫**：所有 `tx.get()` 要在 `tx.set/update/delete` 之前
- **transaction 支援 query**（自 2021 起 Node.js Admin SDK 支援），每筆 query 會被 transaction 鎖住整個結果集
- **單一 transaction 上限 500 個 docs**：本系統一次劃 6 張，遠遠不到
- **自動 retry**：衝突時 SDK 預設重試 5 次，不用自己寫 retry loop（既有 Mongo 那段 3 次 retry 可以拿掉）

**虛擬碼（非最終實作，只示意流程）：**

```js
function seatLookupQuery(p) {
  return db
    .collection("seats")
    .where("floor", "==", p.floor)
    .where("area", "==", p.area)
    .where("row", "==", p.row)
    .where("col", "==", p.col)
    .limit(1);
}

await db.runTransaction(async (tx) => {
  // 1. 並行 query 找每個 position 對應的 seat doc
  //    transaction 內 tx.get(query) 會 lock 整個 result set；query condition 已包含
  //    全部 4 個欄位，result 永遠 0 或 1 筆，lock 範圍跟 by-id 直查等效
  const seatSnaps = await Promise.all(
    positions.map((p) => tx.get(seatLookupQuery(p)))
  );

  // 2. 驗證每個都找得到、且還沒被劃
  const seatDocs = seatSnaps.map((snap) => {
    if (snap.empty)
      throw new HttpsError("failed-precondition", "SEAT_NOT_FOUND");
    const doc = snap.docs[0];
    if (doc.data().sold)
      throw new HttpsError("failed-precondition", "SEAT_TAKEN");
    return doc;
  });

  // 3. 用 query 算使用者已劃幾張（檢查 6 張上限）
  const existing = await tx.get(
    db.collection("seats").where("buyerEmail", "==", email)
  );
  if (existing.size + positions.length > 6) {
    throw new HttpsError("failed-precondition", "OVER_LIMIT");
  }

  // 4. 讀/upsert booking
  const bookingRef = db.doc(`bookings/${email}`);
  const bookingSnap = await tx.get(bookingRef);

  // 5. 寫座位
  for (const doc of seatDocs) {
    tx.update(doc.ref, {
      sold: true,
      buyerEmail: email,
      bookedAt: FieldValue.serverTimestamp(),
    });
  }

  // 6. 寫 booking（merge；emailSent 一律重置成 false，劃新位後 admin 要補寄）
  tx.set(
    bookingRef,
    {
      email,
      username,
      phone,
      bankAccount,
      emailSent: false,
      updatedAt: FieldValue.serverTimestamp(),
      ...(bookingSnap.exists
        ? {}
        : { createdAt: FieldValue.serverTimestamp() }),
    },
    { merge: true }
  );
});

// transaction commit 後再寄信（side effect 不放在交易裡）
```

> Booking lookup 用 query 而非 by-id 直查的原因見 2.3「為什麼不採 composite key」。

### 2.5 初始化 / 種子資料

舊 `routes/generate_seats.js` 移植到 [scripts/generate-seats.js](../scripts/generate-seats.js)，end of file 補一個 `sortIndex = i` 後處理（見 2.3）。流程：

1. 跑 `generateSeats()` 產出整個 24×44 array（含 placeholder）
2. 用 batched write（每 400 個一批）寫進 `seats/`
3. doc id 用 Firestore auto-id（`db.collection("seats").doc()`），不指定也不依賴 `(floor, area, row, col)` 唯一

換劇場時改 `scripts/generate-seats.js` 的座位定義 + 重跑 `node scripts/seed-seats.js --reset`，整個資料庫、API、前端 schema 都不用動。

### 2.6 Security Rules

雖然「前端不直接讀寫 Firestore」，**還是要寫 rules**（深度防禦）：

```
rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {
    // 預設拒絕所有 client 直接存取
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

Functions 用 admin SDK 走 server-side，不受 rules 限制，安全。

### 2.7 Index

預期會用到的 query：

- `seats where (floor, area, row, col)`（booking / admin/area / admin/removeSeat 用）：**需要 4-field composite index，已寫進 [firestore.indexes.json](../firestore.indexes.json) 跟 deploy 一起上**
- `seats where buyerEmail == X`：自動單欄位 index 即可
- `seats orderBy sortIndex`：自動單欄位 index 即可
- `bookings` 都用 doc ID 直接 get，不用 index

---

## 後續實作步驟（待真的開工時再做）

1. 建 Firebase 專案 + 升 Blaze + 設 budget alert
2. 在 Firebase Console 手動建一個 admin 帳號（Firebase Auth Email/Password）
3. `firebase init`：functions (Node 20) + hosting + firestore
4. 寫 seed script（從 generate_seats 移植），產 seats collection（只存可賣座位）
5. 把 Express app 包成 `exports.api = onRequest(app)`
6. 改寫 auth：移除 passport / bcrypt / JWT；admin 路由加 Firebase Auth ID Token middleware
7. 改寫 booking 路由：去掉 User 操作，改寫 bookings + email verification
8. 改寫 admin 路由：去掉 user.tickets 同步邏輯，全用 seats query
9. 寫 Security Rules（預設全拒）
10. 設 Hosting rewrites `/api/** → api function`
11. 前端改打新 endpoint；admin 頁加 Firebase Auth SDK 登入
