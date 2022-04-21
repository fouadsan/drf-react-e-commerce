import React from "react";
import ReactDOM from "react-dom/client";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Provider } from "react-redux";

import store from "./store/store";
import "./index.css";
import "./bootstrap.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

const initialOptions = {
  "client-id": `${process.env.REACT_APP_PAYPAL_CLIENT_ID}`,
  currency: "USD",
  intent: "capture",
};

root.render(
  <PayPalScriptProvider options={initialOptions}>
    <Provider store={store}>
      <App />
    </Provider>
  </PayPalScriptProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
