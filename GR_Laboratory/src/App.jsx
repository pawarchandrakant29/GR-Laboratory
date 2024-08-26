import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Home from "./components/Auth/Home";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Profile from "./components/Auth/Profile";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Appointment from "./components/Auth/Appointment";
import Details from "./components/Auth/CustomerDetails";
import AppointmentStatus from "./components/Auth/Status";
import LabTestCards from "./components/Auth/TestsCards";
import CartPage from "./components/Auth/CartPage";
import { useDispatch } from "react-redux";
import { fetchCartItems } from "./redux/actions/cartActions";
import CheckoutForm from "./components/Auth/CheckOut";
import OrderCard from "./components/Auth/MyOrders";
import AboutUs from "./components/Auth/AboutUs";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/details" element={<Details />} />
        <Route path="/status" element={<AppointmentStatus />} />
        <Route path="/tests" element={<LabTestCards />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/check" element={<CheckoutForm />} />
        <Route path="/myorders" element={<OrderCard />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </Router>
  );
};

export default App;
