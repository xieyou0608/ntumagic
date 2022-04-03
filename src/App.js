import React, { useState } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Booking from "./pages/Booking";
import { Routes, Route } from "react-router-dom";
import "./styles/style.css";

function App() {
  const [userInfo, setUserInfo] = useState(null);

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Homepage setUserInfo={setUserInfo} />} />
        <Route path="about" element={<About />} />
        <Route path="booking" element={<Booking userInfo={userInfo} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
