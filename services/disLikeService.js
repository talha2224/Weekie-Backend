const Dislike = require("../models/dislikeSchema");
const HttpStatusCodes = require("../constants/statusCode");
const disLikeService = async (req, res) => {
    try {
        let { likeBy, movieId } = req.body
        let data = await Dislike.create({ likeBy, movieId })
        if (data) {
            return res.status(200).json({ msg: null, data: data, statusCode: 200 })
        }
    }
    catch (error) {
        console.log(error)
        return error
    }
}
const DeldisisLikeService = async (req, res) => {
    try {
        let data = await Dislike.findByIdAndDelete(req.params.id)
        if (data) {
            return res.status(200).json({ data: null, msg: "Dislike Done", statusCode: 200 })
        }
        else {
            return res.status(HttpStatusCodes["Not Found"]).json({ data: null, msg: "No Dis Like Found,", statusCode: 404 })
        }
    }
    catch (error) {
        console.log(error)
        return error
    }
}

module.exports = { DeldisisLikeService, disLikeService }