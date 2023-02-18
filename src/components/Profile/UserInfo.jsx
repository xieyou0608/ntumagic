import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateBank } from "../../store/user-actions";

import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell as muiTableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
  TextField,
} from "@mui/material";
import { EditButton, CheckButton } from "../UI/ProfileButtons";
import theme from "../../styles/theme";

const TableCell = styled(muiTableCell)`
  background-color: ${theme.palette.background.main};
`;

const BankBox = styled(Box)`
  display: flex;
  align-items: center;
  column-gap: 1vw;
  margin: 8px 0;
`;
const EditBox = styled(Box)`
  display: flex;
  column-gap: 1vw;
  align-items: flex-start;
  margin: 8px 0;
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

  const userinfo = [
    { title: "姓名", content: currentUser.user.username },
    { title: "手機", content: currentUser.user.phone },
    { title: "信箱", content: currentUser.user.email },
    {
      title: "身分",
      content: currentUser.user.isStudent ? "校內學生" : "校外人士",
    },
    { title: "已劃位數", content: currentUser.user.tickets.length },
  ];

  return (
    <Box>
      <h2>個人資料</h2>
      {!isEditingBank && (
        <BankBox>
          付款帳號：
          {currentUser.user.bankAccount
            ? currentUser.user.bankAccount
            : "尚未設定"}
          <EditButton onClick={handleEditingBank}>修改</EditButton>
        </BankBox>
      )}
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                colSpan={2}
                align="center"
                sx={{
                  backgroundColor: theme.palette.gentle.main,
                }}
              >
                <Typography>個人資料</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userinfo.map((info) => (
              <TableRow key={info.title}>
                <TableCell>{info.title}</TableCell>
                <TableCell>{info.content}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserInfo;
