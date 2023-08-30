/* eslint-disable import/extensions */
import { v4 as uuidv4 } from 'uuid'

import { logServiceError } from '../../../../logger/customLogger.js'
import { authorQuery } from '../queries/index.js'
import { bcryptUtils } from '../utils/index.js'
import constants from '../../../../constants/default.js'

const FILENAME = 'src/api/v1/services/author.service.js'

const createAuthor = async (inputData) => {
  try {
    const uniqueId = uuidv4()
    const hashPass = await bcryptUtils.hashPassword(inputData.password)

    if (await authorQuery.authorDuplicateMail(inputData.email)) {
      logServiceError('createAuthor', FILENAME, constants.errorMessage.DUPLICATE_EMAIL)
      return new Error(constants.errorMessage.DUPLICATE_EMAIL)
    }

    const newAuthor = {
      ...inputData,
      password: hashPass,
      authorId: uniqueId,
    }

    const author = await authorQuery.createAuthor(newAuthor)

    return author
  } catch (error) {
    logServiceError('createAuthor', FILENAME, error)
    return new Error(error.message)
  }
}

const viewAuthor = async (inputData) => {
  try {
    let author

    if (inputData) author = await authorQuery.getSingleAuthorById(inputData)
    else author = await authorQuery.viewAuthors()

    return author
  } catch (error) {
    logServiceError('viewAuthor', FILENAME, error)
    return new Error(error.message)
  }
}

export default { createAuthor, viewAuthor }
