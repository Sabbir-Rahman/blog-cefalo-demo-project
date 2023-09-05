/* eslint-disable import/extensions */
import validation from '../validators/author.js'
import defaultconfig from '../../../../config/default.js'
import CustomResponse from '../utils/customResponse.js'
import constants from '../../../../constants/default.js'
import { authorService } from '../services/index.js'
import { jwtUtils } from '../utils/index.js'
import { logControllerError } from '../../../../logger/customLogger.js'
import { BadRequestError } from '../errors/index.js'

const createAuthor = async (req, res, next) => {
  const { error, value } = validation.authorSchemaValidator.validate(req.body)
  try {
    if (error) {
      throw new BadRequestError('Validation Error', error.details)
    }

    const { authorObj, accessToken, refreshToken } = await authorService.createAuthor(value)

    return new CustomResponse(res, constants.HTTP_STATUS_CODE.CREATED, '', 'Author Created', {
      authorObj,
      accessToken,
      refreshToken,
    }).sendResponse()
  } catch (err) {
    return next(err)
  }
}

const viewAuthor = async (req, res, next) => {
  try {
    const author = await authorService.viewAuthor(req.params.id)

    return new CustomResponse(
      res,
      constants.HTTP_STATUS_CODE.ACCEPTED,
      '',
      'Author View Successfull',
      author,
    ).sendResponse()
  } catch (error) {
    return next(error)
  }
}

export default { createAuthor, viewAuthor }
