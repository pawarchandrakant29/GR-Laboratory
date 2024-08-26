import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Details from "./components/CustomerDetails";
import AdminPage from "./components/AdminPage";
import Home from "./components/Home";
import OrderCard from "./components/Orders";
import Profile from "./components/Profile";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/orders" element={< OrderCard/>} />
        <Route path="/profile" element={< Profile/>} />
      </Routes>
    </Router>
  );
};

export default App;
