const { salesOrdersList } = require('./sales_orders_api');
const { DashboardPage } = require('../../pages/dashboard');

async function verifyAndSearchOrder(orderId, page) {
  // Step 1: Call the API
  console.log(`🔍 Checking if order ${orderId} exists in API...`);
  const orderExists = await salesOrdersList(orderId);

  if (orderExists) {
    console.log(`✅ Order ${orderId} found. Proceeding with UI search...`);
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.searchOrder('ORD10169');
  } else {
    console.error(`❌ Order ${orderId} not found in API. Skipping UI step.`);
  }
}
module.exports = { verifyAndSearchOrder };
