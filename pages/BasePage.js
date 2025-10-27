const { expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

class BasePage {
  constructor(page, testInfo) {
    this.page = page;
    this.testInfo = testInfo;
  }

  async navigateTo(url) {
    await this.page.goto(url);
  }

  getElement(selector) {
    return this.page.locator(selector);
  }

  async click(selector) {
    await this.getElement(selector).click();
  }

  async type(selector, text,) {
    await this.getElement(selector).fill(text);
  }

  async pressKey(selector, key) {
    await this.getElement(selector).press(key);
  }

  async waitForElement(selector) {
    await this.getElement(selector).waitFor({ state: 'visible' });
  }

  async isVisible(selector) {
    return await this.getElement(selector).isVisible();
  }

  async isEnabled(selector) {
    return await this.getElement(selector).isEnabled();
  }

  async getText(selector) {
    return await this.getElement(selector).innerText();
  }

  async assertText(selector, expected) {
    await expect(this.getElement(selector)).toHaveText(expected);
  }

  async assertVisible(selector) {
    await expect(this.getElement(selector)).toBeVisible();
  }

  async selectOption(selector, value) {
    await this.getElement(selector).selectOption(value);
  }

  async check(selector) {
    const element = this.getElement(selector);
    if (!(await element.isChecked())) {
      await element.check();
    }
  }

  async uncheck(selector) {
    const element = this.getElement(selector);
    if (await element.isChecked()) {
      await element.uncheck();
    }
  }

  async closeModal(modalSelector, closeButtonSelector) {
    if (await this.isVisible(modalSelector)) {
      await this.click(closeButtonSelector);
      await this.page.waitForSelector(modalSelector, { state: 'hidden' });
    }
  }

  async dragAndDrop(sourceSelector, targetSelector) {
    const source = this.getElement(sourceSelector);
    const target = this.getElement(targetSelector);
    await source.dragTo(target);
  }

  async takeScreenshot(name) {
  const filePath = path.join(process.cwd(), `reports/${name}.png`);
  const buffer = await this.page.screenshot({ path: filePath, fullPage: true });

  if (this.testInfo) {
    await this.testInfo.attach(`Screenshot - ${name}`, {
      body: buffer,               
      contentType: 'image/png',
    });
  }
  console.log(`📸 Screenshot saved & attached: ${filePath}`);
}


async saveVideo(testName) {
  const videoPath = await this.page.video()?.path();
  if (videoPath) {
    const reportsDir = path.join(process.cwd(), 'reports/videos');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }
    const newPath = path.join(reportsDir, `${testName}.webm`);
    fs.copyFileSync(videoPath, newPath);

    if (this.testInfo) {
      const videoBuffer = fs.readFileSync(newPath);
      await this.testInfo.attach(`Video - ${testName}`, {
        body: videoBuffer,        
        contentType: 'video/webm',
      });
    }
    console.log(`🎥 Video saved & attached: ${newPath}`);
  }
}
 
}

module.exports = { BasePage };
