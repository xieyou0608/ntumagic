import React from "react";
import { Link } from "react-router-dom";
import { Box, Alert, Grid, Typography, Button } from "@mui/material";

const GuidePage = () => {
  return (
    <div className="guidepage">
      <h1>劃位說明</h1>
      <h3>劃位開放時間:</h3>
      <p>以ntu mail註冊之帳號可於校內售票階段先行劃位</p>
      <p>校內售票: 5/21(六) 20:00</p>
      <p>校外售票: 5/22(日) 20:00</p>
      <h2>Step 1</h2>
      <p>
        請先使用信箱
        <Link to="/register" style={{ color: "blue" }}>
          {/* <i class="fa-solid fa-link">註冊帳號</i> */}
          註冊帳號
        </Link>
        ，並
        <Link to="/login" style={{ color: "blue" }}>
          登入系統
        </Link>
      </p>
      <h2>Step 2</h2>
      <p>成功登入後</p>
      <p class="AorB">
        A.　若您只需劃一個位子，請直接於售票開放時間至
        <Link to="/booking" style={{ color: "blue" }}>
          劃位頁面
        </Link>
        進行劃位
      </p>
      <p class="AorB">
        B.　若您需要劃多個位子，請至
        <Link to="/profile" style={{ color: "blue" }}>
          個人頁面
        </Link>
        填寫同行朋友資料後再進行劃位
      </p>

      <h2>Step 3</h2>
      <p>
        劃位成功之後，請匯款至以下帳戶，並於
        <Link to="/profile" style={{ color: "blue" }}>
          個人頁面
        </Link>
        填寫付款帳戶末5碼
      </p>
      <Alert icon={false} severity="info" sx={{ width: "30%" }}>
        <Typography>銀行代碼: 008 華南銀行</Typography>
        <Typography>帳號: 153200800025</Typography>
        <Typography>戶名: 楊皓勛</Typography>
      </Alert>
      <h2>Step 4</h2>
      <p>
        待確認款項後，我們將寄出劃位成功通知到您的信箱，您也可於
        <Link to="/profile" style={{ color: "blue" }}>
          個人頁面
        </Link>
        確認付款狀態
        <br />
        註：若付款後三日皆沒有收到信，請私訊台大魔術社粉絲專頁
      </p>
      <h2>Step 5（重要！）</h2>
      <p>魔夜當日請出示劃位成功通知信領取實體票</p>

      <Button
        component={Link}
        to="/register"
        variant="contained"
        sx={{ marginTop: 3 }}
      >
        點我開始!
      </Button>
    </div>
  );
};

export default GuidePage;
