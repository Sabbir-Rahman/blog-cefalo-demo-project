/* eslint-disable import/extensions */
import { Router } from 'express'
import { authController } from '../controller/index.js'
import auth from '../middlewares/auth.middleware.js'
import authRefresh from '../middlewares/authRefresh.middleware.js'
import validation from '../validators/author.js'
import validate from '../middlewares/validate.middleware.js'

const router = Router()

router.post('/login', validate(validation.loginSchemaValidator), authController.userLogin)
router.post('/generate/token', authRefresh(), authController.generateAccesstokenWithRefreshToken)

export default router
