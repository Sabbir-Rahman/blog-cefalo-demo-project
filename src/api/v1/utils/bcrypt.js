/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import bcrypt from 'bcrypt'

import logger from '../../../../logger/defaultLogger.js'
import constants from '../../../../constants/default.js'

async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(password, salt)

    return hashPass
  } catch (error) {
    logger.error(error)

    return constants.errorMessage.SOMETHING_WRONG
  }
}

async function comparePassword(userPassword, inputPassword) {
  try {
    return await bcrypt.compare(inputPassword, userPassword)
  } catch (error) {
    logger.error(error)

    return constants.errorMessage.SOMETHING_WRONG
  }
}

export default {
  hashPassword,
  comparePassword,
}
