const Appeal = require('./model')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../Errors')
const { deleteImage } = require('../Utils/images')

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

const updateAppeal = async (req, res) => {
    const { id: _id } = req.params
    const image = req.file

    const oldAppeal = await Appeal.findById(_id)
    if (!oldAppeal) throw new NotFoundError('sorry this appeal does not exist')

    const update = { ...req.body }
    if (image) {
        await deleteImage(oldAppeal.personal_image)
        update.personal_image = `/uploads/image_upload/${image.filename}`
    }

    const appeal = await Appeal.findByIdAndUpdate({ _id }, update, { new: true, runValidators: true })
    res.status(StatusCodes.OK).json({ status: 'success', appeal })
}

const deleteAppeal = async (req, res) => {
    const { id: _id } = req.params

    const appeal = await Appeal.findByIdAndDelete(_id)
    if (!appeal) throw new NotFoundError('sorry this appeal does not exist')

    await deleteImage(appeal.personal_image)

    res.status(StatusCodes.OK).json({ status: 'success', msg: 'appeal deleted' })
}

const appealList = async (req, res) => {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 0
    const skip = (page - 1) * limit

    const appeals = await Appeal.find().sort('-amount_percentage').select('-__v -createdAt -updatedAt').skip(skip).limit(limit)

    res.status(StatusCodes.OK).json({ status: 'success', appeals, nbhits: appeals.length })
}

const comment = async (req, res) => {
    const { comment } = req.body
    const { id: _id } = req.params

    const appeal = await Appeal.findByIdAndUpdate({ _id }, { $push: { comments: comment } }, { runValidators: true, new: true })
    res.status(StatusCodes.OK).json({ status: 'success', appeal })
}

const likeAppeal = async (req, res) => {
    const { id: _id } = req.params

    const appeal = await Appeal.findByIdAndUpdate({ _id }, { $inc: { likes: 1 } }, { new: true, runValidators: true })
    res.status(StatusCodes.OK).json({ status: 'success', appeal })
}

module.exports = {
    createAppeal,
    getAll,
    getOne,
    updateAppeal,
    deleteAppeal,
    appealList,
    comment,
    likeAppeal
}
