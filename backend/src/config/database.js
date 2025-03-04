const mysql = require('mysql2')
require("dotenv").config()

const db = mysql.createConnection({
    host: process.env.db_host || 'localhost',
    port: process.env.db_port || 3306,
    user: process.env.db_user || 'root',
    password: process.env.db_password || 'admin',
    database: process.env.db_name || 'bankhai'
})

module.exports = db