// eslint-disable-next-line import/no-extraneous-dependencies
import Joi from 'joi'

const authorSchemaValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
})

export default { authorSchemaValidator }
