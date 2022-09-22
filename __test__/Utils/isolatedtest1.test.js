/* eslint-disable no-undef */
const { signAccessToken } = require('../../Utils/tokens')
const mongoose = require('mongoose')

describe('jwt-package not given valid parameters', () => {
    test('Should throw an error with statuscode 500', async () => {
        try {
            const userID = new mongoose.Types.ObjectId().toString()
            await signAccessToken(userID)
        } catch (error) {
            expect(error.statusCode).toBe(500)
            expect(error.message).not.toBe(undefined)
        }
    })
})
