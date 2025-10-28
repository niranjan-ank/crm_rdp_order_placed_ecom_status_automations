require('dotenv').config();
const axios = require('axios');
const crm = require('../../data/crmData');
const { Headers, Payload } = require('./apiConfig');
const { userLogin } = require('./login_api');
const { salesOrderOneByCode } = require('./sales_orders_one');

async function salesOrdersList(searchValue = "") {
  try {
    const token = await userLogin();
    const headers = Headers(token);

    // Step 1: Call sales order list API
    const Sales_Orders_Payload = {
      ...Payload,
      search: {
        ...Payload.search,
        value: searchValue,
      },
    };

    const response = await axios.post(
      crm.CRM_SALES_ORDER_API,
      Sales_Orders_Payload,
      { headers }
    );

    const orders = response.data?.data || [];

    if (!orders.length) {
      console.log(`❌ No sales orders found.`);
      return;
    }

    // Step 2: Find the order by order code
    const matchedOrder = orders.find(order => order.code === searchValue);

    if (!matchedOrder) {
      console.log(`❌ Order code "${searchValue}" not found.`);
      return;
    }

    const orderId = matchedOrder.id;
    console.log(`✅ Found Order: ${searchValue} → ID: ${orderId}`);

    // Step 3: Call Sales Order One API with the ID
    const orderDetails = await salesOrderOneByCode(orderId);

    console.log("📦 Sales Order One Response:", orderDetails);
    return orderDetails;

  } catch (error) {
    console.error("❌ Error fetching sales orders:", error.response?.data || error.message);
  }
}

module.exports = { salesOrdersList };
