import { it, expect, describe } from 'vitest';

import { validateNumber, validateStringNotEmpty } from './validation';

describe('validateStringNotEmpty()', () => {
    it('should throw error if string is empty', () => {
        const input = '';

        const resultFn = () => {
            validateStringNotEmpty(input)
        }

        expect(resultFn).toThrow(/must not be empty/);
    })

    it('should throw an error if any other value than a string is provided', () => {
        const inputNum = 1;
        const inputBool = true;
        const inputObj = {};

        const validationFnNum = () => validateStringNotEmpty(inputNum);
        const validationFnBool = () => validateStringNotEmpty(inputBool);
        const validationFnObj = () => validateStringNotEmpty(inputObj);

        expect(validationFnNum).toThrow();
        expect(validationFnBool).toThrow();
        expect(validationFnObj).toThrow();
    });

    it('should not throw an error, if a non-empty string is provided', () => {
        const input = 'valid';
        const validationFn = () => validateStringNotEmpty(input);
        expect(validationFn).not.toThrow();
    });
})

describe('validateNumber()', () => {
    it('should thwor error if NaN is provided', () => {
        const input = 'invalid';

        const resultFn = () => {
            validateNumber(input)
        }

        expect(resultFn).toThrow(/Invalid number input/)
    })

    it('should throw an error if a non-numeric value is provided', () => {
        const input = '1';
        const validationFn = () => validateNumber(input);
        expect(validationFn).toThrow();
    });

    it('should not throw an error, if a number is provided', () => {
        const input = 1;
        const validationFn = () => validateNumber(input);
        expect(validationFn).not.toThrow();
    });
})