import React from "react";
import moment from "moment-timezone";
import Booking from "../components/booking/Booking";

// 階段時間限制（每年活動更新；要跟 functions/lib/phases.js 同步）
//
// 真正擋住搶位仍由後端 phase gate 處理；前端這邊只用來：
//   - isTesting 期間顯示「測試劃位將於系統開放後清除」提示
//   - isStudentTime（校內優先）期間提早擋下非 @ntu.edu.tw 提交，
//     免得送到後端再被 403
moment.tz.setDefault("Asia/Taipei");

const NTU_START = "2026-05-01 20:00:00"; // TEST 結束 → 進入 NTU_ONLY
const NTU_END = "2026-05-02 15:00:00"; // NTU_ONLY 結束 → 進入 GAP

const BookingPage = () => {
  const now = moment();
  const isTesting = now.isBefore(NTU_START);
  const isStudentTime = now.isBetween(NTU_START, NTU_END);

  return (
    <div>
      <Booking isTesting={isTesting} isStudentTime={isStudentTime} />
    </div>
  );
};

export default BookingPage;
