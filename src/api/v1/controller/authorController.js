/* eslint-disable import/extensions */
import validation from '../validators/author.js'
import constants from '../../../../constants/default.js'
import { authorService } from '../services/index.js'

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
      response.isSuccess = true
      response.statusCode = 201
      response.message = 'Author created'
      response.data = newAuthor
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
