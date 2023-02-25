import { expect } from 'chai';

import { common_before, common_beforeEach, common_after, common_afterEach, gotoExampleFile } from '../utils/test-utils.mjs';

describe('E2E: List Rendering Array', () => {
  let browser, context, page;

  before(async () => {
    browser = await common_before();
  });

  beforeEach(async () => {
    const props = await common_beforeEach(browser, true);
    page = props.page;
    context = props.context;
    await gotoExampleFile(page, 'list-rendering-array');
  });

  afterEach(async () => {
    await common_afterEach(true, { page, context });
  });

  after(async () => {
    await common_after(browser);
  });

  it('should say "1,2,3,4,5"', async () => {
    const expected = '<li %arr="">1</li><li %arr="">2</li><li %arr="">3</li><li %arr="">4</li><li %arr="">5</li>';

    const text = await page.evaluate(() => {
      return document.querySelector('#numbers').innerHTML;
    });

    expect(text).to.equal(expected);
  });

  it('should say "1,2,3,4,5,6" after clicking the add button', async () => {
    const expected = '<li %arr="">1</li><li %arr="">2</li><li %arr="">3</li><li %arr="">4</li><li %arr="">5</li><li %arr="">6</li>';

    await page.click('#btn-add');

    const text = await page.evaluate(() => {
      return document.querySelector('#numbers').innerHTML;
    });
    expect(text).to.equal(expected);
  });

  it('should say "1,2,3,4" after clicking the remove button', async () => {
    const expected = '<li %arr="">1</li><li %arr="">2</li><li %arr="">3</li><li %arr="">4</li>';

    await page.click('#btn-remove');

    const text = await page.evaluate(() => {
      return document.querySelector('#numbers').innerHTML;
    });
    expect(text).to.equal(expected);
  });
});