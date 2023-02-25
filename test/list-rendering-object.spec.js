import { expect } from 'chai';

import { common_before, common_beforeEach, common_after, common_afterEach, gotoExampleFile } from '../utils/test-utils.mjs';

describe('E2E: List Rendering Objects', () => {
  let browser, context, page;

  before(async () => {
    browser = await common_before();
  });

  beforeEach(async () => {
    const props = await common_beforeEach(browser, true);
    page = props.page;
    context = props.context;
    await gotoExampleFile(page, 'list-rendering-object');
  });

  afterEach(async () => {
    await common_afterEach(true, { page, context });
  });

  after(async () => {
    await common_after(browser);
  });

  it('should have 2 child li element', async () => {
    const expectedNumOfChildren = 2;

    const numOfChildren = await page.evaluate(() => {
      return document.querySelector('#people').children.length;
    });

    expect(numOfChildren).to.equal(expectedNumOfChildren);

    const lastChildIndex = await page.evaluate(() => document.querySelectorAll('#people li:last-child div')[0].innerText);
    const lastChildName = await page.evaluate(() => document.querySelectorAll('#people li:last-child div')[1].innerText);
    const lastChildAge = await page.evaluate(() => document.querySelectorAll('#people li:last-child div')[2].innerText);

    expect(lastChildIndex).to.equal('Index: 1');
    expect(lastChildName).to.equal('Name: Jane');
    expect(lastChildAge).to.equal('Age: 21');
  });

  it('should have 3 child li element after clicking the add button', async () => {
    const expectedNumOfChildren = 3;

    await page.type('#name', 'Test');
    await page.type('#age', '99');
    await page.click('#btn-add');
    await page.waitForSelector('li');

    const numOfChildren = await page.evaluate(() => {
      return document.querySelector('#people').children.length;
    });

    expect(numOfChildren).to.equal(expectedNumOfChildren);
    
    const lastChildIndex = await page.evaluate(() => document.querySelectorAll('#people li:last-child div')[0].innerText);
    const lastChildName = await page.evaluate(() => document.querySelectorAll('#people li:last-child div')[1].innerText);
    const lastChildAge = await page.evaluate(() => document.querySelectorAll('#people li:last-child div')[2].innerText);

    expect(lastChildIndex).to.equal('Index: 2');
    expect(lastChildName).to.equal('Name: Test');
    expect(lastChildAge).to.equal('Age: 99');
  });

  it('should have 1 child li element after clicking the remove button', async () => {
    const expectedNumOfChildren = 1;

    await page.click('#btn-remove');
    await page.waitForSelector('li');

    const numOfChildren = await page.evaluate(() => {
      return document.querySelector('#people').children.length;
    });

    expect(numOfChildren).to.equal(expectedNumOfChildren);
    
    const lastChildIndex = await page.evaluate(() => document.querySelectorAll('#people li:last-child div')[0].innerText);
    const lastChildName = await page.evaluate(() => document.querySelectorAll('#people li:last-child div')[1].innerText);
    const lastChildAge = await page.evaluate(() => document.querySelectorAll('#people li:last-child div')[2].innerText);

    expect(lastChildIndex).to.equal('Index: 0');
    expect(lastChildName).to.equal('Name: John');
    expect(lastChildAge).to.equal('Age: 20');
  });
});