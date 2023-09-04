/* eslint-disable import/extensions */
import { Sequelize, DataTypes } from 'sequelize'
import authorSchema from './author.model.js'
import logger from '../../../../logger/defaultLogger.js'

const db = {}

const initiateSchema = async (sequelize) => {
  // constructor
  db.Sequelize = Sequelize
  // instance
  db.sequelize = sequelize

  db.authors = authorSchema(sequelize, DataTypes)

  // true will erase all the data and create table again and again
  db.sequelize.sync({ force: false }).then(() => {
    logger.info('Resync done')
  })
}

export default { db, initiateSchema }
