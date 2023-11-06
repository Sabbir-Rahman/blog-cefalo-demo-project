/* eslint-disable import/extensions */
import logger from './defaultLogger'

/* eslint-disable import/prefer-default-export */
export const logControllerError = (functionName: string, file: string, message: string) => {
  logger.error(`Controller|${functionName}|${file}|${message}`)
}

export const logServiceError = (functionName: string, file: string, message: string) => {
  logger.error(`Service|${functionName}|${file}|${message}`)
}

export const logQueryError = (functionName: string, file: string, message: string) => {
  logger.error(`Query|${functionName}|${file}|${message}`)
}
