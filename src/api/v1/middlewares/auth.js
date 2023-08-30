/* eslint-disable import/extensions */
import lodash from 'lodash'

import { jwtUtils } from '../utils/index.js'

const { get } = lodash
const auth = () => (
  req,
  res,
  next,
  // eslint-disable-next-line consistent-return
) => {
  const accessToken = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '')
  // const refreshToken = get(req, 'headers.x-refresh')

  if (!accessToken) res.status(403).json({ message: 'Access Token not given' })

  const { decoded } = jwtUtils.verifyJwt(accessToken)

  if (decoded) {
    res.locals.user = decoded

    return next()
  }
  return res.status(401).json({ message: 'Not authenticated' })
}

export default auth
