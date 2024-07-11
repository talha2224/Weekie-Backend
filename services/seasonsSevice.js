const { SeasonIntro, Season, likesModel } = require("../models");
const { uploadFile } = require("../utils/functions");
const HttpStatusCodes = require("../constants/statusCode")



const createSeasonIntroService = async (req, res) => {
    try {
        let { title, description, cast, director, maturaity, genres } = req.body
        let image = req.file
        let imageUrl = await uploadFile(image)
        let data = await SeasonIntro.create({ title, description, cast, director, maturaity, genres, image: imageUrl })
        if (data) {
            return res.status(HttpStatusCodes["OK"]).json({ data: data })
        }

    }
    catch (error) {
        console.log(error)
        return
    }
}

const createEpisodes = async (req, res) => {
    try {
        let {seasonId, releaseDate,description } = req.body
        let video = req.file
        let videoUrl = await uploadFile(video)
        let data = await Season.create({ video:videoUrl,seasonId,releaseDate,description})
        if (data) {
            return res.status(HttpStatusCodes["OK"]).json({ data: data })
        }

    }
    catch (error) {
        console.log(error)
        return
    }
}

const editSeasonIntroService = async (req, res) => {
    try {
        let { title, description, cast, director, maturaity, genres } = req.body
        let { id } = req.params
        let image = req?.file
        if (image) {
            let imageUrl = await uploadFile(image)
            let data = await SeasonIntro.findByIdAndUpdate(id, { title, description, cast, director, maturaity, genres, image: imageUrl }, { new: true })
            if (data) {
                return res.status(HttpStatusCodes["OK"]).json({ data: data })
            }
        }
        else {
            let data = await SeasonIntro.findByIdAndUpdate(id, { title, description, cast, director, maturaity, genres}, { new: true })
            if (data) {
                return res.status(HttpStatusCodes["OK"]).json({ data: data })
            }
        }
    }
    catch (error) {
        console.log(error)
        return
    }
}

const getAllSeasonService = async (req, res) => {
    try {
        let data = await SeasonIntro.find({})
        if (data.length > 0) {
            return res.status(200).json({ data: data })
        }
        else {
            return res.status(HttpStatusCodes["Not Found"]).json({ msg: "No Movie Found" })
        }
    }
    catch (error) {
        console.log(error)
        return
    }
}

const getEpisodesService = async (req,res)=>{
    try {
        let data = await Season.find({seasonId:req.params.seasonId}).populate("seasonId")
        if (data) {
            return res.status(200).json({ data: data})
        }
        else {
            return res.status(HttpStatusCodes["Not Found"]).json({ msg: "No Season Found" })
        }
    }
    catch (error) {
        console.log(error)
        return
    } 
}

const getSingleEpisodeService = async (req,res)=>{
    try {
        let data = await Season.findById(req.params.id).populate("seasonId")
        let likes = await likesModel.find({movieId:req.params.id})

        if (data) {
            return res.status(200).json({ data: data,likes:likes})
        }
        else {
            return res.status(HttpStatusCodes["Not Found"]).json({ msg: "No Season Found" })
        }
    }
    catch (error) {
        console.log(error)
        return
    } 
}

const deleteSeasonService = async (req, res) => {
    try {
        let data = await SeasonIntro.findByIdAndDelete(req.params.id)
        let likes = await Season.deleteMany({ seasonId: req.params.id })
        if (data) {
            return res.status(200).json({ msg: "Season Deleted" })
        }
        else {
            return res.status(HttpStatusCodes["Not Found"]).json({ msg: "No Movie Found" })
        }
    }
    catch (error) {
        console.log(error)
        return
    }
}
const deleteEpisodeService = async (req, res) => {
    try {
        let data = await Season.findByIdAndDelete(req.params.id)
        let likes = await likesModel.deleteMany({ seasonId: req.params.id })
        if (data) {
            return res.status(200).json({ msg: "Episode Deleted" })
        }
        else {
            return res.status(HttpStatusCodes["Not Found"]).json({ msg: "No Movie Found" })
        }
    }
    catch (error) {
        console.log(error)
        return
    }
}


module.exports = { createSeasonIntroService, createEpisodes, editSeasonIntroService,getAllSeasonService,getEpisodesService,getSingleEpisodeService,deleteSeasonService,deleteEpisodeService }