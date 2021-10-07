const pdf = require('./utils/pdf');
const screenshot = require('./utils/screenshot');
const linkScrapeTool = require('./utils/linkScrape')

// we're using async/await - so we need an async function, that we can run
const scrape = async () => {
  const url = process.argv[2];

  // Generate filename of pdf and screenshot
  let filename: string;

  if (url.match(/58./)) {
    filename = '58'
  } else if (url.match(/douban./)) {
    filename = 'douban'
  } else if (url.match(/5i5j./)) {
    filename = '5i5j'
  } else if (url.match(/anjuke./)) {
    filename = 'anjuke'
  } else {
    filename = 'renting'
  }

  const browser = await require('./utils/browser').startBrowser();
  let page = await browser.newPage();

  // Output the user agent with current browser
  // const currentUserAgent = await browser.userAgent()
  // console.log(`// Current user agent: ${currentUserAgent}`);

  const newUserAgent = require('random-useragent').getRandom();
  console.log(`// Set a new user agent: ${newUserAgent}.`);
  await page.setUserAgent(newUserAgent);

  // Open the page to scrape
  await page.goto(url, { waitUntil: 'load' });
  // await page.goto(url);
  // await page.waitForSelector('body');
  // await page.waitFor(60000);

  // Get the User Agent on the context of Puppeteer
  // const userAgent = await page.evaluate(() => navigator.userAgent );
  // console.log(userAgent);

  const links: any = [];
  const newLinks = await linkScrapeTool.linkScrape(page);
  links.push(...newLinks);

  // console.log(`All Links: \n`, links);
  console.log(`// Got ${links.length} links from ${url}.`);

  await pdf.saveToPDF(page, filename);
  await screenshot.saveToScreenshot(page, filename);

  // close the browser
  await browser.close();
};

// scrape the async function
scrape();