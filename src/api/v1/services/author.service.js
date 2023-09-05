/* eslint-disable import/extensions */
import { v4 as uuidv4 } from 'uuid'

import { logServiceError } from '../../../../logger/customLogger.js'
import { authorQuery } from '../queries/index.js'
import { bcryptUtils, jwtUtils } from '../utils/index.js'
import { BadRequestError } from '../errors/index.js'
import { AuthorGeneralViewDto } from '../dto/authors/index.js'

const FILENAME = 'src/api/v1/services/author.service.js'

const createAuthor = async (inputData) => {
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

const viewAuthor = async (inputData) => {
  let author

  if (inputData) {
    const singleAuthor = await authorQuery.getSingleAuthorById(inputData)
    author = new AuthorGeneralViewDto(singleAuthor)
  } else {
    const authors = await authorQuery.viewAuthors()
    author = authors.map((singleAuthor) => new AuthorGeneralViewDto(singleAuthor))
  }
  return author
}

export default { createAuthor, viewAuthor }
