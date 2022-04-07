import axios from "../../utils/axios";
// import { Product } from "../../utils/models";

import {
  SET_USER_LOGIN_LOADING,
  SET_USER_LOGIN_ERROR,
  SET_USER_LOGIN_SUCCESS,
  SET_USER_LOGOUT,
} from "../constants/userConstants";

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_USER_LOGIN_LOADING,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await axios.post(
        "users/login/",
        {
          username: email,
          password: password,
        },
        config
      );

      if (response.status !== 200) {
        dispatch({
          type: SET_USER_LOGIN_ERROR,
          error_msg: "somthing went wrong!",
        });
        throw new Error("Something went wrong!");
      }

      const data = await response.data;

      dispatch({
        type: SET_USER_LOGIN_SUCCESS,
        user: data,
      });

      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: SET_USER_LOGIN_ERROR,
        error_msg:
          error.response && error.response.data.detail
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
