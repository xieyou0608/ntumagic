import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateBank } from "../../store/user-actions";

import { Box, Typography, Button, TextField } from "@mui/material";

const UserInfo = () => {
  const { currentUser, bankApi } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [bank, setBank] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isEditingBank, setIsEditingBank] = useState(false);
  const handleEditingBank = () => {
    setIsEditingBank(!isEditingBank);
  };
  const handleChangeBank = (e) => {
    setBank(e.target.value);
  };
  const handleSubmitBank = (e) => {
    e.preventDefault();
    if (bank.length !== 5) {
      setIsValid(false);
    } else {
      setIsValid(true);
      dispatch(updateBank(bank));
    }
  };

  useEffect(() => {
    if (bankApi.success) {
      setIsEditingBank(false);
    }
  }, [bankApi]);

  return (
    <Box sx={{ padding: 1.5 }}>
      {currentUser && (
        <Box>
          <Typography variant="h4">個人資料 </Typography>
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
            <form onSubmit={handleSubmitBank}>
              <TextField
                onChange={handleChangeBank}
                label="帳戶末5碼"
                variant="outlined"
                size="small"
                error={!isValid}
                helperText={!isValid && "請輸入5位數字"}
              />
              <Button type="submit" variant="contained">
                送出
              </Button>
              <Button onClick={handleEditingBank} variant="contained">
                取消
              </Button>
            </form>
          )}
        </Box>
      )}
    </Box>
  );
};

export default UserInfo;
