/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import bcrypt from 'bcrypt'

import logger from '../../../../logger/defaultLogger'
import constants from '../../../../constants/default'
import { InternalServerError } from '../errors'

async function hashPassword(password: string) {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(password, salt)

    return hashPass
  } catch (error) {
    logger.error(error)
    throw new InternalServerError(
      constants.errorMessage.SOMETHING_WRONG,
      'Password Not Hashed by bcrypt',
    )
  }
}

async function comparePassword(inputPassword: string, userPassword: string) {
  try {
    return await bcrypt.compare(inputPassword, userPassword)
  } catch (error) {
    logger.error(error)

    throw new InternalServerError(
      constants.errorMessage.SOMETHING_WRONG,
      'Password cannot be compared by bcrypt',
    )
  }
}

export default {
  hashPassword,
  comparePassword,
}
