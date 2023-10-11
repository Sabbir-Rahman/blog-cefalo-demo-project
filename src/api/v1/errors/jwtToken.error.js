/* eslint-disable import/extensions */
import CustomApiError from './customApi.error.js'

class JwtTokenError extends CustomApiError {
  constructor(title = 'Not Authenticated', description = 'Please login again') {
    super(title, 400, description)
  }
}

export default JwtTokenError
