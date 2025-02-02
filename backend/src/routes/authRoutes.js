const express = require("express");
const { register, login } = require("../controllers/authController");
const { verifyToken, isAdmin, isSuperAdmin } = require("../middlewares/authMiddleware");
const { updateUserRole } = require("../controllers/authController");
const router = express.Router();

// Route untuk register
router.post("/register", register);

// Route untuk login
router.post("/login", login);

// Protected route untuk admin
router.get("/admin", verifyToken, isAdmin, (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

// Endpoint untuk superadmin mengubah role user
router.put("/update-role", verifyToken, isSuperAdmin, updateUserRole);

module.exports = router;
