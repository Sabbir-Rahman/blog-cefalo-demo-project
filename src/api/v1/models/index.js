/* eslint-disable import/extensions */
import { Sequelize, DataTypes } from 'sequelize'
import defaultConfig from '../../../../config/default.js'
import productSchema from './productModel.js'

const sequelize = new Sequelize(
  defaultConfig.DBCONFIG.DB,
  defaultConfig.DBCONFIG.USER,
  defaultConfig.DBCONFIG.PASSWORD,
  {
    host: defaultConfig.DBCONFIG.HOST,
    dialect: defaultConfig.DBCONFIG.dialect,
    operatorsAliases: false,
    pool: {
      max: defaultConfig.DBCONFIG.pool.max,
      min: defaultConfig.DBCONFIG.pool.min,
      acquire: defaultConfig.DBCONFIG.pool.acquire,
      idle: defaultConfig.DBCONFIG.pool.idle,
    },
  },
)

sequelize.authenticate().then(() => {
  console.log('Db Connected')
})

const db = {}

// constructor
db.Sequelize = Sequelize
// instance
db.sequelize = sequelize

db.products = productSchema(sequelize, DataTypes)

// true will erase all the data and create table again and again
db.sequelize.sync({ force: false }).then(() => {
  console.log('Yes resync done')
})

export default db
