import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { textAlign } from "@mui/system";

const Nav = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    if (window.confirm("確定要登出嗎")) {
      AuthService.logout();
      setCurrentUser(null);
      window.alert("登出成功，將重新返回首頁");
      navigate("/");
    }
  };

  const [menu, setMenu] = useState(true);
  const handleMenu = () => {
    if (menu) setMenu(false);
    else setMenu(true);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "rgba(0,0,0, 0.7)" }}>
      <Container maxWidth="xl">
        {/* PC display */}
        <Toolbar disableGutters sx={{ display: { xs: "none", sm: "flex" } }}>
          <Box sx={{ flexGrow: 1 }}>
            <Button component={Link} to="/" sx={{ my: 2, color: "white" }}>
              首頁
            </Button>
            <Button
              component={Link}
              to="/booking"
              sx={{ my: 2, color: "white" }}
            >
              劃位
            </Button>
            {currentUser && (
              <Button
                component={Link}
                to="/profile"
                sx={{ my: 2, color: "white" }}
              >
                個人頁面
              </Button>
            )}
            {!currentUser && (
              <Button
                component={Link}
                to="/register"
                sx={{ my: 2, color: "white" }}
              >
                註冊
              </Button>
            )}
            {!currentUser && (
              <Button
                component={Link}
                to="/login"
                sx={{ my: 2, color: "white" }}
              >
                登入
              </Button>
            )}
            {currentUser && (
              <Button onClick={handleLogout} sx={{ my: 2, color: "white" }}>
                登出
              </Button>
            )}
            <Button component={Link} to="/about" sx={{ my: 2, color: "white" }}>
              關於我們
            </Button>
            {currentUser && currentUser.user.role == "admin" && (
              <Button
                component={Link}
                to="/admin"
                sx={{ my: 2, color: "white" }}
              >
                後台
              </Button>
            )}
          </Box>
        </Toolbar>
        {/* mobile display */}
        <Box
          sx={{
            flexDirection: "column",
            display: { xs: "flex", sm: "none" },
          }}
        >
          <Box sx={{ textAlign: "right" }}>
            <IconButton
              size="small"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          {menu && (
            <Button
              component={Link}
              to="/"
              sx={{ my: 0, color: "white", display: "block" }}
            >
              首頁
            </Button>
          )}
          {menu && (
            <Button
              component={Link}
              to="/booking"
              sx={{ my: 0, color: "white", display: "block" }}
            >
              劃位
            </Button>
          )}
          {menu && currentUser && (
            <Button
              component={Link}
              to="/profile"
              sx={{ my: 0, color: "white", display: "block" }}
            >
              個人頁面
            </Button>
          )}
          {menu && !currentUser && (
            <Button
              component={Link}
              to="/register"
              sx={{ my: 0, color: "white", display: "block" }}
            >
              註冊
            </Button>
          )}
          {menu && !currentUser && (
            <Button
              component={Link}
              to="/login"
              sx={{ my: 0, color: "white", display: "block" }}
            >
              登入
            </Button>
          )}
          {menu && currentUser && (
            <Button
              onClick={handleLogout}
              sx={{
                my: 0,
                color: "white",
                display: "block",
                textAlign: "left",
              }}
            >
              登出
            </Button>
          )}
          {menu && (
            <Button
              component={Link}
              to="/about"
              sx={{ my: 0, color: "white", display: "block" }}
            >
              關於我們
            </Button>
          )}
        </Box>
      </Container>
    </AppBar>
  );
};

export default Nav;
