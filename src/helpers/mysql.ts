/* eslint-disable import/extensions */
import { Sequelize, Options } from 'sequelize'
import defaultConfig from '../../config/default'
import logger from '../../logger/defaultLogger'

const connectDb = async () => {
  const sequelize = new Sequelize(
    defaultConfig.DBCONFIG.DB,
    defaultConfig.DBCONFIG.USER,
    defaultConfig.DBCONFIG.PASSWORD,
    {
      host: defaultConfig.DBCONFIG.HOST,
      dialect: defaultConfig.DBCONFIG.dialect,
      pool: {
        max: defaultConfig.DBCONFIG.pool.max,
        min: defaultConfig.DBCONFIG.pool.min,
        acquire: defaultConfig.DBCONFIG.pool.acquire,
        idle: defaultConfig.DBCONFIG.pool.idle,
      },
    } as Options
  )

  sequelize.authenticate().then(() => {
    logger.info(`${defaultConfig.DBCONFIG.dialect} connected to ${defaultConfig.DBCONFIG.HOST}`)
  })

  return sequelize
}

export default connectDb
