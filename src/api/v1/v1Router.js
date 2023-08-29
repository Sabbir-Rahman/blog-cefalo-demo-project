/* eslint-disable import/extensions */
import { Router } from 'express'
import { authorRouter } from './router/index.js'

const v1Router = Router()

v1Router.use('/authors', authorRouter)
export default v1Router
