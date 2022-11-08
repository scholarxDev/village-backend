/* eslint-disable camelcase */
const Joi = require('joi')

const string = Joi.string().trim(true).required()
const phone_number = Joi.string().length(11).pattern(/^(?:(?:(?:\+?234(?:\\h1)?|01)\\h*)?(?:\(\d{3}\)|\d{3})|\d{4})(?:\W*\d{3})?\W*\d{4}$/).required()

const createAppealSchema = Joi.object().keys({
    name: string,
    nationality: string,
    level_of_education: string,
    funding_recipient: Joi.string().valid('personal', 'group', 'refferal').required(),
    phone_number,
    about_yourself: string,
    why_need_funding: string,
    amount: Joi.number().integer().required(),
    funding_deadline: Joi.date().iso().messages({ 'date.format': 'Date format is YYYY-MM-DD' }).required(),
    withdrawal_method: Joi.string().valid('directly', 'school', 'recipient').required(),
    final_words: string
})

module.exports = {
    createAppealSchema
}
