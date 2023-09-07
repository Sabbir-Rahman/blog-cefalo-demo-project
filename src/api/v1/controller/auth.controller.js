/* eslint-disable import/extensions */
import validation from '../validators/author.js'
import { authService } from '../services/index.js'
import CustomResponse from '../utils/customResponse.js'
import { BadRequestError } from '../errors/index.js'
import constants from '../../../../constants/default.js'

const userLogin = async (req, res, next) => {
  const { error, value } = validation.loginSchemaValidator.validate(req.body)
  try {
    if (error) {
      throw new BadRequestError('Validation Error', error.details)
    }

    const { userObj, accessToken, refreshToken } = await authService.userLogin(value)

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
    const { accessToken } = await authService.generateRefreshToken(req.refreshToken)

    return new CustomResponse(res, constants.HTTP_STATUS_CODE.OK, '', 'Access Token Generation Successfull', {
      accessToken,
    }).sendResponse()
  } catch (err) {
    return next(err)
  }
}
export default { userLogin, generateAccesstokenWithRefreshToken }
