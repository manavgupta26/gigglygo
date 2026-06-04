import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createRazorpayOrder, verifyPayment } from "../api/paymentApi";
import { createOrder } from "../api/orderApi";
import "./Checkout.css";
import { getAddresses } from "../api/authApi";

export default function Checkout({ cartItems, setCartItems }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    addressLine1: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");
  useEffect(() => {
    const loadUserData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user) {
        setForm((prev) => ({
          ...prev,
          fullName: user.name || "",
          email: user.email || "",
        }));
      }

      try {
        const res = await getAddresses();

        if (res.addresses && res.addresses.length > 0) {
          const address = res.addresses[res.addresses.length - 1];

          setForm((prev) => ({
            ...prev,
            fullName: address.fullName || prev.fullName,
            phone: address.phone || "",
            addressLine1: address.addressLine1 || "",
            city: address.city || "",
            state: address.state || "",
            pincode: address.pincode || "",
          }));
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadUserData();
  }, []);

  const total = cartItems.reduce((s, i) => s + i.price * i.qty, 0);

  const orderData = {
    guestEmail: form.email,
    guestPhone: form.phone,
    shippingAddress: {
      fullName: form.fullName,
      phone: form.phone,
      addressLine1: form.addressLine1,
      city: form.city,
      state: form.state,
      pincode: form.pincode,
      country: "India",
    },
    paymentMethod,
    items: cartItems.map((item) => ({
      product: item.productId,
      color: item.color,
      size: item.size,
      quantity: item.qty,
    })),
  };

  const placeCODOrder = async () => {
    await createOrder(orderData);
    setCartItems([]);
    const user = JSON.parse(localStorage.getItem("user"));

    const cartKey = user ? `cart_${user.id}` : "cart_guest";

    localStorage.removeItem(cartKey);
    alert("Order placed successfully");
    navigate("/");
  };

  const placeOnlineOrder = async () => {
    const response = await createRazorpayOrder(total);
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: response.order.amount,
      currency: "INR",
      name: "GigglyGo",
      order_id: response.order.id,
      handler: async function (payment) {
        await verifyPayment({ ...payment, orderData });
        setCartItems([]);
        const user = JSON.parse(localStorage.getItem("user"));

        const cartKey = user ? `cart_${user.id}` : "cart_guest";

        localStorage.removeItem(cartKey);
        alert("Payment successful");
        navigate("/");
      },
    };
    console.log("RAZORPAY OPTIONS", options);
    console.log("WINDOW", window.Razorpay);
    const razor = new window.Razorpay(options);
    razor.open();
  };

  const handleSubmit = async () => {
    if (paymentMethod === "COD") {
      await placeCODOrder();
    } else {
      await placeOnlineOrder();
    }
  };

  const isFormValid =
    form.fullName &&
    form.email &&
    form.phone &&
    form.addressLine1 &&
    form.city &&
    form.state &&
    form.pincode;

  return (
    <div className="checkout-page">
      {/* Hero */}
      <div className="checkout-hero">
        <div className="checkout-hero__tag">🛍️ Almost there!</div>
        <h1 className="checkout-hero__title">Complete Your Order ✨</h1>
        <p className="checkout-hero__sub">
          Just a few details and your goodies are on their way!
        </p>
      </div>

      <div className="checkout-container">
        {/* ── Left: Form ── */}
        <div className="checkout-form-card">
          {/* Shipping section */}
          <h2 className="checkout-section-title">📦 Shipping Details</h2>

          <div className="checkout-form">
            <div className="checkout-form__row">
              <div className="checkout-form__field">
                <label>Full Name *</label>
                <input
                  placeholder="Priya Sharma"
                  value={form.fullName}
                  onChange={(e) =>
                    setForm({ ...form, fullName: e.target.value })
                  }
                />
              </div>
              <div className="checkout-form__field">
                <label>Phone *</label>
                <input
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="checkout-form__field">
              <label>Email *</label>
              <input
                placeholder="priya@email.com"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="checkout-form__field">
              <label>Address *</label>
              <input
                placeholder="House no., Street, Area"
                value={form.addressLine1}
                onChange={(e) =>
                  setForm({ ...form, addressLine1: e.target.value })
                }
              />
            </div>

            <div className="checkout-form__row">
              <div className="checkout-form__field">
                <label>City *</label>
                <input
                  placeholder="Mumbai"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                />
              </div>
              <div className="checkout-form__field">
                <label>State *</label>
                <input
                  placeholder="Maharashtra"
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                />
              </div>
            </div>

            <div className="checkout-form__field" style={{ maxWidth: "160px" }}>
              <label>Pincode *</label>
              <input
                placeholder="400001"
                value={form.pincode}
                onChange={(e) => setForm({ ...form, pincode: e.target.value })}
              />
            </div>
          </div>

          <div className="checkout-divider" style={{ margin: "28px 0 24px" }} />

          {/* Payment section */}
          <h2 className="checkout-section-title">💳 Payment Method</h2>

          <div className="payment-options">
            <label
              className={`payment-option ${paymentMethod === "COD" ? "payment-option--active" : ""}`}
            >
              <input
                type="radio"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
              />
              <div className="payment-option__icon">🏠</div>
              <div className="payment-option__text">
                <strong>Cash on Delivery</strong>
                <span>Pay when your order arrives</span>
              </div>
            </label>

            <label
              className={`payment-option ${paymentMethod === "RAZORPAY" ? "payment-option--active" : ""}`}
            >
              <input
                type="radio"
                checked={paymentMethod === "RAZORPAY"}
                onChange={() => setPaymentMethod("RAZORPAY")}
              />
              <div className="payment-option__icon">⚡</div>
              <div className="payment-option__text">
                <strong>Pay Online</strong>
                <span>UPI, Cards, Net Banking via Razorpay</span>
              </div>
            </label>
          </div>
        </div>

        {/* ── Right: Order Summary ── */}
        <div className="checkout-summary-card">
          <h2 className="checkout-section-title">🛒 Order Summary</h2>

          {cartItems.length > 0 ? (
            <div className="summary-items">
              {cartItems.map((item, idx) => (
                <div className="summary-item" key={idx}>
                  <div className="summary-item__img">
                    {item.image ? (
                      <img src={item.image} alt={item.name} />
                    ) : (
                      "🎁"
                    )}
                  </div>
                  <div className="summary-item__info">
                    <div className="summary-item__name">
                      {item.name || "Product"}
                    </div>
                    <div className="summary-item__meta">
                      {[item.color, item.size, `Qty: ${item.qty}`]
                        .filter(Boolean)
                        .join(" · ")}
                    </div>
                  </div>
                  <div className="summary-item__price">
                    ₹{(item.price * item.qty).toLocaleString("en-IN")}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p
              style={{
                fontSize: "0.88rem",
                color: "#aaa",
                marginBottom: "16px",
              }}
            >
              No items in cart.
            </p>
          )}

          <div className="summary-totals">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span style={{ color: "#4caf50", fontWeight: 700 }}>FREE 🎉</span>
            </div>
            <div className="summary-row summary-row--total">
              <span>Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <button
            className="checkout-cta"
            onClick={handleSubmit}
            disabled={!isFormValid || cartItems.length === 0}
          >
            {paymentMethod === "COD" ? "🏠 Place Order" : "⚡ Pay Now"} — ₹
            {total.toLocaleString("en-IN")}
          </button>

          <div className="checkout-trust">
            <span className="checkout-trust__badge">🔒 Secure</span>
            <span className="checkout-trust__badge">📦 Fast Shipping</span>
            <span className="checkout-trust__badge">↩️ Easy Returns</span>
          </div>
        </div>
      </div>
    </div>
  );
}
