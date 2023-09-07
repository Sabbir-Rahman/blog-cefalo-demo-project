/* eslint-disable import/extensions */
import jwt from 'jsonwebtoken'

import defaultConfig from '../../../../config/default.js'

const privateKey = defaultConfig.jwtConfig.PRIVATE_KEY
const publicKey = defaultConfig.jwtConfig.PUBLIC_KEY

// type JwtUserTokenObject = { userId: string; username: string; role: [string] }

function signJwt(object, options) {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  })
}

function verifyJwt(token) {
  try {
    const decoded = jwt.verify(token, publicKey)
    return {
      valid: true,
      expired: false,
      decoded,
    }
  } catch (e) {
    return {
      valid: false,
      expired: e.message === 'jwt expired',
      decoded: null,
    }
  }
}

function generateAccessTokenRefreshTokenForUser(user) {
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
