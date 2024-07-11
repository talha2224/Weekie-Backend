const router = require("express").Router()
const { multipleupload } = require("../config/multer");
const { createSeasonIntroService, createEpisodes, editSeasonIntroService, getAllSeasonService, getEpisodesService, getSingleEpisodeService, deleteSeasonService, deleteEpisodeService } = require("../services/seasonsSevice");



router.post("/create",multipleupload.single("image"),createSeasonIntroService)
router.post("/episode/create/",multipleupload.single("video"),createEpisodes)
router.put("/edit/:id",editSeasonIntroService)

router.get("/all",getAllSeasonService)
router.get("/episodes/:seasonId",getEpisodesService)
router.get("/episode/single/:id",getSingleEpisodeService)
router.delete("/delete/:id",deleteSeasonService)
router.delete("/episode/delete/:id",deleteEpisodeService)





module.exports = router



