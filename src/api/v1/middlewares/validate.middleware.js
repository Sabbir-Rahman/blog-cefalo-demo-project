/* eslint-disable import/extensions */
import { BadRequestError } from '../errors/index.js'

const validate = (validator) => (
  req,
  res,
  next,
  // eslint-disable-next-line consistent-return
) => {
  const { error, value } = validator.validate(req.body, {
    stripUnknown: true,
  })
  if (error) {
    throw new BadRequestError('Validation Error', error.details)
  }
  req.body = value
  next()
}

export default validate
