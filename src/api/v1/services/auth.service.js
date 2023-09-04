/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */

import { logServiceError } from '../../../../logger/customLogger.js'
import { authorQuery } from '../queries/index.js'
import { bcryptUtils, jwtUtils } from '../utils/index.js'
import constants from '../../../../constants/default.js'
import defaultconfig from '../../../../config/default.js'
import { AuthorGeneralViewDto } from '../dto/authors/index.js'
import Http404DataNotFoundError from '../errors/http404NotFound.error.js'
import BadRequestError from '../errors/badRequest.error.js'

const userLogin = async (inputData) => {
  const userExist = await authorQuery.getSingleAuthorByEmail(inputData.email)

  if (!userExist) {
    throw new Http404DataNotFoundError(
      'User Not Exist',
      'No user is registered for this email, please create account or provide correct email',
    )
  }

  const userPass = await bcryptUtils.comparePassword(userExist.password, inputData.password)
  if (!userPass) {
    throw new BadRequestError(
      'Wrong Password',
      'Password not match for the user against the provided email',
    )
  }

  const jwtPayload = {
    userId: userExist.dataValues.authorId,
    name: userExist.dataValues.name,
    role: ['author'],
  }

  const accessToken = jwtUtils.signJwt(jwtPayload, {
    expiresIn: defaultconfig.jwtConfig.ACCESS_TOKEN_TTL,
  })

  const refreshToken = jwtUtils.signJwt(jwtPayload, {
    expiresIn: defaultconfig.jwtConfig.REFRESH_TOKEN_TTL,
  })

  const userObj = new AuthorGeneralViewDto(userExist)
  return { userObj, accessToken, refreshToken }
}

export default { userLogin }
