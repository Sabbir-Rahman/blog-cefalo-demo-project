/* eslint-disable import/extensions */
import { Router } from 'express'
import { productRouter } from './router/index.js'

const v1Router = Router()

v1Router.use('/products', productRouter)
export default v1Router
