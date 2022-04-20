import axios from "../../utils/axios";
import {
  SET_ORDER_CREATE_LOADING,
  SET_ORDER_CREATE_SUCCESS,
  SET_ORDER_CREATE_ERROR,
  SET_ORDER_CREATE_RESET,
} from "../constants/orderConstants";

export const createOrder = (order) => {
  console.log(order);
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

      const response = await axios.post("orders/add/", order, config);

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

export const resetOrder = () => {
  return { type: SET_ORDER_CREATE_RESET };
};
