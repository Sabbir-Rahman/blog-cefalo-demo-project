import { Router } from 'express'
import { authController } from '../controller'
import authRefresh from '../middlewares/authRefresh.middleware'
import validation from '../validators/author'
import validate from '../middlewares/validate.middleware'

const router = Router()

router.post('/login', validate(validation.loginSchemaValidator), authController.userLogin)
router.post('/generate/token', authRefresh(), authController.generateAccesstokenWithRefreshToken)

export default router
