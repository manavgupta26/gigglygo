import React from 'react';
import './Cart.css';

export default function Cart({ cartItems, setCartItems, navigate }) {
  const total = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cartItems.reduce((s, i) => s + i.qty, 0);

  const updateQty = (id, size, delta) => {
    setCartItems(prev => prev.map(i =>
      i.id === id && i.size === size
        ? { ...i, qty: Math.max(0, i.qty + delta) }
        : i
    ).filter(i => i.qty > 0));
  };

  const remove = (id, size) => setCartItems(prev => prev.filter(i => !(i.id === id && i.size === size)));

  return (
    <div className="cart-page">
      <div className="cart-header">
        <div className="container cart-header__inner">
          <span className="section-tag">🛒 Your Cart</span>
          <h1 className="cart-header__title">Shopping Cart</h1>
          <p className="cart-header__sub">{count} item{count !== 1 ? 's' : ''} in your cart</p>
        </div>
      </div>

      <div className="container cart-body">
        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <span>🛒</span>
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added anything yet — let's fix that!</p>
            <button className="btn-primary" onClick={() => navigate('products')}>Start Shopping</button>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={`${item.id}-${item.size}`} className="cart-item">
                  <div className="cart-item__emoji">{item.emoji}</div>
                  <div className="cart-item__info">
                    <p className="cart-item__name">{item.name}</p>
                    {item.size && <p className="cart-item__size">Size: <strong>{item.size}</strong></p>}
                    <p className="cart-item__price">₹{item.price}</p>
                  </div>
                  <div className="cart-item__qty">
                    <button onClick={() => updateQty(item.id, item.size, -1)}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.size, 1)}>+</button>
                  </div>
                  <p className="cart-item__subtotal">₹{item.price * item.qty}</p>
                  <button className="cart-item__remove" onClick={() => remove(item.id, item.size)}>✕</button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3 className="cart-summary__title">Order Summary</h3>
              <div className="cart-summary__rows">
                <div className="cart-summary__row">
                  <span>Subtotal ({count} items)</span>
                  <span>₹{total}</span>
                </div>
                <div className="cart-summary__row">
                  <span>Shipping</span>
                  <span>{total >= 999 ? 'Free 🎉' : '₹99'}</span>
                </div>
                {total < 999 && (
                  <p className="cart-summary__free-ship">Add ₹{999 - total} more for free shipping!</p>
                )}
              </div>
              <div className="cart-summary__total">
                <span>Total</span>
                <span>₹{total >= 999 ? total : total + 99}</span>
              </div>
              <button className="btn-primary cart-summary__checkout" onClick={() => navigate('contact')}>
                Proceed to Checkout 🚀
              </button>
              <button className="btn-outline cart-summary__continue" onClick={() => navigate('products')}>
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}