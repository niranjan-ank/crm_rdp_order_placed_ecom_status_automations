require("dotenv").config();
const { expect } = require("playwright/test");
const { BasePage } = require("./BasePage");
const crm = require('./locators/crm_locators');

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

    await expect(orderCell).toBeVisible({ timeout: 15000 });

    await orderCell.click();
  }
}

module.exports = { DashboardPage };
