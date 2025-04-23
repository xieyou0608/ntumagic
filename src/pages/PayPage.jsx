import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Alert, Typography, Button, styled } from "@mui/material";

const Layout = styled("div")`
  display: flex;
  justify-content: center;
`;
const StyledBox = styled("div")`
  display: flex;
  flex-direction: column;
  background-color: white;
  border: #540b0e solid 0.5vmin;
  border-radius: 3vmin;
  padding: 5vh;
`;

const PayPage = () => {
  return (
    <Layout>
      <StyledBox>
        <Typography variant="h5">感謝您的劃位！</Typography>
        <Typography color="red">
          首次劃位請至信箱收取驗證信
          <br />
          並於 10 分鐘內完成驗證
        </Typography>
        <Typography>並於至隔日 15:00 前將總金額匯款至：</Typography>
        <Alert icon={false} severity="info">
          {/* TODO */}
          <Typography>銀行代碼：700 中華郵政</Typography>
          <Typography>帳號：00312180252039</Typography>
          <Typography>戶名：黃宗軒</Typography>
        </Alert>

        <Typography>繳費說明：</Typography>
        <Typography>1. 完成付款之後，我們將寄信至您的信箱</Typography>
        <Typography>2. 晚會當日請依信件至會場索取實體票</Typography>
        <Typography>3. 若未收到信件請洽粉絲專頁</Typography>

        {/* <Button component={Link} to="/my-ticket" variant="contained">
          我知道了
        </Button>
        <Button component={Link} to="/my-ticket" variant="contained">
          我知道了
        </Button> */}
      </StyledBox>
    </Layout>
  );
};

export default PayPage;
