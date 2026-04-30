const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Taipei");

// 各階段截止時間。每年活動改這裡（Asia/Taipei）。
// 流程：TEST → NTU_ONLY → GAP → PUBLIC → CLOSED
//
// TODO: 2026 魔夜 30 確切日期 TBD，下面是 placeholder，正式時間出來再改
const PHASES = {
  TEST_END: moment("2026-05-19 20:00:00", "YYYY-MM-DD HH:mm:ss"),
  NTU_END: moment("2026-05-20 15:00:00", "YYYY-MM-DD HH:mm:ss"),
  GAP_END: moment("2026-05-20 20:00:00", "YYYY-MM-DD HH:mm:ss"),
  PUBLIC_END: moment("2026-06-12 15:00:00", "YYYY-MM-DD HH:mm:ss"),
};

function currentPhase(now = moment()) {
  if (now.isBefore(PHASES.TEST_END)) return "TEST";
  if (now.isBefore(PHASES.NTU_END)) return "NTU_ONLY";
  if (now.isBefore(PHASES.GAP_END)) return "GAP";
  if (now.isBefore(PHASES.PUBLIC_END)) return "PUBLIC";
  return "CLOSED";
}

module.exports = { currentPhase, PHASES };
