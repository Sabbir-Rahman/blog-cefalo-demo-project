/* eslint-disable import/extensions */
import { Router } from 'express'
import { authorRouter, authRouter, blogRouter } from './router/index.js'

const v1Router = Router()

v1Router.use('/authors', authorRouter)
v1Router.use('/blogs', blogRouter)
v1Router.use('/auth', authRouter)
export default v1Router
