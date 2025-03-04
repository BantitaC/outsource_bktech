const database = require("../config/database");

const studentModel = 
  database.query(
    `CREATE TABLE IF NOT EXISTS student(id VARCHAR(255) NOT NULL PRIMARY KEY, name VARCHAR(255) NOT NULL, nick VARCHAR(255) NOT NULL, image VARCHAR(255) NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP);`
  );
module.exports = studentModel;