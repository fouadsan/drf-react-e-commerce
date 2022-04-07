import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { productsReducer } from "./reducers/products";
import { singleProductReducer } from "./reducers/singleProduct";
import { cartReducer } from "./reducers/cart";
import { userLoginReducer } from "./reducers/user";

const rootReducer = combineReducers({
  products: productsReducer,
  singleProduct: singleProductReducer,
  cart: cartReducer,
  user: userLoginReducer,
});

const middleware = [ReduxThunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
