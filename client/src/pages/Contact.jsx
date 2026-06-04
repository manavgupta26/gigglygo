import React, { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'General Enquiry', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="container contact-hero__inner">
          <span className="section-tag">💬 Get in Touch</span>
          <h1 className="contact-hero__title">We'd Love to Hear<br />from You <span>🌸</span></h1>
          <p className="contact-hero__sub">Questions, custom orders, wholesale enquiries — we're here for all of it.</p>
        </div>
      </div>

      <div className="container contact-body">
        <div className="contact-info">
          <h2 className="contact-info__title">Say Hello!</h2>
          <p className="contact-info__text">Whether you need help choosing the right product, want a custom print, or are interested in wholesale — our team is happy to help.</p>

          <div className="contact-details">
            {[
              { icon: '📱', label: 'WhatsApp', value: '+91 79737 44126', sub: 'Quick replies on WhatsApp' },
              { icon: '📧', label: 'Email', value: 'arshiyaagupta@gmail.com', sub: 'We reply within 24 hours' },
              { icon: '📍', label: 'Location', value: 'India', sub: 'Pan-India shipping' },
            ].map(d => (
              <div key={d.label} className="contact-detail-item">
                <div className="contact-detail-item__icon">{d.icon}</div>
                <div>
                  <p className="contact-detail-item__label">{d.label}</p>
                  <p className="contact-detail-item__value">{d.value}</p>
                  <p className="contact-detail-item__sub">{d.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="contact-tags">
            {['Custom Orders', 'Wholesale Enquiry', 'Returns', 'Bulk Orders', 'General Help'].map(t => (
              <span key={t} className="contact-tag">{t}</span>
            ))}
          </div>
        </div>

        <div className="contact-form-wrap">
          {sent ? (
            <div className="contact-success">
              <span className="contact-success__emoji">🎉</span>
              <h3>Message Sent!</h3>
              <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
              <button className="btn-primary" onClick={() => setSent(false)}>Send Another</button>
            </div>
          ) : (
            <div className="contact-form">
              <h3 className="contact-form__title">Send us a Message</h3>
              <div className="contact-form__row">
                <div className="contact-form__field">
                  <label>Your Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Priya Sharma" />
                </div>
                <div className="contact-form__field">
                  <label>Email *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="priya@email.com" />
                </div>
              </div>
              <div className="contact-form__row">
                <div className="contact-form__field">
                  <label>Phone</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" />
                </div>
                <div className="contact-form__field">
                  <label>Subject</label>
                  <select name="subject" value={form.subject} onChange={handleChange}>
                    <option>General Enquiry</option>
                    <option>Custom Order</option>
                    <option>Wholesale</option>
                    <option>Return / Exchange</option>
                    <option>Order Status</option>
                  </select>
                </div>
              </div>
              <div className="contact-form__field">
                <label>Message *</label>
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us how we can help..." rows="5" />
              </div>
              <button
                className="btn-primary contact-form__submit"
                onClick={handleSubmit}
                disabled={!form.name || !form.email || !form.message}
              >
                Send Message 🚀
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}