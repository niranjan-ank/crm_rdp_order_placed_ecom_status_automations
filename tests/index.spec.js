const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const fs = require('fs');
const path = require('path');
const { DashboardPage } = require('../pages/dashboard');
const { verifyAndSearchOrder } = require('../utils/crm_api/verifyAndSearchOrder');
const { userLogin } = require('../utils/crm_api/login_api');

// test.afterEach(async ({ page }, testInfo) => {
//   if (testInfo.status !== testInfo.expectedStatus) {
//     // Failed test → capture screenshot
//     const screenshotPath = path.join(__dirname, `../reports/${testInfo.title.replace(/\s+/g, "_")}.png`);
//     await page.screenshot({ path: screenshotPath, fullPage: true });

//     // Append info to a JSON file for your HTML report
//     const reportFile = path.join(__dirname, "../reports/test-results.json");
//     let reportData = [];
//     if (fs.existsSync(reportFile)) {
//       reportData = JSON.parse(fs.readFileSync(reportFile));
//     }
//     reportData.push({
//       title: testInfo.title,
//       status: testInfo.status,
//       duration: testInfo.duration,
//       screenshot: screenshotPath
//     });
//     fs.writeFileSync(reportFile, JSON.stringify(reportData, null, 2));
//   }
// });

test('CRM & Ecom Order Status Sync Test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  const token = await userLogin();
  await page.addInitScript((value) => window.localStorage.setItem('token', value), token);

  await loginPage.navigateToLogin();
  await loginPage.login();

  await dashboardPage.OrdersView();

  const orderCode = 'ORD10166';
  await verifyAndSearchOrder(orderCode, page);
  await dashboardPage.OrderId(orderCode);

  await dashboardPage.getOrdersChangeStatus();
  await dashboardPage.processOrderStatusFlow(orderCode);
  await page.waitForTimeout(2000);

  await page.close();
});

