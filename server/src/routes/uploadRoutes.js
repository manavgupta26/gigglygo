const express = require("express");

const router = express.Router();

const protect = require("../middleware/userAuthMiddleware");

const upload = require("../middleware/uploadMiddleware");

const cloudinary = require("../config/cloudinary");

router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
    );

    res.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
