const { likeService,disLikeService } = require("../services/likeService")
const router = require("express").Router()


router.post("/create",likeService)
router.delete("/delete/:id",disLikeService)

module.exports = router
