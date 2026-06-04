import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Auth from "../pages/Auth";
import "./Navbar.css";
import logo from "../assets/logo.svg";

export default function Navbar({ cartCount, setCartItems }) {
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
  const storedUser =
    localStorage.getItem("user");

  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
}, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "About Us", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo">
          <img src={logo} alt="GigglyGo Logo" className="navbar__logo-image" />
        </Link>

        <ul
          className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}
        >
          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`navbar__link ${
                  location.pathname === link.path ? "navbar__link--active" : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
{user ? (
  <>
    <button
      className="navbar__auth-btn"
      onClick={() => navigate("/profile")}
    >
      👤 {user.name}
    </button>

    <button
      className="navbar__auth-btn"
      onClick={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setCartItems([]);
        setUser(null);
        navigate("/");
      }}
    >
      Logout
    </button>
  </>
) : (
  <Link
    to="/auth"
    className="navbar__auth-btn navbar__login-btn"
  >
    Login / Signup
  </Link>
)}

          <button className="navbar__cart" onClick={() => navigate("/cart")}>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>

            {cartCount > 0 && (
              <span className="navbar__cart-badge">{cartCount}</span>
            )}
          </button>

          <button
            className="navbar__shop-btn btn-primary"
            onClick={() => navigate("/products")}
          >
            Shop Now
          </button>

          <button
            className="navbar__hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
