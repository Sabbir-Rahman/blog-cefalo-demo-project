/* eslint-disable import/extensions */
import { authService } from '../services/index.js'
import CustomResponse from '../utils/customResponse'
import constants from '../../../../constants/default'

const userLogin = async (req, res, next) => {
  try {
    const { userObj, accessToken, refreshToken } = await authService.userLogin(req.body)

    return new CustomResponse(res, constants.HTTP_STATUS_CODE.OK, '', 'Login Successfull', {
      userObj,
      accessToken,
      refreshToken,
    }).sendResponse()
  } catch (err) {
    return next(err)
  }
}

const generateAccesstokenWithRefreshToken = async (req, res, next) => {
  try {
    const { accessToken } = await authService.generateRefreshToken(res.locals.user)
    return new CustomResponse(
      res,
      constants.HTTP_STATUS_CODE.OK,
      '',
      'Access Token Generation Successfull',
      {
        accessToken,
      },
    ).sendResponse()
  } catch (err) {
    return next(err)
  }
}
export default { userLogin, generateAccesstokenWithRefreshToken }
