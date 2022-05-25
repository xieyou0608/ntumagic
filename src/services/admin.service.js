import axios from "axios";
const ADMIN_API = process.env.REACT_APP_API_URL + "/admin";
const SEATS_API = process.env.REACT_APP_API_URL + "/seats";

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

  getAllUser() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(ADMIN_API + "/users", {
      headers: {
        Authorization: token,
      },
    });
  }

  getAllSeats() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(SEATS_API + "/", {
      headers: {
        Authorization: token,
      },
    });
  }

  deleteUser(_user_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.post(
      ADMIN_API + "/user",
      { _user_id },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  clearSeats(user_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

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
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

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
}

export default new AdminService();
