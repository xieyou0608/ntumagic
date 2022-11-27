import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

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

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  const showNav = location.pathname !== "/" && location.pathname !== "/guide";

  return (
    <div className="app">
      {showNav && <Nav />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/booking/*" element={<BookingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/pay" element={<PayPage />} />
        <Route path="/guide" element={<GuidePage />} />
        <Route path="/prebooking" element={<PreBookingPage />} />
        <Route path="/preview" element={<PreviewPage />} />
      </Routes>
      {showNav && <Footer />}
    </div>
  );
}

export default App;
