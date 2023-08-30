/* eslint-disable import/extensions */
import { Router } from 'express'
import { blogController } from '../controller/index.js'
import auth from '../middlewares/auth.js'

const router = Router()

router.post('/', auth(), blogController.createBlog)
router.get('/', blogController.viewBlog)
router.get('/:id', blogController.viewBlog)

export default router
