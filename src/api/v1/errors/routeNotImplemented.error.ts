import CustomApiError from './customApi.error'

class routeNotImplementedError extends CustomApiError {
  constructor(title = 'Route not implemented', description = 'Service or feature for this route not implemented in the server') {
    super(title, 400, description)
  }
}

export default routeNotImplementedError
