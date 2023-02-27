import { expect } from 'chai';

import { common_before, common_beforeEach, common_after, common_afterEach, gotoExampleFile } from '../utils/test-utils.mjs';

const INCOGNITO_MODE = true;
const EXAMPLE_FILE_NAME = 'data-binding-mustache';

describe('E2E: Data Binding Simple', () => {
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

  it('should say "Hello my friend, World !!!"', async () => {
    const expected = 'Hello my friend, World !!!';

    const text = await page.evaluate(() => {
      return document.querySelector('#direct-bind').innerText;
    });

    expect(text).to.equal(expected);
  });

  it('should say "Hello my friend, Test !!!" after clicking the button', async () => {
    const expected = 'Hello my friend, Test !!!';

    await page.type('#name', 'Test');
    await page.click('#btn-sayHello');

    const text = await page.evaluate(() => {
      return document.querySelector('#direct-bind').innerText;
    });

    expect(text).to.equal(expected);
  });

  it('should say "Hello to you World !!!, have a nice day."', async () => {
    const expectedDivText = 'Hello to you World !!!, have a nice day.';
    const expectedSpanText = 'to you World !!!';

    const divText = await page.evaluate(() => {
      return document.querySelector('#neasted-bind').innerText;
    });

    const spanText = await page.evaluate(() => {
      return document.querySelector('#neasted-bind span').innerText;
    });

    expect(divText).to.equal(expectedDivText);
    expect(spanText).to.equal(expectedSpanText);
  });

  it('should say "Hello to you Test !!!, have a nice day." after clicking the button"', async () => {
    const expectedDivText = 'Hello to you Test !!!, have a nice day.';
    const expectedSpanText = 'to you Test !!!';

    await page.type('#name', 'Test');
    await page.click('#btn-sayHello');

    const divText = await page.evaluate(() => {
      return document.querySelector('#neasted-bind').innerText;
    });

    const spanText = await page.evaluate(() => {
      return document.querySelector('#neasted-bind span').innerText;
    });

    expect(divText).to.equal(expectedDivText);
    expect(spanText).to.equal(expectedSpanText);
  });

});