const {returnNumber} = require('../csvParser')

describe('csvParser', () => {
    it('should return a number', () => {
        expect(typeof returnNumber()).toBe('number')
    })

    it('should return 123', () => {
        expect(returnNumber()).toBe(123)
    })
})