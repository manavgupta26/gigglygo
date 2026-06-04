const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  codEnabled: {
    type: Boolean,
    default: true
  },

  onlinePaymentEnabled: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Settings", settingsSchema);