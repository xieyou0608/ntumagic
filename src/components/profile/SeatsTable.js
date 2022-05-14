import React, { useEffect, useState } from "react";
import SeatService from "../../services/seat.service";
import { Box, TextField, Button, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
const SeatsTable = ({ currentUser }) => {
  let [mySeat, setMySeat] = useState([]);

  useEffect(() => {
    console.log(currentUser);
    SeatService.getMySeats()
      .then((res) => {
        console.log(res);
        setMySeat([...res.data]);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <Box sx={{ padding: 1.5 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                colSpan={3}
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SeatsTable;
