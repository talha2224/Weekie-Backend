const { moviesModel,likesModel,dislikeModel } = require("../models");
const { uploadFile } = require("../utils/functions");
const HttpStatusCodes = require("../constants/statusCode")



const createMovieService = async (req,res)=>{
    try {
        let {title,description,cast,director,maturaity,genres,releaseDate,category} = req.body
        if (req?.files?.image[0] && req?.files?.video[0]){
            let image = req?.files?.image[0]
            let video = req?.files?.video[0]
            let imageUrl = await uploadFile(image)
            let videoUrl = await uploadFile(video)
            let data = await moviesModel.create({title,description,cast,director,maturaity,genres,releaseDate,image:imageUrl,video:videoUrl,category})
            if(data){
                return res.status(HttpStatusCodes["OK"]).json({msg:null,data:data,statusCode:200})
            }
        }
        else{
            return res.status(HttpStatusCodes["Not Found"]).json({data:null,msg:"Please upload image and video",statusCode:HttpStatusCodes["Not Found"]})
        }
    } 
    catch (error) {
        console.log(error)
        return 
    }
}

const editMovieService = async (req,res)=>{
    try {
        let {title,description,cast,director,maturaity,genres,releaseDate,category} = req.body
        let {id} = req.params
        let image = req?.file
        if(image){
            let imageUrl = await uploadFile(image)
            let data = await moviesModel.findByIdAndUpdate(id,{title,description,cast,director,maturaity,genres,releaseDate,image:imageUrl,category},{new:true})
            if(data){
                return res.status(HttpStatusCodes["OK"]).json({msg:null,data:data,statusCode:200})
            }
        }
        else{
            let data = await moviesModel.findByIdAndUpdate(id,{title,description,cast,director,maturaity,genres,releaseDate,category},{new:true})
            if(data){
                return res.status(HttpStatusCodes["OK"]).json({msg:null,data:data,statusCode:200})
            }
        }
    } 
    catch (error) {
        console.log(error)
        return 
    }
}

const getAllMovieService = async (req,res)=>{
    try {
        let data = await moviesModel.find({})
        if(data.length>0){
            return res.status(200).json({msg:null,data:data,statusCode:200})
        }
        else{
            return res.status(HttpStatusCodes["Not Found"]).json({data:null,msg:"No Movie Found",statusCode:HttpStatusCodes["Not Found"]})
        }
    } 
    catch (error) {
      console.log(error)  
      return
    }
}


const getSingleMovieService = async (req,res)=>{
    try {
        let data = await moviesModel.findById(req.params.id)
        let likes = await likesModel.find({movieId:req.params.id})
        let disLike = await dislikeModel.find({movieId:req.params.id})
        if(data){
            return res.status(200).json({msg:null,data:data,likes:likes,disLikes:disLike,statusCode:200})
        }
        else{
            return res.status(HttpStatusCodes["Not Found"]).json({data:null,msg:"No Movie Found",statusCode:HttpStatusCodes["Not Found"]})
        }
    } 
    catch (error) {
      console.log(error)  
      return
    }
}

const getByCategory = async (req,res)=>{
    try {
        let data = await moviesModel.find({category:req.params.category})
        if(data){
            return res.status(200).json({msg:null,data:data,statusCode:200})
        }
        else{
            return res.status(HttpStatusCodes["Not Found"]).json({data:null,msg:"No Movie Found",statusCode:HttpStatusCodes["Not Found"]})
        }
    } 
    catch (error) {
      console.log(error)  
      return
    }
}


const deleteMovieService = async (req,res)=>{
    try {
        let data = await moviesModel.findByIdAndDelete(req.params.id)
        let likes = await likesModel.deleteMany({movieId:req.params.id})
        if(data){
            return res.status(200).json({data:null,statusCode:200,msg:"Movie Deleted"})
        }
        else{
            return res.status(HttpStatusCodes["Not Found"]).json({data:null,statusCode:404,msg:"No Movie Found"})
        }
    } 
    catch (error) {
      console.log(error)  
      return
    }
}


module.exports = {createMovieService,editMovieService,getAllMovieService,getSingleMovieService,deleteMovieService,getByCategory}