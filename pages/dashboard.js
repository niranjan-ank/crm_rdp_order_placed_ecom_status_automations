require("dotenv").config();
const { expect } = require("playwright/test");
const { BasePage } = require("./BasePage");
const crm = require("./locators/crm_locators");
const { salesOrdersList } = require("../utils/crm_api/sales_orders_api");

const locators = {
  changeStatusButton: 'button:has-text("Change Status")',
  statusDropdown: '.\\!min-h-\\[24px\\].\\!px-4.\\!w-full',
  confirmButton: 'button:has-text("Confirm")',
  updateButton: 'button:has-text("Update")',
  options: {
    "PENDING": 'role=option[name="PENDING"]',
    "ACCEPTED": 'role=option[name="ACCEPTED"]',
    "PICKER ASSIGNED": 'role=option[name="PICKER ASSIGNED"]',
    "PICKING & PACKING": 'role=option[name="PICKING & PACKING"]',
    "PICKING COMPLETED": 'role=option[name="PICKING COMPLETED"]',
    "READY FOR DELIVERY": 'role=option[name="READY FOR DELIVERY"]',
    "DELIVERY ASSIGNED": 'role=option[name="DELIVERY ASSIGNED"]',
    "IN-TRANSIT": 'role=option[name="IN-TRANSIT"]',
    "DELIVERED": 'role=option[name="DELIVERED"]',
    "REJECTED": 'role=option[name="REJECTED"]'
  }
};

class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
  }

  async Order() {
    await this.page.goto(process.env.ORDER_PAGE_URL);
  }

  async OrdersView() {
    await this.page.click(crm.ordersView);
  }

  async searchOrder(orderId) {
    await this.page.fill(crm.searchInput, orderId);
  }

  async waitForOrderIdHeader() {
    await expect(this.page.locator(crm.orderIdHeader)).toBeVisible({ timeout: 10000 });
  }

  async OrderId(orderId) {
    await this.waitForOrderIdHeader();
    const orderLocator = crm.orderIdCell(orderId);
    const orderCell = this.page.locator(orderLocator);
    await orderCell.click();
  }

  async getOrdersChangeStatus() {
    await this.page.click(crm.changeStatusButton);
  }



async processOrderStatusFlow(orderCode) {
 let orderDetails = await salesOrdersList(orderCode);
// console.log(orderDetails);

if (!orderDetails?.status && !orderDetails?.data?.status) {
  console.log(`❌ Could not fetch status for order: ${orderCode}`);
  return;
}
``
let currentStatus = orderDetails.data?.status?.status_label;
console.log(`📦 Current Status: ${currentStatus}`);

if (currentStatus === "DELIVERED") {
  console.log(`✅ Order ${orderCode} already delivered!`);
  return;
}

while (currentStatus !== "DELIVERED") {
  const allowedStatuses = orderDetails.data?.status?.allowed_statuses || [];

  if (!allowedStatuses.length) {
    console.log(`⚠️ No allowed next statuses found for ${currentStatus}`);
    break;
  }

  const nextStatus = allowedStatuses[0]?.status_label;
  const locator = locators.options[nextStatus];

  if (!locator) {
    console.log(`⚠️ Locator not found for next status: ${nextStatus}`);
    break;
  }

  console.log(`➡️ Changing status to: ${nextStatus}`);

  await this.page.waitForSelector(locators.changeStatusButton);

 await this.page.waitForSelector(locators.statusDropdown, { state: 'visible'});
 await this.page.click(locators.statusDropdown);

  await this.page.waitForSelector(locator, { timeout: 5000 });
  await this.page.locator(locator).click();

  await this.page.waitForSelector(locators.confirmButton, { timeout: 5000 });
  await this.page.click(locators.confirmButton);

  await this.page.waitForTimeout(1000);

  await this.page.waitForSelector(locators.updateButton, { timeout: 5000 });
  await this.page.click(locators.updateButton);

  await this.page.waitForTimeout(3000);

  await this.page.click(locators.changeStatusButton);

  orderDetails = await salesOrdersList(orderCode);
  currentStatus = orderDetails.data?.status?.status_label;

  console.log(`✅ Updated Status: ${currentStatus}`);

  if (currentStatus === "DELIVERED") {
    console.log(`🎉 Final Status: DELIVERED - Process completed!`);
    break;
  }
}
}
}


module.exports = { DashboardPage };
