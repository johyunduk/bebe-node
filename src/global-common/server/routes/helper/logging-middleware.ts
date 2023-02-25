import _ from 'lodash'
import rTracer from 'cls-rtracer'

import { getLogger } from '../../../utils/logger'
import responseInterceptor from '../../../middleware/responseInterceptor'

const logger = getLogger('logging-middleware.ts')

export function loggingMiddleware (req, res, next) {
  if (req.originalUrl === '/') return next()
  if (_.startsWith(req.headers['user-agent'], 'ELB-HealthChecker')) return next()
  if (_.startsWith(req.originalUrl, '/db/')) return next()

  logger.info(
    `
->>>>>>>>>>>>>>>>>
#@# [${rTracer.id()}] API ${req.method} ${req.originalUrl}
=>>>>>>>>>>>>>>>>>`,
  )

  if (req.method !== 'GET') {
    let { body } = req
    if (body && body.password) {
      body = _.clone(body)
      // password는 보이지 않게
      body.password = '### PW IS HIDDEN ###'
    }
    logger.info(
      `
#body:`,
      body,
    )
  }
  next()
}

const MAX_BODY_LOG_LENGTH = 1500
// response.send를 intercept 해서 로그 남김.
export const logResponseBody = responseInterceptor(function logResInterceptor (body, req, res) {
  if (req.originalUrl === '/') return
  if (_.startsWith(req.headers['user-agent'], 'ELB-HealthChecker')) return
  if (_.startsWith(req.originalUrl, '/db/')) return

  if (body && body.length > MAX_BODY_LOG_LENGTH) {
    // 너무 긴 body는 출력 짤라서 출력.
    body = body.substr(0, 1000) + '...'
  }
  // 주: statusCode가 304(Not modified)나 204(No Content)일 경우에는 body가 빈 string일 수 있음.
  logger.info(
    `
<<<<<<<<<<<<<<<-
#@# [${rTracer.id()}] RES ${req.method} ${req.originalUrl} ${res.statusCode}:
<<<<<<<<<<<<<<<=`,
    body,
  )
})
