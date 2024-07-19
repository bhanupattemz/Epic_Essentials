import Header from "./components/layout/Header/Header.jsx";
import Footer from "./components/layout/Footer/Footer.jsx";
import Home from "./components/layout/Home/Home.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import ProductDetails from "./components/Product/ProductDetails.jsx";
import Products from "./components/Product/Products.jsx"
import Search from "./components/Product/Search.jsx";
function App() {
  return (
    <Router>
      <Header />
      <Routes className="main">
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
