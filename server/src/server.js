require("dotenv").config();
const authRoutes = require("./routes/userAuthRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const adminAuthRoutes =
require("./routes/adminAuthRoutes");
const paymentRoutes =
require("./routes/paymentRoutes");
const orderRoutes =
require("./routes/orderRoutes");
const userAuthRoutes =
require("./routes/userAuthRoutes");
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());

app.use(express.json());
app.use(
  "/api/users",
  userAuthRoutes
);
app.use(
  "/api/admin/orders",
  require("./routes/adminOrderRoutes")
);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use(
  "/api/payment",
  paymentRoutes
);
app.use(
  "/api/admin",
  adminAuthRoutes
);
app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});