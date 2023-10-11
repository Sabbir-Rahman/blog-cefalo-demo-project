/* eslint-disable import/extensions */
import jwt from 'jsonwebtoken'

import defaultConfig from '../../../../config/default.js'
import InternalServerError from '../errors/internalServer.error.js'
import constants from '../../../../constants/default.js'
import JwtTokenError from '../errors/jwtToken.error.js'

const privateKey = defaultConfig.jwtConfig.PRIVATE_KEY
const publicKey = defaultConfig.jwtConfig.PUBLIC_KEY

// type JwtUserTokenObject = { userId: string; username: string; role: [string] }

const signJwt = (object, options) => {
  try {
    const signToken = jwt.sign(object, privateKey, {
      ...(options && options),
      algorithm: 'RS256',
    })

    return signToken
  } catch (error) {
    throw new InternalServerError(constants.errorMessage.SOMETHING_WRONG, error)
  }
}

const verifyJwt = async (token) => {
  try {
    const decoded = await jwt.verify(token, publicKey)

    if (decoded) {
      return {
        valid: true,
        expired: false,
        decoded,
      }
    }
    return decoded
  } catch (error) {
    return false
  }
}

const generateAccessTokenRefreshTokenForUser = (user) => {
  const jwtPayload = {
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

function generateAccessTokenWithRefreshToken(user) {
  const jwtPayload = {
    userId: user.authorId,
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
