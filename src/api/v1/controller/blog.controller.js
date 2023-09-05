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

const viewBlog = async (req, res, next) => {
  try {
    const blogId = req.params.id
    const blogs = await blogService.viewBlog(blogId, req.query)

    return new CustomResponse(
      res,
      constants.HTTP_STATUS_CODE.ACCEPTED,
      'Blog View Successfull',
      '',
      blogs,
    ).sendResponse()
  } catch (error) {
    return next(error)
  }
}

const editBlog = async (req, res, next) => {
  // stripUnknown to cancel out any unwanted input
  const { error, value } = validation.editblogSchemaValidator.validate(req.body, {
    stripUnknown: true,
  })

  try {
    if (error) {
      throw new BadRequestError('Validation Error', error.details)
    }

    const authorId = res.locals.user.userId
    const blogId = req.params.id

    const blog = await blogService.editBlog(value, blogId, authorId)

    return new CustomResponse(
      res,
      constants.HTTP_STATUS_CODE.ACCEPTED,
      'Blog Edited Successfull',
      'Blog Edited Successfull',
      blog,
    ).sendResponse()
  } catch (err) {
    return next(err)
  }
}

export default { createBlog, viewBlog, editBlog }
