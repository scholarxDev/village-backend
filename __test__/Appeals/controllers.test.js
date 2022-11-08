/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../../app')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const { signAccessToken } = require('../test.tokens')
require('dotenv').config()

beforeEach(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
})

afterEach(async () => {
    await mongoose.disconnect()
    await mongoose.connection.close()
    mongoServer.stop()
})

const userID = '62f3c6de0b6fab3631581379'

describe('Appeal', () => {
    describe('Create Appeal Route', () => {
        describe('Given the user is validated', () => {
            // To run this particular test, provide an existing path to an image on your harddisk
            test.skip('Should return 201-statusCode and body', async () => {
                const accessToken = await signAccessToken(userID)
                const image = 'C:/Users/pc/Desktop/village/uploads/image_upload/image-1667914385420-410025789baseball.jpg'
                const response = await request(app)
                    .post('/api/v1/appeal/create')
                    .set('Authorization', `Bearer ${accessToken}`)
                    .attach('image', image)
                    .field('name', 'John Doe')
                    .field('nationality', 'Nigerian')
                    .field('level_of_education', 'Undergraduate')
                    .field('funding_recipient', 'personal')
                    .field('phone_number', '08081713338')
                    .field('about_yourself', 'about yourself')
                    .field('amount', 1000000)
                    .field('funding_deadline', '2022-12-15')
                    .field('why_need_funding', 'why I need funding')
                    .field('withdrawal_method', 'directly')
                    .field('final_words', 'final words')

                expect(response.statusCode).toBe(201)
                expect(response.body.status).toBe('success')
            })
        })
        describe('Given the user is not validated', () => {
            test('Should return 404-statusCode and error message', async () => {
                const response = await request(app)
                    .post('/api/v1/appeal/create')

                expect(response.statusCode).toBe(401)
                expect(response.body).toEqual({ msg: 'Authentication Invalid' })
            })
        })
    })
})
