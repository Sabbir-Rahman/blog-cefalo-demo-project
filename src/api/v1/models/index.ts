/* eslint-disable import/extensions */
import { Sequelize, DataTypes, Model, BuildOptions } from 'sequelize'
import authorSchema from './authorModel'
import logger from '../../../../logger/defaultLogger.js'
import blogSchema from './blogModel'

let db

const initiateSchema = async (sequelize: Sequelize) => {
  db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    authors : authorSchema(sequelize),
    blogs : blogSchema(sequelize)
  }

  db.authors.hasMany(db.blogs, {
    onDelete: 'CASCADE',
    foreignKey: {
      allowNull: false,
      name: 'authorId',
    },
  })

  db.blogs.belongsTo(db.authors, {
    foreignKey: {
      name: 'authorId',
      allowNull: false,
    },
  })

  // true will erase all the data and create table again and again
  db.sequelize.sync({ force: false }).then(() => {
    logger.info('Resync done')
  })
}

export default { db, initiateSchema }