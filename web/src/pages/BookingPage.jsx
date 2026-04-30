import React from "react";
import moment from "moment-timezone";
import Booking from "../components/booking/Booking";
import { PHASES, PHASE_LABELS } from "../event-config";

// 真正擋住搶位仍由後端 phase gate 處理；前端這邊只用來：
//   - isTesting 期間顯示測試清票提示
//   - isStudentTime（校內優先）期間提早擋下非 @ntu.edu.tw 提交，
//     免得送到後端再被 403
moment.tz.setDefault("Asia/Taipei");

const BookingPage = () => {
  const now = moment();
  const isTesting = now.isBefore(PHASES.TEST_END);
  const isStudentTime = now.isBetween(PHASES.NTU_START, PHASES.PUBLIC_START);

  const testingNotice = `${PHASE_LABELS.TEST_END} 後會清空劃位，並於 ${PHASE_LABELS.NTU_START} 開放正式劃位`;

  return (
    <div>
      <Booking
        isTesting={isTesting}
        isStudentTime={isStudentTime}
        testingNotice={testingNotice}
      />
    </div>
  );
};

export default BookingPage;
