/* eslint-disable import/extensions */
import jwt from 'jsonwebtoken'

import defaultConfig from '../../../../config/default'
import InternalServerError from '../errors/internalServer.error'
import constants from '../../../../constants/default'
import { JwtUserTokenObject, JwtUserType } from '../interfaces/typesInterfaces/utils'

const privateKey = defaultConfig.jwtConfig.PRIVATE_KEY || 'jkqwdlin8qweqdeqwqwqooqisdui'
const publicKey = defaultConfig.jwtConfig.PUBLIC_KEY || 'wdwjkedjwoiedwokeiodwerfwe'

const signJwt = (object: JwtUserTokenObject, options?: jwt.SignOptions) => {
  try {
    const signToken = jwt.sign(object, privateKey, {
      ...(options && options),
      algorithm: 'RS256',
    })

    return signToken
  } catch (error) {
    throw new InternalServerError(constants.errorMessage.SOMETHING_WRONG, String(error))
  }
}

const verifyJwt = async (token: string) => {
  try {
    const decoded = await jwt.verify(token, publicKey)

    if (decoded && (typeof(decoded)!=='string')) {
      return {
        valid: true,
        expired: false,
        decoded,
      }
    }
    return {
      valid: false,
      expired: false,
      decoded: false,
    }
  } catch (error) {
    console.log(error)
    return {
      valid: false,
      expired: false,
      decoded: false,
    }
  }
}

const generateAccessTokenRefreshTokenForUser = (user: JwtUserType) => {
  const jwtPayload: JwtUserTokenObject = {
    userId: user.authorId,
    name: user.name,
    role: ['author'],
  }

  const accessToken = signJwt(jwtPayload, {
    expiresIn: defaultConfig.jwtConfig.ACCESS_TOKEN_TTL,
  })

  const refreshToken = signJwt(jwtPayload, {
    expiresIn: defaultConfig.jwtConfig.REFRESH_TOKEN_TTL,
  })

  return { accessToken, refreshToken }
}

function generateAccessTokenWithRefreshToken(user: JwtUserType) {
  const userId = user.authorId

  const jwtPayload: JwtUserTokenObject = {
    userId,
    name: user.name,
    role: user.role,
  }

  const accessToken = signJwt(jwtPayload, {
    expiresIn: defaultConfig.jwtConfig.ACCESS_TOKEN_TTL,
  })

  return { accessToken }
}

export default {
  signJwt,
  verifyJwt,
  generateAccessTokenRefreshTokenForUser,
  generateAccessTokenWithRefreshToken,
}
