/* eslint-disable import/extensions */
import Joi from 'joi'
import { BadRequestError } from '../errors'
import { Request, Response, NextFunction } from 'express'

const validate = (validator: Joi.ObjectSchema<any>) => (
  req: Request,
  res: Response,
  next: NextFunction,
  // eslint-disable-next-line consistent-return
) => {
  const { error, value } = validator.validate(req.body, {
    stripUnknown: true,
  })
  if (error) {
    throw new BadRequestError('Validation Error', String(error.details))
  }
  req.body = value
  next()
}

export default validate
