const Papa = require("papaparse");
const fs = require("fs");
const csv = require("csv-parser");

//read input csv and return arrat of objects
function readInputCSV(inputCSV) {
  if (inputCSV === undefined) {
    return "No input file specified";
  }

  return new Promise((resolve, reject) => {
    const inputCSVArray = [];
    fs.createReadStream(inputCSV)
      .pipe(csv())
      .on("data", (data) => inputCSVArray.push(data))
      .on("end", () => {
        resolve(inputCSVArray);
      });
  });
}

function processCSVtoJSON(inputArray) {
  if (inputArray === undefined) {
    return {};
  }

  const processedResult = {
    products: [],
    createdProducts: 0,
    numberOfRowsSkipped: 0,
    skippedRows: []
  };

  const seenSKUs = new Set(); // To track unique SKUs

  inputArray.forEach((row, index) => {
    const { SKU, Colour, Size } = row;

    if (seenSKUs.has(SKU)) {
      processedResult.numberOfRowsSkipped++;
      processedResult.skippedRows.push(`Row ${index + 1} skipped: Duplicate SKU (${SKU})`);
    } else if (SKU && Colour && Size) {
      processedResult.products.push(row);
      seenSKUs.add(SKU);
      processedResult.createdProducts++;
    }
  });

  return processedResult;
}


module.exports = { readInputCSV, processCSVtoJSON };
