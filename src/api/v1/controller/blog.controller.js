/* eslint-disable import/extensions */
import blogService from '../services/blogService.js'
import constants from '../../../../constants/default.js'
import CustomResponse from '../utils/customResponse.js'
import { BadRequestError } from '../errors/index.js'

const createBlog = async (req, res, next) => {
  try {
    const authorId = req.accessToken.userId
    const newBlog = await blogService.createBlog({ ...req.body, authorId })

    return new CustomResponse(
      res,
      constants.HTTP_STATUS_CODE.CREATED,
      {},
      'Blog Created Successfully',
      newBlog,
    ).sendResponse()
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
      constants.HTTP_STATUS_CODE.OK,
      'Blog View Successfull',
      '',
      blogs,
    ).sendResponse()
  } catch (error) {
    return next(error)
  }
}

const viewBlogsOfAuthor = async (req, res, next) => {
  try {
    const authorId = req.params.id
    const blogs = await blogService.viewBlogsByAuthor({ authorId, ...req.query })

    return new CustomResponse(
      res,
      constants.HTTP_STATUS_CODE.OK,
      'Blog View Successfull',
      '',
      blogs,
    ).sendResponse()
  } catch (error) {
    return next(error)
  }
}

const editBlog = async (req, res, next) => {
  try {
    const blogId = req.params.id
    const blog = await blogService.editBlog(req.body, blogId)

    return new CustomResponse(
      res,
      constants.HTTP_STATUS_CODE.OK,
      'Blog Edited Successfull',
      'Blog Edited Successfull',
      blog,
    ).sendResponse()
  } catch (err) {
    return next(err)
  }
}

const deleteBlog = async (req, res, next) => {
  try {
    const blogId = req.params.id
    const blog = await blogService.deleteBlog(blogId)

    return new CustomResponse(
      res,
      constants.HTTP_STATUS_CODE.NO_CONTENT,
      'Delete Successfull',
      'Delete Successfull',
      blog,
    ).sendResponse()
  } catch (err) {
    return next(err)
  }
}

export default {
  createBlog,
  viewBlog,
  editBlog,
  deleteBlog,
  viewBlogsOfAuthor,
}
