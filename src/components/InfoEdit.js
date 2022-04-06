import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const InfoEdit = ({ setUserInfo }) => {
  const [phone, setPhone] = useState("");
  const [userName, setUserName] = useState("");

  const phoneHandler = (e) => {
    setPhone(e.target.value);
    console.log(e.target.value);
  };

  const userNameHandler = (e) => {
    setUserName(e.target.value);
  };

  const submitHandler = (userName, phone) => {
    setUserInfo({ name: userName, phone: phone });
    console.log({ name: userName, phone: phone });
  };

  return (
    <div className="edit">
      <form action="">
        <div className="edit-area">
          <label>姓名</label>
          <input
            type="text"
            onChange={userNameHandler}
            value={userName}
            required
          />

          <label>手機號碼</label>
          <input type="text" onChange={phoneHandler} value={phone} required />
        </div>
        <Link to="pick-seat">
          <button
            className="edit-btn"
            onClick={() => {
              submitHandler(userName, phone);
            }}
          >
            劃位
          </button>
        </Link>
      </form>
    </div>
  );
};
export default InfoEdit;
