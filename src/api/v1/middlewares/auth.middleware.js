/* eslint-disable max-len */
/* eslint-disable import/extensions */
import lodash from 'lodash'

import { jwtUtils } from '../utils/index.js'
import defaultConstant from '../../../../constants/default.js'

const { get } = lodash
const auth = () => (
  req,
  res,
  next,
  // eslint-disable-next-line consistent-return
) => {
  const accessToken = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '')

  if (!accessToken) {
    return res
      .status(defaultConstant.HTTP_STATUS_CODE.UNAUTHORIZED)
      .json({ message: defaultConstant.errorMessage.NO_TOKEN })
  }

  const { decoded } = jwtUtils.verifyJwt(accessToken)
  if (decoded) {
    console.log('Hit decoded')
    req.accessToken = decoded
    return next()
  }
  return res.status(defaultConstant.HTTP_STATUS_CODE.UNAUTHORIZED).json({
    message: defaultConstant.errorMessage.NOT_AUTHORIZED,
    developerMessage: defaultConstant.errorMessage.NOT_AUTHORIZED,
  })
}

export default auth
