import axios from "axios";
const SEATS_API = process.env.REACT_APP_API_URL + "/seats";

class SeatService {
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

  booking(positions, email, username, bankAccount) {
    return axios.patch(SEATS_API + "/booking", {
      positions,
      email,
      username,
      bankAccount,
    });
  }

  getMySeats() {
    let token;
    let user_id;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
      user_id = JSON.parse(localStorage.getItem("user")).user._id;
    } else {
      token = "";
      user_id = "";
    }
    return axios.post(
      SEATS_API + "/getSeat",
      { user_id },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  getPreviewSeats() {
    return axios.get(SEATS_API);
  }
}

export default new SeatService();
