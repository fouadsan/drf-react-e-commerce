import {
  SET_PRODUCT_DETAIL_LOADING,
  SET_PRODUCT_DETAIL_SUCCESS,
  SET_PRODUCT_DETAIL_ERROR,
} from "../constants/productConstants";

const initialState = {
  product_loading: false,
  product_error: {
    status: false,
    msg: "",
  },
  product: null,
};

export const singleProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT_DETAIL_LOADING:
      return { ...state, product_loading: true };

    case SET_PRODUCT_DETAIL_ERROR:
      return {
        ...state,
        product_error: { status: true, msg: action.error_msg },
        product_loading: false,
      };

    case SET_PRODUCT_DETAIL_SUCCESS:
      return { ...state, product: action.product, product_loading: false };

    default:
      return state;
  }
};
