/* eslint-disable import/extensions */
import { Router } from 'express'
import { authController } from '../controller/index.js'

const router = Router()

router.post('/login', authController.userLogin)

export default router
