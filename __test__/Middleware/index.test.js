/* eslint-disable no-undef */
const errorHandler = require('../../Middleware/errorHandler')
const notFound = require('../../Middleware/notFound')
require('dotenv').config()

const mockResponse = () => {
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res
}

describe('Error Handler Middleware', () => {
    describe('Given a valid error object', () => {
        test('Error Code=11000 :Should return a response object with a 400 statusCode and body', async () => {
            const error = {
                code: 11000,
                keyValue: 'email'
            }
            const res = mockResponse()

            const req = jest.fn()
            const next = jest.fn()
            errorHandler(error, req, res, next)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.status).not.toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ msg: expect.any(String) }))
        })
        test('Validation Error :Should return a response object with a 400 statusCode and body', async () => {
            const error = {
                name: 'ValidationError',
                errors: ['error1', 'error2']
            }
            const res = mockResponse()

            const req = jest.fn()
            const next = jest.fn()
            errorHandler(error, req, res, next)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.status).not.toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ msg: expect.any(String) }))
        })
        test('Cast Error :Should return a response object with a 404 statusCode and body', async () => {
            const error = {
                name: 'CastError',
                value: 1223344555
            }
            const res = mockResponse()

            const req = jest.fn()
            const next = jest.fn()
            errorHandler(error, req, res, next)

            expect(res.status).toHaveBeenCalledWith(404)
            expect(res.status).not.toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ msg: `No item found with id : ${error.value}` }))
        })
        test('No custom error definition :Should return a response object with a 500 statusCode and body', async () => {
            const error = {}
            const res = mockResponse()

            const req = jest.fn()
            const next = jest.fn()
            errorHandler(error, req, res, next)

            expect(res.status).toHaveBeenCalledWith(500)
            expect(res.status).not.toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ msg: 'something went wrong, please try again later...' }))
        })
    })
})

describe('Notfound Middleware', () => {
    test('Should respond with an invalid route message', async () => {
        const mockResponse = () => {
            const res = {}
            res.send = jest.fn().mockReturnValue(res)
            return res
        }

        const res = mockResponse()
        const req = jest.fn()

        await notFound(req, res)

        expect(res.send).toHaveBeenCalledWith('Invalid Route')
        expect(res.send).not.toHaveBeenCalledWith('Hello world')
    })
})
