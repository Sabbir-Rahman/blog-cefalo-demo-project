import { Request, Response, NextFunction } from 'express'

import { blogQuery } from '../queries'
import defaultConstant from '../../../../constants/default'

const isOwnBlog = () => async (req: Request, res: Response, next: NextFunction) => {
  const blogId = req.params.id
  const authorId = res.locals.user.userId

  const hasPermissionToEdit = await blogQuery.isAuthorizedToEditBlog(authorId, blogId)
  if (hasPermissionToEdit) {
    return next()
  }

  return res
    .status(defaultConstant.HTTP_STATUS_CODE.FORBIDDEN)
    .json({ message: defaultConstant.errorMessage.NO_BLOG_FOUND_OR_NOT_FOUND })
}

export default isOwnBlog
