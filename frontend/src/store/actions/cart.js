import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_THE_CART,
  COUNT_CART_TOTALS,
} from "../constants/cartConstants";

export const addToCart = (product, quantity) => {
  return { type: ADD_TO_CART, payload: { product, quantity } };
};

export const removeFromCart = (productId) => {
  return { type: REMOVE_FROM_CART, pid: productId };
};

export const toggleAmount = (pid, type) => {
  return { type: TOGGLE_CART_ITEM_AMOUNT, payload: { pid, type } };
};

export const clearCart = () => {
  return { type: CLEAR_THE_CART };
};

export const countCartTotals = () => {
  return { type: COUNT_CART_TOTALS };
};
