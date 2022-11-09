const Appeal = require('./model')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../Errors')

const createAppeal = async (req, res) => {
    const body = { ...req.body }
    const image = req.file
    const { userID: userid } = req.user

    if (!image) throw new BadRequestError('image is required')
    const personalImage = `/uploads/image_upload/${image.filename}`
    body.personal_image = personalImage
    body.userid = userid

    const appeal = await Appeal.create(body)
    res.status(StatusCodes.CREATED).json({ status: 'success', appeal })
}

const getAll = async (req, res) => {
    const { userID: userid } = req.user

    const appeals = await Appeal.find({ userid }).select('-__v -updatedAt -createdAt')

    res.status(StatusCodes.OK).json({ status: 'success', appeals })
}

const getOne = async (req, res) => {
    const { id: _id } = req.params

    const appeal = await Appeal.findById(_id).select('-__v -createdAt -updatedAt')
    if (!appeal) throw new NotFoundError('sorry this appeal does not exist')

    res.status(StatusCodes.OK).json({ status: 'success', appeal })
}

module.exports = {
    createAppeal,
    getAll,
    getOne
}
