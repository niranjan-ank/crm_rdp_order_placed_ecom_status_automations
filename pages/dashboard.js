require("dotenv").config();
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
}

module.exports = { DashboardPage };
