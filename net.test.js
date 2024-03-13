const {
  clickElement,
  putText,
  getText,
  chooseFreePlace,
  chooseNotFreePlace,
  clickNextDate,
} = require("./lib/commands.js");
const { generateName } = require("./lib/util.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://qamid.tmweb.ru/client/index.php");
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe("Booking a place", () => {
  test("Happy path: бронирование свободного места", async () => {
    await clickNextDate(page);
    await clickElement(page, "a[data-seance-id='187']");
    await chooseFreePlace(page);
    await clickElement(page, ".acceptin-button");
    const actual = await getText(page, ".acceptin-button");
    expect(actual).toEqual("Получить код бронирования");
  }, 50000);

  test("Happy path: бронирование нескольких свободных мест", async () => {
    await clickNextDate(page);
    await clickElement(page, "a[data-seance-id='187']");
    await chooseFreePlace(page);
    await chooseFreePlace(page);
    await chooseFreePlace(page);
    await clickElement(page, ".acceptin-button");
    const actual = await getText(page, ".acceptin-button");
    expect(actual).toEqual("Получить код бронирования");
  }, 50000);

  test("Sad path: невозможно забронировать уже занятое место", async () => {
    await clickNextDate(page);
    await clickElement(page, "a[data-seance-id='187']");
    await chooseNotFreePlace(page);
    await clickElement(page, ".acceptin-button");
    const actual = await getText(page, ".acceptin-button");
    expect(actual).toEqual(
      "Выбраное место занято. Попробуйте выбрать другое место."
    );
  }, 50000);
});
