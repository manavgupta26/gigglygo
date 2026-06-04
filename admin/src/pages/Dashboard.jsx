import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrderStats } from "../api/orderApi";
import "./Dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    revenue: 0,
    pendingOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getOrderStats();
        setStats(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  const statCards = [
    {
      label: "Total Orders",
      value: stats.totalOrders,
      icon: "📦",
      className: "stat-card--orders",
    },
    {
      label: "Revenue",
      value: `₹${stats.revenue.toLocaleString()}`,
      icon: "💰",
      className: "stat-card--revenue",
    },
    {
      label: "Pending",
      value: stats.pendingOrders,
      icon: "⏳",
      className: "stat-card--pending",
    },
  ];

  const navLinks = [
    { to: "/categories", label: "Categories", icon: "🗂️" },
    { to: "/products", label: "Products", icon: "🛍️" },
    { to: "/products/add", label: "Add Product", icon: "➕" },
    { to: "/orders", label: "Orders", icon: "📋" },
  ];

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div>
          <p className="dashboard__greeting">Welcome back</p>
          <h1 className="dashboard__title">Admin Dashboard</h1>
        </div>
      </header>

      <section className="dashboard__stats">
        {statCards.map((card) => (
          <div
            key={card.label}
            className={`stat-card ${card.className} ${loading ? "stat-card--loading" : ""}`}
          >
            <span className="stat-card__icon">{card.icon}</span>
            <div className="stat-card__body">
              <span className="stat-card__value">
                {loading ? "—" : card.value}
              </span>
              <span className="stat-card__label">{card.label}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="dashboard__nav">
        <h2 className="dashboard__section-title">Quick Navigation</h2>
        <div className="nav-grid">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="nav-card">
              <span className="nav-card__icon">{link.icon}</span>
              <span className="nav-card__label">{link.label}</span>
              <span className="nav-card__arrow">→</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}