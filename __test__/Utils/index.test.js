/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const { signAccessToken } = require('../../Utils/tokens')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { MongoMemoryServer } = require('mongodb-memory-server')

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
})

afterAll(async () => {
    await mongoose.disconnect()
    await mongoose.connection.close()
    mongoServer.stop()
})

describe('tokens utility', () => {
    describe('Given a valid userid', () => {
        test('Should return an accessToken', async () => {
            const userID = new mongoose.Types.ObjectId().toString()
            const accessToken = await signAccessToken(userID)

            const testID = jwt.verify(accessToken, process.env.JWT_SECRET_ACCESS_TOKEN)

            expect(testID.id).toBe(userID)
            expect(testID.id).not.toBe('wrongid')
            expect(accessToken).toEqual(expect.any(String))
            expect(accessToken).not.toEqual('wrongstring')
        })
    })
    describe('Not-Given valid parameters', () => {
        test('Should return an invalid token', async () => {
            const userID = new mongoose.Types.ObjectId().toString()
            const accessToken = await signAccessToken()

            const testID = jwt.verify(accessToken, process.env.JWT_SECRET_ACCESS_TOKEN)

            expect(testID.id).toBe(undefined)
        })
    })
})
