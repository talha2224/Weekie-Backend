const router = require("express").Router()
const { registerAccount, verifyOtp, resendOtp,loginAccount,forgetPassword,changePassword} = require("../services/accountService")


router.post("/register",registerAccount)
router.post("/verify/otp",verifyOtp)
router.post("/resend/otp",resendOtp)

router.post("/login",loginAccount)
router.post("/forget/password",forgetPassword)
router.post("/change/password",changePassword)

router.get("/get/single/:id",changePassword)





module.exports = router


