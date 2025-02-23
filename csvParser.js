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

function transformCSVtoJSON() {
    return {}
}





module.exports = { readInputCSV, transformCSVtoJSON };
