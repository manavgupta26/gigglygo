const razorpay = require("../config/razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");

const createRazorpayOrder = async (
  req,
  res
) => {
  try {
    console.log("BODY:", req.body);
    console.log(
      "KEY:",
      process.env.RAZORPAY_KEY_ID
    );
    console.log(
      "SECRET:",
      process.env.RAZORPAY_KEY_SECRET
    );

    const { amount } = req.body;

    const options = {
      amount: Number(amount) * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    console.log("OPTIONS:", options);

    const order =
      await razorpay.orders.create(options);

    console.log("ORDER:", order);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log("RAZORPAY ERROR:");
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const verifyPayment = async (
  req,
  res
) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData,
    } = req.body;

    const generatedSignature =
      crypto
        .createHmac(
          "sha256",
          process.env.RAZORPAY_KEY_SECRET
        )
        .update(
          razorpay_order_id +
            "|" +
            razorpay_payment_id
        )
        .digest("hex");

    if (
      generatedSignature !==
      razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Payment verification failed",
      });
    }

    const order =
      await Order.create({
        ...orderData,

        paymentMethod: "RAZORPAY",

        paymentStatus: "Paid",

        razorpayOrderId:
          razorpay_order_id,

        razorpayPaymentId:
          razorpay_payment_id,
      });

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createRazorpayOrder,
  verifyPayment,
};