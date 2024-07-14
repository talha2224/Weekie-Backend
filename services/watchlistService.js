const {watchlistModel} = require("../models")



const storeMovie = async (req,res) =>{
    try {
        let {userId,moveType,movieId,seasonId}= req.body
        let save = await watchlistModel.create({userId,moveType,movieId,seasonId})
        return res.status(200).json({data:save,statusCode:200,msg:null})
    } 
    catch (error) {
        console.log(error)
        return error
    }
}

const getMovies = async (req,res)=>{
    try {
        let movie = await watchlistModel.find({userId:req.params.id}).populate("movieId").populate("seasonId")
        if(movie){
            return res.status(200).json({data:movie,statusCode:200,msg:null})
        }
        else{
            return res.status(404).json({data:null,statusCode:404,msg:"No watchlist"})
        }

    } 
    catch (error) {
        console.log(error)
        return error
    }
}


const deleteWatchList = async(req,res)=>{
    try {
        let del = await watchlistModel.findByIdAndDelete(req.params.id)
        if(del){
            return res.status(200).json({msg:"Deleted",data:null,statusCode:200})
        }
        else{
            return res.status(404).json({msg:"Invalid Id",data:null,statusCode:404})

        }
    } 
    catch (error) {
        console.log(error)
        return error
    }
}


module.exports = {getMovies,storeMovie,deleteWatchList}