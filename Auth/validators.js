/* eslint-disable no-unused-vars */
const Joi = require('joi')

const email = Joi.string().email().trim(true).required()
const password = Joi.string().min(6).trim(true).required().strict()
const id = Joi.string().hex().length(24).pattern(/^[0-9a-fA-F]{24}$/).required()

const registerSchema = Joi.object().keys({
    email,
    password
})

const loginSchema = Joi.object().keys({
    email,
    password
})

const forgotPasswordSchema = Joi.object().keys({
    email
})

const resetPasswordSchema = Joi.object().keys({
    new_password: password
})

const changePasswordSchema = Joi.object().keys({
    new_password: password,
    old_password: password
})

const idValidator = Joi.object().keys({
    id,
    token: Joi.string()
})

const requiredIdValidator = Joi.object().keys({
    id
})

module.exports = {
    registerSchema,
    loginSchema,
    forgotPasswordSchema,
    changePasswordSchema,
    idValidator,
    requiredIdValidator,
    resetPasswordSchema
}
