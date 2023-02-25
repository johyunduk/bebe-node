import rTracer from 'cls-rtracer'
import exceptionFormatter from 'exception-formatter'

import { getLogger } from '../../../utils/logger'
import {
  AppError,
  NO_URL_OR_METHOD,
} from '../../../error/http-error'
import { IS_REAL_PRODUCTION } from '../../../constants/common'
import { errorMessage } from '@global-common/error/error-message'
const logger = getLogger('fallbackErrorHandler.ts')

export default function fallbackErrorHandler (router) {
  router.use(notFoundErrorHandler)
  router.use(defaultErrHandler)
}

export const notFoundErrorHandler = (req, res) => {
  const errMsg = 'URL or Method is not found.'
  logger.error('notFoundErrorHandler url:', req.url)
  res.status(404)
  return res.send({ code: NO_URL_OR_METHOD, error: { message: errMsg } })
}

const defaultErrHandler = (err, req, res, next) => {
  if (res.headersSent) {
    logger.error('defaultErrHandler headersSent:', exceptionFormatter(err, { format: 'ansi' }))
    return next(err) // express 기본 error hanlder 에게 전달.
  }

  req.errStack = err.stack

  const errorLevel = err.status < 500 && err instanceof AppError ? 'warn' : 'error'

  const traceId = rTracer.id()
  logger[errorLevel]('defaultErrHandler err:', exceptionFormatter(err, { format: 'ansi' }))
  logger[errorLevel](
    `
${traceId} HTTP status: ${err.status} type: ${err.constructor.name} error:${err.message}`,
  )

  let errMsg = ''
  if (!IS_REAL_PRODUCTION) {
    errMsg = err instanceof AppError ? err.message : 'Server error.'
  }

  const error = {
    code: err.code,
    message: `[${String(traceId).substring(0, 8)}]\n` + errorMessage(err.code),
    svMessage: `[${String(traceId).substring(0, 8)}] ${process.env.MY_NAME === 'ADMIN_SERVER' ? err.message : errMsg}`,
  }

  res.status(err.status || 400)
  return res.send({ error })
}
