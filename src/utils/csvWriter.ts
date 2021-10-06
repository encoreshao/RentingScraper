import * as csvwriter from 'csv-writer';
const createCsvWriter = csvwriter.createObjectCsvWriter;

// Importing csv-parser into fsdata
import * as csvdata from 'csv-parser';
const fsdata = require('fs');

const { v4: uuidv4 } = require('uuid');
let finalCSVPath = `./outputs/results-${uuidv4()}.csv`;

// Passing the column names intp the module
const csvWriter = createCsvWriter({
  // Output csv file name is geek_data
  path: finalCSVPath,
  header: [
    // Title of the columns (column_names)
    { id: 'name', title: 'Name' },
    { id: 'money', title: 'Money' },
    { id: 'info', title: 'Info' },
    { id: 'url', title: 'URL' },
    { id: 'address', title: 'Address' },
    { id: 'extra_info', title: 'ExtraInfo' },
    { id: 'image_url', title: 'ImageURL' }
  ]
});

async function saveToCSV(results: any){
  // Writerecords function to add records
  csvWriter
    .writeRecords(results)
    .then(()=> console.log(`// Data was scraped into csv successfully.`));

  createReadStream();
}

async function createReadStream() {
  // Reading csv data row wise from geek_data csv file
  fsdata.createReadStream(finalCSVPath)
    .pipe(csvdata())
    .on('data', (row: any) => {
      // Display data row by row
      console.log(row);
    })
    .on('end', () => {
      console.log('// Success');
    });
}

module.exports = { saveToCSV };