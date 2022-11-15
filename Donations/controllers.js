const { StatusCodes } = require('http-status-codes')
const Wallet = require('./model')
const Appeal = require('../Appeals/model')
const { verifyFlutterPayment } = require('../Utils/payment')

const verifyPayment = async (req, res) => {
    const transactionDetails = await verifyFlutterPayment(req)

    if (transactionDetails === null) {
        return res.status(StatusCodes.OK).json({ status: 'failure', msg: 'payment verification unsuccessful' })
    }
    const wallet = await Wallet.findOneAndUpdate({ userid: transactionDetails.data.meta.user_id }, { $inc: { total: transactionDetails.data.amount } })
    const appeal = await Appeal.findByIdAndUpdate({ _id: transactionDetails.data.meta.appeal_id }, { $inc: { amount_received: transactionDetails.data.amount } })
    if (wallet && appeal) {
        return res.status(StatusCodes.OK).json({ status: 'success', msg: 'payment verification successful' })
    }
    res.status(StatusCodes.OK).json({ msg: 'server error, please contact support' })
}

module.exports = {
    verifyPayment
}
