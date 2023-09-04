/* eslint-disable import/no-extraneous-dependencies */
import json2xml from 'json2xml'
import json2html from 'json2html'
import { jsonToPlainText } from 'json-to-plain-text'

class CustomResponse {
  constructor(res, statusCode, developerMessage, message, data) {
    this.res = res
    this.statusCode = statusCode
    this.developerMessage = developerMessage
    this.message = message
    this.data = data

    this.responseObj = {
      message: this.message,
      developerMessage: this.developerMessage,
      data: this.data,
    }
  }

  sendHTMLResponse() {
    return this.res.status(this.statusCode).send(json2html.render(this.responseObj))
  }

  sendTEXTResponse() {
    return this.res.status(this.statusCode).send(jsonToPlainText(JSON.stringify(this.responseObj)))
  }

  sendJSONResponse() {
    return this.res.status(this.statusCode).send(this.responseObj)
  }

  sendXMLResponse() {
    return this.res.status(this.statusCode).send(json2xml(this.responseObj))
  }

  sendResponse() {
    // first option application/json is choosen bydefault
    return this.res.format({
      'application/json': this.sendJSONResponse.bind(this),
      'text/xml': this.sendXMLResponse.bind(this),
      'text/html': this.sendHTMLResponse.bind(this),
      'text/plain': this.sendTEXTResponse.bind(this),
    })
  }
}

export default CustomResponse