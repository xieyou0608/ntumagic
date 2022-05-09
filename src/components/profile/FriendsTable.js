import React, { useEffect, useState } from "react";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import { Box } from "@mui/system";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AudienceService from "../../services/audience.service";

const FriendsTable = ({ currentUser, setCurrentUser }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [friends, setFriends] = useState(currentUser.user.friends);
  const [friendName, setFriendName] = useState("");
  const [friendPhone, setFriendPhone] = useState("");
  const [isFull, setIsFull] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEdit = () => {
    setIsEdit(!isEdit);
    setFriendName("");
    setFriendPhone("");
  };
  const handleChangeName = (e) => {
    setFriendName(e.target.value);
  };
  const handleChangePhone = (e) => {
    setFriendPhone(e.target.value);
  };

  const handleAddFriend = (e) => {
    if (friends.some((x) => x.friendName == e.target.value)) {
      setErrorMessage(e.target.value + "已經存在");
    } else {
      setFriends([...friends, { friendName, friendPhone }]);
    }
  };
  const handleDeleteFriends = (e) => {
    setFriends(friends.filter((x) => x.friendName != e.target.value));
  };

  const handleEditCheck = () => {
    AudienceService.editFriends(friends)
      .then((res) => {
        // console.log(res.data); //"updated"
        let temp = currentUser;
        temp.user.friends = friends;
        localStorage.setItem("user", JSON.stringify(temp));
        setCurrentUser(temp);
        setIsEdit(false);
        window.alert("修改成功!");
        setErrorMessage("");
      })
      .catch((e) => setErrorMessage(e.response.data));
  };

  useEffect(() => {
    if (friends.length == 5) {
      setIsFull(true);
    } else {
      setIsFull(false);
    }
  }, [friends]);

  return (
    <Box>
      <Typography sx={{ display: "inline" }} variant="h6">
        同行者
      </Typography>
      <Button onClick={handleEdit}>修改</Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>姓名</TableCell>
              <TableCell>聯絡電話</TableCell>
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
              <TableRow
                key={x.friendName}
                // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="td" scope="row">
                  {x.friendName}
                </TableCell>
                <TableCell>{x.friendPhone}</TableCell>
                {isEdit && (
                  <TableCell align="right">
                    <Button
                      onClick={handleDeleteFriends}
                      value={x.friendName}
                      color="error"
                    >
                      刪除
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
            {isEdit && !isFull && (
              <TableRow>
                <TableCell component="td" scope="row">
                  <TextField
                    onChange={handleChangeName}
                    label="姓名"
                    variant="standard"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    onChange={handleChangePhone}
                    label="聯絡電話"
                    variant="standard"
                  />
                </TableCell>
                <TableCell align="right">
                  <Button onClick={handleAddFriend} value={friendName}>
                    新增
                  </Button>
                </TableCell>
              </TableRow>
            )}
            {isEdit && (
              <TableRow>
                <TableCell component="td" colSpan={3} align="center">
                  <Button onClick={handleEditCheck}>儲存</Button>
                  <Button onClick={handleEdit}>取消</Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {errorMessage && <Alert severity="warning">{errorMessage}</Alert>}
    </Box>
  );
};

export default FriendsTable;
