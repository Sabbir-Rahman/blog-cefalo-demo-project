/* eslint-disable import/extensions */
import { Sequelize, DataTypes } from 'sequelize'
import productSchema from './productModel.js'
import logger from '../../../../logger/defaultLogger.js'

const db = {}

const initiateSchema = async(sequelize) => {
  // constructor
  db.Sequelize = Sequelize
  // instance
  db.sequelize = sequelize

  db.products = productSchema(sequelize, DataTypes)

  // true will erase all the data and create table again and again
  db.sequelize.sync({ force: false }).then(() => {
    logger.info('Resync done')
  })

  return db
}

export default { db, initiateSchema }
