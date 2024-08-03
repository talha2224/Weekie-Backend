const allRoutes = require("express").Router()
const apiVersion = require("../constants/baseUrl")
const accountRoutes = require('./accountRoutes')
const blogRoutes = require("./blogRoutes")
const productRoutes = require("./productRoutes")
const movieRoutes = require("./movieRoutes")
const likeRoutes = require("./likeRoutes")
const dislikeRoutes = require("./disLikeRoutes")
const seasonRoutes= require("./seasonRoutes")
const paymentRoutes= require("./paymentRoutes")
const streamingRoutes = require("./streamingRoutes")
const watchlistRoutes = require("./watchlistRoutes")


allRoutes.use(`${apiVersion}/user`,accountRoutes)
allRoutes.use(`${apiVersion}/blog`,blogRoutes)
allRoutes.use(`${apiVersion}/product`,productRoutes)
allRoutes.use(`${apiVersion}/movies`,movieRoutes)
allRoutes.use(`${apiVersion}/likes`,likeRoutes)
allRoutes.use(`${apiVersion}/dislikes`,dislikeRoutes)
allRoutes.use(`${apiVersion}/season`,seasonRoutes)
allRoutes.use(`${apiVersion}/payment`,paymentRoutes)
allRoutes.use(`${apiVersion}/streaming`,streamingRoutes)
allRoutes.use(`${apiVersion}/watchlist`,watchlistRoutes)


module.exports = allRoutes


