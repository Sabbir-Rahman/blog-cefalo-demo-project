/* eslint-disable import/extensions */
import { logQueryError } from '../../../../logger/customLogger.js'
import db from '../models/index.js'

const FILENAME = 'src/api/v1/queries/author.query.js'

const createBlog = async (queryData) => {
  const BlogModel = db.db.blogs
  const newBlog = await BlogModel.create(queryData)

  return newBlog
}

const getSingleBlogById = async (blogId) => {
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
}

const viewBlogs = async (queryData) => {
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
}

const editBlog = async (updateData, blogId) => {
  const BlogModel = db.db.blogs
  const blog = await BlogModel.update(updateData, { where: { blogId } })

  return blog
}

const isAuthorizedToEditBlog = async (authorId, blogId) => {
  const BlogModel = db.db.blogs
  const blog = await BlogModel.findOne({
    where: { authorId, blogId },
    returning: true,
    plain: true,
  })

  if (blog) return true

  return false
}

export default {
  createBlog,
  viewBlogs,
  getSingleBlogById,
  isAuthorizedToEditBlog,
  editBlog,
}
