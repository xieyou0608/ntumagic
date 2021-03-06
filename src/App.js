import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Nav from "./components/Nav";
import Footer from "./components/Footer";
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
import "./styles/style.css";
import AuthService from "./services/auth.service";

function App() {
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  let location = useLocation();

  const showNav = () => {
    if (location.pathname != "/" && location.pathname != "/guide") {
      return true;
    }
    return false;
  };

  return (
    <div className="App">
      {showNav() && (
        <Nav currentUser={currentUser} setCurrentUser={setCurrentUser} />
      )}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/booking/*"
          element={
            <BookingPage
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path="/login"
          element={
            <LoginPage
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path="/register"
          element={<RegisterPage currentUser={currentUser} />}
        />

        <Route
          path="/profile"
          element={
            <ProfilePage
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path="/admin"
          element={<AdminPage currentUser={currentUser} />}
        />
        <Route path="/pay" element={<PayPage currentUser={currentUser} />} />
        <Route
          path="/guide"
          element={<GuidePage currentUser={currentUser} />}
        />
        <Route path="/prebooking" element={<PreBookingPage />} />
        <Route path="/preview" element={<PreviewPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
