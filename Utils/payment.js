const got = require('got')
const Flutterwave = require('flutterwave-node-v3')
const flw = new Flutterwave(process.env.FLUTTER_PUBLIC_KEY, process.env.FLUTTER_SECRET_KEY)

const verifyFlutterPayment = async (req) => {
    const Transaction = await got.get(`${process.env.FLUTTER_TRANS_URL}?tx_ref=${req.query.tx_ref}`, {
        headers: {
            Authorization: `Bearer ${process.env.FLUTTER_SECRET_KEY}`
        }
    }).json()

    if (req.query.status === 'successful') {
        const response = await flw.Transaction.verify({ id: req.query.transaction_id })

        if (response.data && response.data.status === Transaction.data[0].status && response.data.amount === Transaction.data[0].amount && response.data.currency === Transaction.data[0].currency) {
            return response
        } else {
            return null
        }
    } else {
        return null
    }
}

module.exports = {
    verifyFlutterPayment
}
