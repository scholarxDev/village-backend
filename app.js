// application wide middleware
require('dotenv').config()
require('express-async-errors')

// app setup
const express = require('express')
const app = express()
const path = require('path')
const appealRouter = require('./Appeals/routes')

// extra security packages
const cors = require('cors')
const helmet = require('helmet')
const xss = require('xss-clean')

// custom-built middleware
const notFound = require('./Middleware/notFound')
const errorHandlerMiddleware = require('./Middleware/errorHandler')

// inbuilt-middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// cors settings
app.use(cors())
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
}))
app.use(xss())

// test-route
app.get('/', (req, res) => {
    res.send('<h4>village api is up and running at </h4><a href="">Documentation</a>')
})

// images route
app.use('/uploads', express.static(path.join('uploads')))

// routes
app.use('/api/v1/appeal', appealRouter)

app.use(errorHandlerMiddleware)
app.use(notFound)

module.exports = app
