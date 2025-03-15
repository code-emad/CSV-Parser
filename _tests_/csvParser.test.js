const {readInputCSV, processCSVtoJSON} = require('../csvParser')
const path = require('path')

const inputCSV1 = path.join(__dirname, '../CSV_files/1.csv')
const inputCSV2 = path.join(__dirname, '../CSV_files/2.csv')
const inputCSV2dup = path.join(__dirname, '../CSV_files/2dup.csv')
const inputCSV10 = path.join(__dirname, '../CSV_files/10.csv')
const inputCSV2missing = path.join(__dirname, '../CSV_files/2missing.csv')
const challengecsv = path.join(__dirname, '../CSV_files/challengecsv.csv')

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
    it('the result should have a key to identify created products, for inputCSV2 this should be 2', async () => {
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
    it('inputCSV2dup.numberOfSkippedRows should return 2', async () => {
        const data = await readInputCSV(inputCSV2dup); 
        const result = 1
        expect(processCSVtoJSON(data).numberOfSkippedRows).toEqual(result);
    });
    it('inputCSV10 should return an array of 10 objects', async () => {
        const data = await readInputCSV(inputCSV10); 
        const result = [
            {SKU: "SKU1", Colour: "Red", Size: "Small"},
            {SKU: "SKU2", Colour: "Black", Size: "Medium"},
            {SKU: "SKU3", Colour: "Blue", Size: "Large"},
            {SKU: "SKU4", Colour: "Yellow", Size: "Small"},
            {SKU: "SKU5", Colour: "Green", Size: "Extra-small"},
            {SKU: "SKU6", Colour: "Cyan", Size: "Extra-large"},
            {SKU: "SKU7", Colour: "White", Size: "Medium"},
            {SKU: "SKU8", Colour: "Navy", Size: "Extra-extra-large"},
            {SKU: "SKU9", Colour: "Indigo", Size: "Small"},
            {SKU: "SKU10", Colour: "Purple", Size: "Large"},
        ]
        expect(processCSVtoJSON(data).products).toEqual(result);
    });
    it('the result should have a key to identify created products, for inputCSV10 this should be 10', async () => {
        const data = await readInputCSV(inputCSV10); 
        expect(processCSVtoJSON(data).createdProducts).toEqual(10);
    });
    it('inputCSV2missing should return an array of 1 object as data is incomplete', async () => {
        const data = await readInputCSV(inputCSV2missing); 
        const result = [
            {SKU: "SKU1", Colour: "Red", Size: "Small"}
        ]
        expect(processCSVtoJSON(data).products).toEqual(result);
    });
    it('inputCSV2missing.skippedRows should return 1', async () => {
        const data = await readInputCSV(inputCSV2missing); 
        const result = 1
        expect(processCSVtoJSON(data).numberOfSkippedRows).toEqual(result);
    });
    it('challengecsv should return 7 objects', async () => {
        const data = await readInputCSV(challengecsv); 
        const result = [
            {SKU: "1", Colour: "C1", Size: "S1"},
            {SKU: "4", Colour: "C1", Size: "S4"},
            {SKU: "5", Colour: "C1", Size: "S5"},
            {SKU: "6", Colour: "C1", Size: "S6"},
            {SKU: "7", Colour: "C1", Size: "S7"},
            {SKU: "8", Colour: "C1", Size: "S8"},
            {SKU: "9", Colour: "C1", Size: "S9"}
        ]
        expect(processCSVtoJSON(data).products).toEqual(result);
        expect(processCSVtoJSON(data).createdProducts).toEqual(7);
        expect(processCSVtoJSON(data).numberOfSkippedRows).toEqual(3);
    });

});