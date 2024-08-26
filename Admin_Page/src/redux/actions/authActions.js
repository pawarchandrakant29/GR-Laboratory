import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config'; 

export const authenticate = (email, password, type) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      if (type === "signup") {
        createUserWithEmailAndPassword(auth, email, password)
          .then((res) => {
            console.log(`${type} Success:`, res.user);
            dispatch({
              type: "SIGNUP_SUCCESS",
              payload: res.user,
            });
            resolve(res.user);
          })
          .catch((error) => {
            console.error(`${type} Error:`, error.message);
            dispatch({
              type: "SIGNUP_ERROR",
              payload: error.message,
            });
            reject(error);
          });
      } else {
        signInWithEmailAndPassword(auth, email, password)
          .then((res) => {
            console.log(`${type} Success:`, res.user);
            dispatch({
              type: "LOGIN_SUCCESS",
              payload: res.user,
            });
            resolve(res.user);
          })
          .catch((error) => {
            console.error(`${type} Error:`, error.message);
            dispatch({
              type: "LOGIN_ERROR",
              payload: error.message,
            });
            reject(error);
          });
      }
    });
  };
};

export const signout = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          console.log("Logout Success");
          dispatch({
            type: "LOGOUT_SUCCESS",
          });
          resolve();
        })
        .catch((error) => {
          console.error("Logout Error:", error.message);
          dispatch({
            type: "LOGOUT_ERROR",
            payload: error.message,
          });
          reject(error);
        });
    });
  };
};

export const loginSuccess = (user) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: user,
  };
};

export const loginFailure = (error) => {
  return {
    type: "LOGIN_FAILURE",
    payload: error,
  };
};


