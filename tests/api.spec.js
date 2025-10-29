import test from "playwright/test";
const axios = require("axios");


test('Test login -->  API',  async ({ page })=>{
// Cutomer OTP Request
try {
const otpResponse = await axios.post("https://apigw-rdp.honebi.online/gateway/authentication/customer/otp",{
    mobile:"9392477974",
    business_unit_id:"e6cfb4c8-b157-4039-9369-ec64b00dd0f7"
})



 const OTP = otpResponse.data.data?.otp;
 console.log('OTP :',OTP);


 // Verify OTP
    const verifyResponse = await axios.post("https://apigw-rdp.honebi.online/gateway/authentication/customer/verify",{
    mobile:"9392477974",
    otp:OTP,
    business_unit_id:"e6cfb4c8-b157-4039-9369-ec64b00dd0f7"
    })

    const verifyOTP = verifyResponse.data;
    console.log(verifyOTP);
    return verifyResponse;  


} catch (error) {
    console.error(error);
}  

})