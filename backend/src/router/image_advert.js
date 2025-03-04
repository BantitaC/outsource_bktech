const router = require("express").Router()
const controller = require("../controller/image_advert")
const jwt = require("../middleware/jwt")

router.get("/:id", controller.findByAdvert)
router.delete("/:id", jwt.authenticateJWTAdmin, controller.delete)

module.exports = router