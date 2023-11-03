/* eslint-disable import/extensions */
import CustomApiError from './customApi.error'

class InternalServerError extends CustomApiError {
  constructor(title = 'Something went wrong in the server', description = 'Server Side Error') {
    super(title, 500, description)
  }
}

export default InternalServerError
