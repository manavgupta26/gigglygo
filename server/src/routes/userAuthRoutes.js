const express = require("express");

const userProtect =
require("../middleware/userAuthMiddleware");
const router = express.Router();

const {
  registerUser,
  loginUser,
  saveAddress,
  getAddresses,
  deleteAddress,
} = require("../controllers/userAuthController");

router.post("/register", registerUser);

router.post("/login", loginUser);
router.post(
  "/address",
  userProtect,
  saveAddress
);

router.get(
  "/address",
  userProtect,
  getAddresses
);

router.delete(
  "/address/:id",
  userProtect,
  deleteAddress
);

module.exports = router;