const express = require("express");
const optionalUserAuth =
  require("../middleware/optionalUserAuth");
const router = express.Router();

const {
  createOrder,
  getMyOrders,
cancelOrder,
} = require("../controllers/orderController");

const userProtect =
require("../middleware/userAuthMiddleware");

router.post("/",optionalUserAuth, createOrder);

router.get(
  "/my-orders",
  userProtect,
  getMyOrders
);

router.put(
  "/cancel/:id",
  userProtect,
  cancelOrder
);

module.exports = router;