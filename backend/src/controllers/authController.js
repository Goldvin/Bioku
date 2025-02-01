const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // pastikan path ke model user benar

// Fungsi untuk register
const register = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Cek apakah email sudah terdaftar
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already registered' });
      }
  
      // Enkripsi password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Simpan user baru ke database
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role: 'user',  // Default role untuk user baru
      });
  
      // Membuat token JWT
      const token = jwt.sign(
        { id: newUser.id, email: newUser.email, role: newUser.role },  // Payload
        process.env.JWT_SECRET_KEY,  // Ganti dengan secret key Anda
        { expiresIn: '1h' }  // Masa berlaku token (1 jam)
      );
  
      // Kirimkan response dengan token
      return res.status(201).json({
        message: 'User registered successfully',
        token,  // Token yang dihasilkan
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role
        }
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
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
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { register, login };
