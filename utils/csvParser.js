const Papa = require("papaparse"); // This isn't used so shouldn't be in repo
const fs = require("fs");
const csv = require("csv-parser");
const path = require('path');

// Details missing from challenge:-
// No instructions on how to run the code
// went beyond two hour limit
// README is incomplete
// Missing summary output
//  Number of products created
//  Number of products unchanged
//  Number of rows skipped
// No checking for unchanged products
//



//read input csv and return array of objects
function readInputCSV(inputCSV) {
  if (inputCSV === undefined) {
    return "No input file specified"; // Would expect this to be an error
  }

  return new Promise((resolve, reject) => {
    const inputCSVArray = []; // no need to have "array" in variable name. Better to have pluralised variables e.g csvInputs
    fs.createReadStream(inputCSV)
      .pipe(csv())
      .on("data", (data) => inputCSVArray.push(data)) // loading the entire file in to memory will cause issues for bigger CSV's.
      .on("end", () => {
        resolve(inputCSVArray);
      }); // No error handling of malformed CSV's
  });
}

// Looks like the intention is to process the csv then do the validation and convert. Would be more performant to validate as you are parsing the csv

function processCSVtoJSON(inputArray) {
  if (inputArray === undefined) {
    return {}; //  
  }

  const filePath = path.join(__dirname, 'processedProducts.json');
  let existingProducts = [];

  if (fs.existsSync(filePath)) {
    const rawData = fs.readFileSync(filePath);
    existingProducts = rawData.length ? JSON.parse(rawData) : [];
  }

  const processedResult = {
    products: [...existingProducts],
    createdProducts: 0,
    numberOfSkippedRows: 0,
    skippedRows: []
  };

  const seenSKUs = new Set(existingProducts.map(product => product.SKU)); // To track unique SKUs
  inputArray.forEach((row, index) => {
    const { SKU, Colour, Size } = row;

    if (seenSKUs.has(SKU)) { // This check should be for currently processing SKU's, not those that are pre-existing. Pre-existings one's should updated if needed or skipped. 
      processedResult.numberOfSkippedRows++;
      processedResult.skippedRows.push(`Row ${index + 1} skipped: Duplicate SKU (${SKU})`);
    } else if (!SKU || !Colour || !Size) {
      processedResult.numberOfSkippedRows++;
      processedResult.skippedRows.push(`Row ${index + 1} skipped: Incomplete data`);
    }
    else if (SKU && Colour && Size) { // no need for else if as all data validation has been done at this point 
      processedResult.products.push(row);
      seenSKUs.add(SKU);
      processedResult.createdProducts++;
    }
  });

  fs.writeFileSync('./processedProducts.json', JSON.stringify(processedResult.products, null, 2));
  return processedResult;
}

module.exports = { readInputCSV, processCSVtoJSON };
