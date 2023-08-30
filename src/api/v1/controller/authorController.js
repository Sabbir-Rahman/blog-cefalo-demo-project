/* eslint-disable import/extensions */
import validation from '../validators/author.js'
import defaultconfig from '../../../../config/default.js'

import constants from '../../../../constants/default.js'
import { authorService } from '../services/index.js'
import { jwtUtils } from '../utils/index.js'

// 1. create author
const createAuthor = async (req, res) => {
  const response = {
    isSuccess: false,
    statusCode: 400,
    message: 'Author not created',
    developerMessage: '',
    isReadOnly: false,
    data: {},
  }

  const { error, value } = validation.authorSchemaValidator.validate(req.body)

  if (error) {
    response.developerMessage = {
      message: constants.errorMessage.VALIDATION_ERROR,
      details: error.details,
    }
  } else {
    const newAuthor = await authorService.createAuthor(value)

    if (newAuthor instanceof Error) {
      response.developerMessage = newAuthor.message
    } else {
      const jwtObject = {
        userId: newAuthor.id,
        name: newAuthor.name,
        role: ['author'],
      }

      // new access token
      const accessToken = jwtUtils.signJwt(jwtObject, {
        expiresIn: defaultconfig.jwtConfig.ACCESS_TOKEN_TTL,
      })

      // new refresh token
      const refreshToken = jwtUtils.signJwt(jwtObject, {
        expiresIn: defaultconfig.jwtConfig.REFRESH_TOKEN_TTL,
      })

      response.isSuccess = true
      response.statusCode = 201
      response.message = 'Author created'
      response.data = { newAuthor, accessToken, refreshToken }
    }
  }

  res.status(response.statusCode).json(response)
}

// 1. create author
const viewAuthor = async (req, res) => {
  const response = {
    isSuccess: false,
    statusCode: 400,
    message: 'Author not viewed',
    developerMessage: '',
    isReadOnly: false,
    data: {},
  }

  console.log(req.params.id)
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
