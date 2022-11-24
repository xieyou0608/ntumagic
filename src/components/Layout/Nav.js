import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Typography, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";

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

  const [menu, setMenu] = useState(false);
  const handleMenu = () => {
    if (menu) setMenu(false);
    else setMenu(true);
  };

  const location = useLocation();

  return (
    <div>
      {/* PC display */}
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "rgba(0,0,0, 0.7)",
          display: { xs: "none", sm: "flex" },
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display: "flex", flexGrow: 1 }}>
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
              {currentUser && currentUser.user.role == "admin" && (
                <Button
                  component={Link}
                  to="/admin"
                  sx={{ my: 2, color: "white" }}
                >
                  後台
                </Button>
              )}

              <Button
                component={Link}
                to="/about"
                sx={{ my: 2, color: "white" }}
              >
                聯絡我們
              </Button>
              {currentUser && (
                <Box
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button onClick={handleLogout} sx={{ my: 2, color: "white" }}>
                    登出
                  </Button>
                </Box>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* mobile display */}
      {/* 非座位區 */}
      {location.pathname != "/booking" && location.pathname != "/preview" && (
        <AppBar
          position="sticky"
          sx={{
            backgroundColor: "rgba(0,0,0, 0.7)",
            display: { xs: "flex", sm: "none" },
          }}
        >
          <Container maxWidth="xl">
            <Box
              sx={{
                flexDirection: "column",
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
              {menu && (
                <Button
                  component={Link}
                  to="/about"
                  sx={{ my: 0, color: "white", display: "block" }}
                >
                  關於我們
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
            </Box>
          </Container>
        </AppBar>
      )}

      {/* mobile display */}
      {/* 座位區 */}
      {(location.pathname == "/booking" || location.pathname == "/preview") && (
        <AppBar
          position="sticky"
          sx={{
            backgroundColor: "rgba(0,0,0, 0.7)",
            display: { xs: "flex", sm: "none" },
            width: "700px",
          }}
        >
          <Container maxWidth="xl">
            <Box
              sx={{
                flexDirection: "column",
                display: { xs: "flex", sm: "none" },
                // width: "700px",
                // overflow: "visible",
                // overflowX: "visible",
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
              {menu && (
                <Button
                  component={Link}
                  to="/about"
                  sx={{ my: 0, color: "white", display: "block" }}
                >
                  關於我們
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
            </Box>
          </Container>
        </AppBar>
      )}
    </div>
  );
};

export default Nav;
