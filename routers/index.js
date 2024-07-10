const allRoutes = require("express").Router()
const apiVersion = require("../constants/baseUrl")
const accountRoutes = require('./accountRoutes')
const blogRoutes = require("./blogRoutes")


allRoutes.use(`${apiVersion}/user`,accountRoutes)
allRoutes.use(`${apiVersion}/blog`,blogRoutes)


module.exports = allRoutes


