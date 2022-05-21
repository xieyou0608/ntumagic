import React from "react";
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

const AdminMonitor = ({ currentUser }) => {
  console.log(currentUser);
  let users = [];

  return (
    <div>
      {currentUser.token}
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#4aedc4" }}>
              <TableCell>
                <Typography>姓名</Typography>
              </TableCell>
              <TableCell>
                <Typography>聯絡電話</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((x) => (
              <TableRow
                key={x.friendName}
                // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="td" scope="row">
                  {x.friendName}
                </TableCell>
                <TableCell>{x.friendPhone}</TableCell>

                <TableCell align="right">
                  <Button
                    // onClick={handleDeleteFriends}
                    value={x.friendName}
                    color="error"
                    variant="outlined"
                  >
                    刪除
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminMonitor;
