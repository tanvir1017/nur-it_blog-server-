const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  displayPhotoURL: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPass: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  profession: {
    type: String,
  },
  gender: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// TODO : mongoose model
const UserAuth = mongoose.model("USERS", userSchema);

module.exports = UserAuth;
