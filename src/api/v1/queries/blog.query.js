/* eslint-disable import/extensions */
import { logQueryError } from '../../../../logger/customLogger.js'
import BlogQueryAllowDto from '../dto/blogs/blogQueryAllow.dto.js'
import db from '../models/index.js'
import { paginationUtils } from '../utils/index.js'

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

  const { page, limit, offset } = paginationUtils.getPaginationInfo(queryData)
  const queryObj = BlogQueryAllowDto.createQueryObject(queryData)

  const blogs = await BlogModel.findAll({
    limit,
    offset,
    where: queryObj,
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

const deleteBlog = async (blogId) => {
  const BlogModel = db.db.blogs
  const blog = await BlogModel.destroy({ where: { blogId } })

  return blog
}

export default {
  createBlog,
  viewBlogs,
  getSingleBlogById,
  isAuthorizedToEditBlog,
  editBlog,
  deleteBlog,
}
