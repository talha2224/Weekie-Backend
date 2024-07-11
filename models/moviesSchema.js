const mongoose = require("mongoose")


const movieSchema = mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    image:{type:String,required:true},
    video:{type:String,required:true},
    cast:{type:String,required:true},
    director:{type:String,required:true},
    maturaity:{type:String,required:true},
    genres:{type:String,required:true},
    releaseDate:{type:String,required:true}
},{ timestamps: true })


const Movie = mongoose.model("Movie",movieSchema,"Movie")


module.exports = Movie