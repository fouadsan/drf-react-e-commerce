import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { HomePage, SingleProductPage, ErrorPage, CartPage } from "./pages";
import { Header, Footer } from "./components";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/products/:id" element={<SingleProductPage />} />
        <Route exact path="/cart" element={<CartPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
