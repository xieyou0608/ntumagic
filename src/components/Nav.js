import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const Nav = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    AuthService.logout();
    setCurrentUser(null);
    window.alert("登出成功，將重新返回首頁");
    navigate("/");
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/booking">劃位</Link>
        </li>
        {currentUser && (
          <li>
            <Link to="/profile">個人頁面</Link>
          </li>
        )}

        {!currentUser && (
          <li>
            <Link to="/register">註冊</Link>
          </li>
        )}
        {!currentUser && (
          <li>
            <Link to="/login">登入</Link>
          </li>
        )}
        {currentUser && (
          <li>
            <Link to="/register" onClick={handleLogout}>
              登出
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
