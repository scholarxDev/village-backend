/* eslint-disable camelcase */
const Joi = require('joi')

const verifyPaymentQuerySchema = Joi.object().keys({
    status: Joi.string().required(),
    tx_ref: Joi.string().required(),
    transaction_id: Joi.string().required()
})

module.exports = {
    verifyPaymentQuerySchema
}
