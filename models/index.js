const accountModel = require('./accountSchema')
const blogModel = require("./blogSchema")
const productModel = require("./productSchema")
const moviesModel = require("./moviesSchema")
const likesModel = require("./likeSchema")
const { SeasonIntro, Season } = require('./seasonsSchema')
const liveStreamModel = require("./streamingSchema")
const watchlistModel = require("./watchlistSchema")

module.exports ={accountModel,blogModel,productModel,moviesModel,likesModel,SeasonIntro,Season,liveStreamModel,watchlistModel}