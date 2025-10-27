    // pages/LoginPage.js
    const { BasePage } = require('./BasePage');
    const crmData = require('../data/crmData');
    const crm = require('./locators/crm_locators');

    class LoginPage extends BasePage {
    async navigateToLogin() {
        await this.navigateTo(crmData.BASE_URL);
    }

    async login() {
        await this.type(crm.loginIdInput, crmData.ADMIN_USER);
        await this.type(crm.passwordInput, crmData.ADMIN_PASSWORD);
        await this.click(crm.loginButton);
    }

    }

    module.exports = { LoginPage };
