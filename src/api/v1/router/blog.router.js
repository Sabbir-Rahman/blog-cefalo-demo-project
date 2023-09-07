/* eslint-disable import/extensions */
import { Router } from 'express'
import { blogController } from '../controller/index.js'
import auth from '../middlewares/auth.middleware.js'
import isOwnBlog from '../middlewares/ownBlog.middleware.js'

const router = Router()

router.post('/', auth(), blogController.createBlog)
router.get('/', blogController.viewBlog)
router.get('/:id', blogController.viewBlog)
router.patch('/:id', [auth(), isOwnBlog()], blogController.editBlog)
router.delete('/:id', [auth(), isOwnBlog()], blogController.deleteBlog)

export default router
