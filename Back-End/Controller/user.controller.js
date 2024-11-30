const bcrypt = require("bcrypt");
const Users = require("../Models/user.model");

// Controller untuk signup
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).send("All fields are required.");
    }

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email is already in use. Please log in.");
    }

    const existingUsername = await Users.findOne({ username });
    if (existingUsername) {
      return res.status(400).send("Username is already taken.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Users({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).send("User created successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred. Please try again.");
  }
};

// Controller untuk login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("All fields are required.");
    }

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found. Please sign up first.");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).send("Incorrect password.");
    }

    res.status(200).send("Login successful!");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred. Please try again.");
  }
};
