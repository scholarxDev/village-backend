const router = require('express').Router()
const { createAppeal, getAll, getOne, updateAppeal, deleteAppeal, appealList } = require('./controllers')
const validator = require('express-joi-validation').createValidator({})
const { createAppealSchema, idSchema, updateAppealSchema, appealListSchema } = require('./validators')
const upload = require('../Utils/multer')
const authMiddleware = require('../Middleware/authentication')

router.post('/create', authMiddleware, upload.single('image'), validator.body(createAppealSchema), createAppeal)
router.get('/profile/all', authMiddleware, getAll)
router.get('/:id', validator.params(idSchema), getOne)
router.patch('/update/:id', authMiddleware, upload.single('image'), validator.params(idSchema), validator.body(updateAppealSchema), updateAppeal)
router.delete('/delete/:id', authMiddleware, validator.params(idSchema), deleteAppeal)
router.get('/list/all', validator.query(appealListSchema), appealList)

module.exports = router
