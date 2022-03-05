const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 5,
      max: 20,
    },
    latitude: {
      type: Number,
      require: true,
    },
    longitude: {
      type: Number,
      require: true,
    },
    title: {
      type: String,
      require: true,
      min: 3,
    },
    description: {
      type: String,
      require: true,
      min: 3,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }
);

const Pin = mongoose.model("Pin", PinSchema);

module.exports = Pin;
