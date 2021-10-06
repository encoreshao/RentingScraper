const contentScrape = require('./utils/contentScrape');
const csvWriter = require('./utils/csvWriter');

const discover = async () => {
  const browser = await require('./utils/browser').startBrowser();
  let page = await browser.newPage();

  const startTime = new Date().getTime();
  // https://sh.5i5j.com/zufang/pudongxinqu/r2u1/
  const url = process.argv[2];
  console.log(`// Navigating to ${url}...`);
  await page.goto(url);

  let moreResults = true;
  const results: any = [];

  console.log(`// Parse content...`);
  while (moreResults) {
    await contentScrape.waitContentSelector(page);
    const newItems = await contentScrape.searchContentItems(page);

    results.push(...newItems);
    try {
      await contentScrape.triggerContentPaginationSelector(page);
    } catch (error) {
      moreResults = false;
    }
  }

  console.log(`// Closing browser`);
  await browser.close();

  const timeSpent = ((new Date().getTime()) - startTime) / 1000;
  console.log(`// Completed in  ${timeSpent} secs!`);

  console.log(`Total of ${results.length} results.`);
  csvWriter.saveToCSV(results);
  // outputResults(results);
};

const outputResults = (results: any) => {
  if (results.length) {
    console.log(`// Rooms: \n${JSON.stringify(results, null, 2)}`);
  } else {
    console.log('// No results found!');
  }
};

discover()