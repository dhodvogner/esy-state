import { expect } from 'chai';

import { common_before, common_beforeEach, common_after, common_afterEach, gotoExampleFile } from '../utils/test-utils.mjs';

const INCOGNITO_MODE = false;
const EXAMPLE_FILE_NAME = 'html-import';

describe('E2E: Importing Partials', () => {
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

  const expected = 'Hello World!';

  it('should say "Hello World!" (body)', async () => {

    await page.waitForNetworkIdle();

    const element = await page.evaluate(() => document.querySelector('body h1.import-test'));
    expect(element).not.to.be.null;

    const text = await page.evaluate(() => document.querySelector('body h1.import-test').innerText);
    expect(text).to.equal(expected);
  });

  it('should say "Hello World!" (neasted)', async () => {
    await page.waitForNetworkIdle();

    const element = await page.evaluate(() => document.querySelector('#neasted h1.import-test'));
    expect(element).not.to.be.null;

    const text = await page.evaluate(() => document.querySelector('#neasted h1.import-test').innerText);
    expect(text).to.equal(expected);
  });
});