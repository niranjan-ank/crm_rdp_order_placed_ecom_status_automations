require('dotenv').config();

const crm = {
  // Login
  BASE_URL: process.env.BASE_URL,
  ADMIN_USER: process.env.CRM_USER,
  ADMIN_PASSWORD: process.env.CRM_PASSWORD,
  ORDERS_PAGE_URL :process.env.ORDER_PAGE_URL,
  CRM_SALES_ORDER_API :process.env.SALES_ORDER_API,
  CRM_SALES_ORDER_ONE_API :process.env.SALES_ORDER_ONE_API,
};

module.exports = crm;
