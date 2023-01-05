import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell as muiTableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
} from "@mui/material";
import theme from "../../styles/theme";

const TableCell = styled(muiTableCell)`
  background-color: ${theme.palette.background.main};
`;

const SeatsTable = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const mySeat = currentUser.user.tickets;

  return (
    <Box>
      <Stack direction="row" spacing={2} mb={1}>
        <h2>座位</h2>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                colSpan={4}
                align="center"
                sx={{
                  backgroundColor: theme.palette.gentle.main,
                }}
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
              <TableRow key={seat._id}>
                <TableCell>{seat.area}區</TableCell>
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
