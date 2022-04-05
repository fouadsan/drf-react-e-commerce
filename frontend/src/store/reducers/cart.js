import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../constants/cartConstants";

const initialState = {
  items: [],
  total_items: 0,
  total_amount: 0,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { product, quantity } = action.payload;
      const tempItem = state.items.find((i) => i.id === product.id);
      if (tempItem) {
        const tempCart = state.items.map((cartItem) => {
          if (cartItem.id === product.id) {
            let newAmount = cartItem.amount + product.price * quantity;
            if (newAmount > cartItem.max) {
              newAmount = cartItem.max;
            }
            return { ...cartItem, amount: newAmount };
          } else {
            return cartItem;
          }
        });
        return { ...state, items: tempCart };
      } else {
        const newItem = {
          id: product.id,
          name: product.name,
          amount: product.price * quantity,
          image: product.image,
          price: product.price,
          max: product.countInStock,
        };
        return { ...state, items: [...state.items, newItem] };
      }

    case REMOVE_FROM_CART:
      const tempCart = state.items.filter((item) => item.id !== action.pid);
      return { ...state, items: tempCart };

    case TOGGLE_CART_ITEM_AMOUNT:
      const { pid, type } = action.payload;
      const NewtempCart = state.items.map((item) => {
        if (item.id === pid) {
          if (type === "inc") {
            let newAmount = item.amount + 1;
            if (newAmount > item.max) {
              newAmount = item.max;
            }
            return { ...item, amount: newAmount };
          }
          if (type === "dec") {
            let newAmount = item.amount - 1;
            if (newAmount < 1) {
              newAmount = 1;
            }
            return { ...item, amount: newAmount };
          }
        }
        return item;
      });
      return { ...state, cart: NewtempCart };

    case action.type === CLEAR_CART:
      return { ...state, items: [] };

    case action.type === COUNT_CART_TOTALS:
      const { total_items, total_amount } = state.items.reduce(
        (total, cartItem) => {
          const { amount, price } = cartItem;
          total.total_items += amount;
          total.total_amount += price * amount;
          return total;
        },
        { total_items: 0, total_amount: 0 }
      );
      return { ...state, total_items, total_amount };

    default:
      return state;
  }
};