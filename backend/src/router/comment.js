const router = require("express").Router()
const controller = require("../controller/comment")
const jwt = require("../middleware/jwt")

router.get("/:post_id", controller.fetchByPost)
router.post("/", jwt.authenticateJWTUser, controller.create)
router.delete("/:id", jwt.authenticateJWTUser, controller.delete)

module.exports = router