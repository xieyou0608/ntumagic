import React from "react";
import { v4 } from "uuid";
import {
  styled,
  TableContainer as muiTableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell as muiTableCell,
} from "@mui/material";

const TableContainer = styled(muiTableContainer)`
  width: 35vw;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    width: 50vw;
  }
`;

const TableCell = styled(muiTableCell)`
  font-size: 3vmin;
  padding: 2vh 0;
  text-align: center;
  background-color: ${({ theme }) => theme.palette.background.main};
`;

const Cart = ({ chosenSeats }) => {
  const priceDict = (area) => {
    if (area === "A") {
      return 500;
    } else if (area === "B") {
      return 400;
    } else if (area === "C") {
      return 300;
    } else {
      return 200;
    }
  };

  const compute_total = () => {
    if (chosenSeats.length) {
      return chosenSeats
        .map((chosen) => priceDict(chosen.area))
        .reduce((sum, price) => sum + price);
    }
    return 0;
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              colSpan={4}
              align="center"
              sx={{ backgroundColor: "gentle.main" }}
            >
              座位
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {chosenSeats.length === 0 && (
            <TableRow>
              <TableCell align="center" colSpan={4}>
                尚未選擇
              </TableCell>
            </TableRow>
          )}

          {chosenSeats.map((chosen) => {
            return (
              <TableRow key={v4()}>
                <TableCell>{chosen.area} 區</TableCell>
                <TableCell>{chosen.row} 排</TableCell>
                <TableCell>{chosen.col} 號</TableCell>
                <TableCell>{priceDict(chosen.area)} 元</TableCell>
              </TableRow>
            );
          })}
          {chosenSeats.length > 0 && (
            <TableRow>
              <TableCell colSpan={4} align="center">
                共 {compute_total()} 元
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Cart;
