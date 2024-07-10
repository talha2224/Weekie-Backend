const express = require ("express")
const morgan = require("morgan")
const cors = require('cors')
const HttpStatusCodes = require("./constants/statusCode")
const dbConnection = require("./config/database")
const allRoutes = require("./routers")
require('dotenv').config()

// BASIC SETUP 
const app = express() 
const port = process.env.PORT || 4001
app.use(express.json())
app.use(cors({origin:"*"}))
app.use(morgan("tiny"))

// DATABASE CONNECTION
dbConnection()

// API
app.use(allRoutes)








// INVALID REQUEST URL 
app.use("*",(req,res)=>{
    return res.status(HttpStatusCodes["Not Found"]).json({Error:"Your are hitting wrong api. This api not exits"})
})
// LISTNEING PORT
app.listen(port,()=>{
    console.log(`server is runing on: http://localhost:${port}/`)
})











