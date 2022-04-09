import {
  SET_USER_LOGIN_LOADING,
  SET_USER_LOGIN_ERROR,
  SET_USER_LOGIN_SUCCESS,
  SET_USER_LOGOUT,
  SET_USER_REGISTER_LOADING,
  SET_USER_REGISTER_SUCCESS,
  SET_USER_REGISTER_ERROR,
  SET_USER_DETAILS_LOADING,
  SET_USER_DETAILS_SUCCESS,
  SET_USER_DETAILS_ERROR,
  SET_USER_DETAILS_RESET,
  SET_USER_UPDATE_LOADING,
  SET_USER_UPDATE_SUCCESS,
  SET_USER_UPDATE_ERROR,
  SET_USER_UPDATE_RESET,
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
  update_success: false,
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

    case SET_USER_DETAILS_RESET:
      return { user: {} };

    default:
      return state;
  }
};

export const userRegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_REGISTER_LOADING:
      return { ...state, user_loading: true };

    case SET_USER_REGISTER_ERROR:
      return {
        ...state,
        user_error: { status: true, msg: action.error_msg },
        user_loading: false,
      };

    case SET_USER_REGISTER_SUCCESS:
      return { ...state, user: action.user, user_loading: false };

    default:
      return state;
  }
};
export const userDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DETAILS_LOADING:
      return { ...state, user_loading: true };

    case SET_USER_DETAILS_ERROR:
      return {
        ...state,
        user_error: { status: true, msg: action.error_msg },
        user_loading: false,
      };

    case SET_USER_DETAILS_SUCCESS:
      return { ...state, user: action.user, user_loading: false };

    default:
      return state;
  }
};

export const userUpdateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_UPDATE_LOADING:
      return { ...state, user_loading: true };

    case SET_USER_UPDATE_ERROR:
      return {
        ...state,
        user_error: { status: true, msg: action.error_msg },
        user_loading: false,
      };

    case SET_USER_UPDATE_SUCCESS:
      return {
        ...state,
        user: action.user,
        update_success: true,
        user_loading: false,
      };

    case SET_USER_UPDATE_RESET:
      return {};

    default:
      return state;
  }
};
