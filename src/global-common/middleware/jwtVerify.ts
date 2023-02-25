import jwt from 'jsonwebtoken'
// import * as jwt from 'jsonwebtoken'

import { getLogger } from '@global-common/utils/logger'
import { EXPIRED_JWT, EXPIRED_REFRESH_JWT, INVALID_JWT, INVALID_REFRESH_JWT, NOT_AUTHORIZED, NO_JWT, NO_USER_ABOUT_JWT, Unauthorized } from '@global-common/error/http-error'
import { commonEnv } from '@global-common/constants/env'
import { JwtTokenType, UserType } from '@global-common/constants/enum'

const logger = getLogger('jwtVerify.ts')

export function getJWT (req) {
  const { authorization } = req.headers
  logger.debug('getJWT ', authorization)

  const hasJwt = authorization && authorization.startsWith('Bearer')
  logger.debug('hasJwt ', hasJwt)

  if (!hasJwt) {
    throw new Unauthorized(NO_JWT, 'No JWT')
  }

  const [, token] = authorization.split(' ')
  logger.debug('token ', token)

  return token
}

export function hasJWT (req) {
  const { authorization } = req.headers
  logger.debug('hasJWT ', authorization)

  const hasJwt = authorization && authorization.startsWith('Bearer')
  logger.debug('hasJWT ', hasJwt)

  if (!hasJwt) return false

  return true
}

export const extractUserFromJwt = async (token: string, userType) => {
  let jwtPayload
  try {
    jwtPayload = jwt.verify(token, commonEnv.JWT_SECRET_KEY)
    logger.info('jwtPayload: ', jwtPayload)

    validatePayload(jwtPayload, userType, JwtTokenType.ACCESS)

    logger.info('extractUserFromJwt userId: ', jwtPayload.id)
  } catch (err) {
    if (!(err instanceof Unauthorized)) {
      err.status = Unauthorized.STATUS
      err.code = INVALID_JWT
    }
    if (err.name === 'TokenExpiredError') {
      err.code = EXPIRED_JWT
    }
    throw err
  }

  return { id: jwtPayload.id, deviceId: jwtPayload.deviceId }
}

function validatePayload (jwtPayload: { type: string, token: string, id: number }, userType: UserType, tokenType: JwtTokenType) {
  if (jwtPayload.type !== userType) throw new Unauthorized(NOT_AUTHORIZED, 'No matching user type')
  if (jwtPayload.token !== tokenType) throw new Unauthorized(NOT_AUTHORIZED, 'It is not access token')
}

interface verifyInfo {
  token: string
  refreshToken: string
  userType: UserType
}
const extractUserFromJwtWithoutValidate = async ({ token, userType, refreshToken }: verifyInfo) => {
  const jwtPayload: any = jwt.decode(token)
  logger.info('decoded jwtPayload: ', jwtPayload)

  validatePayload(jwtPayload, userType, JwtTokenType.ACCESS)

  try {
    const refreshJwtPayload: any = jwt.verify(refreshToken, commonEnv.JWT_SECRET_KEY)
    validatePayload(refreshJwtPayload, userType, JwtTokenType.REFRESH)
    logger.info('refresh jwtPayload: ', refreshJwtPayload)

    if (jwtPayload.id !== refreshJwtPayload.id) throw new Unauthorized(NOT_AUTHORIZED, 'Not Match tokens')
  } catch (err) {
    if (!(err instanceof Unauthorized)) {
      err.status = Unauthorized.STATUS
      err.code = INVALID_REFRESH_JWT
    }
    if (err.name === 'TokenExpiredError') {
      err.code = EXPIRED_REFRESH_JWT
    }
    throw err
  }

  return { id: jwtPayload.id, deviceId: jwtPayload.deviceId }
}

export async function jwtGuard (userType, req) {
  const token = getJWT(req)
  const user = await extractUserFromJwt(token, userType)
  return user
}

export async function refreshGuard (userType, req, refreshToken) {
  const token = getJWT(req)
  const user = await extractUserFromJwtWithoutValidate({ token, userType, refreshToken })

  return user
}
