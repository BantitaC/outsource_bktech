const router = require("express").Router()

router.use("/admin", require("./admin"))
router.use("/user", require("./user"))
router.use("/post", require("./post"))
router.use("/comment", require("./comment"))
router.use("/activity", require("./activity"))
router.use("/image_activity", require("./image_activity"))
router.use("/advert", require("./advert"))
router.use("/image_advert", require("./image_advert"))
router.use("/teacher", require("./teacher"))
router.use("/student", require("./student"))

module.exports = router