import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { logResponseBody } from './helper/logging-middleware'
import { IS_REAL_PRODUCTION } from '../../constants/common'
import { getLogger } from '../../utils/logger'
import dbAccessRoutes from './db-access-routes'
import asyncHandler from './helper/asyncHandler'
import { commonEnv } from '@global-common/constants/env'

const logger = getLogger('common-util-routes.ts')
/**
 * e2e 테스트를 위한 공통 api 기능 모음.
 * @param router
 */
export default function commonUtilsRoutes (getDB, router = Router()) {
  logger.info('IS_REAL_PRODUCTION:', IS_REAL_PRODUCTION)
  if (!IS_REAL_PRODUCTION) {
    router.use(logResponseBody)
    router.use('/db', dbAccessRoutes(getDB))
    router.post(`/${commonEnv.API_VERSION}/utils/jwt`, asyncHandler(postJwt))
  } else {
    process.env.LOG_RESPONSE && router.use(logResponseBody)
  }

  async function postJwt (req, res) {
    const { id, type, isRefreshTest, deviceId } = req.body

    let expiresIn = '600000'
    const refreshToken = jwt.sign({ id, type, token: 'REFRESH', deviceId }, commonEnv.JWT_SECRET_KEY, { expiresIn })
    if (isRefreshTest) expiresIn = '10'
    const accessToken = jwt.sign({ id, type, token: 'ACCESS', deviceId }, commonEnv.JWT_SECRET_KEY, { expiresIn })

    logger.debug('테스트 JWT 발급', req.body, accessToken)

    res.send({ accessToken, refreshToken })
  }

  return router
}
