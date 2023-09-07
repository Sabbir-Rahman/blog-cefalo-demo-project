/* eslint-disable import/extensions */
import { Router } from 'express'
import { authController } from '../controller/index.js'
import auth from '../middlewares/auth.js'
import authRefresh from '../middlewares/authRefresh.js'

const router = Router()

router.post('/login', authController.userLogin)
router.post('/generate/token', authRefresh(), authController.generateAccesstokenWithRefreshToken)

export default router
