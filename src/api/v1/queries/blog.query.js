/* eslint-disable import/extensions */
import { logQueryError } from '../../../../logger/customLogger.js'
import db from '../models/index.js'

const FILENAME = 'src/api/v1/queries/author.query.js'

const createBlog = async (queryData) => {
  try {
    const BlogModel = db.db.blogs
    const newBlog = await BlogModel.create(queryData)

    return newBlog
  } catch (error) {
    logQueryError('createBlog', FILENAME, JSON.stringify(error.errors))
    throw new Error(error)
  }
}

const getSingleBlogById = async (blogId) => {
  try {
    const AuthorModel = db.db.authors
    const BlogModel = db.db.blogs
    const blog = await BlogModel.findOne({
      where: { blogId },
      attributes: ['blogId', 'title', 'body', 'authorId', 'createdAt', 'updatedAt'],
      include: [
        {
          model: AuthorModel,
          attributes: ['name', 'email'],
        },
      ],
    })

    return blog
  } catch (error) {
    logQueryError('getSingleBlogById', FILENAME, JSON.stringify(error.errors))
    throw new Error(error)
  }
}

const viewBlogs = async (queryData) => {
  try {
    const BlogModel = db.db.blogs
    const AuthorModel = db.db.authors
    const blogs = await BlogModel.findAll({
      where: queryData,
      attributes: ['blogId', 'title', 'body', 'authorId', 'createdAt', 'updatedAt'],
      include: [
        {
          model: AuthorModel,
          attributes: ['name', 'email'],
        },
      ],
    })

    return blogs
  } catch (error) {
    logQueryError('viewBlogs', FILENAME, JSON.stringify(error.errors))
    throw new Error(error)
  }
}

export default {
  createBlog,
  viewBlogs,
  getSingleBlogById,
}
