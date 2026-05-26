import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../assets/logo.svg';
export default function Navbar({ navigate, currentPage, cartCount }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Home', page: 'home' },
    { label: 'Products', page: 'products' },
    { label: 'About Us', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        {/* Logo */}
        {/* Logo */}
<button className="navbar__logo" onClick={() => navigate('home')}>
  <img src={logo} alt="GigglyGo Logo" className="navbar__logo-image" />
</button>

        {/* Links */}
        <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          {links.map(l => (
            <li key={l.page}>
              <button
                className={`navbar__link ${currentPage === l.page ? 'navbar__link--active' : ''}`}
                onClick={() => { navigate(l.page); setMenuOpen(false); }}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="navbar__actions">
          <button className="navbar__cart" onClick={() => navigate('cart')}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {cartCount > 0 && <span className="navbar__cart-badge">{cartCount}</span>}
          </button>
          <button className="navbar__shop-btn btn-primary" onClick={() => navigate('products')}>
            Shop Now
          </button>
          <button className="navbar__hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}