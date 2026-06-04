const express = require("express");

const router = express.Router();

const protect = require("../middleware/userAuthMiddleware");

const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  getCategoryBySlug,
} = require("../controllers/categoryController");

router.get("/", getCategories);
router.get("/slug/:slug", getCategoryBySlug);
router.post("/", protect, createCategory);

router.put("/:id", protect, updateCategory);

router.delete("/:id", protect, deleteCategory);

module.exports = router;
