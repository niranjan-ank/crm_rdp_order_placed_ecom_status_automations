require('dotenv').config();
const axios = require('axios');
const crm = require('../../data/crmData');
const { Headers } = require('./apiConfig');
const { userLogin } = require('./login_api');
const { addPaymentTransactionToOrder } = require('./payment_transaction_api');

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

    const orderData = response.data;

    // ✅ Check order payment status dynamically
    const paymentMode = orderData?.data?.payment_mode;
    const paymentStatus = orderData?.data?.payment_status;

    console.log(`🔍 Payment Mode: ${paymentMode}, Payment Status: ${paymentStatus}`);

    // ✅ Add payment only if it's not completed
    if (paymentStatus !== 'completed' && paymentStatus !== 'paid') {
      console.log("💳 Adding payment since it's unpaid or pending...");
      const paymentResponse = await addPaymentTransactionToOrder(orderData);
      console.log("✅ Payment Transaction Added:", paymentResponse);
    } else {
      console.log("✅ Payment already completed");
    }

    return orderData;

  } catch (error) {
    console.error(
      '❌ Error fetching specific sales order:',
      error.response?.data || error.message
    );
  }
}

module.exports = { salesOrderOneByCode };
