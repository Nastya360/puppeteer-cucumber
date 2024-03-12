const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const {
  putText,
  getText,
  clickNextDate,
  clickElement,
  chooseFreePlace,
  chooseNotFreePlace,
} = require("../../lib/commands.js");

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (string) {
  return await this.page.goto(`${string}`, {
    setTimeout: 80000,
  });
});

When("user selects tomorrow date", async function () {
  return await clickNextDate(this.page);
});
When("user selects session time", async function () {
  return await clickElement(this.page, "a[data-seance-id='187']");
});

When("user selects one free place", async function () {
  return await chooseFreePlace(this.page);
});

When("user click on the reservation button", async function () {
  return await clickElement(this.page, ".acceptin-button");
});

When("user selects one not free place", async function () {
  return await chooseNotFreePlace(this.page);
});

Then("user gets the text {string}", async function (string) {
  const actual = await getText(this.page, ".acceptin-button");
  expect(actual).contains(string);
});
