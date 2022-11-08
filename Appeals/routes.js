const router = require('express').Router()
const { createAppeal } = require('./controllers')
const validator = require('express-joi-validation').createValidator({})
const { createAppealSchema } = require('./validators')
const upload = require('../Utils/multer')
const authMiddleware = require('../Middleware/authentication')

router.post('/create', authMiddleware, upload.single('image'), validator.body(createAppealSchema), createAppeal)

module.exports = router
