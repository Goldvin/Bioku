const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/user"); // pastikan path ke model user benar

// Fungsi untuk register
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validasi jika data sudah ada
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user baru ke database
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user", // set role default sebagai "user"
    });

    // Buat JWT Token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Kirim response
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Fungsi untuk login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cari user berdasarkan email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Cek apakah password yang dimasukkan cocok
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Buat JWT Token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Kirim response
    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { register, login };
