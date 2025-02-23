const {returnNumber, readInputCSV} = require('../csvParser')
const inputCSV1 = require('../CSV_files/1.csv')

describe('Sample test block', () => {
    it('should return a number', () => {
        expect(typeof returnNumber()).toBe('number')
    })

    it('should return 123', () => {
        expect(returnNumber()).toBe(123)
    })
})

describe('readInputCSV', () => {
    it('if input is undefined, then a string should be returned to say there is no input', () => {
        expect(typeof readInputCSV(undefined)).toBe(typeof 'string')
    })
    it('if input is defined, then an array should be returned', () => {
        expect(Array.isArray(readInputCSV(inputCSV1))).toBe(true)
    })
});