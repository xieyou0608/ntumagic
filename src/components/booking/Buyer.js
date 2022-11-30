import React from "react";
import { useSelector } from "react-redux";
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
  width: 30vw;
  margin-right: 5vw;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    width: 35vw;
  }
`;

const TableCell = styled(muiTableCell)`
  font-size: 3vmin;
  padding: 2vh 3vw;
  text-align: center;
  background-color: ${({ theme }) => theme.palette.background.main};
`;

const Buyer = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const username = currentUser.user.username;
  const numFriends = currentUser.user.friends.length;
  const numAvailable = numFriends + 1;
  const numTickets = currentUser.user.tickets.length;
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              colSpan={2}
              align="center"
              sx={{ backgroundColor: "gentle.main" }}
            >
              {username}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>可劃位數</TableCell>
            <TableCell>{numAvailable}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>已劃位數</TableCell>
            <TableCell>{numTickets}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Buyer;
