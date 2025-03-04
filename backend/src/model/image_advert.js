const database = require("../config/database");

const imageAdvertModel = 
  database.query(
    `CREATE TABLE IF NOT EXISTS image_advert(id VARCHAR(255) NOT NULL PRIMARY KEY, name VARCHAR(255) NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, advert_id VARCHAR(255) NOT NULL, FOREIGN KEY (advert_id) REFERENCES advert(id) ON DELETE CASCADE);`
  );
module.exports = imageAdvertModel;