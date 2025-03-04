const router = require("express").Router()
const controller = require("../controller/image_activity")
const jwt = require("../middleware/jwt")

router.get("/:id", controller.findByActivity)
router.delete("/:id", jwt.authenticateJWTAdmin, controller.delete)

module.exports = router