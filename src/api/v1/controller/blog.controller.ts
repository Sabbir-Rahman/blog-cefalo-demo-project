import blogService from '../services/blogService'
import constants from '../../../../constants/default'
import CustomResponse from '../utils/customResponse'
import { NextFunction, Request, Response } from 'express'

const createBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorId = res.locals.user.userId
    const newBlog = await blogService.createBlog({ ...req.body, authorId })

    return new CustomResponse(
      res,
      constants.HTTP_STATUS_CODE.CREATED,
      'Blog Created Successfully',,
      'Blog Created Successfully',
      newBlog,
    ).sendResponse()
  } catch (err) {
    return next(err)
  }
}

const viewBlog = async (req: Request, res: Response, next: NextFunction) => {
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

const viewBlogsOfAuthor = async (req: Request, res: Response, next: NextFunction) => {
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

const editBlog = async (req: Request, res: Response, next: NextFunction) => {
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

const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
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
