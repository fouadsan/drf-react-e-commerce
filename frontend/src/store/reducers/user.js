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
  SET_USER_UPDATE_LOADING,
  SET_USER_UPDATE_SUCCESS,
  SET_USER_UPDATE_ERROR,
  SET_USER_LIST_LOADING,
  SET_USER_LIST_SUCCESS,
  SET_USER_LIST_ERROR,
  SET_USER_DELETE_LOADING,
  SET_USER_DELETE_SUCCESS,
  SET_USER_DELETE_ERROR,
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
  users_list: [],
};

export const userReducer = (state = initialState, action) => {
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
      return {
        ...state,
        user: {
          ...state.user,
          ...action.user,
          email: action.user.email,
          username: action.user.username,
          password: action.user.password,
        },
        user_loading: false,
      };

    case SET_USER_LOGOUT:
      return {
        user: null,
        user_error: {
          status: false,
          msg: "",
        },
        user_list: [],
      };

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

    case SET_USER_DETAILS_LOADING:
      return { ...state, user_loading: true };

    case SET_USER_DETAILS_ERROR:
      return {
        ...state,
        user_error: { status: true, msg: action.error_msg },
        user_loading: false,
      };

    case SET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          email: action.user.email,
          username: action.user.username,
        },
        user_loading: false,
      };

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
        user: {
          ...state.user,
          email: action.user.email,
          username: action.user.username,
          password: action.user.password,
        },
        update_success: true,
        user_loading: false,
      };

    case SET_USER_LIST_LOADING:
      return { ...state, user_loading: true };

    case SET_USER_LIST_ERROR:
      return {
        ...state,
        user_error: { status: true, msg: action.error_msg },
        user_loading: false,
      };

    case SET_USER_LIST_SUCCESS:
      return {
        ...state,
        users_list: action.payload,
        user_loading: false,
      };

    case SET_USER_DELETE_LOADING:
      return { ...state, user_loading: true };

    case SET_USER_DELETE_ERROR:
      return {
        ...state,
        user_error: { status: true, msg: action.error_msg },
        user_loading: false,
      };

    case SET_USER_DELETE_SUCCESS:
      return {
        ...state,
        users_list: state.users_list.filter(
          (userItem) => userItem.id !== action.payload
        ),
        user_loading: false,
      };

    default:
      return state;
  }
};
