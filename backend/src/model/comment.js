const database = require("../config/database");

const commentModel = 
  database.query(
    `CREATE TABLE IF NOT EXISTS comment(id VARCHAR(255) NOT NULL PRIMARY KEY, description VARCHAR(255) NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, user_id VARCHAR(255) NOT NULL, post_id VARCHAR(255) NOT NULL, FOREIGN KEY (user_id) REFERENCES user(id), FOREIGN KEY (post_id) REFERENCES post(id) ON DELETE CASCADE);`
  );
module.exports = commentModel;