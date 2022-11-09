const fs = require('fs-extra')
const { InternalServerError } = require('../Errors')
const logger = require('./logger')

const deleteImage = async (path) => {
    try {
        const isThere = await fs.pathExists(process.cwd() + path)
        if (isThere) fs.unlink(process.cwd() + path)
    } catch (error) {
        logger.error(error.message)
        throw new InternalServerError('something went wrong, please try again later.')
    }
}

module.exports = {
    deleteImage
}
