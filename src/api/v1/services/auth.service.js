/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */

import { logServiceError } from '../../../../logger/customLogger.js'
import { authorQuery } from '../queries/index.js'
import { bcryptUtils } from '../utils/index.js'
import constants from '../../../../constants/default.js'

const FILENAME = 'src/api/v1/services/auth.service.js'

const userLogin = async (inputData) => {
  try {
    const userExist = await authorQuery.getSingleAuthorByEmail(inputData.email)

    if (!userExist) {
      throw new Error(constants.errorMessage.EMAIL_USER_NOT_FOUND)
    }

    const userPass = await bcryptUtils.comparePassword(userExist.password, inputData.password)

    if (!userPass) {
      throw new Error(constants.errorMessage.PASSWORD_NOT_MATCH)
    }

    delete userExist.password

    return userExist
  } catch (error) {
    logServiceError('createAuthor', FILENAME, error)
    return new Error(error.message)
  }
}

export default { userLogin }
