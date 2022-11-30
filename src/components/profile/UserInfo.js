import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateBank } from "../../store/user-actions";

import { Box, styled, TextField } from "@mui/material";
import { EditButton, CheckButton } from "../UI/ProfileButton";

const Layout = styled(Box)`
  font-size: large;
`;

const BankBox = styled(Box)`
  display: flex;
  align-items: center;
  column-gap: 1vw;
`;
const EditBox = styled(Box)`
  display: flex;
  column-gap: 1vw;
  align-items: flex-start;
  margin-top: 1vh;
`;

const UserInfo = () => {
  const { currentUser, bankApi } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [bank, setBank] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isEditingBank, setIsEditingBank] = useState(false);
  const handleEditingBank = () => {
    setIsEditingBank(!isEditingBank);
    setIsValid(true);
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
      setBank("");
    }
  }, [bankApi]);

  return (
    <Layout>
      <h1>個人資料 </h1>
      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <td>姓名</td>
            <td>{currentUser.user.username}</td>
          </tr>
          <tr>
            <td>手機</td>
            <td>{currentUser.user.phone}</td>
          </tr>
          <tr>
            <td>信箱</td>
            <td>{currentUser.user.email}</td>
          </tr>
          <tr>
            <td>身分</td>
            <td>{currentUser.user.isStudent ? "校內學生" : "校外人士"}</td>
          </tr>
          <tr>
            <td>已劃位數 </td>
            <td>{currentUser.user.tickets.length}</td>
          </tr>
          {!isEditingBank && (
            <tr>
              <td>付款帳號</td>
              <td>
                <BankBox>
                  {currentUser.user.bankAccount
                    ? currentUser.user.bankAccount
                    : "尚未設定"}
                  <EditButton onClick={handleEditingBank}>修改</EditButton>
                </BankBox>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {isEditingBank && (
        <form onSubmit={handleSubmitBank}>
          <EditBox>
            <TextField
              onChange={handleChangeBank}
              label="帳戶末5碼"
              variant="outlined"
              size="small"
              error={!isValid}
              helperText={!isValid && "請輸入5位數字"}
            />
            <CheckButton type="submit">送出</CheckButton>
            <CheckButton onClick={handleEditingBank}>取消</CheckButton>
          </EditBox>
        </form>
      )}
    </Layout>
  );
};

export default UserInfo;
