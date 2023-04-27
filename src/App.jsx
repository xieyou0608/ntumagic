import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import theme from "./styles/theme";
import AppLayout from "./components/Layout/AppLayout";
import Nav from "./components/Layout/Nav";
import Footer from "./components/Layout/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import BookingPage from "./pages/BookingPage";
import AdminPage from "./pages/AdminPage";
import PayPage from "./pages/PayPage";
import GuidePage from "./pages/GuidePage";

function App() {
  const location = useLocation();

  useEffect(() => {
    localStorage.removeItem("user");
  }, []);

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
        <Route path="/booking/*" element={<BookingPage />} />

        <Route path="/pay" element={<PayPage />} />
        <Route path="/guide" element={<GuidePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {showNav && <Footer />}
    </AppLayout>
  );
}

export default App;
