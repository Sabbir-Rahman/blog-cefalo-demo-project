/* eslint-disable import/extensions */
import { v4 as uuidv4 } from 'uuid'

import { authorQuery } from '../queries/index.js'
import defaultconfig from '../../../../config/default.js'
import { bcryptUtils, jwtUtils } from '../utils/index.js'
import constants from '../../../../constants/default.js'
import { BadRequestError } from '../errors/index.js'
import { CreateAuthorDto } from '../dto/authors/index.js'

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
  const jwtPayload = {
    userId: author.authorId,
    name: author.name,
    role: ['author'],
  }

  const accessToken = jwtUtils.signJwt(jwtPayload, {
    expiresIn: defaultconfig.jwtConfig.ACCESS_TOKEN_TTL,
  })

  const refreshToken = jwtUtils.signJwt(jwtPayload, {
    expiresIn: defaultconfig.jwtConfig.REFRESH_TOKEN_TTL,
  })

  const authorObj = new CreateAuthorDto(author)
  return { authorObj, accessToken, refreshToken }
}

export default { createAuthor }
