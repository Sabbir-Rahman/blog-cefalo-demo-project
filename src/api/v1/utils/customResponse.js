// import json2xml from 'json2xml'

class CustomResponse {
  constructor(res, statusCode, developerMessage, message, data) {
    this.res = res
    this.statusCode = statusCode
    this.developerMessage = developerMessage
    this.message = message
    this.data = data
  }

  // sendJSONResponse() {
  //   const jsonData = {
  //     message: this.message,
  //     developerMessage: this.developerMessage,
  //     data: this.data,
  //   }

  //   return this.res.status(this.statusCode).send(jsonData)
  // }

  // sendXMLResponse() {
  //   const xmlData = json2xml({
  //     message: this.message,
  //     developerMessage: this.developerMessage,
  //     data: this.data,
  //   })
  //   console.log('==========Hit=============')
  //   return this.res.status(this.statusCode).send(xmlData)
  // }

  // sendResponse() {
  //   return this.res.format({
  //     'text/xml': this.sendXMLResponse.bind(this),
  //     'application/json': this.sendJSONResponse(this),
  //     default: this.sendJSONResponse.bind(this),
  //   })
  // }

  sendResponse() {
    return this.res
      .status(this.statusCode)
      .send({ message: this.message, developerMessage: this.developerMessage, data: this.data })
  }
}

export default CustomResponse
