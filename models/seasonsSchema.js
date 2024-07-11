const mongoose = require("mongoose")


const seasonIntroSchema = mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    image:{type:String,required:true},
    cast:{type:String,required:true},
    director:{type:String,required:true},
    maturaity:{type:String,required:true},
    genres:{type:String,required:true},
},{ timestamps: true })

const seasonSchema = mongoose.Schema({
    seasonId:{type:mongoose.Schema.Types.ObjectId,ref:"SeasonIntro",required:true},
    video:{type:String,required:true},
    releaseDate:{type:String,required:true},
    description:{type:String,required:true}
},{ timestamps: true })


const Season = mongoose.model("Season",seasonSchema,"Season")
const SeasonIntro = mongoose.model("SeasonIntro",seasonIntroSchema,"SeasonIntro")


module.exports = {Season,SeasonIntro}