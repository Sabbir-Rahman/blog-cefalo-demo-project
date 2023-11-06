/* eslint-disable import/extensions */
import { logQueryError } from '../../../../logger/customLogger'
import { AuthorInterface } from '../interfaces/modelInterfaces/author.interface'
import db from '../models'

const FILENAME = 'src/api/v1/queries/author.query.js'

const createAuthor = async (queryData: AuthorInterface) => {
  const AuthorModel = db.db.authors
  const newAuthor = await AuthorModel.create({ queryData })

  return newAuthor
}

const authorDuplicateMail = async (authorEmail: string) => {
  const AuthorModel = db.db.authors
  const newAuthor = await AuthorModel.findOne({ where: { email: authorEmail } })

  if (newAuthor) {
    return true
  }
  return false
}

const getSingleAuthorById = async (authorId: string) => {
  const AuthorModel = db.db.authors
  const author = await AuthorModel.findOne({
    where: { authorId },
  })

  return author
}

const getSingleAuthorByEmail = async (authorEmail: string) => {
    const AuthorModel = db.db.authors
    const author = await AuthorModel.findOne({
      where: { email: authorEmail },
      attributes: ['authorId', 'name', 'email', 'password'],
    })

    return author
  
}

const viewAuthors = async () => {
  const AuthorModel = db.db.authors
  const authors = await AuthorModel.findAll()

  return authors
}

export default {
  createAuthor,
  authorDuplicateMail,
  getSingleAuthorById,
  viewAuthors,
  getSingleAuthorByEmail,
}
