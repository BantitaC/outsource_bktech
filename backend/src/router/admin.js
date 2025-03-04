const router = require("express").Router()
const controller = require("../controller/admin")

router.post("/register", controller.register)
router.post("/login", controller.login)
router.post("/logout", controller.logout)

module.exports = router