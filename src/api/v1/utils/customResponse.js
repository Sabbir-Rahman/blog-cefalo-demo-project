class CustomResponse {
  constructor(res, statusCode, developerMessage, message, data) {
    this.res = res
    this.statusCode = statusCode
    this.developerMessage = developerMessage
    this.message = message
    this.data = data
  }

  sendResponse() {
    return this.res
      .status(this.statusCode)
      .send({ message: this.message, developerMessage: this.developerMessage, data: this.data })
  }
}

export default CustomResponse
