/* eslint-disable import/extensions */
import CustomApiError from './customApi.error.js'

class NoPermissionError extends CustomApiError {
  constructor(title = 'No Permission', description = 'User not have permission to do this') {
    super(title, 403, description)
  }
}

export default NoPermissionError
