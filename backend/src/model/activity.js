const database = require("../config/database");

const activityModel = 
  database.query(
    `CREATE TABLE IF NOT EXISTS activity(id VARCHAR(255) NOT NULL PRIMARY KEY, title VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, user_id VARCHAR(255) NOT NULL, FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE);`
  );
module.exports = activityModel;