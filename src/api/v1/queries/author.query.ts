import { Author } from '../models/authorModel'
import { AuthorInterface } from '../interfaces/modelInterfaces/author.interface'
import db from '../models'

const createAuthor = async (queryData: AuthorInterface) => {
  const newAuthor = await Author.create({ ...queryData })

  return newAuthor
}

const authorDuplicateMail = async (authorEmail: string) => {
  const newAuthor = await Author.findOne({ where: { email: authorEmail } })

  if (newAuthor) {
    return true
  }
  return false
}

const getSingleAuthorById = async (authorId: string): Promise<AuthorInterface | null> => {
  const author = await Author.findOne({
    where: { authorId },
  })

  return author
}

const getSingleAuthorByEmail = async (authorEmail: string): Promise<AuthorInterface | null> => {
  const author = await Author.findOne({
    where: { email: authorEmail },
    attributes: ['authorId', 'name', 'email', 'password'],
  })

  return author
}

const viewAuthors = async () => {
  const authors = await Author.findAll()

  return authors
}

export default {
  createAuthor,
  authorDuplicateMail,
  getSingleAuthorById,
  viewAuthors,
  getSingleAuthorByEmail,
}
