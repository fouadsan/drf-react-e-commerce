import {
  SET_PRODUCTS_LOADING,
  SET_PRODUCTS_SUCCESS,
  SET_PRODUCTS_ERROR,
} from "../actions/products";

const initialState = {
  products_loading: false,
  products_error: {
    status: false,
    msg: "",
  },
  products: [],
};

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS_LOADING:
      return { ...state, products_loading: true };

    case SET_PRODUCTS_ERROR:
      return {
        ...state,
        products_error: { status: true, msg: action.error_msg },
        products_loading: false,
      };

    case SET_PRODUCTS_SUCCESS:
      return { ...state, products: action.products, products_loading: false };

    default:
      return state;
  }
};
