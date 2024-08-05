const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    username: {
      index: true,
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('Users', userSchema);

module.exports = User;
