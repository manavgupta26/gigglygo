const jwt = require("jsonwebtoken");

const adminProtect = (
  req,
  res,
  next
) => {
  try {
    const token =
      req.headers.authorization?.split(
        " "
      )[1];

    if (!token) {
      return res.status(401).json({
        success: false,
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.admin = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
    });
  }
};

module.exports = adminProtect;