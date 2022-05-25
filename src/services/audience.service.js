import axios from "axios";
const AUDIENCE_API = process.env.REACT_APP_API_URL + "/audience";

class AudienceService {
  editFriends(friends) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.patch(
      AUDIENCE_API + "/friends",
      { friends },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  editBankAccount(bankAccount) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.patch(
      AUDIENCE_API + "/bankAccount",
      { bankAccount },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  reload() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(AUDIENCE_API + "/reload", {
      headers: {
        Authorization: token,
      },
    });
  }
}

export default new AudienceService();
