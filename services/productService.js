const { productModel } = require("../models");
const { uploadFile } = require("../utils/functions");
const HttpStatusCodes = require("../constants/statusCode")



const createProductService = async (req,res)=>{
    try {
        let {title,description,price} = req.body
        let image = req.file
        let imageUrl = await uploadFile(image)
        let data = await productModel.create({title,description,image:imageUrl,price})
        if(data){
            return res.status(HttpStatusCodes["OK"]).json(data)
        }
    } 
    catch (error) {
        console.log(error)
        return 
    }
}

const editProductService = async (req,res)=>{
    try {
        let {title,description,price} = req.body
        let {id} = req.params
        let image = req?.file
        if(image){
            let imageUrl = await uploadFile(image)
            let data = await productModel.findByIdAndUpdate(id,{title,description,image:imageUrl,price},{new:true})
            if(data){
                return res.status(HttpStatusCodes["OK"]).json(data)
            }
        }
        else{
            let data = await productModel.findByIdAndUpdate(id,{title,description,price},{new:true})
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

const getAllProductService = async (req,res)=>{
    try {
        let data = await productModel.find({})
        if(data.length>0){
            return res.status(200).json(data)
        }
        else{
            return res.status(HttpStatusCodes["Not Found"]).json({msg:"No Product Found"})
        }
    } 
    catch (error) {
      console.log(error)  
      return
    }
}


const getSingleProductService = async (req,res)=>{
    try {
        let data = await productModel.findById(req.params.id)
        if(data){
            return res.status(200).json(data)
        }
        else{
            return res.status(HttpStatusCodes["Not Found"]).json({msg:"No Product Found"})
        }
    } 
    catch (error) {
      console.log(error)  
      return
    }
}


const deleteProductService = async (req,res)=>{
    try {
        let data = await productModel.findByIdAndDelete(req.params.id)
        if(data){
            return res.status(200).json({msg:"Product Deleted"})
        }
        else{
            return res.status(HttpStatusCodes["Not Found"]).json({msg:"No Product Found"})
        }
    } 
    catch (error) {
      console.log(error)  
      return
    }
}


module.exports = {createProductService,editProductService,getAllProductService,getSingleProductService,deleteProductService}