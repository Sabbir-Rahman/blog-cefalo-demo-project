/* eslint-disable import/extensions */
import logger from './defaultLogger.js'

/* eslint-disable import/prefer-default-export */
export const logControllerError = (functionName, file, message) => {
  logger.error(`Controller|${functionName}|${file}|${message}`)
}

export const logServiceError = (functionName, file, message) => {
  logger.error(`Service|${functionName}|${file}|${message}`)
}

export const logQueryError = (functionName, file, message) => {
  logger.error(`Query|${functionName}|${file}|${message}`)
}
