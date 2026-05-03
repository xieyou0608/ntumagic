import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import AdminService from "../../services/admin.service";
import UserRow from "./UserRow";

const UsersMonitor = () => {
  const [bookings, setBookings] = useState([]);
  const [loadError, setLoadError] = useState(null);
  const [showId, setShowId] = useState(false);
  const [showDate, setShowDate] = useState(false);

  const handleShowId = () => setShowId((v) => !v);
  const handleShowDate = () => setShowDate((v) => !v);

  const loadBookings = useCallback(() => {
    AdminService.getAllBookings()
      .then((res) => {
        setBookings(res.data);
        setLoadError(null);
      })
      .catch((e) => {
        console.error("getAllBookings failed:", e);
        const status = e.response?.status;
        const message = e.response?.data?.message || e.message;
        setLoadError(
          status ? `載入訂單失敗（HTTP ${status}）: ${message}` : `載入訂單失敗: ${message}`
        );
      });
  }, []);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  return (
    <Box sx={{ padding: "3rem" }}>
      <Typography variant="h5">操作說明：</Typography>
      <Typography>
        <Button color="success" variant="contained">
          確認付款
        </Button>
        更新觀眾所有座位的付款狀態，全部都會變成已付款。
        <br />
        <Button color="info" variant="contained">
          重寄劃位信
        </Button>
        劃位信寄送失敗、或是後台改動座位後要重發給觀眾時用。觀眾劃位當下系統會自動寄一次，這個按鈕是補救用。
        <br />
        <Button color="primary" variant="contained">
          寄付款信
        </Button>
        確認觀眾匯款後寄付款成功通知信。
        <br />
        <Button color="error" variant="contained">
          清除座位
        </Button>
        把"所有座位"刪除，在劃位頁面座位區的座位也會釋出。（不要亂按）
      </Typography>
      <Typography variant="h5">注意：</Typography>
      <Typography>
        1. 信的內容會自動用觀眾的名字跟所有座位來寄出（包含沒付款的，所以如果有人座位有問題的話先別寄）
        <br />
        2. 點按鈕之後那一列會更新，如果沒更新代表出錯了，按 F12 看一下問題或再回報
        <br />
        3. 寄信會需要多一點時間，看到通知狀態變成已寄就代表有成功，另外也會寄一封備份到自己的信箱
        <br />
        4. 觀眾如果劃新的位子或被改動座位，兩個通知狀態都會重置成尚未寄，記得補寄
        <br />
        5. 後台更新之後，觀眾到個人頁面會自動抓新的資料，如果沒的話，確認後台沒問題叫他重新整理。
      </Typography>
      <Button onClick={handleShowId} variant="outlined" sx={{ mr: 2 }}>
        {showId ? "隱藏 ID" : "顯示 ID"}
      </Button>
      <Button onClick={handleShowDate} variant="outlined">
        {showDate ? "隱藏建立日期" : "顯示建立日期"}
      </Button>
      {loadError && (
        <Typography sx={{ color: "error.main", mt: 2 }}>{loadError}</Typography>
      )}
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#4aedc4" }}>
              {showId && (
                <TableCell>
                  <Typography>id</Typography>
                </TableCell>
              )}
              {showDate && (
                <TableCell>
                  <Typography>建立日期</Typography>
                </TableCell>
              )}
              <TableCell>
                <Typography>信箱</Typography>
              </TableCell>
              <TableCell>
                <Typography>姓名</Typography>
              </TableCell>
              <TableCell>
                <Typography>座位</Typography>
              </TableCell>
              <TableCell>
                <Typography>付款帳戶</Typography>
              </TableCell>
              <TableCell>
                <Typography>聯絡方式</Typography>
              </TableCell>
              <TableCell>
                <Typography>通知</Typography>
              </TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <UserRow
                userdata={booking}
                showId={showId}
                showDate={showDate}
                onChanged={loadBookings}
                key={booking.id || booking.email}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UsersMonitor;
