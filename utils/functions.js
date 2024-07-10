const { getDownloadURL, ref, uploadBytes } = require("@firebase/storage");
const { storage } = require("../config/firebase");
const { sendSignupTemplate } = require("./template");
const nodeMailer = require("nodemailer")

module.exports = {

    generateSixDigitCode:() => {
        return Math.floor(100000 + Math.random() * 900000);
    },
    getCurrentTimePlusFiveMinutes:()=> {
        const currentTime = new Date();
        const expiryTime = new Date(currentTime.getTime() + 5 * 60000); // 5 minutes in milliseconds
        return expiryTime;
    },
    isOtpValid:(expiryTime)=>{
        const currentTime = new Date();
        const expiryTimeUTC = new Date(expiryTime).toISOString();
        const currentTimeUTC = currentTime.toISOString();
        console.log(currentTimeUTC, 'current UTC');
        console.log(expiryTimeUTC, 'expiry UTC');
        return currentTimeUTC <= expiryTimeUTC;
    },
    sendSignUpEmail: async (email,otp) => {
        try {
            let transporter = await nodeMailer.createTransport({ host: "smtp.gmail.com", port: 465, secure: true, auth: { user: process.env.EMAIL_ADMIN, pass: process.env.EMAIL_ADMIN_PASSWORD, }, });
            let html = sendSignupTemplate(otp);
            mailOptions = { from: "Wikki <no-reply@wiki.com>", to: email, subject: "Wikki Account Verification", html: html, };
            await transporter.sendMail(mailOptions);
            console.log("Email Send Sucesfully")
            return true
        }
        catch (err) {
            console.log(`error in sending email`, err)
        }
    },
    uploadFile:(async(file)=>{
        const uniqueFilename = `${file.originalname}-${Date.now()}`;
        const storageRef = ref(storage, `${uniqueFilename}`);
        await uploadBytes(storageRef, file.buffer);
        const result= await getDownloadURL(storageRef);
        let downloadUrl=result;
        return downloadUrl
    }),

}



