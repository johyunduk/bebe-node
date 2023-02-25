import jwt from 'jsonwebtoken'

import { getLogger } from '@global-common/utils/logger'
import { JwtTokenType, UserType } from '@global-common/constants/enum'
import { commonEnv } from '@global-common/constants/env'

const logger = getLogger('make-jwt.ts')

export function makeJWT (id: number, type: UserType, deviceId?: string) {
  logger.info('makeJWT id type= ', id, type)

  const accessToken = jwt.sign({
    id,
    token: JwtTokenType.ACCESS,
    type,
    deviceId,
  }, commonEnv.JWT_SECRET_KEY, { expiresIn: commonEnv.JWT_ACCESS_EXPIRES_IN })

  const refreshToken = jwt.sign({
    id,
    token: JwtTokenType.REFRESH,
    type,
    deviceId,
  }, commonEnv.JWT_SECRET_KEY, { expiresIn: commonEnv.JWT_REFRESH_EXPIRES_IN })

  return { accessToken, refreshToken }
}

export function makeNewAccessToken (id: number, type: UserType, deviceId?: string) {
  logger.info('makeNewAccessToken id, type = ', id, type)

  const accessToken = jwt.sign({
    id,
    token: JwtTokenType.ACCESS,
    type,
    deviceId,
  }, commonEnv.JWT_SECRET_KEY, { expiresIn: commonEnv.JWT_ACCESS_EXPIRES_IN })

  return { accessToken }
}
