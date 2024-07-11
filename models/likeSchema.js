const mongoose = require('mongoose');


const likeSchema = mongoose.Schema({
    likeBy:{type:mongoose.Schema.Types.ObjectId,ref:"Accounts"},
    movieId:{type:String,required:true},
})

const Like = mongoose.model("Like",likeSchema,"Like")

module.exports = Like