import dotenv from 'dotenv'

dotenv.config()

const generalConfig = {
  PORT: process.env.PORT,
}

const bcryptConfig = {
  setWorkFactor: Number(process.env.SET_WORK_FACTOR),
}

const DBCONFIG = {
  HOST: process.env.HOST,
  USER: process.env.DBUSER,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DB,
  dialect: process.env.DIALECT,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}

export default { generalConfig, DBCONFIG, bcryptConfig }
