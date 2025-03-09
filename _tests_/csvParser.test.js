const {readInputCSV, processCSVtoJSON} = require('../csvParser')
const path = require('path')

const inputCSV1 = path.join(__dirname, '../CSV_files/1.csv')
const inputCSV2 = path.join(__dirname, '../CSV_files/2.csv')
const inputCSV2dup = path.join(__dirname, '../CSV_files/2dup.csv')

const inputCSV10 = path.join(__dirname, '../CSV_files/10.csv')

describe('readInputCSV', () => {
    it('if input is undefined, then a string should be returned to say there is no input', () => {
        expect(typeof readInputCSV(undefined)).toBe(typeof 'string')
    })
    it('if valid input is defined, then an array should be returned', async () => {
        const data = await readInputCSV(inputCSV1); // Await the Promise
        expect(Array.isArray(data)).toBe(true);
    });
    it('inputCSV1 should return an array with length of 1', async () => {
        const data = await readInputCSV(inputCSV1); // Await the Promise
        expect(data.length).toBe(1);
    });
    it('inputCSV2 should return an array with length of 2', async () => {
        const data = await readInputCSV(inputCSV2); // Await the Promise
        expect(data.length).toBe(2);
    });
    it('inputCSV10 should return an array with length of 10', async () => {
        const data = await readInputCSV(inputCSV10); // Await the Promise
        expect(data.length).toBe(10);
    });
});

describe('transformCSVtoJSON', () => {
    it('return an object', () => {
        expect(typeof processCSVtoJSON()).toBe('object');
    });
    it('inputCSV1 should return an array of 1 object', async () => {
        const data = await readInputCSV(inputCSV1); 
        const result = [{SKU: "SKU1", Colour: "Red", Size: "Small"}]
        expect(processCSVtoJSON(data).products).toEqual(result);
    });
    it('the result should have a key to identify created products, for inputCSV1 this should be 1', async () => {
        const data = await readInputCSV(inputCSV1); 
        expect(processCSVtoJSON(data).createdProducts).toEqual(1);
    });
    it('inputCSV2 should return an array of 2 objects', async () => {
        const data = await readInputCSV(inputCSV2); 
        const result = [
            {SKU: "SKU1", Colour: "Red", Size: "Small"},
            {SKU: "SKU2", Colour: "Black", Size: "Medium"}
        ]
        expect(processCSVtoJSON(data).products).toEqual(result);
    });
    it.only('the result should have a key to identify created products, for inputCSV2 this should be 2', async () => {
        const data = await readInputCSV(inputCSV2); 
        expect(processCSVtoJSON(data).createdProducts).toEqual(2);
    });
    it('inputCSV2dup should return an array of 1 object', async () => {
        const data = await readInputCSV(inputCSV2dup); 
        const result = [
            {SKU: "SKU1", Colour: "Red", Size: "Small"}
        ]
        expect(processCSVtoJSON(data).products).toEqual(result);
    });
});