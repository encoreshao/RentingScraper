// 我爱我家：https://sh.5i5j.com/zufang/pudongxinqu/r2u1n5/
// 安居客：https://sh.zu.anjuke.com/fangyuan/fx2-l2-x1/

async function waitContentSelector(page: any) {
  const url = await page.url();

  if (url.match(/5i5j.com/)) {
    await page.waitForSelector('div.list-con-box');
  } else if (url.match(/anjuke.com/)) {
    await page.waitForSelector('div.list-content');
  }
}

async function searchRoomItems(page: any) {
  const url = await page.url();
  let newItems: any = [];

  if (url.match(/5i5j.com/)) {
    newItems = await page.$$eval('div.list-con-box ul.pList li', (trows: any)=>{
      let rowList: any = []
      trows.forEach((row: any) => {
        rowList.push({
          'name': row.querySelector('div.listCon h3 a') && row.querySelector('div.listCon h3 a').innerText.trim(),
          'money': row.querySelector('div.listX div.jia') && row.querySelector('div.listX div.jia').innerText.trim().replace('\n\n', ' · '),
          'info': row.querySelector('div.listX > p') && row.querySelector('div.listX > p').innerText.trim(),
          'url': row.querySelector('div.listCon h3 a') && row.querySelector('div.listCon h3 a').href,
          'address': row.querySelector('div.listX > p:nth-child(2)') && row.querySelector('div.listX > p:nth-child(2)').innerText.trim(),
          'extra_info': row.querySelector('div.listX > p:nth-child(3)') && row.querySelector('div.listX > p:nth-child(3)').innerText.trim(),
          'image_url': row.querySelector('div.listImg img') && row.querySelector('div.listImg img').src
        })
      });
      return rowList;
    });
  } else if (url.match(/anjuke.com/)) {
    newItems = await page.$$eval('div.maincontent div.list-content div.zu-itemmod', (trows: any)=>{
      let rowList: any = []
      trows.forEach((row: any) => {
        rowList.push({
          'name': row.querySelector('div.zu-info h3 b') && row.querySelector('div.zu-info h3 b').innerText.trim(),
          'money': row.querySelector('div.zu-side p') && row.querySelector('div.zu-side p').innerText.trim().replace('\n\n', ' · '),
          'info': row.querySelector('div.zu-info p.details-item.tag') && row.querySelector('div.zu-info p.details-item.tag').innerText.trim(),
          'url': row.querySelector('div.zu-info h3 a') && row.querySelector('div.zu-info h3 a').href,
          'address': row.querySelector('div.zu-info address.details-item') && row.querySelector('div.zu-info address.details-item').innerText.trim(),
          'extra_info': row.querySelector('div.zu-info p.details-item.bot-tag') && row.querySelector('div.zu-info p.details-item.bot-tag').innerText.trim(),
          'image_url': row.querySelector('img') && row.querySelector('img').src
        })
      });
      return rowList;
    });
  }

  console.log(`// Total of ${newItems.length} rooms was found from ${url}`);
  return newItems;
}

async function triggerContentPaginationSelector(page: any) {
  const url = await page.url();
  if (url.match(/5i5j.com/)) {
    await page.click('div.pageSty a.cPage');
  } else if (url.match(/anjuke.com/)) {
    await page.click('div.multi-page a.aNxt');
  }
}

module.exports = {
  waitContentSelector,
  searchRoomItems,
  triggerContentPaginationSelector
};