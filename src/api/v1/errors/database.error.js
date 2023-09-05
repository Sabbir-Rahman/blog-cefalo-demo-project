/* eslint-disable import/extensions */
import CustomApiError from './customApi.error.js'

class DatabaseError extends CustomApiError {
  constructor(title = 'Something wrong in the databse', description = 'Database Error') {
    super(title, 400, description)
  }
}

export default DatabaseError
