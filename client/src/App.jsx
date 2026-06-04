import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import { useLocation } from "react-router-dom";
import Checkout from "./pages/Checkout";
import "./index.css";
import Profile from "./pages/Profile";
export default function App() {
  const location = useLocation();

  const hideNavbarRoutes = ["/auth"];

  const showNavbar = !hideNavbarRoutes.includes(location.pathname);
  const [cartItems, setCartItems] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    const cartKey = user ? `cart_${user.id}` : "cart_guest";

    const savedCart = localStorage.getItem(cartKey);

    return savedCart ? JSON.parse(savedCart) : [];
  });
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    const cartKey = user ? `cart_${user.id}` : "cart_guest";

    localStorage.setItem(cartKey, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find(
        (i) =>
          i.productId === product.productId &&
          i.size === product.size &&
          i.color === product.color,
      );

      if (exists) {
        return prev.map((i) =>
          i.productId === product.productId &&
          i.size === product.size &&
          i.color === product.color
            ? { ...i, qty: i.qty + 1 }
            : i,
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="page-wrapper">
      {showNavbar && (
        <Navbar cartCount={cartCount} setCartItems={setCartItems} />
      )}

      <main>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Home />} />

          <Route
            path="/products"
            element={<Products addToCart={addToCart} />}
          />

          <Route
            path="/product/:slug"
            element={<ProductDetail addToCart={addToCart} />}
          />

          <Route path="/about" element={<About />} />

          <Route path="/contact" element={<Contact />} />

          <Route
            path="/cart"
            element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}
          />
          <Route
            path="/checkout"
            element={
              <Checkout cartItems={cartItems} setCartItems={setCartItems} />
            }
          />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

      {showNavbar && <Footer />}
    </div>
  );
}
