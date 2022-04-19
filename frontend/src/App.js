import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import {
  HomePage,
  SingleProductPage,
  ErrorPage,
  CartPage,
  LoginPage,
  RegisterPage,
  ProfilePage,
  ShippingPage,
  PaymentPage,
  PlaceOrderPage,
} from "./pages";
import { Header, Footer } from "./components";

function App() {
  const { user } = useSelector((state) => state.user);

  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<SingleProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/profile"
          element={user ? <ProfilePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/shipping"
          element={user ? <ShippingPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/payment"
          element={user ? <PaymentPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/placeorder"
          element={user ? <PlaceOrderPage /> : <Navigate to={"/login"} />}
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
