import express from 'express'
import cors from 'cors'
import defaultConfig from './config/default'

import v1Router from './src/api/v1/v1Router'
import logger from './logger/defaultLogger'
import connectDb from './src/helpers/mysql'
import dbModel from './src/api/v1/models/index'
import v1CustomErrorHandler from './src/api/v1/middlewares/error.middleware.js'

const app = express()
const { PORT } = defaultConfig.generalConfig

const corsConfig = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
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
