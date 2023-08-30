// eslint-disable-next-line import/no-extraneous-dependencies
import Joi from 'joi'

const authorSchemaValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
})

const loginSchemaValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

const blogSchemaValidator = Joi.object({
  title: Joi.string().required(),
  body: Joi.string(),
})

export default { authorSchemaValidator, loginSchemaValidator, blogSchemaValidator }
