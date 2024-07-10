const mongoose = require("mongoose")



const dbConnection = async ()=>{
    let isConnect = await mongoose.connect(process.env.MONGOURL)
    if(!isConnect){
        console.log(`Database Not Connected For Weekie`)
    }
    else{
        console.log(`Database Connection Made For Weekie`)
    }
}

module.exports = dbConnection