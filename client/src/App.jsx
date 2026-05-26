import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import './index.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const navigate = (page, data = null) => {
    setCurrentPage(page);
    if (data) setSelectedProduct(data);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product) => {
    setCartItems(prev => {
      const exists = prev.find(i => i.id === product.id && i.size === product.size);
      if (exists) return prev.map(i => i.id === product.id && i.size === product.size ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home navigate={navigate} />;
      case 'products': return <Products navigate={navigate} addToCart={addToCart} />;
      case 'product-detail': return <ProductDetail product={selectedProduct} navigate={navigate} addToCart={addToCart} />;
      case 'about': return <About navigate={navigate} />;
      case 'contact': return <Contact />;
      case 'cart': return <Cart cartItems={cartItems} setCartItems={setCartItems} navigate={navigate} />;
      default: return <Home navigate={navigate} />;
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar navigate={navigate} currentPage={currentPage} cartCount={cartCount} />
      <main>{renderPage()}</main>
      <Footer navigate={navigate} />
    </div>
  );
}