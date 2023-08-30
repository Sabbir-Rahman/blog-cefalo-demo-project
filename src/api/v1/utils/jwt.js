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

export default {
  signJwt,
  verifyJwt,
}
