
module.exports = {
  
  sendSignupTemplate: (otp) => {
    console.log(otp, 'otp in send signup template file')
    return `
      Verify your account your otp is  ${otp}
      `
  }
}