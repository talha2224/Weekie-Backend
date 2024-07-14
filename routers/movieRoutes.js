// multiUpload.fields([{ name: 'profilePhoto', maxCount: 1 },{ name: 'coverPhoto', maxCount: 1 }])
const router = require("express").Router()
const { multipleupload } = require("../config/multer");
const { createMovieService, editMovieService, getAllMovieService, getSingleMovieService, deleteMovieService, getByCategory } = require("../services/moviesService");


router.post("/create",multipleupload.fields([{name:"image",maxCount:1},{name:"video",maxCount:1}]),createMovieService)
router.put("/update/:id",multipleupload.single("image"),editMovieService)
router.get("/all/",getAllMovieService)
router.get("/single/:id",getSingleMovieService)
router.get("/category/:category",getByCategory)
router.delete("/delete/:id",deleteMovieService)

module.exports = router
