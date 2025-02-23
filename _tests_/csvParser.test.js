const {readInputCSV} = require('../csvParser')
const path = require('path')

const inputCSV1 = path.join(__dirname, '../CSV_files/1.csv')

describe('readInputCSV', () => {
    it('if input is undefined, then a string should be returned to say there is no input', () => {
        expect(typeof readInputCSV(undefined)).toBe(typeof 'string')
    })
    it('if input is defined, then an array should be returned', async () => {
        const data = await readInputCSV(inputCSV1); // ✅ Await the Promise
        expect(Array.isArray(data)).toBe(true);
    });

});