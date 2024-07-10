const { blogModel } = require("../models");
const { uploadFile } = require("../utils/functions");
const HttpStatusCodes = require("../constants/statusCode")



const createBlogService = async (req,res)=>{
    try {
        let {title,description} = req.body
        let image = req.file
        let imageUrl = await uploadFile(image)
        let data = await blogModel.create({title,description,image:imageUrl})
        if(data){
            return res.status(HttpStatusCodes["OK"]).json(data)
        }
    } 
    catch (error) {
        console.log(error)
        return 
    }
}

const editBlogService = async (req,res)=>{
    try {
        let {title,description} = req.body
        let {id} = req.params
        let image = req?.file
        if(image){
            let imageUrl = await uploadFile(image)
            let data = await blogModel.findByIdAndUpdate(id,{title,description,image:imageUrl},{new:true})
            if(data){
                return res.status(HttpStatusCodes["OK"]).json(data)
            }
        }
        else{
            let data = await blogModel.findByIdAndUpdate(id,{title,description},{new:true})
            if(data){
                return res.status(HttpStatusCodes["OK"]).json(data)
            }
        }
    } 
    catch (error) {
        console.log(error)
        return 
    }
}

const getAllBlogService = async (req,res)=>{
    try {
        let data = await blogModel.find({})
        if(data.length>0){
            return res.status(200).json(data)
        }
        else{
            return res.status(HttpStatusCodes["Not Found"]).json({msg:"No Blog Found"})
        }
    } 
    catch (error) {
      console.log(error)  
      return
    }
}


const getSingleBlogService = async (req,res)=>{
    try {
        let data = await blogModel.findById(req.params.id)
        if(data){
            return res.status(200).json(data)
        }
        else{
            return res.status(HttpStatusCodes["Not Found"]).json({msg:"No Blog Found"})
        }
    } 
    catch (error) {
      console.log(error)  
      return
    }
}


const deleteBlogService = async (req,res)=>{
    try {
        let data = await blogModel.findByIdAndDelete(req.params.id)
        if(data){
            return res.status(200).json({msg:"Blog Deleted"})
        }
        else{
            return res.status(HttpStatusCodes["Not Found"]).json({msg:"No Blog Found"})
        }
    } 
    catch (error) {
      console.log(error)  
      return
    }
}


module.exports = {createBlogService,editBlogService,getAllBlogService,getSingleBlogService,deleteBlogService}