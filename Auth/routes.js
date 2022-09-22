const router = require('express').Router()
const validator = require('express-joi-validation').createValidator({})
const { register, login, googleSignin } = require('./controllers')
const { registerSchema, loginSchema } = require('./validators')
const passport = require('passport')

router.post('/register', validator.body(registerSchema), register)
router.post('/login', validator.body(loginSchema), login)
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/google/redirect', passport.authenticate('google'), googleSignin)

module.exports = router
