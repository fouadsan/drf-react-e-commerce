import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { productsReducer } from "./reducers/products";
import { singleProductReducer } from "./reducers/singleProduct";

const rootReducer = combineReducers({
  products: productsReducer,
  singleProduct: singleProductReducer,
});

const middleware = [ReduxThunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
