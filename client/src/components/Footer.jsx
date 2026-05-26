import React from 'react';
import './Footer.css';

export default function Footer({ navigate }) {
  return (
    <footer className="footer">
      <div className="footer__top container">
        <div className="footer__brand">
          <div className="footer__logo">
            <span className="footer__logo-icon">🐣</span>
            <span className="footer__logo-text">Giggly<span>Go</span></span>
          </div>
          <p className="footer__tagline">Soft, safe & full of smiles — crafted for your little one's happiest moments.</p>
          <div className="footer__socials">
            {['Instagram', 'Facebook', 'WhatsApp'].map(s => (
              <a key={s} href="#" className="footer__social-btn">{s[0]}</a>
            ))}
          </div>
        </div>

        <div className="footer__links-group">
          <h4>Shop</h4>
          <ul>
            <li><button onClick={() => navigate('products')}>Dry Sheets</button></li>
            <li><button onClick={() => navigate('products')}>Rompers & Sets</button></li>
            <li><button onClick={() => navigate('products')}>Swaddles</button></li>
            <li><button onClick={() => navigate('products')}>Baby Blankets</button></li>
            <li><button onClick={() => navigate('products')}>Baby Nests</button></li>
          </ul>
        </div>

        <div className="footer__links-group">
          <h4>Company</h4>
          <ul>
            <li><button onClick={() => navigate('about')}>About Us</button></li>
            <li><button onClick={() => navigate('contact')}>Contact</button></li>
            <li><a href="#">Wholesale Enquiry</a></li>
            <li><a href="#">Custom Orders</a></li>
          </ul>
        </div>

        <div className="footer__links-group">
          <h4>Help</h4>
          <ul>
            <li><a href="#">Shipping Info</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">Size Guide</a></li>
            <li><a href="#">Care Instructions</a></li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom container">
        <p>© 2025 Giggly Go. All rights reserved. Made with 💛 for tiny humans.</p>
        <div className="footer__legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
        </div>
      </div>
    </footer>
  );
}