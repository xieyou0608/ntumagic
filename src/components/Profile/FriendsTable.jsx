import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateFriends } from "../../store/user-actions";

import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Stack,
  Table,
  TableBody,
  TableCell as muiTableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
} from "@mui/material";
import { EditButton, CheckButton } from "../UI/ProfileButtons";
import theme from "../../styles/theme";

const TableCell = styled(muiTableCell)`
  background-color: ${theme.palette.background.main};
`;

const HeaderTableCell = styled(muiTableCell)`
  background-color: ${theme.palette.gentle.main};
`;

const FriendsTable = () => {
  const { currentUser, friendsApi } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [friends, setFriends] = useState(currentUser.user.friends);
  const [friendName, setFriendName] = useState("");
  const [friendPhone, setFriendPhone] = useState("");
  const [isFull, setIsFull] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEditing = () => {
    setIsEditing(!isEditing);
    setFriendName("");
    setFriendPhone("");
    setFriends(currentUser.user.friends); // 如果按取消的話會回到原本的狀態
  };
  const handleChangeName = (e) => {
    setFriendName(e.target.value);
  };
  const handleChangePhone = (e) => {
    setFriendPhone(e.target.value);
  };

  const handleAddFriend = () => {
    if (friends.some((x) => x.friendName === friendName)) {
      setErrorMessage(friendName + "已經存在");
    } else {
      setFriends([...friends, { friendName, friendPhone }]);
      setFriendName("");
      setFriendPhone("");
    }
  };
  const handleDeleteFriends = (e) => {
    setFriends(friends.filter((x) => x.friendName !== e.target.value));
  };

  const handleEditCheck = () => {
    dispatch(updateFriends(friends));
  };

  useEffect(() => {
    if (friends.length === 5) {
      setIsFull(true);
    } else {
      setIsFull(false);
    }
  }, [friends]);

  useEffect(() => {
    if (friendsApi.success) {
      setIsEditing(false);
    }
  }, [friendsApi]);

  return (
    <Box>
      <Stack direction="row" spacing={2} mb={1}>
        <h2>同行朋友</h2>
        {!isEditing && <EditButton onClick={handleEditing}>修改</EditButton>}
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <HeaderTableCell>
                <Typography>姓名</Typography>
              </HeaderTableCell>
              <HeaderTableCell>
                <Typography>聯絡電話</Typography>
              </HeaderTableCell>
              {isEditing && <HeaderTableCell></HeaderTableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {!friends.length && (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  目前尚無同行者
                </TableCell>
              </TableRow>
            )}
            {friends.map((x) => (
              <TableRow key={x.friendName}>
                <TableCell>{x.friendName}</TableCell>
                <TableCell>{x.friendPhone}</TableCell>
                {isEditing && (
                  <TableCell>
                    <Button
                      onClick={handleDeleteFriends}
                      value={x.friendName}
                      color="error"
                      variant="outlined"
                    >
                      刪除
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
            {isEditing && !isFull && (
              <TableRow>
                <TableCell>
                  <TextField
                    onChange={handleChangeName}
                    value={friendName}
                    label="姓名"
                    variant="standard"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    onChange={handleChangePhone}
                    value={friendPhone}
                    label="聯絡電話"
                    variant="standard"
                  />
                </TableCell>
                <TableCell>
                  <EditButton onClick={handleAddFriend}>新增</EditButton>
                </TableCell>
              </TableRow>
            )}
            {isEditing && (
              <TableRow>
                <TableCell component="td" colSpan={3} align="center">
                  <Stack direction="row" spacing={2} justifyContent="center">
                    <CheckButton onClick={handleEditCheck}>儲存</CheckButton>
                    <CheckButton onClick={handleEditing}>取消</CheckButton>
                  </Stack>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <p>
        註: 新增 1 位同行朋友後可多劃 1 個座位，最多可新增 5
        個人，包含自己則可劃 6 個位子
      </p>
      {errorMessage && <Alert severity="warning">{errorMessage}</Alert>}
      {!isEditing && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CheckButton
            component={Link}
            to="/booking"
            sx={{ marginTop: "1rem" }}
          >
            前往劃位！
          </CheckButton>
        </Box>
      )}
    </Box>
  );
};

export default FriendsTable;
