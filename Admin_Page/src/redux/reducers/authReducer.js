const initialState = {
  isSuc: false,
  user: null,
  error: null,
  items: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isSuc: true,
        user: action.payload,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isSuc: false,
        user: null,
        error: action.payload,
      };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        isSuc: false,
        user: null,
        error: null,
      };
    case "LOGOUT_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};



export default authReducer;
