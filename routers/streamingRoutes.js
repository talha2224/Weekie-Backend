const router = require("express").Router()
const { multipleupload } = require("../config/multer");
const { uploadStreamVideo, getAllLiveStream, getInActiveStream, getSingleStream, changeStreamStatus, deletStream } = require("../services/streamingService");

router.post("/create",multipleupload.fields([{name:"image",maxCount:1},{name:"video",maxCount:1}]),uploadStreamVideo)
router.get("/active",getAllLiveStream)
router.get("/inactive",getInActiveStream)
router.get("/single/:id",getSingleStream)
router.put("/update/:id",changeStreamStatus)
router.delete("/delete/:id",deletStream)


module.exports = router