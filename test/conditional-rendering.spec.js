import { expect } from 'chai';

import { common_before, common_beforeEach, common_after, common_afterEach, gotoExampleFile } from '../utils/test-utils.mjs';

const INCOGNITO_MODE = false;
const EXAMPLE_FILE_NAME = 'conditional-rendering';

describe('E2E: Conditional Rendering', () => {
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

  it("should be not visible when foo is TRUE (parent: body)", async () => {
    const fooTrue = await page.evaluate(() => document.querySelector('#foo-true'));
    const fooFalse = await page.evaluate(() => document.querySelector('#foo-false'));

    expect(fooTrue).to.not.be.null;
    expect(fooFalse).to.be.null;
  });

  it("should be visible when foo is FALSE (parent: body)", async () => {
    await page.click('#btn-toggle');

    const fooTrue = await page.evaluate(() => document.querySelector('#foo-true'));
    const fooFalse = await page.evaluate(() => document.querySelector('#foo-false'));

    expect(fooTrue).to.be.null;
    expect(fooFalse).to.not.be.null;
  });

  it("should be not visible when foo is TRUE (parent: element)", async () => {
    const fooTrue = await page.evaluate(() => document.querySelector('#with-parent-foo-true'));
    const fooFalse = await page.evaluate(() => document.querySelector('#with-parent-foo-false'));

    expect(fooTrue).to.not.be.null;
    expect(fooFalse).to.be.null;
  });

  it("should be visible when foo is FALSE (parent: element)", async () => {
    await page.click('#btn-toggle');

    const fooTrue = await page.evaluate(() => document.querySelector('#with-parent-foo-true'));
    const fooFalse = await page.evaluate(() => document.querySelector('#with-parent-foo-false'));

    expect(fooTrue).to.be.null;
    expect(fooFalse).to.not.be.null;
  });

  it("should keep the order 1,2,3 (parent: body)", async () => {
    let numOfElements, elementsText;
    await page.click('#btn-toggle');

    numOfElements = await page.evaluate(() => document.querySelectorAll('article').length);

    elementsText = await page.evaluate(() => {
      const elements = document.querySelectorAll('article');
      return Array.from(elements).map((el) => el.textContent);
    });

    expect(numOfElements).to.equal(2);
    expect(elementsText[0]).to.equal('1');
    expect(elementsText[1]).to.equal('3');

    await page.click('#btn-toggle');

    numOfElements = await page.evaluate(() => document.querySelectorAll('article').length);

    elementsText = await page.evaluate(() => {
      const elements = document.querySelectorAll('article');
      return Array.from(elements).map((el) => el.textContent);
    });

    expect(numOfElements).to.equal(3);
    expect(elementsText[0]).to.equal('1');
    expect(elementsText[1]).to.equal('2');
    expect(elementsText[2]).to.equal('3');
  });

  it("should keep the order 1,2,3 (parent: element)", async () => {
    let numOfElements, elementsText;
    await page.click('#btn-toggle');

    numOfElements = await page.evaluate(() => document.querySelectorAll('li').length);

    elementsText = await page.evaluate(() => {
      const elements = document.querySelectorAll('li');
      return Array.from(elements).map((el) => el.textContent);
    });

    expect(numOfElements).to.equal(2);
    expect(elementsText[0]).to.equal('1');
    expect(elementsText[1]).to.equal('3');

    await page.click('#btn-toggle');

    numOfElements = await page.evaluate(() => document.querySelectorAll('li').length);

    elementsText = await page.evaluate(() => {
      const elements = document.querySelectorAll('li');
      return Array.from(elements).map((el) => el.textContent);
    });

    expect(numOfElements).to.equal(3);
    expect(elementsText[0]).to.equal('1');
    expect(elementsText[1]).to.equal('2');
    expect(elementsText[2]).to.equal('3');
  });
});