/* eslint-disable import/extensions */
import jwt from 'jsonwebtoken'

import defaultConfig from '../../../../config/default'
import InternalServerError from '../errors/internalServer.error'
import constants from "../../../../constants/default"

const privateKey = defaultConfig.jwtConfig.PRIVATE_KEY || 'jkqwdlin8qweqdeqwqwqooqisdui'
const publicKey = defaultConfig.jwtConfig.PUBLIC_KEY || 'wdwjkedjwoiedwokeiodwerfwe'

type JwtUserTokenObject = { userId: string; name: string; role: [string] }
type JwtUserType = { authorId: string; name: string; role: [string] }

const signJwt = (object:JwtUserTokenObject, options?: jwt.SignOptions) => {
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

    if (decoded) {
      return {
        valid: true,
        expired: false,
        decoded,
      }
    }
    return false
  } catch (error) {
    return false
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

  const jwtPayload:JwtUserTokenObject = {
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
