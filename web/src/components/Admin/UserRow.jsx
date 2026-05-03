import React from "react";
import { Button, TableCell, TableRow } from "@mui/material";
import AdminService from "../../services/admin.service";
import { PRICES } from "../../event-config";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import "moment/locale/zh-tw";
moment.locale("zh-tw");

const totalPrice = (seats) =>
  (seats || []).reduce((acc, s) => acc + (PRICES[s.area] ?? 0), 0);

// booking shape:
// { id (=email), email, username, phone, bankAccount, contact,
//   emailSent, createdAt, updatedAt,
//   seats: [{ id, area, row, col, floor, sold, buyerEmail, paid, bookedAt }] }

const formatTimestamp = (ts) => {
  if (!ts) return "";
  if (typeof ts === "string") return moment(ts).format("YYYY/MM/DD HH:mm");
  if (ts._seconds) return moment(ts._seconds * 1000).format("YYYY/MM/DD HH:mm");
  if (ts.seconds) return moment(ts.seconds * 1000).format("YYYY/MM/DD HH:mm");
  return moment(ts).format("YYYY/MM/DD HH:mm");
};

const UserRow = ({ userdata: booking, showId, showDate, onChanged }) => {
  const refresh = () => {
    if (onChanged) onChanged();
  };

  const handleClearSeats = () => {
    if (!window.confirm("確定刪除座位?")) return;
    AdminService.clearByEmail(booking.email)
      .then(refresh)
      .catch((err) => {
        console.log(err);
        alert("刪除失敗");
      });
  };

  const handlePaidSeats = () => {
    if (!window.confirm("確認付款狀態")) return;
    AdminService.markPaid(booking.email)
      .then(refresh)
      .catch((err) => {
        console.log(err);
        alert("更新失敗");
      });
  };

  const handleSendEmail = () => {
    if (!window.confirm("確認傳送 email")) return;
    AdminService.sendPaidEmail(booking.email)
      .then(refresh)
      .catch((err) => {
        console.log(err);
        alert("寄信失敗");
      });
  };

  return (
    <TableRow>
      {showId && <TableCell>{booking.id}</TableCell>}
      {showDate && <TableCell>{formatTimestamp(booking.createdAt)}</TableCell>}
      <TableCell>{booking.email}</TableCell>
      <TableCell component="td" scope="row">
        {booking.username}
      </TableCell>
      <TableCell>
        {(booking.seats || []).map((t) => (
          <p key={t.id || uuidv4()}>
            {(t.floor === 2 ? "二樓 " : "") + t.area + "區" + t.row + "排" + t.col + "號"}
            {t.paid ? (
              " 已付款"
            ) : (
              <span style={{ color: "red" }}> 尚未付款</span>
            )}
            <br />
            {formatTimestamp(t.bookedAt)}
          </p>
        ))}
        {(booking.seats || []).length > 0 && (
          <p>共 {totalPrice(booking.seats)} 元</p>
        )}
      </TableCell>
      <TableCell>{booking.bankAccount}</TableCell>
      <TableCell>{booking.contact || "—"}</TableCell>
      <TableCell>
        {booking.emailSent ? (
          "已寄信"
        ) : (
          <span style={{ color: "red" }}> 尚未寄信</span>
        )}
      </TableCell>

      <TableCell>
        <Button
          onClick={handlePaidSeats}
          color="success"
          variant="contained"
        >
          確認付款
        </Button>

        <Button
          onClick={handleSendEmail}
          color="primary"
          variant="contained"
        >
          傳送郵件
        </Button>
        <Button
          onClick={handleClearSeats}
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
