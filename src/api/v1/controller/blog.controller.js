/* eslint-disable import/extensions */
import blogService from '../services/blog.service.js'
import validation from '../validators/blog.js'
import constants from '../../../../constants/default.js'

// 1. craete blog
const createBlog = async (req, res) => {
  const response = {
    isSuccess: false,
    statusCode: 400,
    message: 'Blog not created',
    developerMessage: '',
    isReadOnly: false,
    data: {},
  }

  const { error, value } = validation.blogSchemaValidator.validate(req.body)

  if (error) {
    response.developerMessage = {
      message: constants.errorMessage.VALIDATION_ERROR,
      details: error.details,
    }
  } else {
    try {
      const authorId = res.locals.user.userId
      const newBlog = await blogService.createBlog(value, authorId)

      if (newBlog instanceof Error) {
        throw newBlog
      }

      response.isSuccess = true
      response.statusCode = 201
      response.message = 'Author created'
      response.data = newBlog
    } catch (err) {
      response.developerMessage = {
        message: err.message || constants.errorMessage.SOMETHING_WRONG,
        details: [],
      }
    }

    res.status(response.statusCode).json(response)
  }
}

export default { createBlog }
