/* eslint-disable import/extensions */
import { blogQuery } from '../queries/index.js'
import defaultConstant from '../../../../constants/default.js'

const isOwnBlog = () => async (req, res, next) => {
  const blogId = req.params.id
  const authorId = req.accessToken.userId

  const hasPermissionToEdit = await blogQuery.isAuthorizedToEditBlog(authorId, blogId)
  if (hasPermissionToEdit) {
    return next()
  }

  return res
    .status(defaultConstant.HTTP_STATUS_CODE.FORBIDDEN)
    .json({ message: defaultConstant.errorMessage.NOT_AUTHORIZED })
}

export default isOwnBlog
