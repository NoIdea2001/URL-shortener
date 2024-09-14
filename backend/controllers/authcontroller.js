const UserModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: "user already exists", success: false });
    }
    const userModel = new UserModel({
      name: name,
      email: email,
      password: password,
    });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res.status(201).json({ message: "signup successful", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "please check email id", success: false });
    }

    const passcheck = await bcrypt.compare(password, user.password);

    if (!passcheck) {
      return res
        .status(401)
        .json({ message: "please check password", success: false });
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    return res.status(200).json({
      message: "login successful",
      success: true,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

module.exports = {
  signup,
  login,
};
