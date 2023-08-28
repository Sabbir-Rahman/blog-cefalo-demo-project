/* eslint-disable import/extensions */
import { Sequelize, DataTypes } from 'sequelize'
import dbConfig from '../../../../config/dbConfig.js'
import productSchema from './productModel.js'

const sequelize = new Sequelize(
  dbConfig.DBCONFIG.DB,
  dbConfig.DBCONFIG.USER,
  dbConfig.DBCONFIG.PASSWORD,
  {
    host: dbConfig.DBCONFIG.HOST,
    dialect: dbConfig.DBCONFIG.dialect,
    operatorsAliases: false,
    pool: {
      max: dbConfig.DBCONFIG.pool.max,
      min: dbConfig.DBCONFIG.pool.min,
      acquire: dbConfig.DBCONFIG.pool.acquire,
      idle: dbConfig.DBCONFIG.pool.idle,
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
