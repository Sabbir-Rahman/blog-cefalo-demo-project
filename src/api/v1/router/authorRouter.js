/* eslint-disable import/extensions */
import { Router } from 'express'
import { authorController } from '../controller/index.js'
import validation from '../validators/author.js'
import validate from '../middlewares/validate.middleware.js'

const router = Router()

router.post('/', validate(validation.authorSchemaValidator), authorController.createAuthor)
router.get('/', authorController.viewAuthor)
router.get('/:id', authorController.viewAuthor)

export default router
