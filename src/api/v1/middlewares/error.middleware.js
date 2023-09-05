/* eslint-disable import/extensions */
import logger from '../../../../logger/defaultLogger.js'

const customErrorHandler = (err, req, res, next) => {
  const customErr = {
    statusCode: err.statusCode,
    message: err.title,
    developerMessage: err.description,
  }
  switch (err.title) {
  case 'SequelizeValidationError':
    customErr.statusCode = 400
    customErr.developerMessage = err.errors
    break
  case 'SequelizeUniqueConstraintError':
    customErr.statusCode = 409
    customErr.developerMessage = err.fields
    break
  case 'SequelizeForeignKeyConstraintError':
    customErr.statusCode = 400
    customErr.developerMessage = err.fields
    break
  case 'SequelizeDatabaseError':
    customErr.statusCode = 500
    customErr.developerMessage = err.message
    break
  default:
    break
  }

  logger.error('Custom error ->', err)
  return res
    .status(err.statusCode)
    .send({ message: customErr.message, developerMessage: customErr.developerMessage })
}

export default customErrorHandler
