/* eslint-disable import/extensions */
import blogService from '../services/blog.service.js'
import validation from '../validators/blog.js'
import constants from '../../../../constants/default.js'
import CustomResponse from '../utils/customResponse.js'
import { BadRequestError } from '../errors/index.js'

const createBlog = async (req, res, next) => {
  const { error, value } = validation.blogSchemaValidator.validate(req.body)

  try {
    if (error) {
      throw new BadRequestError('Validation Error', error.details)
    }

    const authorId = res.locals.user.userId
    const newBlog = await blogService.createBlog(value, authorId)

    return new CustomResponse(res, constants.HTTP_STATUS_CODE.ACCEPTED, newBlog).sendResponse()
  } catch (err) {
    return next(err)
  }
}

const viewBlog = async (req, res) => {
  const response = {
    isSuccess: false,
    statusCode: 400,
    message: 'Blogs not viewed',
    developerMessage: '',
    isReadOnly: false,
    data: {},
  }

  const blogId = req.params.id
  const blogs = await blogService.viewBlog(blogId, req.query)

  if (blogs instanceof Error) {
    response.developerMessage = blogs.message
  }

  response.isSuccess = true
  response.statusCode = 200
  response.message = 'Blogs Viewed Successfully'
  response.data = blogs

  res.status(response.statusCode).json(response)
}

// 1. edit blog
const editBlog = async (req, res) => {
  const response = {
    isSuccess: false,
    statusCode: 400,
    message: 'Blog not edited',
    developerMessage: '',
    isReadOnly: false,
    data: {},
  }

  const { error, value } = validation.editblogSchemaValidator.validate(req.body, {
    stripUnknown: true,
  })
  if (error) {
    response.developerMessage = {
      message: constants.errorMessage.VALIDATION_ERROR,
      details: error.details,
    }
  } else {
    try {
      const authorId = res.locals.user.userId
      const blogId = req.params.id

      const blog = await blogService.editBlog(value, blogId, authorId)

      if (blog instanceof Error) {
        throw blog
      }

      response.isSuccess = true
      response.statusCode = 200
      response.message = 'Blog Edited'
      response.data = blog
    } catch (err) {
      response.developerMessage = {
        message: err.message || constants.errorMessage.SOMETHING_WRONG,
        details: [],
      }
    }

    res.status(response.statusCode).json(response)
  }
}

export default { createBlog, viewBlog, editBlog }
