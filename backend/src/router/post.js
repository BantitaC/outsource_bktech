const router = require("express").Router()
const controller = require("../controller/post")
const jwt = require("../middleware/jwt")

router.get("/", controller.fetchAll)
router.post("/", jwt.authenticateJWTUser, controller.create)
router.delete("/:id", jwt.authenticateJWTUser, controller.delete)

module.exports = router