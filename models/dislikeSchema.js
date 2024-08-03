const mongoose = require('mongoose');


const DisLikeSchema = mongoose.Schema({
    disLikeBy:{type:mongoose.Schema.Types.ObjectId,ref:"Accounts"},
    movieId:{type:String,required:true},
})

const Dislike = mongoose.model("Dislike",DisLikeSchema,"Dislike")

module.exports = Dislike