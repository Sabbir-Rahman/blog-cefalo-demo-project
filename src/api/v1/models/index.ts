/* eslint-disable import/extensions */
import { Sequelize, DataTypes, Model, BuildOptions } from 'sequelize'
import { Author } from './authorModel'
import { Blog } from './blogModel'
import logger from '../../../../logger/defaultLogger'
import { sequlizeConfig } from '../../../helpers/mysql'

const initiateSchema = async (sequelize: Sequelize) => {
  Author.hasMany(Blog, {
    onDelete: 'CASCADE',
    foreignKey: {
      allowNull: false,
      name: 'authorId',
    },
  })

  Blog.belongsTo(Author, {
    foreignKey: {
      name: 'authorId',
      allowNull: false,
    },
  })

  // true will erase all the data and create table again and again
  sequelize.sync({ force: false }).then(() => {
    logger.info('Resync done')
  })
}

export default { initiateSchema }
