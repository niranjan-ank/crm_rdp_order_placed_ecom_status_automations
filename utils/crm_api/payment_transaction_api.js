const axios = require('axios');
const crm = require('../../data/crmData');
const { userLogin } = require('./login_api');
const { Headers } = require('./apiConfig');

async function addPaymentTransactionToOrder(orderDetails) {
  try {
    const token = await userLogin();
    const headers = Headers(token);

    // ✅ Dynamic payload creation
    const payload = {
      sales_order_id: orderDetails.data?.id,
      sales_order_code: orderDetails.data?.code,
      payment_amount:orderDetails.data?.net_payable_amount ?? 0,
      transaction_method: orderDetails.data?.payment_mode === "offline" ? "digital" : orderDetails.data?.payment_mode,
      payment_reference: `RDPAY${Math.floor(Math.random() * 1000000)}`
    };

    console.log("💳 Adding Payment Transaction:", payload);

    const response = await axios.post(
      crm.CRM_SALES_ORDER_ADD_PAYMENT_TRANSACTION,
      payload,
      { headers }
    );

    console.log("✅ Payment Transaction Added Successfully");
    return response.data;

  } catch (error) {
    console.error("❌ Error adding payment transaction:", error.response?.data || error.message);
  }
}

module.exports = { addPaymentTransactionToOrder };
