import React from "react";
import {
  styled,
  TableContainer as muiTableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell as muiTableCell,
  Box,
  TextField,
} from "@mui/material";

const TableContainer = styled(muiTableContainer)`
  width: 30vw;
  margin-left: 5vw;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    width: 35vw;
  }
`;

const TableCell = styled(muiTableCell)`
  font-size: 3vmin;
  padding: 2vh 3vw;
  text-align: center;
  background-color: ${({ theme }) => theme.palette.background.main};

  p {
    font-size: 2vmin;
  }
`;

const BuyerStyleForm = styled("form")`
  display: flex;
  flex-direction: column;
  row-gap: 2vh;

  h1 {
    text-align: center;
  }
`;
const InputBox = (props) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
      {props.children}
    </Box>
  );
};
const BuyerInput = (props) => {
  return (
    <TextField
      variant="outlined"
      {...props}
      sx={{
        flexGrow: 1,
        background: "white",
      }}
    >
      {props.chidren}
    </TextField>
  );
};

const BuyerForm = ({ buyer, setBuyer }) => {
  const handleBuyerChange = (e) => {
    setBuyer({
      ...buyer,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              colSpan={1}
              align="center"
              sx={{ backgroundColor: "gentle.main" }}
            >
              匯款資訊
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <BuyerStyleForm action="">
                <InputBox>
                  <BuyerInput
                    onChange={handleBuyerChange}
                    value={buyer.email}
                    type="email"
                    label="信箱"
                    name="email"
                  />
                </InputBox>
                <InputBox>
                  <BuyerInput
                    onChange={handleBuyerChange}
                    value={buyer.username}
                    type="text"
                    label="姓名"
                    name="username"
                  />
                </InputBox>
                <InputBox>
                  <BuyerInput
                    onChange={handleBuyerChange}
                    value={buyer.bankAccount}
                    type="text"
                    label="預計匯款帳戶末五碼"
                    name="bankAccount"
                  />
                </InputBox>
                <p>若無帳戶請填寫"其他"並私訊粉專</p>
              </BuyerStyleForm>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BuyerForm;
