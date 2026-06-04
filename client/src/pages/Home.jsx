import React, { useEffect, useRef, useState } from 'react';
import ProductCard from '../components/ProductCard';
import './Home.css';
import { Leaf, WashingMachine, Sparkles, PackageCheck } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { Shirt, Star, Gift, Truck, Heart } from 'lucide-react';
import { getProducts }
from "../api/productApi";
import { getCategories } from "../api/categoryApi";
import logo from '../assets/logo.svg'; // Ensure logo is included in the build
const MARQUEE_ITEMS = ['Waterproof Dry Sheets', 'Muslin Rompers', 'Cotton Swaddles', 'Baby Blankets', 'Hooded Wraps', 'Baby Nests', 'Changing Mats', 'Pure Cotton Sets'];
const CTA_ICONS = [
  { icon: <Shirt size={28} strokeWidth={1.6} />, delay: '0s' },
  { icon: <Star size={22} strokeWidth={1.6} />, delay: '0.4s' },
  { icon: <Gift size={30} strokeWidth={1.6} />, delay: '0.8s' },
  { icon: <Truck size={24} strokeWidth={1.6} />, delay: '1.2s' },
  { icon: <Heart size={20} strokeWidth={1.6} />, delay: '1.6s' },
  { icon: <Sparkles size={26} strokeWidth={1.6} />, delay: '2s' },
];
const FEATURES = [
  {
    icon: <Leaf size={26} strokeWidth={1.8} />,
    title: 'Skin-Safe Materials',
    desc: 'Every product uses certified skin-friendly fabrics, tested for the most sensitive newborn skin.'
  },
  {
    icon: <WashingMachine size={26} strokeWidth={1.8} />,
    title: 'Easy to Wash',
    desc: 'Machine washable, quick-dry designs that stay soft and fresh after every wash.'
  },
  {
    icon: <Sparkles size={26} strokeWidth={1.8} />,
    title: 'Custom Prints',
    desc: "Exclusive printed designs you won't find anywhere else — made with love."
  },
  {
    icon: <PackageCheck size={26} strokeWidth={1.8} />,
    title: 'Fast Delivery',
    desc: 'Pan-India shipping with careful packaging. Your baby essentials, on time.'
  },
];

const TESTIMONIALS = [
  { name: 'Priya M.', city: 'Mumbai', text: 'The muslin swaddles are SO soft! My newborn sleeps so much better wrapped in them. Will order again!', stars: 5, emoji: '🌸' },
  { name: 'Rohan & Deepa', city: 'Bangalore', text: 'The dry sheets are a lifesaver — totally waterproof and the prints are adorable. Best baby buy!', stars: 5, emoji: '⭐' },
  { name: 'Anita K.', city: 'Delhi', text: 'Ordered the romper set and the baby nest. Quality is amazing for the price. Highly recommend!', stars: 5, emoji: '💛' },
];

export default function Home() {
   const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const heroRef = useRef(null);
const [typedText, setTypedText] = useState('');
const [phraseIdx, setPhraseIdx] = useState(0);
const [charIdx, setCharIdx] = useState(0);
const [deleting, setDeleting] = useState(false);

const TYPING_PHRASES = ['Snuggly Swaddles', 'Soft Rompers', 'Dry Sheets', 'Baby Nests', 'Muslin Magic'];

useEffect(() => {
  const word = TYPING_PHRASES[phraseIdx];
  const timeout = setTimeout(() => {
    if (!deleting) {
      setTypedText(word.slice(0, charIdx + 1));
      setCharIdx(c => c + 1);
      if (charIdx + 1 === word.length) { setDeleting(true); }
    } else {
      setTypedText(word.slice(0, charIdx - 1));
      setCharIdx(c => c - 1);
      if (charIdx - 1 === 0) {
        setDeleting(false);
        setPhraseIdx(p => (p + 1) % TYPING_PHRASES.length);
      }
    }
  }, deleting ? 55 : charIdx + 1 === word.length ? 1600 : 85);
  return () => clearTimeout(timeout);
}, [typedText, deleting, phraseIdx, charIdx]);
  // Staggered fade-in on mount
  useEffect(() => {
    const els = heroRef.current?.querySelectorAll('.hero-animate');
    els?.forEach((el, i) => {
      el.style.animationDelay = `${i * 0.15}s`;
      el.classList.add('fade-in-up');
    });
  }, []);

  useEffect(() => {
  const fetchProducts = async () => {
    const data =
      await getProducts(
        "?bestSeller=true"
      );

    setBestsellers(data.products || []);
  };

  fetchProducts();
}, []);

useEffect(() => {
  const fetchCategories = async () => {
    try {
      const data = await getCategories();

      setCategories(data.categories || []);
    } catch (error) {
      console.error(
        "Error fetching categories:",
        error
      );
    }
  };

  fetchCategories();
}, []);

  // Bestseller products (first from each category)
const [bestsellers, setBestsellers] =
  useState([]);

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero" ref={heroRef}>
        <div className="hero__bg">
          <div className="hero__blob hero__blob--1 blob-shape"></div>
          <div className="hero__blob hero__blob--2 blob-shape-2"></div>
          <div className="hero__blob hero__blob--3 blob-shape"></div>
          <div className="hero__dots"></div>
        </div>
        <div className="container hero__inner">
          <div className="hero__content">
            <div className="hero-animate">
              <span className="section-tag">✨ Made for Tiny Humans</span>
            </div>
            <h1 className="hero__title hero-animate">
  Wrap Your Baby<br />in Pure<br />
  <span className="typing-line">
    <span className="hero__title-highlight">{typedText}</span>
    <span className="typing-cursor" />
  </span>
</h1>
            <p className="hero__subtitle hero-animate">
              Premium baby essentials — soft, safe, and full of joy. From snuggly swaddles to waterproof dry sheets, crafted with love for your little one.
            </p>
            <div className="hero__actions hero-animate">
              <button className="btn-primary" onClick={() => navigate('/products')}>
                Shop Collection
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
              <button className="btn-outline" onClick={() => navigate('/about')}>Our Story</button>
            </div>
            <div className="hero__stats hero-animate">
              {[['5000+', 'Happy Babies'], ['100%', 'Skin Safe'], ['7', 'Categories']].map(([val, label]) => (
                <div key={label} className="hero__stat">
                  <span className="hero__stat-val">{val}</span>
                  <span className="hero__stat-label">{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hero__visual hero-animate">
            <div className="hero__visual-main float">
              <div className="hero__visual-card hero__visual-card--main">
              <img src={logo} alt="Giggly Go" style={{ width: '130px', height: 'auto' }} />
<span className="hero__visual-tagline">Baby Essentials</span>
              </div>
            </div>
            <div className="hero__floating-cards">
              {[
                {  name: 'Dry Sheets', color: '#B8D1C1', delay: '0s' },
                {  name: 'Rompers', color: '#F59B90', delay: '0.5s' },
                {  name: 'Swaddles', color: '#F2B50C', delay: '1s' },
                {  name: 'Blankets', color: '#A7C2B1', delay: '1.5s' },
              ].map(item => (
                <div key={item.name} className="hero__floating-chip" style={{ '--chip-color': item.color, animationDelay: item.delay }}>
                  <span>{item.emoji}</span> {item.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="marquee-strip">
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="marquee-item">
              <span className="marquee-dot">✦</span> {item}
            </span>
          ))}
        </div>
      </div>

      {/* Categories */}
      <section className="home-section">
  <div className="container">
    <div className="section-header">
      <span className="section-tag">Shop by Category</span>
      <h2 className="section-title">Everything Baby Loves 🧸</h2>
      <p className="section-sub">
        7 thoughtfully curated categories of premium baby essentials
      </p>
    </div>

    <div className="categories-wrapper">
      <button
        className="categories-nav left"
        onClick={() => {
          document.querySelector('.categories-grid')
            .scrollBy({ left: -320, behavior: 'smooth' });
        }}
      >
        ‹
      </button>

      <div className="categories-grid">
        {categories.map((category,i) => (
          <button
            key={category._id}
            className="category-card"
            style={{
  '--cat-color': '#F2B50C',
  animationDelay: `${i * 0.07}s`
}}
            onClick={() =>
  navigate(`/products?category=${category.slug}`)
}
          >
            <div className="category-card__body">
              <h3 className="category-card__name">{category.name}</h3>
              <p className="category-card__tagline">{category.description}</p>
              <span className="category-card__count">
                 Products Available
              </span>
            </div>

            <svg
              className="category-card__arrow"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        ))}
      </div>

      <button
        className="categories-nav right"
        onClick={() => {
          document.querySelector('.categories-grid')
            .scrollBy({ left: 320, behavior: 'smooth' });
        }}
      >
        ›
      </button>
    </div>
  </div>
</section>

      {/* Bestsellers */}
      <section className="home-section home-section--alt">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">⭐ Most Loved</span>
            <h2 className="section-title">Bestsellers</h2>
            <p className="section-sub">What thousands of mamas swear by</p>
          </div>
          <div className="products-grid">
            {bestsellers.map(p => (
              <ProductCard key={p._id} product={p} category={p.category} />
            ))}
          </div>
          <div className="section-cta">
            <button className="btn-primary" onClick={() => navigate('/products')}>
              View All Products
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </section>

      {/* Why Giggly Go */}
      <section className="home-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Why Us?</span>
            <h2 className="section-title">Made with Love 💛</h2>
            <p className="section-sub">Because your baby deserves only the best</p>
          </div>
          <div className="features-grid">
            {FEATURES.map(f => (
              <div key={f.title} className="feature-card">
                <div className="feature-card__icon">{f.icon}</div>
                <h3 className="feature-card__title">{f.title}</h3>
                <p className="feature-card__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="home-section home-section--alt">
        <div className="container">
          <div className="section-header">
            <span className="section-tag"> Reviews</span>
            <h2 className="section-title">Mamas Love Us</h2>
            <p className="section-sub">Real stories from real families</p>
          </div>
          <div className="testimonials-grid">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="testimonial-card">
                <div className="testimonial-card__stars">{'⭐'.repeat(t.stars)}</div>
                <p className="testimonial-card__text">"{t.text}"</p>
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar">{t.emoji}</div>
                  <div>
                    <p className="testimonial-card__name">{t.name}</p>
                    <p className="testimonial-card__city">{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="home-section">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner__content">
              <span className="section-tag">Custom Orders Welcome!</span>
              <h2 className="cta-banner__title">Need Something Special? </h2>
              <p className="cta-banner__desc">Custom prints, bulk orders, or personalized designs — we're here to create the perfect baby essentials just for you.</p>
              <button className="btn-primary" onClick={() => navigate('/contact')}>
                Get in Touch
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
            <div className="cta-banner__emojis">
  {CTA_ICONS.map((item, i) => (
    <span
      key={i}
      className="cta-banner__emoji"
      style={{ animationDelay: item.delay }}
    >
      {item.icon}
    </span>
  ))}
</div>
          </div>
        </div>
      </section>
    </div>
  );
}