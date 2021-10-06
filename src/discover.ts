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
  const rooms: any = [];

  console.log(`// Parse content...`);
  while (moreResults) {
    await contentScrape.waitContentSelector(page);
    const newRooms = await contentScrape.searchRoomItems(page);

    rooms.push(...newRooms);

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

  console.log(`Total of ${rooms.length} rooms.`);
  csvWriter.saveToCSV(rooms);
  // outputRooms(rooms);
};

const outputRooms = (rooms: any) => {
  if (rooms.length) {
    console.log(`// Rooms: \n${JSON.stringify(rooms, null, 2)}`);
  } else {
    console.log('// No rooms found!');
  }
};

discover()