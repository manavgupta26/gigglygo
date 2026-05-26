import React from 'react';
import './ProductCard.css';

export default function ProductCard({ product, category, navigate, addToCart }) {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="product-card" onClick={() => navigate('product-detail', { ...product, category })}>
      <div className="product-card__image" style={{ background: category?.color + '33' }}>
        <img 
  src={product.image} 
  alt={product.name} 
  className="product-card__img" 
/>
        {product.tag && <span className="product-card__tag">{product.tag}</span>}
        <span className="product-card__discount">-{discount}%</span>
      </div>
      <div className="product-card__body">
        <p className="product-card__category">{category?.name}</p>
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__desc">{product.desc}</p>
        <div className="product-card__footer">
          <div className="product-card__price">
            <span className="product-card__price-current">₹{product.price}</span>
            <span className="product-card__price-original">₹{product.originalPrice}</span>
          </div>
          <button
            className="product-card__add-btn"
            onClick={e => { e.stopPropagation(); addToCart && addToCart({ ...product, size: category?.hasSizes ? category.sizes[1] : null }); }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>
        </div>
        {category?.hasSizes && (
          <div className="product-card__sizes">
            {category.sizes.map(s => <span key={s} className="product-card__size">{s}</span>)}
          </div>
        )}
      </div>
    </div>
  );
}