import {
  SET_ORDER_CREATE_LOADING,
  SET_ORDER_CREATE_SUCCESS,
  SET_ORDER_CREATE_ERROR,
  SET_ORDER_RESET,
  SET_ORDER_DETAIL_LOADING,
  SET_ORDER_DETAIL_SUCCESS,
  SET_ORDER_DETAIL_ERROR,
  SET_ORDER_PAY_LOADING,
  SET_ORDER_PAY_SUCCESS,
  SET_ORDER_PAY_ERROR,
} from "../constants/orderConstants";

const initialState = {
  order_loading: false,
  order_error: {
    status: false,
    msg: "",
  },
  order: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER_CREATE_LOADING:
      return { ...state, order_loading: true };

    case SET_ORDER_CREATE_SUCCESS:
      return {
        ...state,
        order: action.payload,
        order_loading: false,
      };

    case SET_ORDER_CREATE_ERROR:
      return {
        ...state,
        order_loading: false,
        order_error: { status: true, msg: action.error_msg },
      };

    case SET_ORDER_RESET:
      console.log("reset");
      return {
        order_error: {
          status: false,
          msg: "",
        },
      };

    case SET_ORDER_DETAIL_LOADING:
      return { ...state, order_loading: true };

    case SET_ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        order: action.payload,
        order_loading: false,
      };

    case SET_ORDER_DETAIL_ERROR:
      return {
        ...state,
        order_loading: false,
        order_error: { status: true, msg: action.error_msg },
      };

    case SET_ORDER_PAY_LOADING:
      return { ...state, order_loading: true };

    case SET_ORDER_PAY_SUCCESS:
      return {
        ...state,
        order: action.payload,
        order_loading: false,
      };

    case SET_ORDER_PAY_ERROR:
      return {
        ...state,
        order_loading: false,
        order_error: { status: true, msg: action.error_msg },
      };

    default:
      return state;
  }
};
