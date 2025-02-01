const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); // Agar bisa membaca JSON
// Routes
app.use("/api/auth", authRoutes);
app.use("/users", userRoutes); // Gunakan route untuk /users
app.get("/", (req, res) => {
  res.send("Backend API Running!");
});

// Sinkronisasi database
sequelize.sync()
  .then(() => console.log("Database connected!"))
  .catch((err) => console.error("Database connection error:", err));

module.exports = app;
