import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import AudienceService from "../../services/audience.service";
const UserInfo = ({ currentUser, setCurrentUser }) => {
  const [bank, setBank] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isEditingBank, setIsEditingBank] = useState(false);
  const handleEditingBank = () => {
    setIsEditingBank(!isEditingBank);
  };
  const handleChangeBank = (e) => {
    setBank(e.target.value);
  };
  const handleSubmitBank = () => {
    let temp = currentUser;
    temp.user.bankAccount = bank;
    localStorage.setItem("user", JSON.stringify(temp));
    setCurrentUser(temp);
    setIsEditingBank(false);
    window.alert("修改成功!");
    setErrorMsg("");
    // AudienceService.editBank(bank)
    //   .then((res) => {
    //     // console.log(res.data); //"updated"
    //     let temp = currentUser;
    //     temp.user.bankAccount = bank;
    //     localStorage.setItem("user", JSON.stringify(temp));
    //     setCurrentUser(temp);
    //     setIsEditingBank(false);
    //     window.alert("修改成功!");
    //     setErrorMsg("");
    //   })
    //   .catch((e) => setErrorMsg(e.response.data));
  };
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
            您的付款帳號:
            {currentUser.user.bankAccount
              ? currentUser.user.bankAccount
              : "尚未設定"}
            {!isEditingBank && (
              <Button
                size="small"
                onClick={handleEditingBank}
                variant="outlined"
                sx={{ margin: 1 }}
              >
                修改
              </Button>
            )}
          </Typography>
          {isEditingBank && (
            <Box>
              <Typography>請輸入付款帳號末5碼</Typography>

              <TextField
                onChange={handleChangeBank}
                label="帳戶"
                variant="outlined"
                size="small"
              />
              <Button onClick={handleSubmitBank} variant="contained">
                送出
              </Button>
              <Button onClick={handleEditingBank} variant="contained">
                取消
              </Button>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default UserInfo;
