const database = require("../config/database");

const imageActivityModel = 
  database.query(
    `CREATE TABLE IF NOT EXISTS image_activity(id VARCHAR(255) NOT NULL PRIMARY KEY, name VARCHAR(255) NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, activity_id VARCHAR(255) NOT NULL, FOREIGN KEY (activity_id) REFERENCES activity(id) ON DELETE CASCADE);`
  );
module.exports = imageActivityModel;