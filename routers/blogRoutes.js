const router = require("express").Router()
const { multipleupload } = require("../config/multer");
const { createBlogService,editBlogService,getAllBlogService,getSingleBlogService,deleteBlogService } = require("../services/blogService");



router.post("/create",multipleupload.single("image"),createBlogService)
router.put("/update/:id",multipleupload.single("image"),editBlogService)
router.get("/all",getAllBlogService)

router.get("/single/:id",getSingleBlogService)
router.delete("/delete/:id",deleteBlogService)





module.exports = router



