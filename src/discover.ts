const contentScrape = require('./utils/contentScrape');
const csvWriter = require('./utils/csvWriter');

const discover = async () => {
  // 设置开始时间
  const startTime = new Date().getTime();

  // 创建浏览器对象
  const browser = await require('./utils/browser').startBrowser();
  let page = await browser.newPage();

  // 随机设置User Agent
  const newUserAgent = require('random-useragent').getRandom();
  console.log(`// 随机设置User Agent: ${newUserAgent}.`);
  await page.setUserAgent(newUserAgent);

  // 开启拦截功能
  // await page.setRequestInterception(true);
  // await page.on('dialog', async (dialog: any) => {
  //   await dialog.dismiss();
  // });

  // await page.on('response', (interceptedResponse: any) => {
  //   let status = interceptedResponse.status();
  //   if (status.toString().substr(0,2) === "30") {
  //     console.log("// URL: " + interceptedResponse.url());
  //     console.log("// 状态: " + status);
  //     console.log("// Headers: " + interceptedResponse.headers().location);
  //   }
  // });

  const url = process.argv[2];
  console.log(`// 打开 ${url}...`);
  const response = await page.goto(url);
  console.log(`// 响应头信息 \n ${response.headers}`);

  let moreResults = true;
  const results: any = [];

  console.log(`// 内容解析...`);
  while (moreResults) {
    try {
      await contentScrape.waitContentSelector(page);
    } catch (error) {
      console.log(`// 为找到内容块...`, error.message);
      moreResults = false;
    }

    const newItems = await contentScrape.searchContentItems(page);

    if (newItems.length > 0) {
      results.push(...newItems);

      try {
        await contentScrape.triggerContentPaginationSelector(page);
      } catch (error) {
        console.log(`// 解析内容块失败...`, error.message);
        moreResults = false;
      }
    } else {
      moreResults = false;
    }
  }

  console.log(`// 关闭浏览器`);
  await browser.close();

  const timeSpent = ((new Date().getTime()) - startTime) / 1000;
  console.log(`// 总耗时 ${timeSpent} 秒!`);

  console.log(`// 共计 ${results.length} 个结果.`);
  if (results.length > 0) { csvWriter.saveToCSV(results); }

  // outputResults(results);
};

const outputResults = (results: any) => {
  if (results.length) {
    console.log(`// 结果: \n${JSON.stringify(results, null, 2)}`);
  } else {
    console.log('// 无内容!');
  }
};

discover()