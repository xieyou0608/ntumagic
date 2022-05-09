import axios from "axios";
const AUDIENCE_API = process.env.REACT_APP_API_URL + "/audience";

class AudienceService {
  editFriends(friends) {
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
      AUDIENCE_API + "/friends",
      { friends },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
}

export default new AudienceService();
