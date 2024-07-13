const HttpStatusCodes = require("../constants/statusCode")
const { accountModel } = require("../models")
require('dotenv').config
const stripe = require('stripe')(process.env.StripeSecretKey)




const proceedPayment = async (req,res)=>{
    let {success_url,cancel_url,priceId,userId } = req.body
    try {
        const session = await stripe.checkout.sessions.create({
            success_url:success_url,
            cancel_url:cancel_url,
            line_items:[
                {price:priceId,quantity:1}
            ],
            mode:"subscription"
        })

        console.log(session,session.id,session.url)
        let sessionId = session.id
        let subscriptionType = process.env.StripeMonthly == priceId ? "Monthly" : "Annually"
        let storeSession = await accountModel.findByIdAndUpdate(userId,{sessionid:sessionId,subscriptionType})
        res.status(200).json({url:session.url})
    } 
    catch (error) {
        console.log(error)
        return error
    }
}


const getSession = async (req,res) =>{
    
    try {
        const { userId } = req.params;
        const find = await accountModel.findById(userId)  
        const user = {stripe_session_id: find.sessionid,paid_sub: find.subscribed}
    
        if(!user.stripe_session_id || user.paid_sub === true){
            return res.status(404).json({msg:"Error In Session Id"})
        }

        const session = await stripe.checkout.sessions.retrieve(user.stripe_session_id);
        console.log("session: ", session);

        // update the user
        if (session && session.status === "complete") {
          let updatedUser = await accountModel.findByIdAndUpdate(userId,{subscribed:true,subscriptionDate:Date.now()},{new:true});
          console.log(updatedUser);
          return res.status(200).json({msg:"Payment Succed",data:[updatedUser],statusCode:200});
        } 

        else {
            let updatedUser = await accountModel.findByIdAndUpdate(userId,{subscribed:false,subscriptionType:null,sessionid:null},{new:true});
            return res.status(403).json({msg:"Subscription Failed",data:[updatedUser],statusCode:403})
        }
    } 
    catch (error) {
        // handle the error
        console.error("An error occurred while retrieving the Stripe session:", error);
        return res.send("fail");
    }
}

module.exports = {proceedPayment,getSession}