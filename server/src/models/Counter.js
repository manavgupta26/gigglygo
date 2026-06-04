const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  name: String,
  sequence: {
    type: Number,
    default: 1000,
  },
});

module.exports = mongoose.model(
  "Counter",
  counterSchema
);