import React, { useEffect, useState } from "react";
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
import AdminService from "../../services/seat.service";

const SeatsMonitor = () => {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    AdminService.getAllSeats()
      .then((res) => {
        console.log(res.data);
        setSeats(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <Box sx={{ padding: "3rem" }}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#4aedc4" }}>
              <TableCell>
                <Typography>座位</Typography>
              </TableCell>
              <TableCell>
                <Typography>Buyer</Typography>
              </TableCell>
              <TableCell>
                <Typography>狀態</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {seats.map((x) => (
              <TableRow
                key={x._id}
                // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{x.area + "區" + x.row + "-" + x.col}</TableCell>
                <TableCell>{x.buyer}</TableCell>
                <TableCell>
                  {x.paid ? (
                    <Typography color="red">已付款</Typography>
                  ) : (
                    "尚未確認"
                  )}
                </TableCell>
                {/* <TableCell>
                  <Button
                    // onClick={handleClearBuy}
                    value={x._id}
                    color="error"
                    variant="contained"
                  >
                    刪除
                  </Button>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SeatsMonitor;
