const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 5,
      max: 20,
      unique: true,
    },
    title: {
      type: String,
      require: true,
      min: 3,
    },
    latitude: {
      type: float,
      require: true,
    },
    longitude: {
      type: float,
      require: true,
    },
  },
  { timestamps: true }
);

const Pin = mongoose.model("Pin", PinSchema);

module.exports = Pin;
