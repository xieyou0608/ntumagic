#!/usr/bin/env node
/**
 * Dump Firestore collections（debug 用）。
 *
 * Usage:
 *   node scripts/dump-firestore.js                          # 摘要：列所有 root collection + count + 各 5 筆 sample
 *   node scripts/dump-firestore.js <collection>             # 完整 dump 指定 collection 到 stdout
 *   node scripts/dump-firestore.js <collection> --out path  # dump 到檔案
 *   node scripts/dump-firestore.js --out dump.json          # 全部 root collection 完整 dump 到檔案
 *
 * Auth: Application Default Credentials（同 seed-seats.js）。
 *   gcloud auth application-default login
 * Emulator: export FIRESTORE_EMULATOR_HOST=127.0.0.1:8080
 *
 * Timestamp / GeoPoint 等特殊型別會被 toJSON 轉成 ISO string / 物件，方便肉眼看。
 */

const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");

const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT || "ntu-magic-night";
const SAMPLE_SIZE = 5;

const args = process.argv.slice(2);
const outIdx = args.indexOf("--out");
const outPath = outIdx >= 0 ? args[outIdx + 1] : null;
if (outIdx >= 0) args.splice(outIdx, 2);
const targetCollection = args[0] || null;

admin.initializeApp({ projectId: PROJECT_ID });
const db = admin.firestore();

function serialize(value) {
  if (value === null || value === undefined) return value;
  if (value instanceof admin.firestore.Timestamp) {
    return value.toDate().toISOString();
  }
  if (value instanceof admin.firestore.GeoPoint) {
    return { latitude: value.latitude, longitude: value.longitude };
  }
  if (value instanceof admin.firestore.DocumentReference) {
    return `[ref ${value.path}]`;
  }
  if (Array.isArray(value)) return value.map(serialize);
  if (typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = serialize(v);
    return out;
  }
  return value;
}

async function dumpCollection(name) {
  const snap = await db.collection(name).get();
  return snap.docs.map((d) => ({ id: d.id, ...serialize(d.data()) }));
}

async function summarize() {
  const cols = await db.listCollections();
  console.log(`Project: ${PROJECT_ID}`);
  if (process.env.FIRESTORE_EMULATOR_HOST) {
    console.log(`Emulator: ${process.env.FIRESTORE_EMULATOR_HOST}`);
  }
  console.log(`Root collections: ${cols.length}`);
  console.log("");

  const summary = {};
  for (const col of cols) {
    const docs = await dumpCollection(col.id);
    summary[col.id] = { count: docs.length, sample: docs.slice(0, SAMPLE_SIZE) };

    console.log(`── ${col.id} (${docs.length} docs) ──`);
    if (docs.length === 0) {
      console.log("  (empty)");
    } else {
      console.log(
        `  sample (${Math.min(SAMPLE_SIZE, docs.length)}/${docs.length}):`,
      );
      docs.slice(0, SAMPLE_SIZE).forEach((d) => {
        console.log("  " + JSON.stringify(d));
      });
    }
    console.log("");
  }
  return summary;
}

async function main() {
  let payload;

  if (targetCollection) {
    const docs = await dumpCollection(targetCollection);
    console.log(`${targetCollection}: ${docs.length} docs`);
    payload = docs;
  } else if (outPath) {
    const cols = await db.listCollections();
    payload = {};
    for (const col of cols) {
      payload[col.id] = await dumpCollection(col.id);
      console.log(`  ${col.id}: ${payload[col.id].length} docs`);
    }
  } else {
    payload = await summarize();
  }

  if (outPath) {
    const abs = path.resolve(outPath);
    fs.writeFileSync(abs, JSON.stringify(payload, null, 2));
    console.log(`✓ 寫入 ${abs}`);
  } else if (targetCollection) {
    console.log(JSON.stringify(payload, null, 2));
  }
}

main().catch((err) => {
  console.error("Dump 失敗:", err);
  process.exit(1);
});
