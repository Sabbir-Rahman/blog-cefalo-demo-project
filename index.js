/* eslint-disable import/extensions */
import express from 'express'
import cors from 'cors'
import defaultConfig from './config/default.js'

import v1Router from './src/api/v1/v1Router.js'
import logger from './logger/defaultLogger.js'
import connectDb from './src/helpers/mysql.js'
import dbModel from './src/api/v1/models/index.js'
import v1CustomErrorHandler from './src/api/v1/middlewares/error.middleware.js'

const app = express()
const { PORT } = defaultConfig.generalConfig

const corsConfig = {
  origin: 'https://localhost:8081',
}

app.use(cors(corsConfig))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/', v1Router)

app.use(v1CustomErrorHandler)

app.get('/', (req, res) => {
  res.json({ message: 'Hello' })
})

app.listen(PORT, async () => {
  logger.info(`Server running on ${PORT}`)
  const sequlizeInstance = await connectDb()
  await dbModel.initiateSchema(sequlizeInstance)
})
