import axios from "../../utils/axios";
import { Product } from "../../utils/models";

import {
  SET_PRODUCT_DETAIL_LOADING,
  SET_PRODUCT_DETAIL_SUCCESS,
  SET_PRODUCT_DETAIL_ERROR,
} from "../constants/productConstants";

export const fetchSingleProduct = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_PRODUCT_DETAIL_LOADING,
      });
      const response = await axios.get(`products/${id}`);
      if (response.status !== 200) {
        dispatch({
          type: SET_PRODUCT_DETAIL_ERROR,
          error_msg: "somthing went wrong!",
        });
        throw new Error("Something went wrong!");
      }

      const data = await response.data;

      const loadedProduct = new Product(
        data[0].id,
        data[0].name,
        data[0].image,
        data[0].description,
        data[0].brand,
        data[0].category,
        data[0].price,
        data[0].count_in_stock,
        data[0].rating,
        data[0].num_reviews
      );

      dispatch({
        type: SET_PRODUCT_DETAIL_SUCCESS,
        product: loadedProduct,
      });
    } catch (error) {
      dispatch({
        type: SET_PRODUCT_DETAIL_ERROR,
        error_msg:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
