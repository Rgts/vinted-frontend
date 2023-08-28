import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Cookies from "js-cookie";

import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";

import Header from "./components/Header";
import Hero from "./components/Hero";

import "./App.css";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);

  return (
    <>
      <Router>
        <Header token={token} setToken={setToken} />
        <Hero />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offer/:id" element={<Offer />} />
          <Route path="/signup" element={<Signup setToken={setToken} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/publish" element={<Publish token={token} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
