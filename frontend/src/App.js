import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { HomePage, SingleProductPage, ErrorPage } from "./pages";
import { Header, Footer } from "./components";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/product/:id" element={<SingleProductPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
