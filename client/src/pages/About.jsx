import React from 'react';
import './About.css';

const VALUES = [
  { icon: '🌿', title: 'Safety First', desc: 'Every material is tested for safety. We use only certified skin-friendly fabrics that are gentle on the most sensitive newborn skin.' },
  { icon: '💛', title: 'Made with Love', desc: 'Our products are designed by parents, for parents. Each item reflects the care and thought that goes into raising a little one.' },
  { icon: '♻️', title: 'Sustainable Choices', desc: 'We choose reusable and eco-friendly materials wherever possible — for baby\'s future, and for the planet they\'ll inherit.' },
  { icon: '🎨', title: 'Joyful Designs', desc: 'We believe baby products should be as fun and colourful as childhood itself. Every print tells a story.' },
];



const TEAM = [
  { name: 'Richa Sharma', role: 'Founder & Designer', emoji: '👩‍💼' },
  { name: 'Amit Gupta', role: 'Operations', emoji: '👨‍💻' },
  { name: 'Preeti Singh', role: 'Quality & Fabric', emoji: '👩‍🔬' },
];

export default function About({ navigate }) {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero__bg">
          <div className="about-hero__blob blob-shape"></div>
          <div className="about-hero__blob about-hero__blob--2 blob-shape-2"></div>
        </div>
        <div className="container about-hero__inner">
          <div className="about-hero__content">
            <span className="section-tag">Our Story 🌸</span>
            <h1 className="about-hero__title">Born from a Mother's<br /><span>Love</span></h1>
            <p className="about-hero__text">
              Giggly Go was born when our founder, Arshiya, couldn't find baby essentials that were truly soft, safe, and affordable. She started small — stitching muslin swaddles at home — and grew into something much bigger: a brand that thousands of Indian families now trust for their most precious little ones.
            </p>
            <button className="btn-primary" onClick={() => navigate('products')}>Shop Our Story</button>
          </div>
          <div className="about-hero__visual">
            <div className="about-hero__big-emoji float">🐣</div>
            <div className="about-hero__orbit">
              {['🌸', '⭐', '💛', '🌿'].map((e, i) => (
                <span key={i} className="about-hero__orbit-dot" style={{ '--angle': `${i * 90}deg` }}>{e}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="about-mission">
        <div className="container">
          <div className="about-mission__card">
            <div className="about-mission__quote">"</div>
            <p className="about-mission__text">
              Every baby deserves the softest start. We exist to make sure no family has to compromise on quality, safety, or joy when it comes to their little one's essentials.
            </p>
            <p className="about-mission__author">— Richa Sharma, Founder of Giggly Go</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-values">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">What We Believe</span>
            <h2 className="section-title">Our Values 💛</h2>
          </div>
          <div className="about-values__grid">
            {VALUES.map(v => (
              <div key={v.title} className="about-value-card">
                <div className="about-value-card__icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats">
        <div className="container">
          <div className="about-stats__grid">
            {[['5000+', 'Happy Families', '👨‍👩‍👧'], ['7', 'Product Categories', '🛍️'], ['100%', 'Skin Safe', '🌿'], ['⭐ 4.9', 'Average Rating', '💛']].map(([val, label, emoji]) => (
              <div key={label} className="about-stat">
                <span className="about-stat__emoji">{emoji}</span>
                <span className="about-stat__val">{val}</span>
                <span className="about-stat__label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about-team">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Meet the Team</span>
            <h2 className="section-title">The People Behind Giggly Go 🌸</h2>
          </div>
          <div className="about-team__grid">
            {TEAM.map(m => (
              <div key={m.name} className="about-team-card">
                <div className="about-team-card__avatar">{m.emoji}</div>
                <h3 className="about-team-card__name">{m.name}</h3>
                <p className="about-team-card__role">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}