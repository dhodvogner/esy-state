import puppeteer from 'puppeteer';

export const TEST_PORT = process.env.TEST_PORT || 9000;
export const TEST_URL = `http://localhost:${TEST_PORT}`;

export const common_before = () => {
  return new Promise((resolve, reject) => {
    puppeteer.launch().then((browser) => {
      resolve(browser);
    });
  });
};

export const common_after = (browser) => {
  return new Promise((resolve, reject) => {
    browser.close().then(() => {
      resolve();
    });
  });
};

export const common_beforeEach = (browser, useIncognito) => {
  return new Promise((resolve, reject) => {
    if (useIncognito) { // Use incognito mode to bypass localStorage
      browser.createIncognitoBrowserContext().then((ctx) => {
        let context = ctx;
        context.newPage().then((page) => {
          resolve({ page, context });
        });
      });
    } else {
      browser.newPage().then((page) => {
        resolve({ page, context: null });
      });
    }
  });
};

export const common_afterEach = (useIncognito, props) => {
  return new Promise((resolve, reject) => {
    if (useIncognito) {
      props.page.close().then(() => {
        props.context.close().then(() => {
          resolve();
        });
      });
    } else {
      props.page.close().then(() => {
        resolve();
      });
    }
  });
};

export const gotoExampleFile = (page, filename) => {
  return new Promise((resolve, reject) => {
    page.goto(`${TEST_URL}/examples/${filename}.html`).then(() => {
      resolve();
    });
  });
}

export const makeScreenshot = (page, filename) => {
  return new Promise((resolve, reject) => {
    page.screenshot({ path: `test/screens/${filename}.png`, type: 'png' }).then(() => {
      resolve();
    });
  });
}