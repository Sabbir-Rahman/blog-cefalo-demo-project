/* eslint-disable import/extensions */
import { Router } from 'express'
import { authorRouter, authRouter } from './router/index.js'

const v1Router = Router()

v1Router.use('/authors', authorRouter)
v1Router.use('/auth', authRouter)
export default v1Router
