const {disLikeService,DeldisisLikeService } = require("../services/disLikeService")
const router = require("express").Router()


router.post("/create",disLikeService)
router.delete("/delete/:id",DeldisisLikeService)

module.exports = router
