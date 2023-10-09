const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.MYSQLHOST,
  username: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
});

module.exports = sequelize;
