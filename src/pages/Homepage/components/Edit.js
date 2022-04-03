import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Edit = ({ setUserInfo }) => {
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
        <div>
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
        <Link to="/booking">
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
export default Edit;
