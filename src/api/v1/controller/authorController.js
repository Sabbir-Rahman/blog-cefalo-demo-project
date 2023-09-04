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

const viewAuthor = async (req, res) => {
  const response = {
    isSuccess: false,
    statusCode: 400,
    message: 'Author not viewed',
    developerMessage: '',
    isReadOnly: false,
    data: {},
  }

  const author = await authorService.viewAuthor(req.params.id)

  if (author instanceof Error) {
    response.developerMessage = author.message
  } else {
    response.isSuccess = true
    response.statusCode = 200
    response.message = 'Author Viwed'
    response.data = author
  }

  res.status(response.statusCode).json(response)
}

export default { createAuthor, viewAuthor }
