const mongoose = require("mongoose")


const liveStreamSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    thumbnail: { type: String,required:true }, // URL to the thumbnail image in Firebase Storage
    streamUrl: { type: String, required: true }, // URL to the live stream
    viewers: { type: Number, default: 0 },
    isLive: { type: Boolean, default: true },
},{timestamps:true});
  
const liveStream = mongoose.model("liveStream",liveStreamSchema,"liveStream")

module.exports = liveStream