import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import AdminService from "../../services/admin.service";
import { v4 as uuidv4 } from "uuid";
import UserRow from "./UserRow";

const UsersMonitor = () => {
  const [users, setUsers] = useState([]);
  const [showId, setShowId] = useState(false);
  const [showDate, setShowDate] = useState(false);

  const handleShowId = () => {
    setShowId(!showId);
  };
  const handleShowDate = () => {
    setShowDate(!showDate);
  };

  useEffect(() => {
    AdminService.getAllUser()
      .then((res) => {
        setUsers(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <Box sx={{ padding: "3rem" }}>
      <Typography variant="h5">操作說明:</Typography>
      <Typography>
        <Button color="success" variant="contained">
          確認付款
        </Button>
        更新觀眾所有座位的付款狀態，全部都會變成已付款。
        <br />
        <Button color="secondary" variant="contained">
          已傳郵件
        </Button>
        更新通知狀態。這個狀態是給後台看而已，如果之前人工寄信過的按這個
        <br />
        <Button color="primary" variant="contained">
          傳送郵件
        </Button>
        寄信給觀眾，同時更新通知狀態。沒人工寄信過的按這個
        <br />
        <Button color="error" variant="contained">
          清除座位
        </Button>
        把"所有座位"刪除，在劃位頁面座位區的座位也會釋出。(不要亂按)
      </Typography>
      <Typography variant="h5">注意:</Typography>
      <Typography>
        1.
        信的內容會自動用觀眾的名字跟所有座位來寄出(包含沒付款的，所以如果有人座位有問題的話先別寄)
        <br />
        2. 點按鈕之後那一列會更新，如果沒更新代表出錯了，按F12看一下問題或再回報
        <br />
        3.
        寄信會需要多一點時間，看到通知狀態變成已寄信就代表有成功，另外也會寄一封備份到自己的信箱
        <br />
        4. 觀眾如果劃新的位子，通知狀態會更新成還沒寄信，記得寄一封新的給他
        <br />
        5.
        後台更新之後，觀眾到個人頁面會自動抓新的資料，如果沒的話，確認後台沒問題叫他重新整理。
      </Typography>
      <Button onClick={handleShowId} variant="outlined">
        顯示ID
      </Button>
      <Button onClick={handleShowDate} variant="outlined">
        顯示註冊日期
      </Button>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#4aedc4" }}>
              {showId && (
                <TableCell>
                  <Typography>_id</Typography>
                </TableCell>
              )}
              {showDate && (
                <TableCell>
                  <Typography>註冊日期</Typography>
                </TableCell>
              )}
              <TableCell>
                <Typography>信箱</Typography>
              </TableCell>
              <TableCell>
                <Typography>姓名</Typography>
              </TableCell>
              <TableCell>
                <Typography>座位</Typography>
              </TableCell>
              <TableCell>
                <Typography>付款帳戶</Typography>
              </TableCell>
              <TableCell>
                <Typography>通知</Typography>
              </TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((userdata) => (
              <UserRow
                userdata={userdata}
                showId={showId}
                showDate={showDate}
                key={uuidv4()}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UsersMonitor;
