import React, {
  useEffect,
  useState,
} from "react";

import {
  getMyOrders,
  getAddresses,
} from "../api/profileApi";

export default function Profile() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [orders, setOrders] =
    useState([]);

  const [addresses, setAddresses] =
    useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const ordersData =
        await getMyOrders();

      const addressesData =
        await getAddresses();

      setOrders(
        ordersData.orders || []
      );

      setAddresses(
        addressesData.addresses || []
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1>My Profile</h1>

      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <h2>User Details</h2>

        <p>
          <strong>Name:</strong>{" "}
          {user?.name}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {user?.email}
        </p>
      </div>

      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <h2>Saved Addresses</h2>

        {addresses.length === 0 ? (
          <p>
            No addresses saved
          </p>
        ) : (
          addresses.map(
            (address) => (
              <div
                key={address._id}
                style={{
                  border:
                    "1px solid #ddd",
                  padding: "12px",
                  marginBottom: "10px",
                  borderRadius:
                    "8px",
                }}
              >
                <p>
                  {
                    address.fullName
                  }
                </p>

                <p>
                  {
                    address.phone
                  }
                </p>

                <p>
                  {
                    address.addressLine1
                  }
                </p>

                <p>
                  {
                    address.city
                  }
                  ,{" "}
                  {
                    address.state
                  }
                </p>

                <p>
                  {
                    address.pincode
                  }
                </p>
              </div>
            )
          )
        )}
      </div>

      <div>
        <h2>My Orders</h2>

        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              style={{
                border:
                  "1px solid #ddd",
                padding: "15px",
                marginBottom:
                  "15px",
                borderRadius:
                  "8px",
              }}
            >
              <p>
                <strong>
                  Order ID:
                </strong>{" "}
                {order._id}
              </p>

              <p>
                <strong>
                  Status:
                </strong>{" "}
                {
                  order.orderStatus
                }
              </p>

              <p>
                <strong>
                  Payment:
                </strong>{" "}
                {
                  order.paymentStatus
                }
              </p>

              <p>
                <strong>
                  Total:
                </strong>{" "}
                ₹
                {
                  order.totalAmount
                }
              </p>

              <p>
                <strong>
                  Items:
                </strong>{" "}
                {
                  order.items
                    .length
                }
              </p>
            </div>
          ))
        )}
      </div>

      <button
        onClick={() => {
          localStorage.removeItem(
            "token"
          );

          localStorage.removeItem(
            "user"
          );

          window.location.href =
            "/";
        }}
        style={{
          marginTop: "20px",
          padding:
            "10px 20px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}