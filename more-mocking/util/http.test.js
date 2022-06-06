import { it, vi, expect } from 'vitest'
import { HttpError } from './errors';

import { sendDataRequest } from './http'

const testResponseData = { testKey: 'testData' }

const testFetch = vi.fn((url, option) => {
    return new Promise((res, rej) => {
        if (typeof option.body !== 'string') {
            return rej('not a string');
        }
        const testResponse = {
            ok: true,
            json() {
                return new Promise((res, rej) => {
                    res(testResponseData)
                })
            }
        }
        res(testResponse)
    })
});

vi.stubGlobal('fetch', testFetch)

it('should return any available response data', () => {
    const testData = { key: 'test' }

    return expect(sendDataRequest(testData)).resolves.toEqual(testResponseData);
})

it('should convert the provded data to JSON before sendind the request', async () => {
    const testData = { key: 'test' }

    let errorMessage;
    try {
        await sendDataRequest(testData)
    } catch (error) {
        errorMessage = error
    }

    expect(errorMessage).not.toBe('not a string')
})

it('should throw an httpError in case of non-ok responses', () => {
    testFetch.mockImplementationOnce((url, option) => {
        return new Promise((res, rej) => {
            const testResponse = {
                ok: false,
                json() {
                    return new Promise((res, rej) => {
                        res(testResponseData)
                    })
                }
            }
            res(testResponse)
        })
    })
    const testData = { key: 'test' }

    return expect(sendDataRequest(testData)).rejects.toBeInstanceOf(HttpError);

})