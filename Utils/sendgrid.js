const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const logger = require('./logger')

const sendMail = async (options) => {
    try {
        await sgMail.send(options)
        return
    } catch (error) {
        logger.error(error.message, { tag: 'login mailer' })
    }
}

module.exports = {
    sendMail
}
