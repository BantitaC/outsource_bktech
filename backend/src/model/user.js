const database = require("../config/database");
const bcryptjs = require("bcryptjs")
const uuid = require("uuid")

const adminModel = 
  database.query(
    `CREATE TABLE IF NOT EXISTS user(id VARCHAR(255) NOT NULL PRIMARY KEY, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, role VARCHAR(10) NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP);`,
    (err) => {
      if (err) throw err;
      else {
        bcryptjs.hash("admin1234", 10, (err, hash) => {
          if (err) {
              return res.status(500).send({
                  message: err,
              });
          } else {
            database.query(
                  `INSERT IGNORE INTO user (id, email, password, role ) VALUES ('${uuid.v4()}', 'admin@bktech.ac.th','${hash}', 'admin')`,
                  (err) => {
                      if (err) {
                          throw err;
                      }
                  }
              );
          }
      });
      
      }
    }
  );
module.exports = adminModel;