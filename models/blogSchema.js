const mongoose = require("mongoose")


const blogSchema = mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    image:{type:String,required:true},
},{ timestamps: true })


const Blog = mongoose.model("Blog",blogSchema,"Blog")


module.exports = Blog