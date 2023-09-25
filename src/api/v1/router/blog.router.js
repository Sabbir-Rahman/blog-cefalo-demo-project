/* eslint-disable import/extensions */
import { Router } from 'express'
import { blogController } from '../controller/index.js'
import auth from '../middlewares/auth.middleware.js'
import isOwnBlog from '../middlewares/ownBlog.middleware.js'
import validate from '../middlewares/validate.middleware.js'
import validation from '../validators/blog.js'

const router = Router()

router.post('/', validate(validation.blogSchemaValidator), auth(), blogController.createBlog)
router.get('/', blogController.viewBlog)
router.get('/:id', blogController.viewBlog)
router.get('/author/:id', blogController.viewBlogsOfAuthor)
router.patch(
  '/:id',
  [auth(), isOwnBlog(), validate(validation.editblogSchemaValidator)],
  blogController.editBlog,
)
router.delete('/:id', [auth(), isOwnBlog()], blogController.deleteBlog)

export default router
