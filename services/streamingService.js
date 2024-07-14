const HttpStatusCodes = require("../constants/statusCode")
const {liveStreamModel} = require("../models/index")
const { uploadFile } = require("../utils/functions")



const uploadStreamVideo = async(req,res)=>{
    try {
        let {title,description}= req.body

        if (req?.files?.image[0] && req?.files?.video[0]){
            let imageUrl = await uploadFile(req?.files?.image[0])
            let videoUrl = await uploadFile(req?.files?.video[0])
            let upload = await liveStreamModel.create({title,description,thumbnail:imageUrl,streamUrl:videoUrl})
            res.status(200).json({msg:"Your stream in going live now",statusCode:200,data:upload})
        }
        else{
            return res.status(HttpStatusCodes["Not Found"]).json({data:null,msg:"Please upload image and video",statusCode:HttpStatusCodes["Not Found"]})
        }
    } 
    catch (error) {
        console.log(error)
        return error
    }
}

const getAllLiveStream = async (req,res)=>{
    try {
        let streams = await liveStreamModel.find({isLive:true})
        if(streams.length>0){
            return res.status(200).json({msg:null,data:streams,statusCode:200})
        }
        else{
            return res.status(404).json({msg:"No Live Stream Found",data:null,statusCode:404})
        }
    } 
    catch (error) {
        console.log(error)
        return error
    }
}

const getSingleStream = async (req,res)=>{
    try {
        let stream = await liveStreamModel.findById(req.params.id)
        if(stream){
            return res.status(200).json({msg:null,statusCode:200,data:stream})
        }
        else{
            return res.status(404).json({msg:"No Live Stream Found",data:null,statusCode:404})

        }
    } 
    catch (error) {
        console.log(error)
        return error
    }
}

const getInActiveStream = async (req,res)=>{
    try {
        let streams = await liveStreamModel.find({isLive:false})
        if(streams.length>0){
            return res.status(200).json({msg:null,data:streams,statusCode:200})
        }
        else{
            return res.status(404).json({msg:"No  Stream Found",data:null,statusCode:404})
        }
    } 
    catch (error) {
        console.log(error)
        return error
    }
}

const changeStreamStatus = async (req,res) =>{
    try {
        let {isLive} = req.body
        let toggleStream = await liveStreamModel.findByIdAndUpdate(req.params.id,{isLive:isLive},{new:true})
        return res.status(200).json({data:toggleStream,statusCode:200,msg:null})
    } 
    catch (error) {
        console.log(error)
        return error
    }
}

const deletStream = async (req,res) =>{
    try {
        let remove = await liveStreamModel.findByIdAndDelete(req.params.id)
        if (remove){
            return res.status(200).json({data:null,statusCode:200,msg:"Stream  Deactivated"})
        }
        else{
            return res.status(404).json({msg:"No  Stream Found",data:null,statusCode:404}) 
        }
    } 
    catch (error) {
        console.log(error)
        return error
    }
}


module.exports ={uploadStreamVideo,getAllLiveStream,getSingleStream,getInActiveStream,changeStreamStatus,deletStream}