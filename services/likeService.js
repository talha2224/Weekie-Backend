const HttpStatusCodes = require("../constants/statusCode");
const { likesModel } = require("../models");



const likeService = async (req,res)=>{
    try {
        let {likeBy,movieId} = req.body
        let data = await likesModel.create({likeBy,movieId})
        if(data){
            return res.status(200).json({data:data})
        }
    } 
    catch (error) {
       console.log(error) 
       return error
    }
}
const disLikeService = async (req,res)=>{
    try {
        let data = await likesModel.findByIdAndDelete(req.params.id)
        if(data){
            return res.status(200).json({msg:"Dislike Done"})
        }
        else{
            return res.status(HttpStatusCodes["Not Found"]).json({msg:"No Like Found"})
        }
    } 
    catch (error) {
       console.log(error) 
       return error
    }
}

module.exports = {likeService,disLikeService}