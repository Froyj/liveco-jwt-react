const mysql = require('mysql');

const config = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "root",
  database: process.env.DB_NAME || "my_db_name",
};

const connection = mysql.createConnection(config);

module.exports = connection;
