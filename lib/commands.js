module.exports = {
  clickElement: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Selector is not clickable: ${selector}`);
    }
  },
  getText: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      return await page.$eval(selector, (link) => link.textContent);
    } catch (error) {
      throw new Error(`Text is not available for selector: ${selector}`);
    }
  },
  putText: async function (page, selector, text) {
    try {
      await page.waitForSelector(selector);
      const inputField = await page.$(selector);
      await inputField.focus();
      await inputField.type(text);
      await page.keyboard.press("Enter");
    } catch (error) {
      throw new Error(`Not possible to type text for selector: ${selector}`);
    }
  },

  chooseFreePlace: async function (page) {
    try {
      const available =
        await ".buying-scheme__chair.buying-scheme__chair_standart:not(.buying-scheme__chair_disabled):not(.buying-scheme__chair_selected) ";
      await page.waitForSelector(available);
      await page.click(available);
    } catch (error) {
      throw new Error("Free space is not clickable");
    }
  },

  chooseNotFreePlace: async function (page) {
    try {
      const notAvailable = await ".buying-scheme__chair_disabled";
      await page.waitForSelector(notAvailable);
      await page.click(notAvailable);
    } catch (error) {
      throw new Error("NotFree spase is not clickable");
    }
  },

  clickNextDate: async function (page) {
    try {
      const tomorrowDate = ".page-nav__day";
      await page.waitForSelector(tomorrowDate);
      await page.click(tomorrowDate);
    } catch (error) {
      throw new Error("Selector 'tomorrowDate' is not clickable");
    }
  },
};
