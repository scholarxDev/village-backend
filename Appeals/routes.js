const router = require('express').Router()
const { createAppeal, getAll, getOne } = require('./controllers')
const validator = require('express-joi-validation').createValidator({})
const { createAppealSchema, idSchema } = require('./validators')
const upload = require('../Utils/multer')
const authMiddleware = require('../Middleware/authentication')

router.post('/create', authMiddleware, upload.single('image'), validator.body(createAppealSchema), createAppeal)
router.get('/profile/all', authMiddleware, getAll)
router.get('/:id', validator.params(idSchema), getOne)

module.exports = router
