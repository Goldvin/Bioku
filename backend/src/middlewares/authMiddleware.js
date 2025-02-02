const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded; // Menyimpan data user di req.user
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

const isSuperAdmin = (req, res, next) => {
    if (req.user.role !== "superadmin") {
      return res.status(403).json({ message: "Access denied. Superadmin only." });
    }
    next();
  };

module.exports = { verifyToken, isAdmin, isSuperAdmin };
