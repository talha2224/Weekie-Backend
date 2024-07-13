const { accountModel } = require("../models")
const HttpStatusCodes = require("../constants/statusCode")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const { getCurrentTimePlusFiveMinutes, generateSixDigitCode, sendSignUpEmail, isOtpValid } = require("../utils/functions")

const registerAccount = async (req, res) => {
    const { registerType, email, phoneNumber, password } = req.body
    if(registerType){
        if (registerType.toLowerCase() === "email") {
            let userExits = await accountModel.findOne({ email: email })
            if (userExits) {
                return res.status(HttpStatusCodes.Conflict).json({statusCode:HttpStatusCodes.Conflict, msg: "Email Already Exits",data:null })
            }
            else {
                let hashPassword = await bcrypt.hash(password, 10)
                let expireAt = await getCurrentTimePlusFiveMinutes()
                let otp = await generateSixDigitCode()
                let createAccount = await accountModel.create({ registerType, email, phoneNumber: null, password: hashPassword, otp, expireAt })
                let sendOtp = await sendSignUpEmail(email, otp)
                let createToken = await jwt.sign({ createAccount }, process.env.JWTKEY)
                return res.status(HttpStatusCodes.OK).json(
                    {  token:createToken,data:createAccount ,msg: "You have to verify your account we have send an otp at this email",statusCode:200}
                )
            }
        }
    
        else {
            let userExits = await accountModel.findOne({ phoneNumber: phoneNumber })
            if (userExits) {
                return res.status(HttpStatusCodes.Conflict).json({data:null,statusCode:HttpStatusCodes.Conflict, msg: "Phone Number Already Exits" })
            }
            else {
                let hashPassword = await bcrypt.hash(password, 10)
                let expireAt = await getCurrentTimePlusFiveMinutes()
                let otp = await generateSixDigitCode()
                let createAccount = await accountModel.create({ registerType, email: null, phoneNumber, password: hashPassword, otp, expireAt })
                let sendOtp = await sendSignUpEmail(email, otp)
                let createToken = await jwt.sign({ createAccount }, process.env.JWTKEY)
                return res.status(HttpStatusCodes.OK).json(
                    { token:createToken,data: createAccount,msg: "You have to verify your account we have send an otp at this email",statusCode:200}
                )
            }
        }
    }
    else{
        return res.status(HttpStatusCodes["Not Found"]).json({ msg: "registerType should be email or phoneNumber" })
    }
}
const verifyOtp = async (req, res) => {
    try {
        let { email, otp } = req.body
        let findAccount = await accountModel.findOne({email:email})
        if (!findAccount) { return res.status(HttpStatusCodes["Not Found"]).json({ msg: "Invalid Email" }) }
        else {
            if (findAccount.otp == otp) {
                let valid = isOtpValid(findAccount.expireAt)
                console.log(valid,"valid")
                if (valid) {
                    let update = await accountModel.findByIdAndUpdate(findAccount._id, { accountVerified: true, otpVerified: true }, { new: true })
                    if (update) {
                        let createToken = await jwt.sign({ update }, process.env.JWTKEY)
                        return res.status(HttpStatusCodes.OK).json(
                            { token: createToken, data: update, msg: "Otp Verified",statusCode:200 }
                        )
                    }
                }
                else {
                    return res.status(HttpStatusCodes["Unauthorized"]).json({data:null, statusCode:HttpStatusCodes["Unauthorized"], msg: "Otp Expired" })
                }
            }
            else {
                return res.status(HttpStatusCodes["Bad Request"]).json({ data:null, statusCode:HttpStatusCodes["Bad Request"],msg: "Invalid Otp" })
            }
        }
    }
    catch (error) {
        console.log(error)
        return res.status(HttpStatusCodes["Internal Server Error"]).json({data:null, statusCode:HttpStatusCodes["Internal Server Error"], msg: "Unexpected error" })
    }
}
const resendOtp = async (req, res) => {
    try {
        let { email } = req.body
        let findAccount = await accountModel.findOne({email:email})
        if (!findAccount) { return res.status(HttpStatusCodes["Not Found"]).json({data:null,statusCode:HttpStatusCodes["Not Found"], msg: "Invalid Id pass" }) }
        else {
            let expireAt = await getCurrentTimePlusFiveMinutes()
            let otp = await generateSixDigitCode()
            let sendOtp = await sendSignUpEmail(findAccount.email, otp)
            let update = await accountModel.findByIdAndUpdate(findAccount._id, {otpVerified: false,otp,expireAt }, { new: true })
            if (update) {
                return res.status(HttpStatusCodes.OK).json({msg: "Otp Send",data:null,statusCode:200 })
            }
        }
    }
    catch (error) {
        console.log(error)
        return res.status(HttpStatusCodes["Internal Server Error"]).json({ msg: "Unexpected error" })
    }
}

const forgetPassword = async (req,res)=>{
    try {
        let { email } = req.body
        let findAccount = await accountModel.findOne({email:email})
        if (!findAccount) { return res.status(HttpStatusCodes["Not Found"]).json({data:null,statusCode:HttpStatusCodes["Not Found"], msg:"Invalid Email" }) }
        else {
            let expireAt = await getCurrentTimePlusFiveMinutes()
            let otp = await generateSixDigitCode()
            let sendOtp = await sendSignUpEmail(findAccount.email, otp)
            let update = await accountModel.findByIdAndUpdate(findAccount._id, {otpVerified: false,otp,expireAt }, { new: true })
            if (update) {
                return res.status(HttpStatusCodes.OK).json({msg: "Otp Send",data:null,statusCode:200 })
            }
        }
    }
    catch (error) {
        console.log(error)
        return res.status(HttpStatusCodes["Internal Server Error"]).json({ msg: "Unexpected error" })
    }  
}

const changePassword = async (req,res) =>{
    try {
        let { email, password } = req.body
        let findAccount = await accountModel.findOne({email:email})
        if (!findAccount) { return res.status(HttpStatusCodes["Not Found"]).json({data:null,statusCode:HttpStatusCodes["Not Found"], msg: "Invalid Id pass" }) }
        else {
            let hashPassword = await bcrypt.hash(password, 10)
            let update = await accountModel.findByIdAndUpdate(findAccount._id, {otpVerified: false,password:hashPassword }, { new: true })
            if (update) {
                return res.status(HttpStatusCodes.OK).json({msg: "Password Changed",data:null,statusCode:200 })
            }
        }
    }
    catch (error) {
        console.log(error)
        return res.status(HttpStatusCodes["Internal Server Error"]).json({ msg: "Unexpected error" })
    }   
}

const loginAccount = async (req,res) =>{
    try {
        let {loginType,email,password } = req.body
        if(loginType){
            if(loginType.toLowerCase() === "email"){
                let findAccount = await accountModel.findOne({email:email})
                if (!findAccount) { return res.status(HttpStatusCodes["Not Found"]).json({data:null,statusCode:HttpStatusCodes["Not Found"], msg: "Invalid Email" }) }
                else {
                    if(findAccount.accountVerified) {
                        let comparePassword = await bcrypt.compare(password,findAccount.password)
                        if(comparePassword){
                            let createToken = await jwt.sign({ findAccount }, process.env.JWTKEY)
                            return res.status(HttpStatusCodes.OK).json({ token: createToken, data: findAccount, msg: "Login sucess",statusCode:200 })
                        }
                        else{
                            return res.status(HttpStatusCodes["Unauthorized"]).json({msg: "Invalid Credentials",data:null,statusCode:HttpStatusCodes["Unauthorized"] })
                        }
                    }
                    else{
                        return res.status(HttpStatusCodes["Not Acceptable"]).json({msg: "Account Not Verified",data:null,statusCode:HttpStatusCodes["Not Acceptable"] })
                    }
                }
    
            }
        }
        else{
            return res.status(HttpStatusCodes["Not Found"]).json({ msg: "loginType should be email or phoneNumber",data:null,statusCode:HttpStatusCodes["Not Found"] })
        }
    }
    catch (error) {
        console.log(error)
        return res.status(HttpStatusCodes["Internal Server Error"]).json({ msg: "Unexpected error" })
    }  
}

const getUser = async (req,res) =>{
    try {
        let res = await accountModel.findById(req.params.id)
        if(res){
            return res.status(200).json({msg:null,data:res,statusCode:200})
        }
        else{
            return res.status(404).json({msg:"Invalid Id",data:null,statusCode:404})

        }
    } 
    catch (error) {
        console.log(error,'error')
    }
}



module.exports = { registerAccount, verifyOtp,resendOtp,loginAccount,forgetPassword,changePassword ,getUser}