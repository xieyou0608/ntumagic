// 每年活動改這裡。前端對應檔在 web/src/event-config.js，兩邊要一起改。
//
// 後端是真正的 phase gate（functions/routes/seats.js 用 PHASES + currentPhase()）；
// 前端只用對應參數做 UX 顯示與初步擋件。

const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Taipei");

const EVENT_NAME = "第 30 屆台大魔幻之夜";
const EVENT_DATETIME = "魔夜時間：2026/05/22（五）18:00 進場 18:30 開始";
const EVENT_VENUE =
  "魔夜地點：國立臺灣藝術教育館 南海劇場（近捷運小南門站 3 號出口）";

const BANK_INFO = [
  "銀行代碼：822 中國信託",
  "帳號：0000901564138410",
  "戶名：劉耀璘",
];

const PRICES = { S: 600, A: 500, B: 400, C: 300 };

// 流程：TEST → GAP → NTU_ONLY → PUBLIC → CLOSED
// GAP 是 TEST_END 到 NTU_START 之間的關閉窗口，admin 在這段時間清掉測試資料。
const PHASES = {
  TEST_END: moment("2026-05-04 12:00:00", "YYYY-MM-DD HH:mm:ss"),
  NTU_START: moment("2026-05-04 20:00:00", "YYYY-MM-DD HH:mm:ss"),
  PUBLIC_START: moment("2026-05-05 20:00:00", "YYYY-MM-DD HH:mm:ss"),
  PUBLIC_END: moment("2026-05-22 15:00:00", "YYYY-MM-DD HH:mm:ss"),
};

module.exports = {
  EVENT_NAME,
  EVENT_DATETIME,
  EVENT_VENUE,
  BANK_INFO,
  PRICES,
  PHASES,
};
