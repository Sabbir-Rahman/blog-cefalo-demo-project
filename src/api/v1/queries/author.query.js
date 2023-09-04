/* eslint-disable import/extensions */
import { logQueryError } from '../../../../logger/customLogger.js'
import db from '../models/index.js'

const FILENAME = 'src/api/v1/queries/author.query.js'

const createAuthor = async (queryData) => {
  const AuthorModel = db.db.authors
  const newAuthor = await AuthorModel.create(queryData)

  return newAuthor
}

const authorDuplicateMail = async (authorEmail) => {
  const AuthorModel = db.db.authors
  const newAuthor = await AuthorModel.findOne({ where: { email: authorEmail } })

  if (newAuthor) {
    return true
  }
  return false
}

const getSingleAuthorById = async (authorId) => {
  try {
    const AuthorModel = db.db.authors
    const author = await AuthorModel.findOne({
      where: { authorId },
      attributes: ['authorId', 'name', 'email'],
    })

    return author
  } catch (error) {
    logQueryError('getSingleAuthorById', FILENAME, JSON.stringify(error.errors))
    throw new Error(error)
  }
}

const getSingleAuthorByEmail = async (authorEmail) => {
  const AuthorModel = db.db.authors
  const author = await AuthorModel.findOne({
    where: { email: authorEmail },
    attributes: ['authorId', 'name', 'email', 'password'],
  })

  return author
}

export default {
  createAuthor,
  authorDuplicateMail,
  getSingleAuthorById,
  getSingleAuthorByEmail,
}
