/* eslint-disable import/extensions */
import { v4 as uuidv4 } from 'uuid'

import { authorQuery } from '../queries'
import { bcryptUtils, jwtUtils } from '../utils'
import { BadRequestError } from '../errors'
import { AuthorGeneralViewDto } from '../dto/authors'
import { AuthorInterface } from '../interfaces/modelInterfaces/author.interface'

const createAuthor = async (inputData: AuthorInterface) => {
  const uniqueId = uuidv4()
  const hashPass = await bcryptUtils.hashPassword(inputData.password)

  if (await authorQuery.authorDuplicateMail(inputData.email)) {
    throw new BadRequestError('Email Duplicate', 'This Email Already Exist try with another one')
  }

  const newAuthor = {
    ...inputData,
    password: hashPass,
    authorId: uniqueId,
  }

  const author = await authorQuery.createAuthor(newAuthor)

  const authorObj = new AuthorGeneralViewDto(author)
  const { accessToken, refreshToken } = jwtUtils.generateAccessTokenRefreshTokenForUser(author)

  return { authorObj, accessToken, refreshToken }
}

const viewAuthor = async (authorId: string) => {
  const singleAuthor = await authorQuery.getSingleAuthorById(authorId)

  const author = new AuthorGeneralViewDto(singleAuthor)

  return author
}

const viewAuthors = async () => {

  const authors = await authorQuery.viewAuthors()
  const authorsDto = authors.map((singleAuthor) => new AuthorGeneralViewDto(singleAuthor))

  return authorsDto
}

export default { createAuthor, viewAuthors, viewAuthor }
