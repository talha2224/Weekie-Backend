const { proceedPayment, getSession } = require("../services/paymentService")

const router = require("express").Router()


router.post("/create-checkout-session",proceedPayment)
router.get("/get-payment-session",getSession)
// router.post("/create-checkout-session")

module.exports = router