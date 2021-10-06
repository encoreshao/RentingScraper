async function saveToPDF(page: any, filename: string) {
  // Save a pdf of the results.
  const pdfPath = `./tmp/${filename}.pdf`;

  await page.pdf({
    path: pdfPath,
    displayHeaderFooter: true,
    headerTemplate: '',
    footerTemplate: '',
    printBackground: true,
    format: 'A4',
  });

  console.log(`// Have a look at the pdf: ${pdfPath}`);
}

module.exports = { saveToPDF };