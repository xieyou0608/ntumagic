// 每年活動改這裡。後端對應檔在 functions/lib/event-config.js，兩邊要一起改。
//
// 後端是真正的 phase gate；前端只用這裡的參數做 UX 顯示與初步擋件。

export const EVENT_DATE = "2026/5/22（五）";
export const EVENT_TIME = "18:00 進場 18:30 開始";

export const PRICES = { A: 500, B: 400, C: 300 };

export const BANK_INFO = {
  bankCode: "822 中國信託",
  account: "0000901564138410",
  holder: "劉耀璘",
};

// 流程：TEST → GAP → NTU_ONLY → PUBLIC → CLOSED
// 鍵名跟後端 functions/lib/event-config.js 對齊，要一起改。
export const PHASES = {
  TEST_END: "2026-05-04 12:00:00",
  NTU_START: "2026-05-04 20:00:00",
  PUBLIC_START: "2026-05-05 20:00:00",
  PUBLIC_END: "2026-05-22 15:00:00",
};

// 對應 PHASES 的中文 label，給 UI 顯示用
export const PHASE_LABELS = {
  TEST_END: "2026/05/04(一) 12:00",
  NTU_START: "2026/05/04(一) 20:00",
  PUBLIC_START: "2026/05/05(二) 20:00",
  PUBLIC_END: "2026/05/22(五) 15:00",
};
