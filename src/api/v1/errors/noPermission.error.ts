import CustomApiError from './customApi.error'

class NoPermissionError extends CustomApiError {
  constructor(title = 'No Permission', description = 'User not have permission to do this') {
    super(title, 403, description)
  }
}

export default NoPermissionError
