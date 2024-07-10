const mongoose = require('mongoose');


const accountSchema = mongoose.Schema({
    registerType:{type:String,required:[true,"Register Type Should Be Email Or Login"]},
    email:{type:String,default:null},
    phoneNumber:{type:String,default:null},
    password:{type:String,required:[true,"Password Is Required"]},
    accountVerified:{type:Boolean,default:false},
    otp:{type:String,default:null},
    expireAt:{type:String,default:null},
    otpVerified:{type:Boolean,default:false}
})

const Accounts = mongoose.model("Accounts",accountSchema,"Accounts")

module.exports = Accounts