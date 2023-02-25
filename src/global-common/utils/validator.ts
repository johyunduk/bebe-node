import Joi from 'joi'
import { getLogger } from './logger'
import { BadRequest, INVALID_INPUT } from '@global-common/error/http-error'

const logger = getLogger('validator.ts')

export const validateInputData = (obj: any, schema: any) => {
  const joiObj = schema.validate ? schema : Joi.object(schema)
  const { error, value } = joiObj.validate(obj)

  if (error) {
    logger.warn('validation error', error)
    throw new BadRequest(INVALID_INPUT, error.message)
  }

  return value
}
