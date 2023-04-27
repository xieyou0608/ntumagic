import React, { useState } from "react";
import { Button, TableCell, TableRow } from "@mui/material";
import AdminService from "../../services/admin.service";
import { v4 as uuidv4 } from "uuid";

const UserRow = ({ userdata, showId, showDate }) => {
  let [user, setUser] = useState(userdata);

  const handleClearSeats = (e) => {
    if (window.confirm("確定刪除座位?")) {
      let user_id = e.target.value;
      AdminService.clearUserSeats(user_id)
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handlePaidSeats = (e) => {
    if (window.confirm("確認付款狀態")) {
      let user_id = e.target.value;
      AdminService.paidSeats(user_id)
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleSendEmail = (e) => {
    if (window.confirm("確認傳送email")) {
      let user_id = e.target.value;
      AdminService.sendEmail(user_id)
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <TableRow>
      {showId && <TableCell>{user._id}</TableCell>}
      {showDate && <TableCell>{user.date}</TableCell>}
      <TableCell>{user.email}</TableCell>
      <TableCell component="td" scope="row">
        {user.username}
      </TableCell>
      <TableCell>
        {user.tickets.map((t) => {
          return (
            <p key={uuidv4()}>
              {t.area + "區" + t.row + "排" + t.col + "號"}
              {t.paid ? (
                " 已付款"
              ) : (
                <span style={{ color: "red" }}> 尚未付款</span>
              )}
              <br />
              {t.bookDate}
            </p>
          );
        })}
      </TableCell>
      <TableCell>{user.bankAccount}</TableCell>
      <TableCell>
        {user.verified ? (
          "已驗證"
        ) : (
          <span style={{ color: "red" }}> 尚未驗證</span>
        )}
      </TableCell>
      <TableCell>
        {user.emailSent ? (
          "已寄信"
        ) : (
          <span style={{ color: "red" }}> 尚未寄信</span>
        )}
      </TableCell>

      <TableCell>
        <Button
          onClick={handlePaidSeats}
          value={user._id}
          color="success"
          variant="contained"
        >
          確認付款
        </Button>

        <Button
          onClick={handleSendEmail}
          value={user._id}
          color="primary"
          variant="contained"
        >
          傳送郵件
        </Button>
        <Button
          onClick={handleClearSeats}
          value={user._id}
          color="error"
          variant="contained"
        >
          清除座位
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default UserRow;
