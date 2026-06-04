import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../api/orderApi";
import "./Orders.css";

const STATUS_OPTIONS = ["Placed", "Processing", "Shipped", "Delivered", "Cancelled"];

const STATUS_COLORS = {
  Placed: "status--placed",
  Processing: "status--processing",
  Shipped: "status--shipped",
  Delivered: "status--delivered",
  Cancelled: "status--cancelled",
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [updatingId, setUpdatingId] = useState(null);

  const loadOrders = async () => {
    const data = await getOrders();
    setOrders(data.orders);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const filteredOrders = orders.filter((o) => {
    const matchesSearch = o._orderNumber.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" ? true : o.orderStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getPaymentStatus = (order) =>
    order.orderStatus === "Delivered" ? "Paid" : order.paymentStatus;

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    await updateOrderStatus(orderId, newStatus);
    await loadOrders();
    setUpdatingId(null);
  };

  return (
    <div className="orders-page">
      {/* Header */}
      <div className="orders-header">
        <div>
          <h1 className="orders-title">Orders</h1>
          <p className="orders-subtitle">{filteredOrders.length} order{filteredOrders.length !== 1 ? "s" : ""} found</p>
        </div>
      </div>

      {/* Filters */}
      <div className="orders-filters">
        <div className="search-wrapper">
          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
          </svg>
          <input
            className="search-input"
            placeholder="Search by Order ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-tabs">
          {["All", ...STATUS_OPTIONS].map((s) => (
            <button
              key={s}
              className={`filter-tab ${statusFilter === s ? "filter-tab--active" : ""}`}
              onClick={() => setStatusFilter(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="orders-empty">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p>No orders match your filters.</p>
        </div>
      ) : (
        <div className="orders-list">
          {filteredOrders.map((order) => (
            <div key={order._id} className="order-card">
              {/* Card Header */}
              <div className="order-card__header">
                <div className="order-card__id-row">
                  <div className="order-card__id-block">
                    <span className="order-card__id">Order #{order.orderNumber}</span>
                    <div className="order-card__date">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                  <span className={`order-status-badge ${STATUS_COLORS[order.orderStatus] || ""}`}>
                    {order.orderStatus}
                  </span>
                </div>
                <div className="order-card__meta">
                  <span className={`payment-badge ${getPaymentStatus(order) === "Paid" ? "payment-badge--paid" : "payment-badge--pending"}`}>
                    {getPaymentStatus(order)}
                  </span>
                  <span className="payment-method">{order.paymentMethod}</span>
                  <span className="order-card__amount">₹{order.totalAmount}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="order-card__body">
                {/* Customer Info */}
                <div className="order-info-section">
                  <h4 className="order-info-section__title">Customer</h4>
                  <div className="order-info-grid">
                    <div className="order-info-item">
                      <span className="order-info-item__label">Name</span>
                      <span className="order-info-item__value">{order.shippingAddress?.fullName || "—"}</span>
                    </div>
                    <div className="order-info-item">
                      <span className="order-info-item__label">Phone</span>
                      <span className="order-info-item__value">{order.shippingAddress?.phone || "—"}</span>
                    </div>
                    <div className="order-info-item">
                      <span className="order-info-item__label">Email</span>
                      <span className="order-info-item__value">{order.guestEmail || order.user?.email || "—"}</span>
                    </div>
                    <div className="order-info-item">
                      <span className="order-info-item__label">Payment Method</span>
                      <span className="order-info-item__value">{order.paymentMethod || "—"}</span>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="order-info-section">
                  <h4 className="order-info-section__title">Shipping Address</h4>
                  <p className="order-address">
                    {[
                      order.shippingAddress?.addressLine1,
                      order.shippingAddress?.addressLine2,
                      order.shippingAddress?.city,
                      order.shippingAddress?.state,
                      order.shippingAddress?.pincode,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                </div>

                {/* Items */}
                <div className="order-info-section">
                  <h4 className="order-info-section__title">Items ({order.items?.length})</h4>
                  <div className="order-items">
                    {order.items?.map((item, i) => (
                      <div key={i} className="order-item">
                        <span className="order-item__name">{item.productName}</span>
                        <span className="order-item__qty">× {item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="order-card__footer">
                <label className="status-label">Update Status</label>
                <select
                  className={`status-select ${updatingId === order._id ? "status-select--loading" : ""}`}
                  value={order.orderStatus}
                  disabled={updatingId === order._id}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}