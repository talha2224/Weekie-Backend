const mongoose = require("mongoose")


const productSchema = mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    image:{type:String,required:true},
    price:{type:Number,required:true},
},{ timestamps: true })


const Product = mongoose.model("Product",productSchema,"Product")


module.exports = Product