// eslint-disable-next-line import/no-extraneous-dependencies
import Joi from 'joi'

const blogSchemaValidator = Joi.object({
  title: Joi.string().required(),
  body: Joi.string(),
})

const editblogSchemaValidator = Joi.object({
  title: Joi.string().min(1),
  body: Joi.string(),
})

export default { blogSchemaValidator, editblogSchemaValidator }
