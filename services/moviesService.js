const { moviesModel,likesModel } = require("../models");
const { uploadFile } = require("../utils/functions");
const HttpStatusCodes = require("../constants/statusCode")



const createMovieService = async (req,res)=>{
    try {
        let {title,description,cast,director,maturaity,genres,releaseDate} = req.body
        if (req?.files?.image[0] && req?.files?.video[0]){
            let image = req?.files?.image[0]
            let video = req?.files?.video[0]
            let imageUrl = await uploadFile(image)
            let videoUrl = await uploadFile(video)
            let data = await moviesModel.create({title,description,cast,director,maturaity,genres,releaseDate,image:imageUrl,video:videoUrl})
            if(data){
                return res.status(HttpStatusCodes["OK"]).json({data:data})
            }
        }
        else{
            return res.status(HttpStatusCodes["Not Found"]).json({msg:"Please upload image and video"})
        }
    } 
    catch (error) {
        console.log(error)
        return 
    }
}

const editMovieService = async (req,res)=>{
    try {
        let {title,description,cast,director,maturaity,genres,releaseDate} = req.body
        let {id} = req.params
        let image = req?.file
        if(image){
            let imageUrl = await uploadFile(image)
            let data = await moviesModel.findByIdAndUpdate(id,{title,description,cast,director,maturaity,genres,releaseDate,image:imageUrl},{new:true})
            if(data){
                return res.status(HttpStatusCodes["OK"]).json({data:data})
            }
        }
        else{
            let data = await moviesModel.findByIdAndUpdate(id,{title,description,cast,director,maturaity,genres,releaseDate},{new:true})
            if(data){
                return res.status(HttpStatusCodes["OK"]).json({data:data})
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
            return res.status(200).json({data:data})
        }
        else{
            return res.status(HttpStatusCodes["Not Found"]).json({msg:"No Movie Found"})
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
        if(data){
            return res.status(200).json({data:data,likes:likes})
        }
        else{
            return res.status(HttpStatusCodes["Not Found"]).json({msg:"No Movie Found"})
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
            return res.status(200).json({msg:"Movie Deleted"})
        }
        else{
            return res.status(HttpStatusCodes["Not Found"]).json({msg:"No Movie Found"})
        }
    } 
    catch (error) {
      console.log(error)  
      return
    }
}


module.exports = {createMovieService,editMovieService,getAllMovieService,getSingleMovieService,deleteMovieService}