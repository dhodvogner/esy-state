import { expect } from 'chai';

import { common_before, common_beforeEach, common_after, common_afterEach, gotoExampleFile, makeScreenshot } from '../utils/test-utils.mjs';

const INCOGNITO_MODE = false;
const EXAMPLE_FILE_NAME = 'state-persistence';

describe('E2E: State Persistence', () => {
  let browser, context, page;

  before(async () => {
    browser = await common_before();
  });

  beforeEach(async () => {
    const props = await common_beforeEach(browser, INCOGNITO_MODE);
    page = props.page;
    context = props.context;
    await gotoExampleFile(page, EXAMPLE_FILE_NAME);
  });

  afterEach(async () => {
    await common_afterEach(INCOGNITO_MODE, { page, context });
  });

  after(async () => {
    await common_after(browser);
  });

  it('should have 0 child li element', async () => {
    const expectedNumOfChildren = 0;

    const numOfChildren = await page.evaluate(() => {
      return document.querySelector('#persistant-people').children.length;
    });

    expect(numOfChildren).to.equal(expectedNumOfChildren);
  });

  it('should have 1 child li element after reload', async () => {
    await page.type('#name', 'Test');
    await page.type('#age', '99');
    await page.click('#btn-add');
    await page.waitForSelector('li');
    await page.reload();

    const numOfChildren = await page.evaluate(() => {
      return document.querySelector('#persistant-people').children.length;
    });

    expect(numOfChildren).to.equal(1);
    
    const lastChildIndex = await page.evaluate(() => document.querySelectorAll('#persistant-people li:last-child div')[0].innerText);
    const lastChildName = await page.evaluate(() => document.querySelectorAll('#persistant-people li:last-child div')[1].innerText);
    const lastChildAge = await page.evaluate(() => document.querySelectorAll('#persistant-people li:last-child div')[2].innerText);

    expect(lastChildIndex).to.equal('Index: 0');
    expect(lastChildName).to.equal('Name: Test');
    expect(lastChildAge).to.equal('Age: 99');
  });

  it('should say "Not persistant string" after reload', async () => {
    let text;

    await page.type('#inp-not-persistant-str', 'Testing...');
    await page.click('#btn-setString');

    text = await page.evaluate(() => {
      return document.querySelector('#not-persistant-string').innerText;
    });

    expect(text).to.equal('Testing...');

    await page.reload();

    text = await page.evaluate(() => {
      return document.querySelector('#not-persistant-string').innerText;
    });

    expect(text).to.equal('Not persistant string');
  });

  it('should be empty after clear', async () => {
    await page.type('#inp-not-persistant-str', 'Testing...');
    await page.click('#btn-setString');

    await page.type('#name', 'Test');
    await page.type('#age', '99');
    await page.click('#btn-add');

    //await page.screenshot({ path: `test/screens/before-reload.png`, type: 'png' });

    await page.reload();

    //await page.screenshot({ path: `test/screens/after-reload.png`, type: 'png' });

    await page.click('#btn-clear');
    await page.reload();

    //await page.screenshot({ path: `test/screens/after-clear-reload.png`, type: 'png' });

    const numOfChildren = await page.evaluate(() => {
      return document.querySelector('#persistant-people').children.length;
    });

    const text = await page.evaluate(() => {
      return document.querySelector('#not-persistant-string').innerText;
    });

    expect(text).to.equal('Not persistant string');
    expect(numOfChildren).to.equal(0);
  });
});