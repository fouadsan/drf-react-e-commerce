import axios from "../../utils/axios";
import {
  SET_ORDER_CREATE_LOADING,
  SET_ORDER_CREATE_SUCCESS,
  SET_ORDER_CREATE_ERROR,
  SET_ORDER_LIST_LOADING,
  SET_ORDER_LIST_SUCCESS,
  SET_ORDER_LIST_ERROR,
  SET_ORDER_RESET,
  SET_ORDER_DETAIL_LOADING,
  SET_ORDER_DETAIL_SUCCESS,
  SET_ORDER_DETAIL_ERROR,
  SET_ORDER_PAY_LOADING,
  SET_ORDER_PAY_SUCCESS,
  SET_ORDER_PAY_ERROR,
} from "../constants/orderConstants";

export const createOrder = (order) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: SET_ORDER_CREATE_LOADING,
      });

      const { user } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.user.access}`,
        },
      };

      const response = await axios.post("orders/", order, config);

      if (response.status !== 201) {
        dispatch({
          type: SET_ORDER_CREATE_ERROR,
          error_msg: "somthing went wrong!",
        });
        throw new Error("Something went wrong!");
      }
      const data = await response.data;

      dispatch({
        type: SET_ORDER_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SET_ORDER_CREATE_ERROR,
        error_msg:
          error.response && error.response.data.detail
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const fetchUserOrders = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: SET_ORDER_LIST_LOADING,
      });

      const { user } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.user.access}`,
        },
      };

      const response = await axios.get("orders/", config);
      if (response.status !== 200) {
        dispatch({
          type: SET_ORDER_LIST_ERROR,
          error_msg: "somthing went wrong!",
        });
        throw new Error("Something went wrong!");
      }

      const data = await response.data;

      dispatch({
        type: SET_ORDER_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SET_ORDER_LIST_ERROR,
        error_msg:
          error.response && error.response.data.detail
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const resetOrder = () => {
  return { type: SET_ORDER_RESET };
};

export const getOrderDetail = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: SET_ORDER_DETAIL_LOADING,
      });

      const { user } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.user.access}`,
        },
      };

      const response = await axios.get(`orders/${id}/`, config);

      if (response.status !== 200) {
        dispatch({
          type: SET_ORDER_DETAIL_ERROR,
          error_msg: "somthing went wrong!",
        });
        throw new Error("Something went wrong!");
      }
      const data = await response.data;

      dispatch({
        type: SET_ORDER_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SET_ORDER_DETAIL_ERROR,
        error_msg:
          error.response && error.response.data.detail
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const payOrder = (id, paymentResult) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: SET_ORDER_PAY_LOADING,
      });

      const { user } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.user.access}`,
        },
      };

      const response = await axios.patch(
        `orders/${id}/`,
        paymentResult,
        config
      );

      if (response.status !== 200) {
        dispatch({
          type: SET_ORDER_PAY_ERROR,
          error_msg: "somthing went wrong!",
        });
        throw new Error("Something went wrong!");
      }
      const data = await response.data;

      dispatch({
        type: SET_ORDER_PAY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SET_ORDER_PAY_ERROR,
        error_msg:
          error.response && error.response.data.detail
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
