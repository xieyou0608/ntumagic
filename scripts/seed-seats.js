#!/usr/bin/env node
/**
 * Seed Firestore `seats` collection.
 *
 * Usage:
 *   node scripts/seed-seats.js [--reset]
 *
 * Auth: 透過 Application Default Credentials。先在本機跑：
 *   gcloud auth application-default login
 *   gcloud config set project ntu-magic-night
 *
 * --reset：寫入前先把整個 `seats` collection 砍掉（換劇場時用）。
 *
 * doc id 用 Firestore auto-id（跟 Mongo ObjectId 思維一致）。座位身分靠
 * `(floor, area, row, col)` 的 query 去找，admin 改 area 時就是單純 update area
 * 欄位、不用搬 doc id。每筆寫入 `sortIndex` 給 GET /api/seats orderBy 用。
 *
 * 整個 24x44 棋盤都進 DB（含 X / M placeholder）。X / M 的 row/col 沒有唯一性
 * 需求（doc id 不靠它們），維持 generate-seats.js 原本的「沒座號」語意。
 */

const admin = require("firebase-admin");
const { generateSeats } = require("./generate-seats");

const RESET = process.argv.includes("--reset");
const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT || "ntu-magic-night";
const SELLABLE_AREAS = new Set(["S", "A", "B", "C"]);

admin.initializeApp({ projectId: PROJECT_ID });
const db = admin.firestore();

async function deleteAllSeats() {
  console.log("→ 刪除既有 seats collection ...");
  const batchSize = 400;
  let totalDeleted = 0;
  while (true) {
    const snap = await db.collection("seats").limit(batchSize).get();
    if (snap.empty) break;
    const batch = db.batch();
    snap.docs.forEach((d) => batch.delete(d.ref));
    await batch.commit();
    totalDeleted += snap.size;
    process.stdout.write(`  deleted ${totalDeleted}\r`);
  }
  console.log(`\n  總共刪除 ${totalDeleted} 個 seat doc`);
}

async function main() {
  console.log(`Seeding project: ${PROJECT_ID}`);
  if (RESET) await deleteAllSeats();

  const seats = generateSeats();
  const sellableCount = seats.filter((s) => SELLABLE_AREAS.has(s.area)).length;
  console.log(
    `→ 將寫入 ${seats.length} 個 seat doc（其中 ${sellableCount} 個可賣，其餘為 layout placeholder）`
  );

  // Firestore batched write 上限 500，留 buffer 用 400
  const CHUNK = 400;
  for (let i = 0; i < seats.length; i += CHUNK) {
    const batch = db.batch();
    const chunk = seats.slice(i, i + CHUNK);
    for (const seat of chunk) {
      const ref = db.collection("seats").doc(); // auto-id
      // sold / buyerEmail / paid / bookedAt 對 placeholder 無意義，但帶上讓 schema 一致、
      // admin clearAllSeats 那種無腦掃整個 collection 的邏輯不用分支
      batch.set(ref, {
        area: seat.area,
        row: seat.row,
        col: seat.col,
        floor: seat.floor,
        sortIndex: seat.sortIndex,
        sold: false,
        buyerEmail: null,
        paid: false,
        bookedAt: null,
      });
    }
    await batch.commit();
    process.stdout.write(
      `  written ${Math.min(i + CHUNK, seats.length)}/${seats.length}\r`
    );
  }
  console.log("\n✓ Seed 完成");
}

main().catch((err) => {
  console.error("Seed 失敗:", err);
  process.exit(1);
});
