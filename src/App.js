import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./Comp/Header";
import Footer from "./Comp/Footer";
import Home from "./Comp/Home";
import Menu from "./Comp/Menu";
import Cart from "./Comp/Cart";
import Contact from "./Comp/Contact";
import Category from "./Comp/Category";
import ProductDetail from "./Comp/ProductDetail";
import Login from "./Comp/Login";
import Signup from "./Comp/Signup";
import Checkout from "./Comp/Checkout";
import PrivateRoute from "./Comp/PrivateRoute";
import { myContext } from "./Comp/context";
import PaymentPage from "./Comp/PaymentPage";
import CartPage from "./Comp/CartPage";

function App() {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [showName, setShowName] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) setShowName(user.name);
  }, []);

  return (
    <myContext.Provider
      value={{ search, setSearch, show, setShow, showName, setShowName }}
    >
      {showName && <Header />}
      <Routes>
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
        <Route path="/menu" element={<PrivateRoute element={<Menu />} />} />
        <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />
        <Route path="/cartpage" element={<PrivateRoute element={<CartPage />} />} />
        <Route path="/contact" element={<PrivateRoute element={<Contact />} />} />
        <Route path="/:category/:id" element={<PrivateRoute element={<ProductDetail />} />} />
        <Route path="/:category" element={<PrivateRoute element={<Category />} />} />
        <Route path="/checkout" element={<PrivateRoute element={<Checkout />} />} />
        <Route path="/payment" element={<PrivateRoute element={<PaymentPage />} />} />
        <Route path="/login" element={<Login setLogin={setShowName} />} />
        <Route path="/signup" element={<Signup setLogin={setShowName} />} />
      </Routes>
      {showName && <Footer />}
    </myContext.Provider>
  );
}

export default App;
