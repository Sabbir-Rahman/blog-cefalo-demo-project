/* eslint-disable import/extensions */
import { Router } from 'express'
import { authorController } from '../controller/index.js'

const router = Router()

router.post('/', authorController.createAuthor)
router.get('/', authorController.viewAuthor)
router.get('/:id', authorController.viewAuthor)

export default router
