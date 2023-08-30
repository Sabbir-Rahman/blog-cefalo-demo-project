/* eslint-disable import/extensions */
import { v4 as uuidv4 } from 'uuid'

import { logServiceError } from '../../../../logger/customLogger.js'
import { blogQuery } from '../queries/index.js'

const FILENAME = 'src/api/v1/services/author.service.js'

const createBlog = async (inputData, authorId) => {
  try {
    const uniqueId = uuidv4()
    console.log(authorId)
    const newBlog = {
      ...inputData,
      authorId,
      blogId: uniqueId,
    }

    const blog = await blogQuery.createBlog(newBlog)

    return blog
  } catch (error) {
    logServiceError('createBlog', FILENAME, error)
    return new Error(error.message)
  }
}

const viewBlog = async (inputData) => {
  try {
    let blog

    if (inputData) blog = await blogQuery.getSingleBlogById(inputData)
    else blog = await blogQuery.viewBlogs()

    return blog
  } catch (error) {
    logServiceError('viewBlog', FILENAME, error)
    return new Error(error.message)
  }
}

export default { createBlog, viewBlog }
