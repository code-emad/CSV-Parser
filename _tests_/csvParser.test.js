const { readInputCSV, processCSVtoJSON } = require("../csvParser");
const path = require("path");
const fs = require("fs");
const filePath = path.join(__dirname, "../processedProducts.json");

const getCSVPath = (filename) => path.join(__dirname, "../CSV_files", filename);
const inputCSV1 = getCSVPath("1.csv");
const inputCSV2 = getCSVPath("2.csv");
const inputCSV2dup = getCSVPath("2dup.csv");
const inputCSV10 = getCSVPath("10.csv");
const inputCSV2missing = getCSVPath("2missing.csv");
const challengecsv = getCSVPath("challengecsv.csv");
const inputSequential1 = getCSVPath("2sequential1.csv");
const inputSequential2 = getCSVPath("2sequential2.csv");

beforeEach(async () => {
  if (fs.existsSync(filePath)) {
    console.log("Deleting processedProducts.json before test...");
    await fs.promises.unlink(filePath);
    console.log("Delete complete");
  }
});

describe("readInputCSV", () => {
  it("returns an error message if input is null or undefined", async () => {
    const result1 = await readInputCSV(undefined);
    const result2 = await readInputCSV(null);
  
    expect(result1).toBe("No input file specified");
    expect(typeof result1).toBe("string");
  
    expect(result2).toBe("No input file specified");
    expect(typeof result2).toBe("string");
  });
  
  it("returns an array when valid input is provided", async () => {
    const result = await readInputCSV(inputCSV1);
    expect(Array.isArray(result)).toBe(true);
  });
  
  it("inputCSV1 returns an array with length 1", async () => {
    const result = await readInputCSV(inputCSV1);
    expect(result.length).toBe(1);
  });
  
  it("inputCSV2 returns an array with length 2", async () => {
    const result = await readInputCSV(inputCSV2);
    expect(result.length).toBe(2);
  });
  
  it("inputCSV10 returns an array with length 10", async () => {
    const result = await readInputCSV(inputCSV10);
    expect(result.length).toBe(10);
  });  
});

describe("processCSVtoJSON", () => {
  it("returns an object when no input is provided", () => {
    const result = processCSVtoJSON();
    expect(typeof result).toBe("object");
  });
  
  it("returns 1 product and tracks 1 created product (inputCSV1)", async () => {
    const data = await readInputCSV(inputCSV1);
    const expected = [{ SKU: "SKU1", Colour: "Red", Size: "Small" }];
    const result = processCSVtoJSON(data);
  
    expect(result.products).toEqual(expected);
    expect(result.createdProducts).toBe(1);
  });
  
  it("returns 2 products and tracks 2 created products (inputCSV2)", async () => {
    const data = await readInputCSV(inputCSV2);
    const expected = [
      { SKU: "SKU1", Colour: "Red", Size: "Small" },
      { SKU: "SKU2", Colour: "Black", Size: "Medium" },
    ];
    const result = processCSVtoJSON(data);
  
    expect(result.products).toEqual(expected);
    expect(result.createdProducts).toBe(2);
  });
  
  it("returns 1 product and skips 1 duplicate row (inputCSV2dup)", async () => {
    const data = await readInputCSV(inputCSV2dup);
    const expected = [{ SKU: "SKU1", Colour: "Red", Size: "Small" }];
    const result = processCSVtoJSON(data);
  
    expect(result.products).toEqual(expected);
    expect(result.numberOfSkippedRows).toBe(1);
  });
  
  it("returns 10 products and tracks 10 created products (inputCSV10)", async () => {
    const data = await readInputCSV(inputCSV10);
    const expected = [
      { SKU: "SKU1", Colour: "Red", Size: "Small" },
      { SKU: "SKU2", Colour: "Black", Size: "Medium" },
      { SKU: "SKU3", Colour: "Blue", Size: "Large" },
      { SKU: "SKU4", Colour: "Yellow", Size: "Small" },
      { SKU: "SKU5", Colour: "Green", Size: "Extra-small" },
      { SKU: "SKU6", Colour: "Cyan", Size: "Extra-large" },
      { SKU: "SKU7", Colour: "White", Size: "Medium" },
      { SKU: "SKU8", Colour: "Navy", Size: "Extra-extra-large" },
      { SKU: "SKU9", Colour: "Indigo", Size: "Small" },
      { SKU: "SKU10", Colour: "Purple", Size: "Large" },
    ];
    const result = processCSVtoJSON(data);
  
    expect(result.products).toEqual(expected);
    expect(result.createdProducts).toBe(10);
  });
  
  it("returns 1 valid product and 1 skipped row (inputCSV2missing)", async () => {
    const data = await readInputCSV(inputCSV2missing);
    const expected = [{ SKU: "SKU1", Colour: "Red", Size: "Small" }];
    const result = processCSVtoJSON(data);
  
    expect(result.products).toEqual(expected);
    expect(result.numberOfSkippedRows).toBe(1);
  });
  
  it("returns 7 products, tracks 7 created and 3 skipped (challengecsv)", async () => {
    const data = await readInputCSV(challengecsv);
    const expected = [
      { SKU: "1", Colour: "C1", Size: "S1" },
      { SKU: "4", Colour: "C1", Size: "S4" },
      { SKU: "5", Colour: "C1", Size: "S5" },
      { SKU: "6", Colour: "C1", Size: "S6" },
      { SKU: "7", Colour: "C1", Size: "S7" },
      { SKU: "8", Colour: "C1", Size: "S8" },
      { SKU: "9", Colour: "C1", Size: "S9" },
    ];
    const result = processCSVtoJSON(data);
  
    expect(result.products).toEqual(expected);
    expect(result.createdProducts).toBe(7);
    expect(result.numberOfSkippedRows).toBe(3);
  });
  
  it("runs processCSVtoJSON twice sequentially and updates with new product only", async () => {
    const data1 = await readInputCSV(inputSequential1);
    const data2 = await readInputCSV(inputSequential2);
  
    const result1 = processCSVtoJSON(data1);
    expect(result1.products.length).toBe(2);
    expect(result1.createdProducts).toBe(2);
    expect(result1.numberOfSkippedRows).toBe(0);
  
    const result2 = processCSVtoJSON(data2);
    expect(result2.products.length).toBe(3);
    expect(result2.createdProducts).toBe(1);
    expect(result2.numberOfSkippedRows).toBe(0);
    expect(result2.numberOfUnchangedProducts).toBe(1);
  });
  
  it("runs processCSVtoJSON three times and tracks unchanged products", async () => {
    const data1 = await readInputCSV(inputSequential1);
    const data2 = await readInputCSV(inputSequential2);
  
    const result1 = processCSVtoJSON(data1);
    expect(result1.createdProducts).toBe(2);
  
    const result2 = processCSVtoJSON(data2);
    expect(result2.createdProducts).toBe(1);
    expect(result2.numberOfUnchangedProducts).toBe(1);
  
    const result3 = processCSVtoJSON(data2);
    expect(result3.createdProducts).toBe(0);
    expect(result3.numberOfUnchangedProducts).toBe(2);
  });
  
  it("runs challengecsv twice and tracks unchanged products in second run", async () => {
    const data = await readInputCSV(challengecsv);
    const expected = [
      { SKU: "1", Colour: "C1", Size: "S1" },
      { SKU: "4", Colour: "C1", Size: "S4" },
      { SKU: "5", Colour: "C1", Size: "S5" },
      { SKU: "6", Colour: "C1", Size: "S6" },
      { SKU: "7", Colour: "C1", Size: "S7" },
      { SKU: "8", Colour: "C1", Size: "S8" },
      { SKU: "9", Colour: "C1", Size: "S9" },
    ];
  
    const firstRun = processCSVtoJSON(data);
    const secondRun = processCSVtoJSON(data);
  
    expect(firstRun.products).toEqual(expected);
    expect(firstRun.createdProducts).toBe(7);
    expect(firstRun.numberOfSkippedRows).toBe(3);
  
    expect(secondRun.products).toEqual(expected);
    expect(secondRun.createdProducts).toBe(0);
    expect(secondRun.numberOfSkippedRows).toBe(3);
    expect(secondRun.numberOfUnchangedProducts).toBe(7);
  });  
});
