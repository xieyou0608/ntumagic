import React from "react";
import { Box, Typography } from "@mui/material";

const UserInfo = ({ currentUser }) => {
  return (
    <Box sx={{ padding: 1.5 }}>
      {currentUser && (
        <Box>
          <Typography variant="h4">個人資料</Typography>
          <Typography>姓名: {currentUser.user.username}</Typography>
          <Typography>信箱: {currentUser.user.email}</Typography>
          <Typography>電話號碼: {currentUser.user.phone}</Typography>
          <Typography>已劃位數: {currentUser.user.ticketsNum}</Typography>
          <Typography>
            付款帳戶末5碼:
            {currentUser.user.bankAccount
              ? currentUser.user.bankAccount
              : "尚未設定"}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default UserInfo;
