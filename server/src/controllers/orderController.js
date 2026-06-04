const Order = require("../models/Order");
const Product = require("../models/Product");


const createOrder = async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      paymentMethod,
      guestEmail,
      guestPhone,
    } = req.body;

    let totalAmount = 0;
    let orderItems = [];

    for (const item of items) {
      const product = await Product.findById(
        item.product
      );

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      const color = product.colors.find(
        (c) => c.name === item.color
      );

      if (!color) {
        return res.status(400).json({
          success: false,
          message: "Color not found",
        });
      }

      // Handle products with or without sizes
      if (
        color.sizes &&
        color.sizes.length > 0
      ) {
        const size = color.sizes.find(
          (s) => s.size === item.size
        );

        if (!size) {
          return res.status(400).json({
            success: false,
            message: "Size not found",
          });
        }

        if (
          size.stock < item.quantity
        ) {
          return res.status(400).json({
            success: false,
            message: `Only ${size.stock} available`,
          });
        }

        size.stock -= item.quantity;

        await product.save();
      }

      totalAmount +=
        product.price * item.quantity;

      orderItems.push({
        product: product._id,
        productName: product.name,
        color: item.color,
        size: item.size || "",
        quantity: item.quantity,
        price: product.price,
      });
    }

    const order = await Order.create({
      user: req.user
        ? req.user.id
        : null,

      guestEmail,
      guestPhone,

      items: orderItems,

      shippingAddress,

      paymentMethod,

      subtotal: totalAmount,

      totalAmount,

      orderStatus: "Placed",

      paymentStatus:
        paymentMethod === "COD"
          ? "Pending"
          : "Paid",
    });

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("ORDER ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateOrderStatus = async (
  req,
  res
) => {
  try {
    const order =
      await Order.findByIdAndUpdate(
        req.params.id,
        {
          orderStatus:
            req.body.orderStatus,
        },
        {
          new: true,
        }
      );

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

const cancelOrder = async (req, res) => {
  try {
    const order =
      await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
      });
    }

    if (order.orderStatus === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Order already cancelled",
      });
    }

    if (
      order.orderStatus === "Shipped" ||
      order.orderStatus === "Delivered"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Order cannot be cancelled",
      });
    }

    for (const item of order.items) {
      const product =
        await Product.findById(item.product);

      const color = product.colors.find(
        (c) => c.name === item.color
      );

      if (
  color.sizes &&
  color.sizes.length > 0
) {
  const size = color.sizes.find(
    (s) => s.size === item.size
  );

  if (size) {
    size.stock += item.quantity;
    await product.save();
  }
}
    }

    order.orderStatus = "Cancelled";

    await order.save();

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
const getOrderStats =
  async (req, res) => {
    try {
      const orders =
        await Order.find();

      const revenue =
        orders.reduce(
          (
            total,
            order
          ) =>
            total +
            order.totalAmount,
          0
        );

      const pending =
        orders.filter(
          (o) =>
            o.orderStatus ===
            "Placed"
        ).length;

      res.json({
        success: true,
        totalOrders:
          orders.length,
        revenue,
        pendingOrders:
          pending,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
      });
    }
  };

module.exports = {
  createOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus,
    cancelOrder,
    getOrderStats,

};