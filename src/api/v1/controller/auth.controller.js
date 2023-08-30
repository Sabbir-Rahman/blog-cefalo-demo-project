/* eslint-disable import/extensions */
import validation from '../validators/author.js'
import defaultconfig from '../../../../config/default.js'

import constants from '../../../../constants/default.js'
import { authorService } from '../services/index.js'
import { jwtUtils } from '../utils/index.js'

// 1. create author
const userLogin = async (req, res) => {
  const response = {
    isSuccess: false,
    statusCode: 400,
    message: 'User not logged in',
    developerMessage: '',
    isReadOnly: false,
    data: {},
  }

  const { error, value } = validation.loginSchemaValidator.validate(req.body)

  if (error) {
    response.developerMessage = {
      message: constants.errorMessage.VALIDATION_ERROR,
      details: error.details,
    }
  } else {
    try {
      const user = await authorService.createAuthor(value)

      if (user instanceof Error) {
        throw user
      }

      const jwtPayload = {
        userId: user.id,
        name: user.name,
        role: ['author'],
      }

      const accessToken = jwtUtils.signJwt(jwtPayload, {
        expiresIn: defaultconfig.jwtConfig.ACCESS_TOKEN_TTL,
      })

      const refreshToken = jwtUtils.signJwt(jwtPayload, {
        expiresIn: defaultconfig.jwtConfig.REFRESH_TOKEN_TTL,
      })

      response.isSuccess = true
      response.statusCode = 201
      response.message = 'Author created'
      response.data = { user, accessToken, refreshToken }
    } catch (err) {
      response.developerMessage = {
        message: err.message || constants.errorMessage.SOMETHING_WRONG,
        details: [],
      }
    }
  }

  res.status(response.statusCode).json(response)
}
