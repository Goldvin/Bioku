const express = require("express");
const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const server = express();

// Middleware & API Routes tetap pakai app
server.use(app);

server.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
