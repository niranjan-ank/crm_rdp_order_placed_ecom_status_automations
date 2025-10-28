require('dotenv').config();
const axios = require('axios');
const crm = require('../../data/crmData');
const { Headers } = require('./apiConfig');
const { userLogin } = require('./login_api');

async function salesOrderOneByCode(id = '') {
  try {
    const token = await userLogin();
    const headers = Headers(token);

    const payload = { id }; 
    const response = await axios.post(
      crm.CRM_SALES_ORDER_ONE_API,
      payload,
      { headers }
    );
    return response.data;

  } catch (error) {
    console.error(
      '❌ Error fetching specific sales order:',
      error.response?.data || error.message
    );
  }
}

module.exports = { salesOrderOneByCode };
