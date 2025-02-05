const express = require("express");
const app = require("./app");
require("dotenv").config();
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  server.all("*", (req, res) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    return handle(req, res);
  });

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

const PORT = process.env.PORT || 5000;

// Tambahkan server = express() di sini
const server = express();

// Middleware & API Routes tetap pakai app
server.use(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
