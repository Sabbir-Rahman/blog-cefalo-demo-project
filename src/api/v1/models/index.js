/* eslint-disable import/extensions */
import { Sequelize, DataTypes } from 'sequelize'
import authorSchema from './authorModel.js'
import logger from '../../../../logger/defaultLogger.js'
import blogSchema from './blogModel.js'

const db = {}

const initiateSchema = async (sequelize) => {
  // constructor
  db.Sequelize = Sequelize
  // instance
  db.sequelize = sequelize

  db.authors = authorSchema(sequelize, DataTypes)
  db.blogs = blogSchema(sequelize, DataTypes)

  db.authors.hasMany(db.blogs, {
    onDelete: 'CASCADE',
  })

  db.blogs.belongsTo(db.authors)

  // true will erase all the data and create table again and again
  db.sequelize.sync({ force: false }).then(() => {
    logger.info('Resync done')
  })
}

export default { db, initiateSchema }
