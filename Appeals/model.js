const mongoose = require('mongoose')

const AppealSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'please provide a userid']
    },
    name: {
        type: String,
        required: [true, 'please provide your name']
    },
    nationality: {
        type: String,
        required: [true, 'please provide your nationality']
    },
    level_of_education: {
        type: String,
        required: [true, 'please provide your level of education']
    },
    funding_recipient: {
        type: String,
        required: [true, 'please provide the funding recipient'],
        values: {
            enum: ['personal', 'group', 'refferal'],
            message: '{VALUE} is not supported'
        }
    },
    phone_number: {
        type: String,
        required: [true, 'please provide your phone-number']
    },
    personal_image: {
        type: String,
        required: [true, 'please provide your personal image']
    },
    about_yourself: {
        type: String,
        required: [true, 'please provide a description about yourself']
    },
    why_need_funding: {
        type: String,
        required: [true, 'please provide reasons why you need funding']
    },
    amount: {
        type: Number,
        required: [true, 'please provide the amount needed']
    },
    amount_percentage: {
        type: Number,
        default: 0
    },
    funding_deadline: {
        type: Date,
        required: [true, 'please provide the deadline date']
    },
    withdrawal_method: {
        type: String,
        required: [true, 'please provide the withdrawal method'],
        values: {
            enum: ['directly', 'school', 'recipient'],
            message: '{VALUE} is not supported'
        }
    },
    final_words: {
        type: String,
        required: [true, 'please provide final words about this funding']
    },
    comments: [{
        name: {
            type: String,
            required: [true, 'please provide your name']
        },
        text: {
            type: String,
            required: [true, 'please provide your comment']
        },
        _id: false

    }],
    likes: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

const db = mongoose.connection.useDb('Village')

module.exports = db.model('Appeals', AppealSchema)
