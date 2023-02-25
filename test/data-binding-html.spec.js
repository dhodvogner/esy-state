import { expect } from 'chai';

import { common_before, common_beforeEach, common_after, common_afterEach, gotoExampleFile } from '../utils/test-utils.mjs';

describe('E2E: Data Binding Html', () => {
  let browser, context, page;

  before(async () => {
    browser = await common_before();
  });

  beforeEach(async () => {
    const props = await common_beforeEach(browser, true);
    page = props.page;
    context = props.context;
    await gotoExampleFile(page, 'data-binding-html');
  });

  afterEach(async () => {
    await common_afterEach(true, { page, context });
  });

  after(async () => {
    await common_after(browser);
  });

  it('should say "Hello World!"', async () => {
    const expected = 'Hello <b>World</b>!';

    const text = await page.evaluate(() => {
      return document.querySelector('#html-bind').innerHTML;
    });

    expect(text).to.equal(expected);
  });

  it('should say "Hello Test!" after clicking the button', async () => {
    const expected = 'Hello <b>Test</b>!';

    await page.evaluate(() => {
      document.querySelector('#html').value = '';
    });
    await page.type('#html', 'Hello <b>Test</b>!');
    await page.click('#btn-update');

    const text = await page.evaluate(() => {
      return document.querySelector('#html-bind').innerHTML;
    });

    expect(text).to.equal(expected);
  });
});