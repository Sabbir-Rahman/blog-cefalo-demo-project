/* eslint-disable import/extensions */
import validation from '../validators/author.js'
import constants from '../../../../constants/default.js'
import { authService } from '../services/index.js'
import CustomResponse from '../utils/customResponse.js'
import { BadRequestError } from '../errors/index.js'

const userLogin = async (req, res, next) => {
  const { error, value } = validation.loginSchemaValidator.validate(req.body)
  try {
    if (error) {
      throw new BadRequestError('Validation Error', error.details)
    }

    const { userObj, accessToken, refreshToken } = await authService.userLogin(value)

    return new CustomResponse(res, 200, '', 'Login Successfull', {
      userObj,
      accessToken,
      refreshToken,
    }).sendResponse()
  } catch (err) {
    return next(err)
  }
}

export default { userLogin }
