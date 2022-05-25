import React, { useEffect, useState } from "react";
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
import AdminService from "../../services/admin.service";
import { v4 as uuidv4 } from "uuid";

const UsersMonitor = ({ currentUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    AdminService.getAllUser()
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleDeleteUsers = (e) => {
    if (window.confirm("確定要刪除嗎?")) {
      console.log(e.target.value);
      let _user_id = e.target.value;
      AdminService.deleteUser(_user_id)
        .then((res) => {
          console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handleClearSeats = (e) => {
    if (window.confirm("確定刪除座位?")) {
      let user_id = e.target.value;
      AdminService.clearSeats(user_id)
        .then((res) => {
          console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handlePaidSeats = (e) => {
    if (window.confirm("確認付款狀態")) {
      let user_id = e.target.value;
      AdminService.paidSeats(user_id)
        .then((res) => {
          console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <Box sx={{ padding: "3rem" }}>
      <p>admin token(請勿外流)</p>
      <p>{currentUser.token}</p>
      <br />
      <p>普通用戶token(測試用)</p>
      <p>
        JWT
        eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjZkOGNjZmViZTBlZjNiZGE4YzJkZGQiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2NTM0NzMxMDR9.cdQpaOUjr4viJu_fnHUmQ08OO8_UPK0i9J2tVfi7oXg
      </p>
      <br />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#4aedc4" }}>
              <TableCell>
                <Typography>_id</Typography>
              </TableCell>
              <TableCell>
                <Typography>註冊日期</Typography>
              </TableCell>
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
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((x) => (
              <TableRow
                key={x._id}
                // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{x._id}</TableCell>
                <TableCell>{x.date}</TableCell>
                <TableCell>{x.email}</TableCell>
                <TableCell component="td" scope="row">
                  {x.username}
                </TableCell>
                <TableCell>
                  {x.tickets.map((t) => {
                    return (
                      <p key={uuidv4()}>
                        {t.area + "-" + t.row + "-" + t.col + "-" + t.bookDate}
                      </p>
                    );
                  })}
                </TableCell>
                <TableCell>{x.bankAccount}</TableCell>

                <TableCell>
                  <Button
                    onClick={handleClearSeats}
                    value={x._id}
                    color="error"
                    variant="contained"
                    sx={{ marginBottom: 1 }}
                  >
                    清除座位
                  </Button>
                  <Button
                    onClick={handlePaidSeats}
                    value={x._id}
                    color="success"
                    variant="contained"
                  >
                    確認付款
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UsersMonitor;
