import { Request, Response, NextFunction } from 'express'

import CustomResponse from '../utils/customResponse'
import constants from '../../../../constants/default'
import { authorService } from '../services'

const createAuthor = async (req: Request, res: Response, next: NextFunction) => {
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

const viewAuthor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let author 
    if(req.params.id)
      author = await authorService.viewAuthor(req.params.id)
    else 
      author = await authorService.viewAuthors()

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
