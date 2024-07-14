const router = require('express').Router();
const { storeMovie, getMovies, deleteWatchList } = require('../services/watchlistService');


router.post("/create",storeMovie)
router.get("/get/:id",getMovies)
router.delete("/delete/:id",deleteWatchList)


module.exports = router