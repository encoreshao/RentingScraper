const pdf = require('./utils/pdf');
const screenshot = require('./utils/screenshot');
const linkScrapeTool = require('./utils/linkScrape')
const userAgent = require('user-agents');

// we're using async/await - so we need an async function, that we can run
const scrape = async () => {
  // Urls
  //
  // https://sh.58.com/pudongxinqu/chuzu/0/j2/
  // https://www.douban.com/group/pudongzufang/
  // https://www.douban.com/group/shanghaizufang/
  // https://www.douban.com/group/383972/
  // https://www.douban.com/group/SHwoman/
  // https://sh.5i5j.com/zufang/pudongxinqu/r2u1/
  const url = process.argv[2];

  // Generate filename of pdf and screenshot
  let filename = 'renting'
  if (url.match(/58./)) { filename = '58' }
  if (url.match(/douban./)) { filename = 'douban' }
  if (url.match(/5i5j./)) { filename = '5i5j' }

  const browser = await require('./utils/browser').startBrowser();
  let page = await browser.newPage();
  await page.setUserAgent(userAgent.toString());

  // open the page to scrape
  await page.goto(url, { waitUntil: 'load' });
  // await page.goto(url);
  // await page.waitForSelector('body');
  // await page.waitFor(60000);

  const links: any = [];
  const newLinks = await linkScrapeTool.linkScrape(page);
  links.push(...newLinks);

  console.log(`All Links: \n`, links);

  await pdf.saveToPDF(page, filename);
  await screenshot.saveToScreenshot(page, filename);

  // close the browser
  await browser.close();
};

// scrape the async function
scrape();