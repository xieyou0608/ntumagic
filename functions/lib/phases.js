const moment = require("moment-timezone");
const { PHASES } = require("./event-config");

function currentPhase(now = moment()) {
  if (now.isBefore(PHASES.TEST_END)) return "TEST";
  if (now.isBefore(PHASES.NTU_START)) return "GAP";
  if (now.isBefore(PHASES.PUBLIC_START)) return "NTU_ONLY";
  if (now.isBefore(PHASES.PUBLIC_END)) return "PUBLIC";
  return "CLOSED";
}

module.exports = { currentPhase, PHASES };
