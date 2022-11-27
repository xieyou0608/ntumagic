import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const SeatsTable = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const mySeat = currentUser.user.tickets;

  return (
    <Box sx={{ padding: 1.5 }}>
      <TableContainer component={Paper}>
        {/* <Table sx={{ minWidth: 650 }} aria-label="simple table"> */}
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                colSpan={4}
                align="center"
                sx={{ backgroundColor: "#4aedc4" }}
              >
                <Typography>座位</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!mySeat.length && (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  目前尚無劃位
                </TableCell>
              </TableRow>
            )}
            {mySeat.map((seat) => (
              <TableRow
                key={seat._id}
                // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {seat.area}區
                </TableCell>
                <TableCell>{seat.row}排</TableCell>
                <TableCell>{seat.col}號</TableCell>
                <TableCell>{seat.paid ? "已付款" : "尚未付款"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SeatsTable;
