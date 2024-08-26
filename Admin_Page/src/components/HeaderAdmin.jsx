import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signout } from "../redux/actions/authActions";
import axios from "axios";

const AdminHeader = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isSuc = useSelector((state) => state.auth.isSuc);
  const currentUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    const userId = localStorage.getItem("userId");
    if (loggedIn && userId) {
      fetchUserData(userId)
        .then((userData) => {
          dispatch({ type: "LOGIN_SUCCESS", payload: userData });
        })
        .catch((error) => {
          console.error("Fetch User Data Error:", error.message);
          dispatch({ type: "LOGIN_ERROR", payload: error.message });
        });
    }
  }, [dispatch]);

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching user data");
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handlesignout = () => {
    dispatch(signout())
      .then(() => {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("userId");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Signout Error:", error.message);
      });
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    navigate("/");
  };
  const Appointmentadmin = (e) => {
    e.preventDefault();
    navigate("/details");
  };
  const userorders = (e) => {
    e.preventDefault();
    navigate("/orders");
  };

  return (
    <header className="pb-1">
      <div className="container">
        <div className="set ">
          <div align="center">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/final-pr-1a4a6.appspot.com/o/gr.png?alt=media&token=0e75e1e0-a306-47b3-9f83-db30436501df"
              alt=""
              className="logo"
            />
            <p className="m-0 ">
              <i className="clr-set3 ">Laboratory</i>
            </p>
          </div>
          <nav className="col">
            <ul className="navlinks d-flex justify-content-end align-items-center p-0">
              <li className="items">
                <a href="#" onClick={handleHomeClick}>
                  Home
                </a>
              </li>
              <li className="items" onClick={Appointmentadmin}>
                <a href="#">Appointment's</a>
              </li>
              <li className="items">
                <a href="#" onClick={userorders}>
                  My Orders
                </a>
              </li>
              <li className="items profile-btn">
                {isSuc ? (
                  <button className="profile" onClick={toggleDropdown}>
                    <img
                      src="https://i1.wp.com/d228am55mqbj0t.cloudfront.net/defaults/red-CP.png?ssl=1"
                      alt="Profile"
                    />
                  </button>
                ) : (
                  <button
                    className="btn-30 login"
                    onClick={() => navigate("/login")}
                  >
                    Login/Signup
                  </button>
                )}
                {dropdownOpen && isSuc && (
                  <div className="dropdown-menu">
                    <a href="#" onClick={handleProfile}>
                      Profile
                    </a>
                    <a href="#" onClick={handlesignout}>
                      Logout
                    </a>
                  </div>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
