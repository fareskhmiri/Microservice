
import { getValue, getDecodedValue } from './feature-utils'

describe('#getValue', () => {

    it('should return an empty string when data is Null', () => {
        expect(getValue(null, 'booking_date', '')).toBe('')
    })

    it('should return an empty string when data is a string', () => {
        expect(getValue('data', 'booking', '')).toEqual('')
    })

    it('should return the string representing the specified date when the property is a String', () => {
        const data = { meeting_room: 'room 1', booking_date: '2022-09-22T10:30:00.000Z' }
        expect(getValue(data, 'booking_date', '')).toBe('2022-09-22T10:30:00.000Z')
    })

    it('should return the formated string representing the specified date when the property is a date', () => {
        const date = new Date("22 september 2022 10:30 UTC")
        const data = { meeting_room: 'room 1', booking_date: date }
        expect(getValue(data, 'booking_date', '')).toBe('2022-09-22T10:30:00.000Z')
    })

    it('should return an empty string when the property is Null', () => {
        const data = { meeting_room: 'room 1', booking_date: '2022-09-22T10:30:00.000Z' }
        expect(getValue(data, null, '')).toEqual('')
    })

    it('should return an empty string when the property is invalid', () => {
        const data = { meeting_room: 'room 1', booking_date: '2022-09-22T10:30:00.000Z' }
        expect(getValue(data, 'booking', '')).toEqual('')
    })

    it('should return an empty string when the property is an empty string', () => {
        const data = { meeting_room: 'room 1', booking_date: '' }
        expect(getValue(data, 'booking_date', '')).toEqual('')
    })

});

describe('#getDecodedValue', () => {
    
    it('should return Null when the value is Null', () => {
        expect(getDecodedValue(null)).toBeNull()
    });

    it('should return a empty string when the value is empty', () => {
        expect(getDecodedValue('')).toBe('')
    });

    it('should return the decoded URI when the value is An encoded component of a URI', () => {
        const encodevalue = encodeURIComponent('test?')
        expect(getDecodedValue(encodevalue)).toEqual('test?')
    });

});







