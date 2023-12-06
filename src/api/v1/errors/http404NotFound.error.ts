/* eslint-disable import/extensions */
import CustomApiError from './customApi.error'

class Http404DataNotFoundError extends CustomApiError {
  constructor(title = 'Necessary Data Not Exist in System', description = 'Client Side Error') {
    super(title, 404, description)
  }
}

export default Http404DataNotFoundError
