import axios from "axios";
const ADMIN_API = process.env.REACT_APP_API_URL + "/admin";
const SEATS_API = process.env.REACT_APP_API_URL + "/seats";

const getAdminToken = () => {
  let token;
  if (localStorage.getItem("admin")) {
    token = JSON.parse(localStorage.getItem("admin")).token;
  } else {
    token = "";
  }
  console.log(token);
  return token;
};

class AdminService {
  modifyArea(positions, newArea) {
    const token = getAdminToken();
    return axios.patch(
      ADMIN_API + "/area",
      { positions, newArea },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  getAllUser() {
    const token = getAdminToken();
    return axios.get(ADMIN_API + "/users", {
      headers: {
        Authorization: token,
      },
    });
  }

  getAllSeats() {
    const token = getAdminToken();
    return axios.get(SEATS_API + "/", {
      headers: {
        Authorization: token,
      },
    });
  }

  // 清出所有人座位(重置)
  clearAllSeats() {
    const token = getAdminToken();
    return axios.patch(
      ADMIN_API + "/clearAllSeats",
      {}, // body
      {
        // header
        headers: {
          Authorization: token,
        },
      }
    );
  }

  // 清出單個觀眾的所有座位
  clearUserSeats(user_id) {
    const token = getAdminToken();
    return axios.patch(
      ADMIN_API + "/clearSeatById",
      { user_id },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  paidSeats(user_id) {
    const token = getAdminToken();
    return axios.patch(
      ADMIN_API + "/seat/paid",
      { user_id },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  sendEmail(user_id) {
    const token = getAdminToken();
    return axios.post(
      ADMIN_API + "/seat/email",
      {
        user_id,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
}

export default new AdminService();
