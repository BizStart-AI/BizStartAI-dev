const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 4000, 
    dialect: "mysql",
    logging: false,
    dialectOptions: process.env.NODE_ENV === "production"
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: true, // Try 'true' first for TiDB; fallback to 'false' if it fails
          },
        }
      : {},
  }
);

module.exports = sequelize;
