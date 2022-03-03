const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min:5,
    max:20,
    unique:true,
  },
  title: {
    type: String,
    require: true,
    min:3,
  }},
  { timestamps: true }
);

module.exports = mongoose.model("Pin", PinSchema);

module.exports = Pin;
