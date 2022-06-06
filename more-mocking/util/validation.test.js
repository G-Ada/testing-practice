import { expect, it, test } from 'vitest'
import { validateNotEmpty } from './validation'

it('should throw and error if an empty string is provided as a value', () => {
    const testImput = ''

    const validationFn = () => validateNotEmpty(testImput);

    expect(validationFn).toThrow()
})

it('should throw and error if an string full of blanks is provided as a value', () => {
    const testImput = '     '

    const validationFn = () => validateNotEmpty(testImput);

    expect(validationFn).toThrow()
})

it('should throw an error with the provided error messsage', () => {
    const testImput = ''
    const testErrorMessage = 'test'

    const validationFn = () => validateNotEmpty(testImput, testErrorMessage);

    expect(validationFn).toThrow(testErrorMessage)
})

