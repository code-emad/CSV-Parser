const fs = require("fs");
const csv = require("csv-parser");
const path = require('path');
const file = path.join(__dirname, 'inputCSV.csv')


//read input csv and return array of objects
function readInputCSV(inputCSV) {
  if (!inputCSV) {
    return Promise.resolve("No input file specified");
  }

  return new Promise((resolve, reject) => {
    const csvInputs = [];
  
    const stream = fs.createReadStream(inputCSV)
      .on("error", (err) => {
        reject(new Error(`Failed to read CSV file: ${err.message}`));
      });
  
    stream
      .pipe(csv())
      .on("data", (data) => csvInputs.push(data))
      .on("end", () => {
        resolve(csvInputs);
      })
      .on("error", (err) => {
        reject(new Error(`Failed to parse CSV file: ${err.message}`));
      });
  });
}

function processCSVtoJSON(inputArray) {
  if (!inputArray) {
    return Promise.resolve({});
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
    numberOfUnchangedProducts: 0,
    numberOfSkippedRows: 0,
    skippedRows: []
  };

  const seenSKUs = new Set();
  const existingProductMap = new Map(existingProducts.map(p => [p.SKU, p]));

  inputArray.forEach((row, index) => {
    const { SKU, Colour, Size } = row;

    if (!SKU || !Colour || !Size) {
      processedResult.numberOfSkippedRows++;
      processedResult.skippedRows.push(`Row ${index + 1} skipped: Incomplete data`);
    } else if (seenSKUs.has(SKU)) {
      processedResult.numberOfSkippedRows++;
      processedResult.skippedRows.push(`Row ${index + 1} skipped: Duplicate SKU in input (${SKU})`);
    } else if (existingProductMap.has(SKU)) {
      const existing = existingProductMap.get(SKU);
      if (existing.Colour === Colour && existing.Size === Size) {
        processedResult.numberOfUnchangedProducts++;
      }
      seenSKUs.add(SKU);
    } else {
      processedResult.products.push(row);
      seenSKUs.add(SKU);
      processedResult.createdProducts++;
    }
  });

  console.log(`Number of products created: ${processedResult.createdProducts}\nNumber of products unchanged: ${processedResult.numberOfUnchangedProducts}\nNumber of rows skipped: ${processedResult.numberOfSkippedRows}`)

  fs.writeFileSync('./processedProducts.json', JSON.stringify(processedResult.products, null, 2));
  return processedResult;
}

if (require.main === module) {
  console.log("Running script...")
  readInputCSV(file)
    .then(processCSVtoJSON)
    .then(result => {
      console.log("Script run complete!");
    })
    .catch(error => {
      console.error("Error:", error);
    });
}

module.exports = { readInputCSV, processCSVtoJSON };
