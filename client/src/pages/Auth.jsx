import React, {
  useState,
  useRef,
  useEffect,
} from "react";

import { useNavigate } from "react-router-dom";
import { Leaf, Mail, Lock, User, Eye, EyeOff, ArrowRight, Baby } from 'lucide-react';
import logo from '../assets/logo.svg';
import './Auth.css';
import {
  registerUser,
  loginUser,
} from "../api/authApi";

export default function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [focused, setFocused] = useState('');
  const cardRef = useRef(null);

  const isLogin = mode === 'login';

  const handleSwitch = (newMode) => {
    setMode(newMode);
    setForm({ name: '', email: '', password: '', confirm: '' });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (!isLogin) {
      if (
        form.password !== form.confirm
      ) {
        alert(
          "Passwords do not match"
        );
        return;
      }

      const data =
        await registerUser({
          name: form.name,
          email: form.email,
          password: form.password,
        });

      alert(
        "Account created successfully"
      );

      setMode("login");

      setForm({
        name: "",
        email: "",
        password: "",
        confirm: "",
      });

      return;
    }

    const data = await loginUser({
      email: form.email,
      password: form.password,
    });

    localStorage.setItem(
      "token",
      data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    alert("Logged in successfully");

    navigate("/");
  } catch (error) {
    alert(
      error?.response?.data?.message ||
        "Something went wrong"
    );
  }
};

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  return (
    <div className="auth-page">
      {/* Background blobs mirroring Home hero */}
      <div className="auth-bg">
        <div className="auth-blob auth-blob--1" />
        <div className="auth-blob auth-blob--2" />
        <div className="auth-blob auth-blob--3" />
      </div>

      <div className="auth-container">
        {/* Logo */}
        <button className="auth-logo-btn" onClick={() => navigate('home')}>
          <img src={logo} alt="Giggly Go" className="auth-logo" />
        </button>

        {/* Card */}
        <div
  className="auth-card"
  ref={cardRef}
>
          {/* Tab switcher */}
          <div className="auth-tabs">
            <button
              className={`auth-tab ${isLogin ? 'auth-tab--active' : ''}`}
              onClick={() => handleSwitch('login')}
            >
              Log In
            </button>
            <button
              className={`auth-tab ${!isLogin ? 'auth-tab--active' : ''}`}
              onClick={() => handleSwitch('signup')}
            >
              Sign Up
            </button>
            <div className={`auth-tab-indicator ${!isLogin ? 'auth-tab-indicator--right' : ''}`} />
          </div>

          {/* Heading */}
          <div className="auth-heading">
            <h2 className="auth-title">
              {isLogin ? 'Welcome back! 👋' : 'Join Giggly Go 🌸'}
            </h2>
            <p className="auth-subtitle">
              {isLogin
                ? 'Log in to track orders & manage your account'
                : 'Create an account for a better shopping experience'}
            </p>
          </div>

          {/* Form */}
          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {!isLogin && (
              <div className={`auth-field ${focused === 'name' ? 'auth-field--focus' : ''}`}>
                <User size={17} className="auth-field__icon" strokeWidth={1.8} />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused('')}
                  required
                  autoComplete="name"
                />
              </div>
            )}

            <div className={`auth-field ${focused === 'email' ? 'auth-field--focus' : ''}`}>
              <Mail size={17} className="auth-field__icon" strokeWidth={1.8} />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused('')}
                required
                autoComplete="email"
              />
            </div>

            <div className={`auth-field ${focused === 'password' ? 'auth-field--focus' : ''}`}>
              <Lock size={17} className="auth-field__icon" strokeWidth={1.8} />
              <input
                type={showPass ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                onFocus={() => setFocused('password')}
                onBlur={() => setFocused('')}
                required
                autoComplete={isLogin ? 'current-password' : 'new-password'}
              />
              <button
                type="button"
                className="auth-field__eye"
                onClick={() => setShowPass(v => !v)}
                tabIndex={-1}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {!isLogin && (
              <div className={`auth-field ${focused === 'confirm' ? 'auth-field--focus' : ''}`}>
                <Lock size={17} className="auth-field__icon" strokeWidth={1.8} />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  name="confirm"
                  placeholder="Confirm Password"
                  value={form.confirm}
                  onChange={handleChange}
                  onFocus={() => setFocused('confirm')}
                  onBlur={() => setFocused('')}
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="auth-field__eye"
                  onClick={() => setShowConfirm(v => !v)}
                  tabIndex={-1}
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            )}

            {isLogin && (
              <div className="auth-forgot">
                <button type="button" className="auth-forgot__btn">Forgot password?</button>
              </div>
            )}

            <button
  type="submit"
  className="auth-submit"
>
  {isLogin
    ? "Log In"
    : "Create Account"}
</button>
          </form>

          {/* Divider */}
          <div className="auth-divider"><span>or continue with</span></div>

          {/* Social */}
          <div className="auth-socials">
            <button className="auth-social-btn">
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google
            </button>
            <button className="auth-social-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebook
            </button>
          </div>

          {/* Switch mode */}
          <p className="auth-switch">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              className="auth-switch__btn"
              onClick={() => handleSwitch(isLogin ? 'signup' : 'login')}
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>

        {/* Trust badges */}
        <div className="auth-trust">
          <span><Leaf size={13} strokeWidth={2} /> 5000+ happy families</span>
          <span>🔒 Secure & Private</span>
          <span><Baby size={13} strokeWidth={2} /> Baby-safe brand</span>
        </div>
      </div>
    </div>
  );
}