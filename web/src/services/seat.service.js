import axios from "axios";
const SEATS_API = process.env.REACT_APP_API_URL + "/seats";

class SeatService {
  // 後端公開，不需要 auth
  // bypassCache: 撞到 409 之後 reload 用，加 query param 繞過 CDN/瀏覽器 cache 拿最新狀態
  getAllSeats({ bypassCache = false } = {}) {
    const url = bypassCache ? `${SEATS_API}?_=${Date.now()}` : SEATS_API;
    return axios.get(url);
  }

  // positions: [{ floor, area, row, col }]
  booking(positions, email, username, bankAccount, contact, phone) {
    return axios.patch(SEATS_API + "/booking", {
      positions,
      email,
      username,
      phone,
      bankAccount,
      contact,
    });
  }

  // 用 email 查觀眾自己訂的座位
  getMySeatsByEmail(email) {
    return axios.post(SEATS_API + "/getSeat", { email });
  }
}

export default new SeatService();
