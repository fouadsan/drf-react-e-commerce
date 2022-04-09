import axios from "../../utils/axios";
// import { Product } from "../../utils/models";

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
      console.log(email, password);
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
      console.log(data);
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

export const logout = () => {
  localStorage.removeItem("user");
  return async (dispatch) => {
    dispatch({
      type: SET_USER_LOGOUT,
    });

    dispatch({
      type: SET_USER_DETAILS_RESET,
    });
  };
};

export const register = (name, email, password) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_USER_REGISTER_LOADING,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await axios.post(
        "users/register/",
        {
          name: name,
          email: email,
          password: password,
        },
        config
      );

      if (response.status !== 201) {
        dispatch({
          type: SET_USER_REGISTER_ERROR,
          error_msg: "somthing went wrong!",
        });
        throw new Error("Something went wrong!");
      }

      const data = await response.data;

      dispatch({
        type: SET_USER_REGISTER_SUCCESS,
        user: data,
      });

      dispatch({
        type: SET_USER_LOGIN_SUCCESS,
        user: {
          email: data.email,
          password: data.password,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_USER_REGISTER_ERROR,
        error_msg:
          error.response && error.response.data.detail
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const getUserDetails = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: SET_USER_DETAILS_LOADING,
      });

      const { user } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.user.access}`,
        },
      };

      const response = await axios.get("users/profile/", config);

      if (response.status !== 201) {
        dispatch({
          type: SET_USER_DETAILS_ERROR,
          error_msg: "somthing went wrong!",
        });
        throw new Error("Something went wrong!");
      }

      const data = await response.data;

      dispatch({
        type: SET_USER_DETAILS_SUCCESS,
        user: data,
      });
    } catch (error) {
      dispatch({
        type: SET_USER_DETAILS_ERROR,
        error_msg:
          error.response && error.response.data.detail
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const updateUserProfile = (user) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: SET_USER_UPDATE_LOADING,
      });

      const { user } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.user.access}`,
        },
      };

      const response = await axios.put("users/profile/update/", user, config);

      if (response.status !== 200) {
        dispatch({
          type: SET_USER_UPDATE_ERROR,
          error_msg: "somthing went wrong!",
        });
        throw new Error("Something went wrong!");
      }

      const data = await response.data;
      console.log(data);
      dispatch({
        type: SET_USER_UPDATE_SUCCESS,
        user: data,
      });
      dispatch({
        type: SET_USER_LOGIN_SUCCESS,
        user: {
          email: data.email,
          password: data.password,
        },
      });
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: SET_USER_UPDATE_ERROR,
        error_msg:
          error.response && error.response.data.detail
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
