const Category = require("../models/Category");
const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");

const createCategory = async (req, res) => {
  try {
    console.log(req.body);
    const {
      name,
      description,
      image,
    } = req.body;

    let imageData = {
      url: "",
      public_id: "",
    };

    if (image) {
      const uploaded =
        await cloudinary.uploader.upload(
          image,
          {
            folder:
              "ecommerce/categories",
          }
        );

      imageData = {
        url: uploaded.secure_url,
        public_id:
          uploaded.public_id,
      };
    }

    const category =
      await Category.create({
        name,
        slug: name
          .toLowerCase()
          .replaceAll(" ", "-"),
        description,
        image: imageData,
      });

    res.status(201).json({
      success: true,
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};



const updateCategory = async (
  req,
  res
) => {
  console.log(req.body);
  try {
    const {
      name,
      description,
      image,
      removeImage,
    } = req.body;

    const category =
      await Category.findById(
        req.params.id
      );

    if (!category) {
      return res.status(404).json({
        success: false,
        message:
          "Category not found",
      });
    }

    if (
      removeImage &&
      category.image?.public_id
    ) {
      await cloudinary.uploader.destroy(
        category.image.public_id
      );

      category.image = {
        url: "",
        public_id: "",
      };
    }

    if (image?.url) {
      if (
        category.image?.public_id
      ) {
        await cloudinary.uploader.destroy(
          category.image.public_id
        );
      }

      category.image = image;
    }

    category.name = name;
    category.slug = name
      .toLowerCase()
      .replaceAll(" ", "-");

    category.description =
      description || "";

    await category.save();

    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    console.log("UPDATE CATEGORY ERROR:");
    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const category = await Category.findById(
      categoryId
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Delete image from Cloudinary
    if (
      category.image?.public_id
    ) {
      await cloudinary.uploader.destroy(
        category.image.public_id
      );
    }

    // Delete all products in this category
    await Product.deleteMany({
      category: category._id,
    });

    // Delete category
    await category.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Category and associated products deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCategoryBySlug = async (req, res) => {
  try {
    const category = await Category.findOne({
      slug: req.params.slug,
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
    getCategoryBySlug,
};