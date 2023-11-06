import { Router } from 'express'
import { authorController } from '../controller'
import validation from '../validators/author'
import validate from '../middlewares/validate.middleware'

const router = Router()

router.post('/', validate(validation.authorSchemaValidator), authorController.createAuthor)
router.get('/', authorController.viewAuthor)
router.get('/:id', authorController.viewAuthor)

export default router
