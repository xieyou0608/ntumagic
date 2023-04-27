import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, IconButton, styled } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { userLogout } from "../../store/user-actions";

const StyledLink = styled(Link)`
  color: white;
  font-size: 14px;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5vh;
  }
`;

const PcNavbar = styled("nav")`
  display: flex;
  column-gap: 6vmin;
  padding-left: 6vmin;
  padding-right: 6vmin;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);
  height: 10vh;
  width: 100%;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    display: none;
  }
`;

const MobileNavbar = styled("nav")`
  position: sticky;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);
  padding-left: 6vmin;
  padding-right: 6vmin;

  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.breakpoints.up("sm")} {
    display: none;
  }
`;

const Nav = () => {
  const currentUser = JSON.parse(localStorage.getItem("admin"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    if (window.confirm("確定要登出嗎")) {
      dispatch(userLogout());
      window.alert("登出成功，將重新返回首頁");
      navigate("/");
    }
  };

  const [openNav, setOpenNav] = useState(false);
  const toggleNav = () => {
    setOpenNav((prev) => !prev);
  };

  const content = (
    <>
      <StyledLink to="/">首頁</StyledLink>
      <StyledLink to="/booking">劃位</StyledLink>
      {currentUser && currentUser.user.role === "admin" && (
        <StyledLink to="/admin">後台</StyledLink>
      )}
      <StyledLink to="/about" sx={{ flexGrow: 1 }}>
        聯絡我們
      </StyledLink>
    </>
  );

  return (
    <>
      <PcNavbar>{content}</PcNavbar>
      <MobileNavbar>
        <Box sx={{ textAlign: "right" }}>
          <IconButton onClick={toggleNav} sx={{ color: "white" }}>
            <MenuIcon />
          </IconButton>
        </Box>
        {openNav && <>{content}</>}
      </MobileNavbar>
    </>
  );
};

export default Nav;
