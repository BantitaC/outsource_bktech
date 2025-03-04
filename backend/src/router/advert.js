const router = require("express").Router()
const controller = require("../controller/advert")
const jwt = require("../middleware/jwt")
const {uploadImage} = require("../middleware/image")

router.get("/", controller.fetchAll)
router.get("/:number", controller.fetchByNumber)
router.post("/", jwt.authenticateJWTAdmin, uploadImage ,controller.create)
router.delete("/:id", jwt.authenticateJWTAdmin, controller.delete)

module.exports = router