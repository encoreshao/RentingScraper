async function linkScrape(page: any) {
  // await page.waitForSelector('div.house-list');

  // execute the JS in the context of the page to get all the links
  // const links1 = await page.evaluate(() =>
  //   // let's just get all links and create an array from the resulting NodeList
  //    Array.from(document.querySelectorAll("a")).map((anchor: any) => [anchor.href, anchor.textContent])
  // );
  // console.log(links1);

  const newItems = await page.$$eval('a', (as: any) => as.map((a: any) => ({ 'title': a.textContent, 'link': a.href })));
  return newItems;
}

module.exports = { linkScrape };