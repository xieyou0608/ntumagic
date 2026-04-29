import axios from "axios";
const AUDIENCE_API = process.env.REACT_APP_API_URL + "/audience";

class AuthService {
  // audience 不需要登入，這支只剩 email 驗證
  verify(email, verifyToken) {
    return axios.patch(AUDIENCE_API + "/verify", {
      email,
      verifyToken,
    });
  }
}

export default new AuthService();
