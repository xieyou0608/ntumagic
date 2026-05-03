import React from "react";
import moment from "moment-timezone";
import Booking from "../components/booking/Booking";
import { Alert, styled } from "@mui/material";
import { PHASES, PHASE_LABELS } from "../event-config";

// 真正擋住搶位仍由後端 phase gate 處理；前端這邊只用來：
//   - isTesting 期間顯示測試清票提示
//   - isStudentTime（校內優先）期間提早擋下非 @ntu.edu.tw 提交，
//     免得送到後端再被 403
moment.tz.setDefault("Asia/Taipei");

const BookingLayout = styled("div")`
  display: flex;
  flex-direction: column;
  margin-top: 5vh;
`;

const TitleLayout = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2vh;
`;

// 對齊後端 functions/lib/phases.js 的 currentPhase()：
// 用 isBefore 鏈把每個瞬間都歸到唯一一個 phase，避免 isBetween 兩端 exclusive
// 在邊界那一秒沒人 match 到。
function currentPhase(now) {
  if (now.isBefore(PHASES.TEST_END)) return "TEST";
  if (now.isBefore(PHASES.NTU_START)) return "GAP";
  if (now.isBefore(PHASES.PUBLIC_START)) return "NTU_ONLY";
  if (now.isBefore(PHASES.PUBLIC_END)) return "PUBLIC";
  return "CLOSED";
}

const BookingPage = () => {
  const phase = currentPhase(moment());
  const isTesting = phase === "TEST";
  const isTestingEnd = phase === "GAP";
  const isStudentTime = phase === "NTU_ONLY";
  const isPublicTime = phase === "PUBLIC";
  const isClosedTime = phase === "CLOSED";

  return (
    <BookingLayout>
      <TitleLayout>
        <h1>座位區</h1>
        {isTesting && (
          <Alert color="error">
            現在為測試劃位期間，您可以自由試劃，{PHASE_LABELS.TEST_END}{" "}
            後會清空劃位，並於 {PHASE_LABELS.NTU_START} 開放正式劃位
          </Alert>
        )}
        {isTestingEnd && (
          <Alert color="info">
            校內劃位將於 {PHASE_LABELS.NTU_START} 開放！
          </Alert>
        )}
        {isStudentTime && (
          <Alert color="info">
            現在為校內優先劃位時間，請使用台大信箱 ntu.edu.tw 進行劃位
          </Alert>
        )}
        {isPublicTime && (
          <Alert color="info">
            現在為校外劃位時間，您可以使用任意信箱進行劃位
          </Alert>
        )}
        {isClosedTime && (
          <Alert color="error">線上劃位已截止，請至現場購票</Alert>
        )}
      </TitleLayout>
      <Booking isStudentTime={isStudentTime} />
    </BookingLayout>
  );
};

export default BookingPage;
