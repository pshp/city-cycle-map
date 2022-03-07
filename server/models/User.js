const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 5,
      max: 20,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    firstname: {
      type: String,
      //  required: true,
    },
    lastname: {
      type: String,
      //   required: true,
    },
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
