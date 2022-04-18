import {
  SET_ORDER_CREATE_LOADING,
  SET_ORDER_CREATE_SUCCESS,
  SET_ORDER_CREATE_ERROR,
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
    default:
      return state;
  }
};
