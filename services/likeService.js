const HttpStatusCodes = require("../constants/statusCode");
const { likesModel } = require("../models");



const likeService = async (req,res)=>{
    try {
        let {likeBy,movieId} = req.body
        let data = await likesModel.create({likeBy,movieId})
        if(data){
            return res.status(200).json({msg:null,data:data,statusCode:200})
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
            return res.status(200).json({data:null,msg:"Dislike Done",statusCode:200})
        }
        else{
            return res.status(HttpStatusCodes["Not Found"]).json({data:null,msg:"No Like Found,",statusCode:404})
        }
    } 
    catch (error) {
       console.log(error) 
       return error
    }
}

module.exports = {likeService,disLikeService}