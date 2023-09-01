/* eslint-disable import/extensions */
import validation from '../validators/author.js'
import defaultconfig from '../../../../config/default.js'
import CustomResponse from '../utils/customResponse.js'
import constants from '../../../../constants/default.js'
import { authorService } from '../services/index.js'
import { jwtUtils } from '../utils/index.js'
import { logControllerError } from '../../../../logger/customLogger.js'

// 1. create author
const createAuthor = async (req, res) => {
  const { error, value } = validation.authorSchemaValidator.validate(req.body)
  let data = {}

  if (error) {
    const developerMessage = {
      message: constants.errorMessage.VALIDATION_ERROR,
      details: error.details,
    }

    return new CustomResponse(res, 400, developerMessage, 'Author Not Created', data).sendResponse()
  }
  try {
    const newAuthor = await authorService.createAuthor(value)

    if (newAuthor instanceof Error) {
      throw newAuthor
    }

    const jwtPayload = {
      userId: newAuthor.authorId,
      name: newAuthor.name,
      role: ['author'],
    }

    const accessToken = jwtUtils.signJwt(jwtPayload, {
      expiresIn: defaultconfig.jwtConfig.ACCESS_TOKEN_TTL,
    })

    const refreshToken = jwtUtils.signJwt(jwtPayload, {
      expiresIn: defaultconfig.jwtConfig.REFRESH_TOKEN_TTL,
    })

    data = { newAuthor, accessToken, refreshToken }
  } catch (err) {
    const developerMessage = {
      message: err.message || constants.errorMessage.SOMETHING_WRONG,
      details: [],
    }
    logControllerError('', '', err)
    return new CustomResponse(res, 400, developerMessage, 'Author Not Created', {}).sendResponse()
  }

  return new CustomResponse(res, 201, '', 'Author Created', data).sendResponse()
}

// 1. view author
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
