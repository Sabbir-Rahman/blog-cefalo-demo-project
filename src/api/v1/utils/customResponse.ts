/* eslint-disable import/no-extraneous-dependencies */
import json2xml from 'json2xml'
import json2html from 'json2html'
import { jsonToPlainText, Options } from 'json-to-plain-text'
import { Response, Request } from 'express'

class CustomResponse {
  res: Response<any, Record<string, any>>
  statusCode: number
  developerMessage: string
  message: string
  data: Object
  responseObj: { message: any; developerMessage: any; data: any }
  constructor(
    res: Response,
    statusCode: number,
    developerMessage: string,
    message: string,
    data: Object,
  ) {
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
    // This is optional
    const options: Options = {
      color: true, // Whether to apply colors to the output or not
      spacing: true, // Whether to include spacing before colons or not
      seperator: ':', // seperate keys and values.
      squareBracketsForArray: false, // Whether to use square brackets for arrays or not
      doubleQuotesForKeys: false, // Whether to use double quotes for object keys or not
      doubleQuotesForValues: false, // Whether to use double quotes for string values or not
    }
    return this.res.status(this.statusCode).send(jsonToPlainText(JSON.stringify(this.responseObj), options))
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
