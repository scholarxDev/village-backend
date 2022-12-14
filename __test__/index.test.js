/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../app')

describe('App Instantiation', () => {
    test('Should show a documentation link', async () => {
        const response = await request(app)
            .get('/')
        expect(response.text).toBe('<h4>village api is up and running at </h4><a href="">Documentation</a>')
    })
})
