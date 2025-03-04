const express = require("express")
const app = express()

const cors = require("cors")
const helmet = require("helmet")
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const path = require('path');
const fs = require('fs');

require("dotenv").config()
require("./src/model")

app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))
app.use(helmet())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true, 
}));

const publicFolder = path.join(__dirname, 'public');
const uploadFolder = path.join(publicFolder, 'images');

if (!fs.existsSync(publicFolder)) {
    fs.mkdirSync(publicFolder, { recursive: true });
}

if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder, { recursive: true });
}

app.use("/", require("./src/router"))
app.use("/public/images", express.static("./public/images"))

app.listen(process.env.port, () => {
    console.log("Server start http://localhost:" + process.env.port)
})