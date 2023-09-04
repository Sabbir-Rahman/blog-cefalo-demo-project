/* eslint-disable import/extensions */
import CustomApiError from './customApi.error.js'
import constants from '../../../../constants/default.js'

class BadRequestError extends CustomApiError {
  constructor(title = 'Bad Request from client', description = 'Client Side Error') {
    super(title, constants.HTTP_STATUS_CODE.BAD_REQUEST, description)
  }
}

export default BadRequestError
