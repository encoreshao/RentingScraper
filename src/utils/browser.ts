// const puppeteer = require('puppeteer');
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

async function startBrowser(){
  let browser: any;
  try {
    console.log(`// Opening the browser......`);

    // await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36');
    // await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
    const args = [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-infobars',
      '--disable-gpu',
      '--window-position=0,0',
      '--ignore-certifcate-errors-spki-list',
    ];

    const options = {
      args,
      headless: true,
      ignoreHTTPSErrors: true,
      ignoreCertifcateErrors: true,
      userDataDir: './tmp'
    };

    browser = await puppeteer.launch(options);
  } catch (err: any) {
    console.log(`// Could not create a browser instance: ${err.message}`);
  }
  return browser;
}

module.exports = { startBrowser };