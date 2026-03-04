const User = require('../models/User')

const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  console.log("register body:", req.body);

  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    console.log("before User.findOne");
    const existingUser = await User.findOne({ email });
    console.log("existingUser:", existingUser);

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    console.log("before User.create");
    const user = await User.create({ username, email, password });
    console.log("user created:", user._id);

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      plan: user.plan,
      token,
    });
  } catch (error) {
    console.error("register error:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};



const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      plan: user.plan,
      token,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {register , login}