const router = require('express').Router()
const { verifyPayment } = require('./controllers')
const validator = require('express-joi-validation').createValidator({})
const { verifyPaymentQuerySchema } = require('./validators')

router.get('/verify', validator.query(verifyPaymentQuerySchema), verifyPayment)

module.exports = router
