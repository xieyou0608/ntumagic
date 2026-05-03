import axios from "axios";
import { auth } from "../firebase";

const ADMIN_API = process.env.REACT_APP_API_URL + "/admin";

// 拿目前登入 admin 的 Firebase ID Token，後端要 Bearer 格式
const getAdminIdToken = async () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Admin not signed in");
  }
  return user.getIdToken();
};

const authHeader = async () => {
  const idToken = await getAdminIdToken();
  return { Authorization: "Bearer " + idToken };
};

class AdminService {
  async getAllBookings() {
    const headers = await authHeader();
    return axios.get(ADMIN_API + "/bookings", { headers });
  }

  // 重置全部座位 + 全部訂單
  async clearAllSeats() {
    const headers = await authHeader();
    return axios.patch(ADMIN_API + "/clearAllSeats", {}, { headers });
  }

  // 清掉指定 email 觀眾所有的座位 + booking
  async clearByEmail(email) {
    const headers = await authHeader();
    return axios.patch(ADMIN_API + "/clearByEmail", { email }, { headers });
  }

  // 移除單一座位
  async removeSeat({ email, floor, area, row, col }) {
    const headers = await authHeader();
    return axios.patch(
      ADMIN_API + "/removeSeat",
      { email, floor, area, row, col },
      { headers }
    );
  }

  // 修改一批座位的 area
  async modifyArea(positions, newArea) {
    const headers = await authHeader();
    return axios.patch(
      ADMIN_API + "/area",
      { positions, newArea },
      { headers }
    );
  }

  // 標記某 email 的訂單為已付款
  async markPaid(email) {
    const headers = await authHeader();
    return axios.patch(ADMIN_API + "/markPaid", { email }, { headers });
  }

  // 寄付款確認信給某 email
  async sendPaidEmail(email) {
    const headers = await authHeader();
    return axios.post(ADMIN_API + "/sendPaidEmail", { email }, { headers });
  }

  // 重寄劃位通知信給某 email
  async sendBookingEmail(email) {
    const headers = await authHeader();
    return axios.post(ADMIN_API + "/sendBookingEmail", { email }, { headers });
  }
}

export default new AdminService();
