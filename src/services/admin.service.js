import axios from "axios";
const ADMIN_API = process.env.REACT_APP_API_URL + "/admin";

class AdminService {
  modifyArea(positions, newArea) {
    let token;
    let user_id;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
      user_id = JSON.parse(localStorage.getItem("user")).user._id;
    } else {
      token = "";
      user_id = "";
    }
    return axios.patch(
      ADMIN_API + "/area",
      { positions, newArea, user_id },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
}

export default new AdminService();
