// pages/statusFlow.js
const crm = require('./locators/crm_locators');
const { salesOrdersList } = require('../api/sales_orders_list');

const locators = {
  changeStatusButton: 'button:has-text("Change Status")',
  statusDropdown: '.\\!min-h-\\[24px\\].\\!px-4.\\!w-full',
  confirmButton: 'button:has-text("Confirm")',
  updateButton: 'button:has-text("Update")',


};

async function updateOrderStatus(page, orderCode) {
  const orderDetails = await salesOrdersList(orderCode);
  const currentStatus = orderDetails?.status?.status_label;
  const allowedStatuses = orderDetails?.status?.allowed_statuses || [];

  if (!currentStatus) {
    console.log(`❌ Could not find status for order ${orderCode}`);
    return;
  }

  console.log(`📦 Current Status: ${currentStatus}`);

  if (currentStatus === "DELIVERED") {
    console.log(`✅ Order ${orderCode} already delivered!`);
    return;
  }

  // Loop through each allowed status from API
  for (const nextStatus of allowedStatuses) {
    const nextLabel = nextStatus.status_label;

    console.log(`➡️ Next allowed status: ${nextLabel}`);

    // Check if locator exists for this status
    const locator = locators.crm.options[nextLabel];
    if (!locator) {
      console.log(`⚠️ Locator not found for status: ${nextLabel}`);
      continue;
    }

    // UI Flow to change status
    await page.click(locators.changeStatusButton);
    await page.locator(locators.statusDropdown).click();
    await page.locator(locator).click();
    await page.click(locators.confirmButton);
    await page.click(locators.updateButton);

    console.log(`✅ Status changed to ${nextLabel}`);

    // Fetch updated order details from API after each change
    const updatedDetails = await salesOrdersList(orderCode);
    const newStatus = updatedDetails?.status?.status_label;

    console.log(`🔄 API confirms new status: ${newStatus}`);

    // Continue until delivered
    if (newStatus === "DELIVERED") {
      console.log(`🎉 Final Status: DELIVERED - process completed!`);
      break;
    }
  }
}

module.exports = { updateOrderStatus };
