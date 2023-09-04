/* eslint-disable import/extensions */
import validation from '../validators/author.js'
import CustomResponse from '../utils/customResponse.js'
import constants from '../../../../constants/default.js'
import { authorService } from '../services/index.js'
import { BadRequestError } from '../errors/index.js'

const createAuthor = async (req, res, next) => {
  const { error, value } = validation.authorSchemaValidator.validate(req.body)
  try {
    if (error) {
      throw new BadRequestError('Validation Error', error.details)
    }

    const { authorObj, accessToken } = await authorService.createAuthor(value)

    res.cookie('jwt-access-token', accessToken, {
      sameSite: 'strict',
      secure: true,
    })

    return new CustomResponse(
      res,
      constants.HTTP_STATUS_CODE.CREATED,
      '',
      'Author Created',
      authorObj,
    ).sendResponse()
  } catch (err) {
    return next(err)
  }
}

export default { createAuthor }
