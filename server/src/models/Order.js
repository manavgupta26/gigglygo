const mongoose = require("mongoose");
const Counter = require("./Counter");
const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    guestEmail: String,

    guestPhone: String,

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },

        productName: String,

        color: String,

        size: String,

        quantity: Number,

        price: Number,
      },
    ],

    shippingAddress: {
      fullName: String,
      phone: String,
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      pincode: String,
      country: String,
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "RAZORPAY"],
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },

    orderStatus: {
      type: String,
      enum: [
        "Placed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Placed",
    },

    subtotal: Number,

    shippingCharge: {
      type: Number,
      default: 0,
    },

    discountAmount: {
      type: Number,
      default: 0,
    },

    totalAmount: Number,

    couponCode: String,

    razorpayOrderId: String,

    razorpayPaymentId: String,
  },
  {
    timestamps: true,
  }
);

orderSchema.pre("save", async function (next) {
  if (!this.isNew) return next();

  const counter =
    await Counter.findOneAndUpdate(
      { name: "orders" },
      { $inc: { sequence: 1 } },
      {
        new: true,
        upsert: true,
      }
    );

  this.orderNumber = `GG${counter.sequence}`;

  next();
});

module.exports = mongoose.model("Order", orderSchema);