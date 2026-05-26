import React, { useState } from 'react';
import { categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import './ProductDetail.css';

export default function ProductDetail({ product, navigate, addToCart }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) { navigate('products'); return null; }

  const category = categories.find(c => c.id === product.category) || {};
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const related = (category.products || []).filter(p => p.id !== product.id).slice(0, 3);

  const handleAdd = () => {
    if (category.hasSizes && !selectedSize) return;
    addToCart({ ...product, size: selectedSize, qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="product-detail">
      {/* Back */}
      <div className="container">
        <button className="product-detail__back" onClick={() => navigate('products')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Back to Products
        </button>
      </div>

      <div className="container product-detail__inner">
        {/* Image area */}
        <div className="product-detail__image-area">
          <div className="product-detail__image-main" style={{ background: (category.color || '#F2B50C') + '33' }}>
            <span className="product-detail__emoji float">{product.emoji}</span>
            {product.tag && <span className="product-detail__tag">{product.tag}</span>}
          </div>
          <div className="product-detail__features">
            <h4>Key Features</h4>
            <ul>
              {(category.features || []).map(f => (
                <li key={f}><span>✓</span> {f}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Info */}
        <div className="product-detail__info">
          <p className="product-detail__category">{category.name}</p>
          <h1 className="product-detail__name">{product.name}</h1>
          <p className="product-detail__desc">{category.description}</p>

          <div className="product-detail__price-row">
            <span className="product-detail__price">₹{product.price}</span>
            <span className="product-detail__original">₹{product.originalPrice}</span>
            <span className="product-detail__badge">-{discount}% OFF</span>
          </div>

          <p className="product-detail__for">
            {category.hasSizes ? '👕 Available in sizes S, M, L, XL, XXL' : '👶 For Newborns & Infants'}
          </p>

          {category.hasSizes && (
            <div className="product-detail__sizes">
              <p className="product-detail__sizes-label">Select Size *</p>
              <div className="product-detail__sizes-row">
                {['S', 'M', 'L', 'XL', 'XXL'].map(s => (
                  <button
                    key={s}
                    className={`product-detail__size-btn ${selectedSize === s ? 'product-detail__size-btn--active' : ''}`}
                    onClick={() => setSelectedSize(s)}
                  >{s}</button>
                ))}
              </div>
            </div>
          )}

          <div className="product-detail__qty-row">
            <p className="product-detail__sizes-label">Quantity</p>
            <div className="product-detail__qty">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(q => q + 1)}>+</button>
            </div>
          </div>

          <div className="product-detail__actions">
            <button
              className={`btn-primary product-detail__add-btn ${added ? 'product-detail__add-btn--success' : ''}`}
              onClick={handleAdd}
              disabled={category.hasSizes && !selectedSize}
            >
              {added ? '✓ Added to Cart!' : '🛒 Add to Cart'}
            </button>
            <button className="btn-outline" onClick={() => navigate('contact')}>Custom Order</button>
          </div>

          {category.hasSizes && !selectedSize && (
            <p className="product-detail__size-warn">⚠️ Please select a size before adding to cart</p>
          )}

          <div className="product-detail__trust">
            {['🚚 Free shipping above ₹999', '↩️ Easy 7-day returns', '🌿 Skin-safe certified'].map(t => (
              <span key={t} className="product-detail__trust-item">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="container product-detail__related">
          <h2 className="product-detail__related-title">More from {category.name}</h2>
          <div className="products-grid">
            {related.map(p => (
              <ProductCard key={p.id} product={p} category={category} navigate={navigate} addToCart={addToCart} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}