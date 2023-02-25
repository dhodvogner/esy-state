import { expect } from 'chai';

import { common_before, common_beforeEach, common_after, common_afterEach, gotoExampleFile } from '../utils/test-utils.mjs';

describe('E2E: Data Binding Simple', () => {
  let browser, context, page;

  before(async () => {
    browser = await common_before();
  });

  beforeEach(async () => {
    const props = await common_beforeEach(browser, true);
    page = props.page;
    context = props.context;
    await gotoExampleFile(page, 'data-binding-simple');
  });

  afterEach(async () => {
    await common_afterEach(true, { page, context });
  });

  after(async () => {
    await common_after(browser);
  });

  it('should say "Hello World!"', async () => {
    const expected = 'Hello World!';

    const text = await page.evaluate(() => {
      return document.querySelector('#direct-bind').innerText;
    });

    expect(text).to.equal(expected);
  });

  it('should say "Hello Test!" after clicking the button', async () => {
    const expected = 'Hello Test!';

    await page.type('#name', 'Test');
    await page.click('#btn-sayHello');

    const text = await page.evaluate(() => {
      return document.querySelector('#direct-bind').innerText;
    });

    expect(text).to.equal(expected);
  });

  it('should say "Hello Hello World!"', async () => {
    const expectedDivText = 'Hello Hello World!';
    const expectedSpanText = 'Hello World!';

    const divText = await page.evaluate(() => {
      return document.querySelector('#neasted-bind').innerText;
    });

    const spanText = await page.evaluate(() => {
      return document.querySelector('#neasted-bind span').innerText;
    });

    expect(divText).to.equal(expectedDivText);
    expect(spanText).to.equal(expectedSpanText);
  });

  it('should say "Hello Hello Test!" after clicking the button"', async () => {
    const expectedDivText = 'Hello Hello Test!';
    const expectedSpanText = 'Hello Test!';

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