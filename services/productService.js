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
            return res.status(HttpStatusCodes["OK"]).json({msg:null,data:data,statusCode:200})
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
                return res.status(HttpStatusCodes["OK"]).json({msg:null,data:data,statusCode:200})
            }
        }
        else{
            let data = await productModel.findByIdAndUpdate(id,{title,description,price},{new:true})
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

const getAllProductService = async (req,res)=>{
    try {
        let data = await productModel.find({})
        if(data.length>0){
            return res.status(200).json({data:data,msg:null,statusCode:200})
        }
        else{
            return res.status(HttpStatusCodes["Not Found"]).json({msg:"No Product Found",statusCode:404,data:null})
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
            return res.status(200).json({data:data,msg:null,statusCode:200})
        }
        else{
            return res.status(HttpStatusCodes["Not Found"]).json({data:null,msg:"No Product Found",statusCode:404})
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
            return res.status(200).json({data:null,statusCode:200,msg:"Product Deleted"})
        }
        else{
            return res.status(HttpStatusCodes["Not Found"]).json({data:null,statusCode:404,msg:"No Product Found"})
        }
    } 
    catch (error) {
      console.log(error)  
      return
    }
}


module.exports = {createProductService,editProductService,getAllProductService,getSingleProductService,deleteProductService}