import {
  SET_USER_LOGIN_LOADING,
  SET_USER_LOGIN_ERROR,
  SET_USER_LOGIN_SUCCESS,
  SET_USER_LOGOUT,
} from "../constants/userConstants";

const userStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user_loading: false,
  user_error: {
    status: false,
    msg: "",
  },
  user: userStorage,
};

export const userLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_LOGIN_LOADING:
      return { ...state, user_loading: true };

    case SET_USER_LOGIN_ERROR:
      return {
        ...state,
        user_error: { status: true, msg: action.error_msg },
        user_loading: false,
      };

    case SET_USER_LOGIN_SUCCESS:
      return { ...state, user: action.user, user_loading: false };

    case SET_USER_LOGOUT:
      return {};

    default:
      return state;
  }
};
