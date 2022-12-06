const express = require("express");
const router = express.Router();
require("../db/connection");
const User = require("../model/userSchema");

// TODO : router check is running or not
router.get("/", (req, res) => {
  try {
    console.log("connecting....");
    res.status(200).send({
      message: "From the router home page",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

// TODO : register user
router.post("/register", async (req, res) => {
  const {
    name,
    email,
    displayPhotoURL,
    password,
    confirmPass,
    phone,
    profession,
    gender,
  } = req.body;

  try {
    if (
      !name ||
      !email ||
      !displayPhotoURL ||
      !password ||
      !confirmPass ||
      !gender
    ) {
      return res.status(422).send({
        message: "Please fill-up the all required filed to register yourself",
      });
    }

    // TODO : user information define with mongoose schema
    const user = new User({
      name,
      email,
      displayPhotoURL,
      password,
      confirmPass,
      phone,
      profession,
      gender,
    });

    const checkEmailIsExist = await User.findOne({ email: email });

    if (checkEmailIsExist) {
      return res.status(422).send({ message: "email already exist" });
    } else if (password !== confirmPass) {
      return res.status(401).send({ message: "Password didn't matched" });
    } else {
      const userInfo = await user.save();
      if (userInfo) {
        res.status(201).send({
          success: true,
          message: "User register successful ✅",
          data: userInfo,
        });
      } else {
        res.status(500).send({
          success: false,
          message: "user registered failed ❌",
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal server error while register user",
      error: error.message,
    });
  }
});

// TODO : login with existing user information
router.get("/sign-in", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(422)
        .send({ message: "Please fullfil the required field" });
    } else {
      const userFind = await User.findOne({ email: email });
      if (!userFind) {
        return res.status(422).send({
          success: false,
          message: "wrong credential",
        });
      } else if (password !== userFind.password) {
        return res.status(422).send({
          success: false,
          message: "wrong credential",
        });
      } else {
        return res.status(200).send({
          success: true,
          message: "Sign in successful",
          data: userFind,
        });
      }
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "internal server error 😟", error: error.message });
  }
});

// TODO : Get all user are registered
router.get("/user", async (req, res) => {
  try {
    const allUser = await User.find();
    res.status(200).send({
      success: true,
      data: allUser,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "internal server error", error: error.message });
  }
});

module.exports = router;
