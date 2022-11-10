const router = require('express').Router()
const { createAppeal, getAll, getOne, updateAppeal, deleteAppeal, appealList, comment, likeAppeal } = require('./controllers')
const validator = require('express-joi-validation').createValidator({})
const { createAppealSchema, idSchema, updateAppealSchema, appealListSchema, commentSchema } = require('./validators')
const upload = require('../Utils/multer')
const authMiddleware = require('../Middleware/authentication')

router.post('/create', authMiddleware, upload.single('image'), validator.body(createAppealSchema), createAppeal)
router.get('/profile/all', authMiddleware, getAll)
router.get('/:id', validator.params(idSchema), getOne)
router.patch('/update/:id', authMiddleware, upload.single('image'), validator.params(idSchema), validator.body(updateAppealSchema), updateAppeal)
router.delete('/delete/:id', authMiddleware, validator.params(idSchema), deleteAppeal)
router.get('/list/all', validator.query(appealListSchema), appealList)
router.patch('/comment/:id', validator.params(idSchema), validator.body(commentSchema), comment)
router.patch('/like/:id', validator.params(idSchema), likeAppeal)

module.exports = router
