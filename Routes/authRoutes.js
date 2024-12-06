require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/usersModel");
const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).send("All fields are required.");
    }

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email is already in use.");
    }

    const existingUsername = await Users.findOne({ username });
    if (existingUsername) {
      return res.status(400).send("Username is already taken.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let newRole = "user"; // Default role
    if (role && ["user", "admin", "moderator"].includes(role)) {
      newRole = role;
    }

    const newUser = new Users({
      username,
      email,
      password: hashedPassword,
      role: newRole,
    });
    await newUser.save();

    res.status(201).send("User created successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred.");
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("All fields are required.");
    }

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found.");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).send("Incorrect password.");
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);

    res.status(500).send("An error occurred.");
  }
});

// Logout Route
router.post("/logout", async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).send("Logged out successfully.");
});

module.exports = router;
