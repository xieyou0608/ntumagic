import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import theme from "./styles/theme";
import AppLayout from "./components/Layout/AppLayout";
import Nav from "./components/Layout/Nav";
import Footer from "./components/Layout/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import BookingPage from "./pages/BookingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import PayPage from "./pages/PayPage";
import GuidePage from "./pages/GuidePage";
import PreBookingPage from "./pages/PreBookingPage";
import PreviewPage from "./pages/PreviewPage";

function App() {
  const location = useLocation();
  const currentUser = useSelector((state) => state.user.currentUser);
  const isLogin = !!currentUser;

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  const showNav = location.pathname !== "/" && location.pathname !== "/guide";

  const isBooking =
    location.pathname === "/booking" || location.pathname === "/preview";
  const backGroundColor = isBooking ? "white" : theme.palette.background.main;

  return (
    <AppLayout sx={{ bgcolor: backGroundColor }}>
      {showNav && <Nav />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/register"
          element={
            !isLogin ? <RegisterPage /> : <Navigate to="/prebooking" replace />
          }
        />
        <Route
          path="/login"
          element={
            !isLogin ? <LoginPage /> : <Navigate to="/prebooking" replace />
          }
        />
        <Route
          path="/booking/*"
          element={isLogin ? <BookingPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/profile"
          element={isLogin ? <ProfilePage /> : <Navigate to="/login" replace />}
        />

        <Route path="/pay" element={<PayPage />} />
        <Route path="/guide" element={<GuidePage />} />
        <Route path="/prebooking" element={<PreBookingPage />} />
        <Route path="/preview" element={<PreviewPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {showNav && <Footer />}
    </AppLayout>
  );
}

export default App;
