require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || "db_bioku",
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || "mysql",
    logging: false,
    dialectOptions: {
      connectTimeout: 60000 // Increase timeout to 60 seconds
    }
  }
};