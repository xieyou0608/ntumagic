import React, { useEffect, useState } from "react";
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
    AudienceService.editBankAccount(bank)
      .then((res) => {
        let temp = currentUser;
        temp.user.bankAccount = bank;
        setCurrentUser(temp);
        localStorage.setItem("user", JSON.stringify(temp));

        setIsEditingBank(false);
        window.alert("修改成功!");
        setErrorMsg("");
      })
      .catch((e) => setErrorMsg(e.response.data));
  };

  const handleReload = () => {
    AudienceService.reload()
      .then((res) => {
        console.log(res.data);
        let temp = currentUser;
        temp.user = res.data;
        setCurrentUser(temp);
        localStorage.setItem("user", JSON.stringify(temp));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    handleReload();
  }, []);

  return (
    <Box sx={{ padding: 1.5 }}>
      {currentUser && (
        <Box>
          <Typography variant="h4">
            個人資料{" "}
            {/* <Button onClick={handleReload} variant="outlined">
              重新整理
            </Button> */}
          </Typography>
          <Typography>姓名: {currentUser.user.username}</Typography>
          <Typography>信箱: {currentUser.user.email}</Typography>
          <Typography>電話號碼: {currentUser.user.phone}</Typography>
          <Typography>
            身分: {currentUser.user.isStudent ? "校內學生" : "校外人士"}
          </Typography>
          <Typography>已劃位數: {currentUser.user.tickets.length}</Typography>
          <Typography>
            請於匯款後填寫付款帳號:
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
              <TextField
                onChange={handleChangeBank}
                label="帳戶末5碼"
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
