const router = require("express").Router()
const { multipleupload } = require("../config/multer");
const { createProductService, editProductService, getAllProductService, getSingleProductService, deleteProductService } = require("../services/productService");



router.post("/create",multipleupload.single("image"),createProductService)
router.put("/update/:id",multipleupload.single("image"),editProductService)
router.get("/all",getAllProductService)

router.get("/single/:id",getSingleProductService)
router.delete("/delete/:id",deleteProductService)





module.exports = router



