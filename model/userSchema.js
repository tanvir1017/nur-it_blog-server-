const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

// TODO : hashing password to secure the userInfo
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPass = await bcrypt.hash(this.confirmPass, 12);
  }

  return next();
});

// TODO : cookie set
userSchema.methods.generateCookie = async function () {
  try {
    let generateToken = jwt.sign({ _id: this._id }, process.env.COOKIE);
    this.tokens = this.tokens.concat({ token: generateToken });
    await this.save();
    return generateToken;
  } catch (error) {
    console.log(error);
  }
};

// TODO : mongoose model
const UserAuth = mongoose.model("USERS", userSchema);

module.exports = UserAuth;
