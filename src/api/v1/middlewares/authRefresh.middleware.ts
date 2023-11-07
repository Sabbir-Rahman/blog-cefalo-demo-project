/* eslint-disable max-len */
/* eslint-disable import/extensions */
import lodash from 'lodash'

import { jwtUtils } from '../utils'
import defaultConstant from '../../../../constants/default'
import { Request, Response, NextFunction } from 'express'

const { get } = lodash
const authRefresh =
  () =>
  async (
    req: Request,
    res: Response,
    next: NextFunction,
    // eslint-disable-next-line consistent-return
  ) => {
    const refreshToken = get(req, 'headers.x-refresh')

    if (!refreshToken) {
      return res
        .status(defaultConstant.HTTP_STATUS_CODE.FORBIDDEN)
        .json({ message: defaultConstant.errorMessage.NO_TOKEN })
    }

    const { decoded } = await jwtUtils.verifyJwt(refreshToken[0])

    if (decoded) {
      res.locals.user = decoded
      return next()
    }
    return res
      .status(defaultConstant.HTTP_STATUS_CODE.UNAUTHORIZED)
      .json({ message: defaultConstant.errorMessage.NOT_AUTHORIZED })
  }

export default authRefresh
