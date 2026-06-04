import React, { useEffect, useState } from "react";
import { getMyOrders, getAddresses } from "../api/profileApi";
import "./Profile.css";

/* ── helpers ── */
function getInitials(name = "") {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function statusBadgeClass(status = "") {
  const s = status.toLowerCase();
  if (s === "delivered" || s === "completed") return "badge badge-status-delivered";
  if (s === "pending" || s === "processing") return "badge badge-status-pending";
  return "badge badge-status-default";
}

function paymentBadgeClass(status = "") {
  const s = status.toLowerCase();
  if (s === "paid") return "badge badge-payment-paid";
  if (s === "pending") return "badge badge-payment-pending";
  return "badge badge-payment-default";
}

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [ordersData, addressesData] = await Promise.all([
        getMyOrders(),
        getAddresses(),
      ]);
      setOrders(ordersData.orders || []);
      setAddresses(addressesData.addresses || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="profile-page">
      <div className="profile-container">

        {/* ── Header ── */}
        <div className="profile-header">
          <div className="profile-avatar">
            {getInitials(user?.name)}
          </div>
          <div className="profile-header-info">
            <h1>{user?.name || "My Profile"}</h1>
            <p>{user?.email}</p>
          </div>
        </div>

        {/* ── User Details ── */}
        <section className="profile-section">
          <h2 className="profile-section-title">Account Details</h2>
          <div className="user-details-card">
            <div className="detail-field">
              <span className="detail-label">Full Name</span>
              <span className="detail-value">{user?.name || "—"}</span>
            </div>
            <div className="detail-field">
              <span className="detail-label">Email Address</span>
              <span className="detail-value">{user?.email || "—"}</span>
            </div>
          </div>
        </section>

        {/* ── Saved Addresses ── */}
        <section className="profile-section">
          <h2 className="profile-section-title">Saved Addresses</h2>

          {addresses.length === 0 ? (
            <div className="empty-state">No addresses saved yet.</div>
          ) : (
            addresses.map((address) => (
              <div key={address._id} className="address-card">
                <p className="address-name">{address.fullName}</p>
                <p className="address-phone">{address.phone}</p>
                <p className="address-line">
                  {address.addressLine1}
                  <br />
                  {address.city}, {address.state} — {address.pincode}
                </p>
              </div>
            ))
          )}
        </section>

        {/* ── Orders ── */}
        <section className="profile-section">
          <h2 className="profile-section-title">My Orders</h2>

          {orders.length === 0 ? (
            <div className="empty-state">No orders found.</div>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-top">
                  <span className="order-id">#{order.orderNumber}</span>
                  <span className="order-amount">₹{order.totalAmount}</span>
                </div>
                <div className="order-meta">
                  <span className={statusBadgeClass(order.orderStatus)}>
                    {order.orderStatus}
                  </span>
                  <span className={paymentBadgeClass(order.paymentStatus)}>
                    {order.paymentStatus}
                  </span>
                  <span className="order-items-count">
                    {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            ))
          )}
        </section>

        {/* ── Logout ── */}
        <button className="logout-btn" onClick={handleLogout}>
          Log out
        </button>

      </div>
    </div>
  );
}