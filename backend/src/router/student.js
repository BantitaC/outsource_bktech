const router = require("express").Router()
const controller = require("../controller/student")
const jwt = require("../middleware/jwt")
const { uploadImageSingle } = require("../middleware/image")


router.get("/", controller.fetchAll)
router.post("/", jwt.authenticateJWTAdmin, uploadImageSingle, controller.create)
router.delete("/:id", jwt.authenticateJWTAdmin, uploadImageSingle, controller.delete)

module.exports = router