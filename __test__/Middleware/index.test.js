/* eslint-disable no-undef */
const authMiddleware = require('../../Middleware/authentication')
const errorHandler = require('../../Middleware/errorHandler')
const notFound = require('../../Middleware/notFound')
const mongoose = require('mongoose')
const { signAccessToken } = require('../../Utils/tokens')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const mockResponse = () => {
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res
}

describe('Auth Middleware', () => {
    describe('Given a valid accessToken', () => {
        test('Should return a request object with a userid', async () => {
            const token = await signAccessToken(new mongoose.Types.ObjectId().toString())
            const req = {
                headers: {
                    authorization: 'Bearer ' + token
                }
            }
            const next = jest.fn()
            const res = jest.fn()
            await authMiddleware(req, res, next)

            expect(next).toHaveBeenCalled()
            expect(token).toEqual(expect.any(String))
            expect(req).toEqual({
                headers: {
                    authorization: expect.any(String)
                },
                user: {
                    userID: expect.any(String)
                }
            })
        })
    })

    describe('Given an Invalid accessToken', () => {
        test('No Bearer: Should return a 401-statusCode with an error message', async () => {
            const token = await signAccessToken(new mongoose.Types.ObjectId().toString())
            const req = {
                headers: {
                    authorization: token
                }
            }
            const next = jest.fn()
            const res = jest.fn()
            try {
                await authMiddleware(req, res, next)
            } catch (error) {
                expect(next).not.toHaveBeenCalled()
                expect(error.message).toMatch('Authentication Invalid')
                expect(error.statusCode).toBe(401)
            }
        })
        test('Strange/tampered token: Should return a 401-statusCode with an error message', async () => {
            const req = {
                headers: {
                    authorization: 'Bearer ' + 'wrongtoken/invalidtoken'
                }
            }
            const next = jest.fn()
            const res = jest.fn()
            try {
                await authMiddleware(req, res, next)
            } catch (error) {
                expect(next).not.toHaveBeenCalled()
                expect(error.message).toMatch('Authentication Invalid')
                expect(error.statusCode).toBe(401)
            }
        })
        test('Expired token: Should return a 401-statusCode with an error message', async () => {
            const token = jwt.sign({
                userID: new mongoose.Types.ObjectId().toString()
            }, process.env.JWT_SECRET_ACCESS_TOKEN, { expiresIn: '1s' })
            const req = {
                headers: {
                    authorization: 'Bearer ' + token
                }
            }
            const next = jest.fn()
            const res = jest.fn()
            await new Promise(resolve => setTimeout(resolve, 15000))
            try {
                await authMiddleware(req, res, next)
            } catch (error) {
                expect(next).not.toHaveBeenCalled()
                expect(error.message).toBe('jwt expired')
                expect(error.statusCode).toBe(401)
            }
        }, '20000')
    })
})
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
