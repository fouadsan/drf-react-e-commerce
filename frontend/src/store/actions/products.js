import axios from "../../utils/axios";
import { Product } from "../../utils/models";

import {
  SET_PRODUCTS_LOADING,
  SET_PRODUCTS_SUCCESS,
  SET_PRODUCTS_ERROR,
} from "../constants/productConstants";

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_PRODUCTS_LOADING,
      });
      const response = await axios.get("products/");
      if (response.status !== 200) {
        dispatch({
          type: SET_PRODUCTS_ERROR,
          error_msg: "somthing went wrong!",
        });
        throw new Error("Something went wrong!");
      }

      const data = await response.data;

      const loadedProducts = [];

      data.map((product) => {
        return loadedProducts.push(
          new Product(
            product.id,
            product.name,
            product.image,
            product.description,
            product.brand,
            product.category,
            product.price,
            product.count_in_stock,
            product.rating,
            product.num_reviews
          )
        );
      });

      dispatch({
        type: SET_PRODUCTS_SUCCESS,
        products: loadedProducts,
      });
    } catch (error) {
      dispatch({
        type: SET_PRODUCTS_ERROR,
        error_msg:
          error.response && error.response.data.detail
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
