/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */

import { authorQuery } from '../queries/index'
import { bcryptUtils, jwtUtils } from '../utils/index'
import { AuthorGeneralViewDto } from '../dto/authors'
import Http404DataNotFoundError from '../errors/http404NotFound.error'
import BadRequestError from '../errors/badRequest.error'
import { LoginInterface } from '../interfaces/modelInterfaces/auth.interface'
import { JwtUserType } from '../interfaces/typesInterfaces/utils'

const userLogin = async (inputData: LoginInterface) => {
  const userExist = await authorQuery.getSingleAuthorByEmail(inputData.email)

  if (!userExist) {
    throw new Http404DataNotFoundError(
      'User Not Exist',
      'No user is registered for this email, please create account or provide correct email',
    )
  }

  const userPass = await bcryptUtils.comparePassword(inputData.password, userExist.password)
  if (!userPass) {
    throw new BadRequestError(
      'Wrong Password',
      'Password not match for the user against the provided email',
    )
  }

  const userObj = new AuthorGeneralViewDto(userExist)
  const { accessToken, refreshToken } = jwtUtils.generateAccessTokenRefreshTokenForUser(userExist)

  return { userObj, accessToken, refreshToken }
}

const generateRefreshToken = async (inputData: JwtUserType) => {
  const { accessToken } = jwtUtils.generateAccessTokenWithRefreshToken(inputData)

  return { accessToken }
}

export default { userLogin, generateRefreshToken }
