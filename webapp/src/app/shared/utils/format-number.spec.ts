import { transformToNumber } from './format-number'
describe('#transformToNumber', () => {

    it('should return Null when the numberValuer is null', () => {
        expect(transformToNumber(null,'""',',')).toBeNull() 
    })

    it('should return empty string when the numberValue is an empty string', () => {
        expect(transformToNumber('','""',',')).toEqual('')
    });

    it('should return a number when the numberValue is a number', () => {
        expect(transformToNumber(329109349,'""',',')).toEqual(329109349)
     });

    it('should return the formatted number when the numberValue is a string', () => {
        expect(transformToNumber('$329,109.349','""',',')).toEqual(329109349)
     });

    it('should return the formatted number when the numberValue is a string', () => {
        expect(transformToNumber('$12334','""','.')).toEqual(12334)
    });

    it('should return the formatted number when the decimalSymbol is null', () => {
        expect(transformToNumber('$329,109.349','""',null)).toEqual(329)
    });

    it('should return the formatted number when the groupingSymbol is a point ', () => {
        expect(transformToNumber('$329,109.349','""','.')).toEqual(329)
    });

   
          

});