const Appeal = require('./model')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../Errors')

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

module.exports = {
    createAppeal
}
