const mongoose = require('mongoose')

const WalletSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'please provide a userid']
    },
    total: {
        type: Number,
        required: [true, 'please provide the wallet total']
    }
}, { timestamps: true })

const db = mongoose.connection.useDb('Village')

module.exports = db.model('Wallets', WalletSchema)
