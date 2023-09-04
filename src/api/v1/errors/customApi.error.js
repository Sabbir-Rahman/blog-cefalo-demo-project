class CustomApiError extends Error {
  constructor(title, statusCode, description) {
    super(description)
    Object.setPrototypeOf(this, new.target.prototype)

    this.title = title
    this.statusCode = statusCode
    this.description = description

    Error.captureStackTrace(this)
    console.log('=========================', title, description, statusCode)
  }
}

export default CustomApiError
