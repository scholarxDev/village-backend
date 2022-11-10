/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../../app')
const Appeal = require('../../Appeals/model')
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
const appealID = '62f3c6de0b6fab363158137b'

const dummyAppeal = {
    _id: appealID,
    userid: userID,
    name: 'Jane Doe',
    nationality: 'Nigerian',
    level_of_education: 'Undergraduate',
    funding_recipient: 'personal',
    phone_number: '08081713338',
    personal_image: '/uploads/image_upload/image-1667981932455-322084408orb.jpg',
    about_yourself: 'about myself',
    why_need_funding: 'Why I need funding',
    amount: 1000000,
    funding_deadline: '2022-12-15',
    withdrawal_method: 'directly',
    final_words: 'finaly words'
}

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

    describe('Get All Appeals Route', () => {
        describe('Given the user is validated', () => {
            test('Should return 200-statuscode and an array of appeals', async () => {
                const accessToken = await signAccessToken(userID)
                await new Appeal({ ...dummyAppeal }).save()

                const response = await request(app)
                    .get('/api/v1/appeal/profile/all')
                    .set('Authorization', `Bearer ${accessToken}`)

                expect(response.statusCode).toBe(200)
                expect(response.body.status).toBe('success')
            })
        })
        describe('Given the user is not validated', () => {
            test('Should return 404-statusCode and error message', async () => {
                await new Appeal({ ...dummyAppeal }).save()

                const response = await request(app)
                    .get('/api/v1/appeal/profile/all')

                expect(response.statusCode).toBe(401)
                expect(response.body).toEqual({ msg: 'Authentication Invalid' })
            })
        })
    })

    describe('Get One Appeal Route', () => {
        describe('Given the correct parameters', () => {
            test('Should return 200-statuscode and a body', async () => {
                await new Appeal({ ...dummyAppeal }).save()

                const response = await request(app)
                    .get(`/api/v1/appeal/${appealID}`)

                expect(response.statusCode).toBe(200)
                expect(response.body.status).toBe('success')
            })
        })
        describe('Given the appeal does not exist', () => {
            test('Should return 404-statusCode and error message', async () => {
                const response = await request(app)
                    .get('/api/v1/appeal/62f3c6de0b6fab363158137b')

                expect(response.statusCode).toBe(404)
                expect(response.body).toEqual({ msg: 'sorry this appeal does not exist' })
            })
        })
    })

    describe('Update Appeal Route', () => {
        describe('Given the user is validated', () => {
            // To run this particular test, provide an existing path to an image on your harddisk
            test.skip('Should return 200-statusCode and updated body if appeal exists', async () => {
                const accessToken = await signAccessToken(userID)
                await new Appeal({ ...dummyAppeal }).save()
                const image = 'C:/Users/pc/Desktop/village/uploads/image_upload/image-1667995955757-873893870night_tree.jpg'

                const response = await request(app)
                    .patch(`/api/v1/appeal/update/${appealID}`)
                    .set('Authorization', `Bearer ${accessToken}`)
                    .attach('image', image)
                    .field('name', 'John Doe(updated)')

                expect(response.statusCode).toBe(200)
                expect(response.body.status).toBe('success')
            })

            test('Should return 404-statusCode and error message if appeal does not exists', async () => {
                const accessToken = await signAccessToken(userID)

                const response = await request(app)
                    .patch('/api/v1/appeal/update/62f3c6de0b6fab363158137c')
                    .set('Authorization', `Bearer ${accessToken}`)
                    .field('name', 'John Doe(updated)')

                expect(response.statusCode).toBe(404)
                expect(response.body).toEqual({ msg: 'sorry this appeal does not exist' })
            })
        })
        describe('Given the user is not validated', () => {
            test('Should return 404-statusCode and error message', async () => {
                const response = await request(app)
                    .patch('/api/v1/appeal/update/62f3c6de0b6fab363158137c')
                    .field('name', 'John Doe(updated)')

                expect(response.statusCode).toBe(401)
                expect(response.body).toEqual({ msg: 'Authentication Invalid' })
            })
        })
    })

    describe('Delete Appeal Route', () => {
        describe('Given the user is validated', () => {
            test('Should return 200-statusCode and message if appeal exists', async () => {
                const accessToken = await signAccessToken(userID)
                await new Appeal({ ...dummyAppeal }).save()

                const response = await request(app)
                    .del(`/api/v1/appeal/delete/${appealID}`)
                    .set('Authorization', `Bearer ${accessToken}`)

                expect(response.statusCode).toBe(200)
                expect(response.body.status).toBe('success')
            })

            test('Should return 404-statusCode and error message if appeal does not exists', async () => {
                const accessToken = await signAccessToken(userID)

                const response = await request(app)
                    .del('/api/v1/appeal/delete/62f3c6de0b6fab363158137c')
                    .set('Authorization', `Bearer ${accessToken}`)

                expect(response.statusCode).toBe(404)
                expect(response.body).toEqual({ msg: 'sorry this appeal does not exist' })
            })
        })
        describe('Given the user is not validated', () => {
            test('Should return 404-statusCode and error message', async () => {
                const response = await request(app)
                    .del('/api/v1/appeal/delete/62f3c6de0b6fab363158137c')

                expect(response.statusCode).toBe(401)
                expect(response.body).toEqual({ msg: 'Authentication Invalid' })
            })
        })
    })

    describe('List Appeals Route', () => {
        describe('Given the correct query params if any', () => {
            test('Should return 200-statuscode and an array of appeals', async () => {
                await new Appeal({ ...dummyAppeal }).save()

                const response = await request(app)
                    .get('/api/v1/appeal/list/all')
                    .query({ page: 1, limit: 10 })

                expect(response.statusCode).toBe(200)
                expect(response.body.status).toBe('success')
            })
        })
    })
})
