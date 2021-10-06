async function saveToScreenshot(page: any, filename: string) {
  // Save a screenshot of the results.
  const screenshotPath = `./outputs/${filename}.png`;
  await page.screenshot({ path: screenshotPath, fullPage: true });

  console.log(`// Have a look at the screenshot: ${screenshotPath}`);
}

module.exports = { saveToScreenshot };