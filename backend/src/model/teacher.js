const database = require("../config/database");

const teacherModel = 
  database.query(
    `CREATE TABLE IF NOT EXISTS teacher(id VARCHAR(255) NOT NULL PRIMARY KEY, name VARCHAR(255) NOT NULL, tel VARCHAR(10) NOT NULL, email VARCHAR(255) NOT NULL, image VARCHAR(255) NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP);`
  );
module.exports = teacherModel;