import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signout } from "../../redux/actions/authActions";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const isSuc = useSelector((state) => state.auth.isSuc);
  const currentUser = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.cartItems) || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handlesignout = () => {
    dispatch(signout())
      .then(() => {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("userId");
        navigate("/");
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

  const Tests = (e) => {
    e.preventDefault();
    navigate("/tests");
  };
  const CartPage = (e) => {
    e.preventDefault();
    navigate("/cart");
  };
  const myorders = (e) => {
    e.preventDefault();
    navigate("/myorders");
  };
  const abtus = (e) => {
    e.preventDefault();
    navigate("/about");
  };

  return (
    <header className="pb-1 position-fixed w-100 top-0 z-index">
      <div className="container">
        <div className="set">
          <div align="center">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/final-pr-1a4a6.appspot.com/o/gr.png?alt=media&token=0e75e1e0-a306-47b3-9f83-db30436501df"
              alt=""
              className="logo"
            />
            <p className="m-0">
              <i className="clr-set3 m-0 fs-6">Laboratory</i>
            </p>
          </div>
          <nav className="col">
            <ul className="navlinks d-flex justify-content-end align-items-center p-0">
              <li className="items">
                <a href="#" onClick={handleHomeClick}>
                  Home
                </a>
              </li>
              <li className="items" onClick={Tests}>
                <a href="#">Test's</a>
              </li>
              <li className="items">
                <a href="#" onClick={CartPage}>
                  Cart <span>({cartItems.length})</span>
                </a>
              </li>
              <li className="items">
                <a href="#" onClick={abtus}>
                  About-Us
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
                    <a href="#" onClick={myorders}>
                      My Orders
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

export default Header;
