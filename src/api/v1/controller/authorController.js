/* eslint-disable import/extensions */
import CustomResponse from '../utils/customResponse.js'
import constants from '../../../../constants/default.js'
import { authorService } from '../services/index.js'

const createAuthor = async (req, res, next) => {
  try {
    const { authorObj, accessToken, refreshToken } = await authorService.createAuthor(req.body)

    return new CustomResponse(res, constants.HTTP_STATUS_CODE.CREATED, '', 'Author Created', {
      authorObj,
      accessToken,
      refreshToken,
    }).sendResponse()
  } catch (err) {
    return next(err)
  }
}

const viewAuthor = async (req, res, next) => {
  try {
    const author = await authorService.viewAuthor(req.params.id)

    return new CustomResponse(
      res,
      constants.HTTP_STATUS_CODE.OK,
      '',
      'Author View Successfull',
      author,
    ).sendResponse()
  } catch (error) {
    return next(error)
  }
}

export default { createAuthor, viewAuthor }
