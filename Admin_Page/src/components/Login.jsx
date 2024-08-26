import React, { useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess, loginFailure } from "../redux/actions/authActions";
// import "../../index.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('userId', user.uid);
        dispatch(loginSuccess(user));
        navigate("/");
      })
      .catch((error) => {
        setError("Google login failed. Please try again.");
        dispatch(loginFailure(error.code));
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "chandrakant@gmail.com" && password === "12345678") {
      dispatch(loginSuccess({ uid: "some-uid", email: "chandrakant@gmail.com" }));
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('userId', "some-uid");
      navigate("/details");
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem('userId', user.uid);
          dispatch(loginSuccess(user));
          navigate("/");
        })
        .catch((error) => {
          setError("Login failed. Please check your email and password.");
          dispatch(loginFailure(error.code));
        });
    }
  };

  return (
    <div className="wrapper center">
      <div className="title-text">
        <div className="title login">Login</div>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="login">
          <div className="field">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="pass-link ps-1">
            <a href="#">Forgot password?</a>
          </div>
          <div className="field btn">
            <div className="btn-layer"></div>
            <input type="submit" value="Login" />
          </div>
          {error && (
            <div style={{ color: "red", padding: "5px 0px" }}>{error}</div>
          )}
          <div className="signup-link">
            Not a member?{" "}
            <a href="#" onClick={() => navigate("/signup")}>
              Signup now
            </a>
          </div>
        </form>
        <p>Or login with another accounts :</p>
        <div className="d-flex justify-content-center">
          <a
            onClick={handleGoogleLogin}
            className=""
            style={{ cursor: "pointer", display: "inline-block" }}
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google Logo"
              className="img-set"
            />
          </a>
          <a
            className="ps-3"
            style={{ cursor: "pointer", display: "inline-block" }}
          >
            <img src="https://firebasestorage.googleapis.com/v0/b/final-pr-1a4a6.appspot.com/o/git.png?alt=media&token=48260fa0-5c23-471c-92d6-44bcc654fc2a" className="img-set" />
          </a>
          <a
            className="ps-3"
            style={{ cursor: "pointer", display: "inline-block" }}
          >
            <img src="https://firebasestorage.googleapis.com/v0/b/final-pr-1a4a6.appspot.com/o/linkdin.png?alt=media&token=688f1e94-1c65-420e-85e3-dd841d878502" className="img-set" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
