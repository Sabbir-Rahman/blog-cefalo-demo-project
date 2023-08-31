/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
import { v4 as uuidv4 } from 'uuid'

import { logServiceError } from '../../../../logger/customLogger.js'
import { blogQuery } from '../queries/index.js'
import defaultConstants from '../../../../constants/default.js'

const FILENAME = 'src/api/v1/services/author.service.js'

const createBlog = async (inputData, authorId) => {
  try {
    const uniqueId = uuidv4()
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

const viewBlog = async (inputData, queryData) => {
  try {
    let blog
    console.log(queryData)
    if (inputData) blog = await blogQuery.getSingleBlogById(inputData)
    else blog = await blogQuery.viewBlogs(queryData)

    return blog
  } catch (error) {
    logServiceError('viewBlog', FILENAME, error)
    return new Error(error.message)
  }
}

const editBlog = async (inputData, blogId, authorId) => {
  try {
    const hasPermissionToEdit = await blogQuery.isAuthorizedToEditBlog(authorId, blogId)

    if (!hasPermissionToEdit) {
      throw new Error(defaultConstants.errorMessage.DENIED_EDIT_BLOG)
    }

    const editedBlog = await blogQuery.editBlog(inputData, blogId)

    return editedBlog
  } catch (error) {
    logServiceError('editBlog', FILENAME, error)
    return new Error(error.message)
  }
}

export default { createBlog, viewBlog, editBlog }
