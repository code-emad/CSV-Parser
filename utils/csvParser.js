const fs = require("fs");
const csv = require("csv-parser");
const path = require('path');


//read input csv and return array of objects
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

    if (seenSKUs.has(SKU)) {
      processedResult.numberOfSkippedRows++;
      processedResult.skippedRows.push(`Row ${index + 1} skipped: Duplicate SKU (${SKU})`);
    } else if (!SKU || !Colour || !Size) {
      processedResult.numberOfSkippedRows++;
      processedResult.skippedRows.push(`Row ${index + 1} skipped: Incomplete data`);
    }
    else if (SKU && Colour && Size) {
      processedResult.products.push(row);
      seenSKUs.add(SKU);
      processedResult.createdProducts++;
    }
  });

  fs.writeFileSync('./processedProducts.json', JSON.stringify(processedResult.products, null, 2));
  return processedResult;
}

module.exports = { readInputCSV, processCSVtoJSON };
