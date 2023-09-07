/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
import { v4 as uuidv4 } from 'uuid'

import { logServiceError } from '../../../../logger/customLogger.js'
import { blogQuery } from '../queries/index.js'
import defaultConstants from '../../../../constants/default.js'
import { BlogCreateViewDto, BlogGeneralViewDto, BlogQueryAllowDto } from '../dto/blogs/index.js'
import NoPermissionError from '../errors/noPermission.error.js'

const FILENAME = 'src/api/v1/services/author.service.js'

const createBlog = async (inputData, authorId) => {
  const uniqueId = uuidv4()
  const newBlog = {
    ...inputData,
    authorId,
    blogId: uniqueId,
  }

  const blog = await blogQuery.createBlog(newBlog)

  return new BlogCreateViewDto(blog)
}

const viewBlog = async (inputData, queryData) => {
  let blog

  if (inputData) {
    const singleBlog = await blogQuery.getSingleBlogById(inputData)
    blog = new BlogGeneralViewDto(singleBlog)
  } else {
    const blogs = await blogQuery.viewBlogs(queryData)
    blog = blogs.map((singleBlog) => new BlogGeneralViewDto(singleBlog))
  }

  return blog
}

const viewBlogsByAuthor = async (authorId, queryData) => {
  const blogs = await blogQuery.viewBlogsByAuthor(authorId, queryData)
  const authorBlogs = blogs.map((singleBlog) => new BlogGeneralViewDto(singleBlog))
  return authorBlogs
}

const editBlog = async (inputData, blogId) => {
  await blogQuery.editBlog(inputData, blogId)

  const updatedBlog = await blogQuery.getSingleBlogById(blogId)
  return new BlogGeneralViewDto(updatedBlog)
}

const deleteBlog = async (blogId) => {
  await blogQuery.deleteBlog(blogId)

  return {}
}
export default {
  createBlog,
  viewBlog,
  editBlog,
  deleteBlog,
  viewBlogsByAuthor,
}
