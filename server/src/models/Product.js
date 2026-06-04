const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema({
  size: String,
  stock: Number,
});

const colorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  images: [String],

  stock: {
    type: Number,
    default: 0,
  },
sizes: {
    type: [sizeSchema],
    default: [],
  },
});

const productSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    shortDescription: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: true,
    },

    originalPrice: {
      type: Number,
      default: 0,
    },

    discount: {
      type: Number,
      default: 0,
    },

    tag: {
      type: String,
      default: "",
    },

    featured: {
      type: Boolean,
      default: false,
    },

    bestSeller: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    colors: [colorSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);