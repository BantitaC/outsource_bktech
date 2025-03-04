const database = require("../config/database");

const advertModel = 
  database.query(
    `CREATE TABLE IF NOT EXISTS advert(id VARCHAR(255) NOT NULL PRIMARY KEY, title VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, user_id VARCHAR(255) NOT NULL, FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE);`
  );
module.exports = advertModel;