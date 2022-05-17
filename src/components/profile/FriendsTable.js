import React, { useEffect, useState } from "react";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import { Box } from "@mui/system";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import AudienceService from "../../services/audience.service";

const FriendsTable = ({ currentUser, setCurrentUser }) => {
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
        setIsEditing(false);
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
    <Box sx={{ padding: 1.5 }}>
      <Typography sx={{ display: "inline" }} variant="h5">
        同行朋友
      </Typography>
      {!isEditing && (
        <Button
          onClick={handleEditing}
          variant="outlined"
          size="small"
          sx={{ margin: 1 }}
        >
          修改
        </Button>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#4aedc4" }}>
              <TableCell>
                <Typography>姓名</Typography>
              </TableCell>
              <TableCell>
                <Typography>聯絡電話</Typography>
              </TableCell>
              {isEditing && <TableCell></TableCell>}
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
                {isEditing && (
                  <TableCell align="right">
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
                  <Button
                    onClick={handleAddFriend}
                    value={friendName}
                    variant="outlined"
                    color="primary"
                  >
                    新增
                  </Button>
                </TableCell>
              </TableRow>
            )}
            {isEditing && (
              <TableRow>
                <TableCell component="td" colSpan={3} align="center">
                  <Stack direction="row" spacing={2} justifyContent="center">
                    <Button
                      onClick={handleEditCheck}
                      variant="contained"
                      color="secondary"
                    >
                      儲存
                    </Button>
                    <Button
                      onClick={handleEditing}
                      variant="contained"
                      color="secondary"
                    >
                      取消
                    </Button>
                  </Stack>
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
