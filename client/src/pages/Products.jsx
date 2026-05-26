import React, { useState } from 'react';
import { categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Products.css';

export default function Products({ navigate, addToCart }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');

  const filteredCategories = categories.filter(c =>
    activeCategory === 'all' || c.id === activeCategory
  );

  const filtered = filteredCategories.map(c => ({
    ...c,
    products: c.products.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.desc.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(c => c.products.length > 0);

  const totalProducts = categories.reduce((s, c) => s + c.products.length, 0);

  return (
    <div className="products-page">
      {/* Header */}
      <div className="products-header">
        <div className="products-header__bg">
          <div className="products-header__blob blob-shape"></div>
        </div>
        <div className="container products-header__inner">
          <span className="section-tag">🛍️ All Products</span>
          <h1 className="products-header__title">Shop Baby Essentials</h1>
          <p className="products-header__sub">{totalProducts} handpicked products across {categories.length} categories</p>
        </div>
      </div>

      <div className="container products-body">
        {/* Search + Filters */}
        <div className="products-controls">
          <div className="products-search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="products-search__input"
            />
          </div>
          <div className="products-filters">
            <button
              className={`products-filter-btn ${activeCategory === 'all' ? 'products-filter-btn--active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All
            </button>
            {categories.map(c => (
              <button
                key={c.id}
                className={`products-filter-btn ${activeCategory === c.id ? 'products-filter-btn--active' : ''}`}
                onClick={() => setActiveCategory(c.id)}
                style={activeCategory === c.id ? { '--btn-color': c.color } : {}}
              >
                {c.emoji} {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="products-empty">
            <span>🔍</span>
            <h3>No products found</h3>
            <p>Try a different search or browse all categories</p>
            <button className="btn-primary" onClick={() => { setSearch(''); setActiveCategory('all'); }}>
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="products-sections">
            {filtered.map(cat => (
              <div key={cat.id} className="products-section">
                <div className="products-section__header">
                  <div className="products-section__icon" style={{ background: cat.color + '44' }}>{cat.emoji}</div>
                  <div>
                    <h2 className="products-section__title">{cat.name}</h2>
                    <p className="products-section__sub">{cat.tagline} · {cat.products.length} products</p>
                  </div>
                  {cat.hasSizes && (
                    <span className="products-section__sizes-badge">Sizes: S M L XL XXL</span>
                  )}
                </div>
                <div className="products-grid">
                  {cat.products.map(p => (
                    <ProductCard key={p.id} product={p} category={cat} navigate={navigate} addToCart={addToCart} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}