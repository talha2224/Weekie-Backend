const mongoose = require("mongoose");

const watchlistSchema = mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"Accounts",required:true},
    moveType:{type:String,required:true},
    movieId:{type:mongoose.Schema.Types.ObjectId,ref:"Movie",default:null},
    seasonId:{type:mongoose.Schema.Types.ObjectId,ref:"Season",default:null},
})

const watchlist = mongoose.model("watchlist",watchlistSchema,"watchlist")

module.exports = watchlist