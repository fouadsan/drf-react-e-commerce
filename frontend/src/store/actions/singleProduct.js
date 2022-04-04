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

      const loadedSingleProduct = new Product(
        data.id,
        data.name,
        data.image,
        data.description,
        data.brand,
        data.category,
        data.price,
        data.count_in_stock,
        data.rating,
        data.num_reviews
      );

      dispatch({
        type: SET_PRODUCT_DETAIL_SUCCESS,
        product: loadedSingleProduct,
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
