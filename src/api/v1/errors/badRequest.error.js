/* eslint-disable import/extensions */
import CustomApiError from './customApi.error.js'

class BadRequestError extends CustomApiError {
  constructor(title = 'Bad Request from client', description = 'Client Side Error') {
    super(title, 400, description)
  }
}

export default BadRequestError
