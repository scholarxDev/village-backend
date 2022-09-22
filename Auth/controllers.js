const { StatusCodes } = require('http-status-codes')
const User = require('./models')
const { UnauthenticatedError } = require('../Errors')
const { signAccessToken } = require('../Utils/tokens')
const { Find } = require('../Utils/passport')

const register = async (req, res) => {
    const user = await User.create({ ...req.body })
    res.status(StatusCodes.CREATED).json({ status: 'success', email: user.email })
}

const login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) throw new UnauthenticatedError('Invalid Credentials')

    const isMatch = await user.comparePassword(req.body.password)
    if (!isMatch) throw new UnauthenticatedError('Invalid Credentials')

    const accessToken = await signAccessToken(user._id)
    res.status(StatusCodes.OK).json({ status: 'success', accessToken, email: user.email, id: user._id })
}

const googleSignin = async (req, res) => {
    const user = req.user
    const validatedUser = await Find(user)

    const accessToken = await signAccessToken(validatedUser._id)
    res.status(StatusCodes.OK).json({ status: 'success', accessToken, email: validatedUser.email, id: validatedUser._id })
}

module.exports = {
    register,
    login,
    googleSignin
}
