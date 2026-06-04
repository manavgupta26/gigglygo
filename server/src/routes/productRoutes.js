const express = require("express");

const router = express.Router();

const protect = require("../middleware/userAuthMiddleware");

const {
  createProduct,
  getProducts,
  getProductById,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
  getProductBySlug,
} = require("../controllers/productController");

router.get("/", getProducts);
router.get("/slug/:slug", getProductBySlug);

router.get("/category/:categoryId", getProductsByCategory);
router.get("/:id", getProductById);

router.post("/", protect, createProduct);

router.put("/:id", protect, updateProduct);

router.delete("/:id", protect, deleteProduct);

module.exports = router;
