const {readInputCSV} = require('../csvParser')
const path = require('path')

const inputCSV1 = path.join(__dirname, '../CSV_files/1.csv')
const inputCSV2 = path.join(__dirname, '../CSV_files/2.csv')
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