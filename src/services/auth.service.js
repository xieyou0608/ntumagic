import axios from "axios";
const USER_API = process.env.REACT_APP_API_URL + "/user";

class AuthService {
  login(email, password) {
    return axios.post(USER_API + "/login", {
      email,
      password,
    });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(email, password, username, phone) {
    return axios.post(USER_API + "/register", {
      email,
      password,
      username,
      phone,
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
  verify(verifyToken) {
    return axios.patch(USER_API + "/verify", {
      verifyToken,
    });
  }
}

export default new AuthService();
