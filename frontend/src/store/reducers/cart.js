import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_THE_CART,
  COUNT_CART_TOTALS,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";

const cartStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const shippingAddressStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const paymentMethodStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : {};

const totalAmountStorage = localStorage.getItem("totalAmount")
  ? JSON.parse(localStorage.getItem("totalAmount"))
  : 0;

const initialState = {
  items: cartStorage,
  total_items: cartStorage.length,
  total_amount: totalAmountStorage,
  shipping_address: shippingAddressStorage,
  payment_method: paymentMethodStorage,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { product, quantity } = action.payload;
      const tempItem = state.items.find((i) => i.id === product.id);
      if (tempItem) {
        const tempCart = state.items.map((cartItem) => {
          if (cartItem.id === product.id) {
            let newAmount = cartItem.amount + quantity;
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
          amount: quantity,
          image: product.image,
          price: product.price,
          max: product.countInStock,
        };
        localStorage.setItem("cart", JSON.stringify([...state.items, newItem]));
        return { ...state, items: [...state.items, newItem] };
      }

    case REMOVE_FROM_CART:
      const tempCart = state.items.filter((item) => item.id !== action.pid);
      localStorage.setItem("cart", JSON.stringify(tempCart));
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
      localStorage.setItem("cart", JSON.stringify(NewtempCart));
      return { ...state, items: NewtempCart };

    case CLEAR_THE_CART:
      localStorage.setItem(
        "cart",
        JSON.stringify({
          items: [],
          total_items: 0,
          total_amount: 0,
        })
      );
      return { ...state, items: [], total_items: 0, total_amount: 0 };

    case COUNT_CART_TOTALS:
      const { total_items, total_amount } = state.items.reduce(
        (total, cartItem) => {
          const { amount, price } = cartItem;
          total.total_items += amount;
          total.total_amount += price * amount;
          return total;
        },
        { total_items: 0, total_amount: 0 }
      );
      localStorage.setItem("totalAmount", JSON.stringify(total_amount));
      return { ...state, total_items, total_amount };

    case CART_SAVE_SHIPPING_ADDRESS:
      localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
      return { ...state, shipping_address: action.payload };

    case CART_SAVE_PAYMENT_METHOD:
      localStorage.setItem("paymentMethod", JSON.stringify(action.payload));
      return { ...state, payment_method: action.payload };

    default:
      return state;
  }
};
