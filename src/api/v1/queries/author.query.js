/* eslint-disable import/extensions */
import { logQueryError } from '../../../../logger/customLogger.js'
import db from '../models/index.js'

const FILENAME = 'src/api/v1/queries/author.query.js'

const createAuthor = async (queryData) => {
  try {
    const AuthorModel = db.db.authors
    const newAuthor = await AuthorModel.create(queryData)

    return newAuthor
  } catch (error) {
    logQueryError('createAuthor', FILENAME, JSON.stringify(error.errors))
    throw new Error(error)
  }
}

const authorDuplicateMail = async (authorEmail) => {
  
    const AuthorModel = db.db.authors
    const newAuthor = await AuthorModel.findOne({ where: { email: authorEmail } })

    if (newAuthor){
      return true
    }
    return false
}

export default { createAuthor, authorDuplicateMail }
