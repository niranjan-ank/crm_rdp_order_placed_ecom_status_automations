// pages/login_api.js
const axios = require('axios');
const crm = require('../data/crmData');

async function userLogin() {
  try {
    const response = await axios.post(process.env.CRM_LOGIN_API, {
      login_id: crm.ADMIN_USER,
      password: crm.ADMIN_PASSWORD
    });

    const resData = response.data;
    console.log("status:", resData.status);
    console.log("login_id:", resData.data.admin.login_id);
    console.log("password:", resData.data.admin.password);
    console.log("message:", resData.message);

    return response.data; 
  } catch (error) {
    console.error("API Login failed:", error.response?.data ||  error.message);
    throw error;
  }
}

module.exports = { userLogin };
