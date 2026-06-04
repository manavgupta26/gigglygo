import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({ product, category, addToCart }) {
  const navigate = useNavigate();

const discount =
  product.originalPrice > 0
    ? Math.round(
        ((product.originalPrice -
          product.price) /
          product.originalPrice) *
          100
      )
    : 0;

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${product.slug}`)}
    >
      <div
        className="product-card__image"
        style={{ background: category?.color + '33' }}
      >
        <img
          src={
  product.colors?.[0]?.images?.[0] ||
  "/placeholder.jpg"
}
          alt={product.name}
          className="product-card__img"
        />

        {product.tag && (
          <span className="product-card__tag">
            {product.tag}
          </span>
        )}

        {discount > 0 && (
  <span className="product-card__discount">
    -{discount}%
  </span>
)}
      </div>

      <div className="product-card__body">
        <p className="product-card__category">
          {category?.name}
        </p>

        <h3 className="product-card__name">
          {product.name}
        </h3>

        <p className="product-card__desc">
          {product.shortDescription}
        </p>

       <div className="product-card__price">
  <span className="product-card__price-current">
    ₹{product.price}
  </span>

  {discount > 0 && (
    <span className="product-card__price-original">
      ₹{product.originalPrice}
    </span>
  )}
</div>

          <button
            className="product-card__add-btn"
onClick={(e) => {
  e.stopPropagation();
  navigate(`/product/${product.slug}`);
}}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>
      </div>
    
  );
}