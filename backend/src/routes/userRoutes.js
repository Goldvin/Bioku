const express = require("express");
const User = require("../models/User"); // Sesuaikan path kalau berbeda
const router = express.Router();

// ✅ GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ POST create new user
router.post("/", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const newUser = await User.create({ name, email, password, role });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
