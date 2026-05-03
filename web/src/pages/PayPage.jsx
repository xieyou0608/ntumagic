import React from "react";
import { Alert, Typography, styled } from "@mui/material";
import { BANK_INFO } from "../event-config";
import bookSuccess from "../img/book_success.png";

const Layout = styled("div")`
  display: flex;
  justify-content: center;
  padding-top: 5vh;
`;
const StyledBox = styled("div")`
  display: flex;
  flex-direction: column;
  background-color: white;
  border: #540b0e solid 0.5vmin;
  border-radius: 3vmin;
  padding: 5vh;
`;

const ExampleImage = styled("img")`
  width: 100%;
  max-width: 400px;
  margin-top: 2vh;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const PayPage = () => {
  return (
    <Layout>
      <StyledBox>
        <Typography variant="h5">感謝您的劃位！</Typography>
        <Typography color="red">
          請至信箱收取劃位通知，確保能收到信之後，
        </Typography>
        <Typography>於隔日 15:00 前將總金額匯款至：</Typography>
        <Alert icon={false} severity="success">
          <Typography>銀行代碼：{BANK_INFO.bankCode}</Typography>
          <Typography>帳號：{BANK_INFO.account}</Typography>
          <Typography>戶名：{BANK_INFO.holder}</Typography>
        </Alert>

        <Typography>繳費說明：</Typography>
        <Typography>1. 完成付款之後，您將收到付款成功通知信</Typography>
        <Typography>2. 晚會當日請依信件至會場索取實體票</Typography>
        <Typography>3. 若未收到任一信件請洽粉絲專頁</Typography>

        <ExampleImage src={bookSuccess} alt="劃位通知信範例" />
      </StyledBox>
    </Layout>
  );
};

export default PayPage;
