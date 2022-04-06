import React from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import BookingPage from "./pages/BookingPage";
import { Routes, Route } from "react-router-dom";
import "./styles/style.css";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/booking/*" element={<BookingPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
