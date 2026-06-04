const express = require("express");

const router = express.Router();

const adminProtect = require("../middleware/adminAuthMiddleware");

const {
  getAllOrders,
  updateOrderStatus,
  getOrderStats,
} = require("../controllers/orderController");

router.get("/", adminProtect, getAllOrders);
router.get("/stats", adminProtect, getOrderStats);

router.put("/:id/status", adminProtect, updateOrderStatus);

module.exports = router;
