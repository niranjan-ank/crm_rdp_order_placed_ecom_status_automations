require('dotenv').config();
const axios = require('axios');
const crm = require('../data/crmData');
const { Headers, Payload } = require('../utils/apiConfig');
const { userLogin } = require('./login_api');

async function salesOrdersList(searchValue = "") {
  try {
    const token = await userLogin();
    const headers = Headers(token);

    const Sales_Orders_Payload ={
          ...Payload,
             search :{
                ...Payload.search,
                 value:searchValue,
             }
    }

    const response = await axios.post(crm.CRM_SALES_ORDER_API, Sales_Orders_Payload, { headers });

    // Ruturn true if order is found, else false
    const orders = response.data.data || [];
    const orderFound = orders.some(orders => orders.code === searchValue);
    return orderFound;

    // console.log("✅ Sales Orders List Response:", response.data);


  } catch (error) {
    console.error("❌ Error fetching sales orders:", error.response?.data || error.message);
  }
}

module.exports = { salesOrdersList };
