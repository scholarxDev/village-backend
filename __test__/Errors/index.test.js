/* eslint-disable no-undef */
const BadRequestError = require('../../Errors/badrequest')
const NotFoundError = require('../../Errors/notfound')
const UnauthenticatedError = require('../../Errors/unauthenticated')
const InternalServerError = require('../../Errors/internalservererror')

describe('Given error messages', () => {
    test('Bad Request Error: Should return 400 and error message', () => {
        expect(new BadRequestError('your request payload is invalid').statusCode).toBe(400)
        expect(new BadRequestError('your request payload is invalid').statusCode).not.toBe(200)
        expect(new BadRequestError('your request payload is invalid').message).toBe('your request payload is invalid')
        expect(new BadRequestError('your request payload is invalid').message).not.toBe('')
    })
    test('Not Found Error: Should return 404 and error message', () => {
        expect(new NotFoundError('this resource does not exist').statusCode).toBe(404)
        expect(new NotFoundError('this resource does not exist').statusCode).not.toBe(200)
        expect(new NotFoundError('this resource does not exist').message).toBe('this resource does not exist')
        expect(new NotFoundError('this resource does not exist').message).not.toBe('')
    })
    test('Unauthenticated Error: Should return 401 and error message', () => {
        expect(new UnauthenticatedError('Invalid Credentials').statusCode).toBe(401)
        expect(new UnauthenticatedError('Invalid Credentials').statusCode).not.toBe(200)
        expect(new UnauthenticatedError('Invalid Credentials').message).toBe('Invalid Credentials')
        expect(new UnauthenticatedError('Invalid Credentials').message).not.toBe('')
    })
    test('Internal Server Error: Should return 500 and error message', () => {
        expect(new InternalServerError('Something went wrong please try again later').statusCode).toBe(500)
        expect(new InternalServerError('Something went wrong please try again later').statusCode).not.toBe(200)
        expect(new InternalServerError('Something went wrong please try again later').message).toBe('Something went wrong please try again later')
        expect(new InternalServerError('Something went wrong please try again later').message).not.toBe('')
    })
})

describe('Not given error messages', () => {
    test('Bad Request Error: should return an empty string and a 400 status code', () => {
        expect(new BadRequestError().message).toBe('')
        expect(new BadRequestError().statusCode).toBe(400)
    })
    test('Not Found Error: should return an empty string and a 404 status code', () => {
        expect(new NotFoundError().message).toBe('')
        expect(new NotFoundError().statusCode).toBe(404)
    })
    test('Unauthenticated Error: should return an empty string and a 401 status code', () => {
        expect(new UnauthenticatedError().message).toBe('')
        expect(new UnauthenticatedError().statusCode).toBe(401)
    })
    test('Internal Server Error: should return an empty string and a 500 status code', () => {
        expect(new InternalServerError().message).toBe('')
        expect(new InternalServerError().statusCode).toBe(500)
    })
})
