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

  if (newAuthor) {
    return true
  }
  return false
}

const getSingleAuthorById = async (authorId) => {
  try {
    const AuthorModel = db.db.authors
    const author = await AuthorModel.findOne({
      where: { id: authorId },
      attributes: ['id', 'name', 'email'],
    })

    return author
  } catch (error) {
    logQueryError('getSingleAuthorById', FILENAME, JSON.stringify(error.errors))
    throw new Error(error)
  }
}

const getSingleAuthorByEmail = async (authorEmail) => {
  try {
    const AuthorModel = db.db.authors
    const author = await AuthorModel.findOne({
      where: { email: authorEmail },
      attributes: ['id', 'name', 'email', 'password'],
    })

    return author
  } catch (error) {
    logQueryError('getSingleAuthorByEmail', FILENAME, JSON.stringify(error.errors))
    throw new Error(error)
  }
}

const viewAuthors = async () => {
  try {
    const AuthorModel = db.db.authors
    const authors = await AuthorModel.findAll({ attributes: ['id', 'name', 'email'] })

    return authors
  } catch (error) {
    logQueryError('viewAuthors', FILENAME, JSON.stringify(error.errors))
    throw new Error(error)
  }
}

export default {
  createAuthor,
  authorDuplicateMail,
  getSingleAuthorById,
  viewAuthors,
  getSingleAuthorByEmail,
}
