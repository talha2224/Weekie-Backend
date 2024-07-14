const allRoutes = require("express").Router()
const apiVersion = require("../constants/baseUrl")
const accountRoutes = require('./accountRoutes')
const blogRoutes = require("./blogRoutes")
const productRoutes = require("./productRoutes")
const movieRoutes = require("./movieRoutes")
const likeRoutes = require("./likeRoutes")
const seasonRoutes= require("./seasonRoutes")
const paymentRoutes= require("./paymentRoutes")
const streamingRoutes = require("./streamingRoutes")


allRoutes.use(`${apiVersion}/user`,accountRoutes)
allRoutes.use(`${apiVersion}/blog`,blogRoutes)
allRoutes.use(`${apiVersion}/product`,productRoutes)
allRoutes.use(`${apiVersion}/movies`,movieRoutes)
allRoutes.use(`${apiVersion}/likes`,likeRoutes)
allRoutes.use(`${apiVersion}/season`,seasonRoutes)
allRoutes.use(`${apiVersion}/payment`,paymentRoutes)
allRoutes.use(`${apiVersion}/streaming`,streamingRoutes)


module.exports = allRoutes


