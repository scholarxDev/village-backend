/* eslint-disable camelcase */
const Joi = require('joi')

const string = Joi.string().trim(true).required()
const string_not_required = Joi.string().trim(true)
const phone_number = Joi.string().length(11).pattern(/^(?:(?:(?:\+?234(?:\\h1)?|01)\\h*)?(?:\(\d{3}\)|\d{3})|\d{4})(?:\W*\d{3})?\W*\d{4}$/).required()
const phone_number_not_required = Joi.string().length(11).pattern(/^(?:(?:(?:\+?234(?:\\h1)?|01)\\h*)?(?:\(\d{3}\)|\d{3})|\d{4})(?:\W*\d{3})?\W*\d{4}$/)

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

const idSchema = Joi.object().keys({
    id: Joi.string().hex().length(24).pattern(/^[0-9a-fA-F]{24}$/).required()

})

const updateAppealSchema = Joi.object().keys({
    name: string_not_required,
    nationality: string_not_required,
    level_of_education: string_not_required,
    funding_recipient: Joi.string().valid('personal', 'group', 'refferal'),
    phone_number_not_required,
    about_yourself: string_not_required,
    why_need_funding: string_not_required,
    amount: Joi.number().integer(),
    funding_deadline: Joi.date().iso().messages({ 'date.format': 'Date format is YYYY-MM-DD' }),
    withdrawal_method: Joi.string().valid('directly', 'school', 'recipient'),
    final_words: string_not_required
})

module.exports = {
    createAppealSchema,
    idSchema,
    updateAppealSchema
}
