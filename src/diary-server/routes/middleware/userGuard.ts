import { BadRequest, Forbidden, NOT_ACTIVATED, NO_DATA, NO_USER_ABOUT_JWT, Unauthorized } from '@global-common/error/http-error'
import asyncHandler from '@global-common/server/routes/helper/asyncHandler'
import User, { UserStatus } from '@global-common/db/model/user'
import { getLogger } from '@global-common/utils/logger'
import { jwtGuard, refreshGuard } from '@global-common/middleware/jwtVerify'
import { UserType } from '@global-common/constants/enum'
import Admin from '@global-common/db/model/admin'

const logger = getLogger('diaryGuard.ts')

function _diaryGuard () {
  return async function (req, res, next) {
    const { id } = await jwtGuard(UserType.Diary, req)

    const user = await User().findOne({ where: { id }, raw: true })
    if (!user) throw new Unauthorized(NO_USER_ABOUT_JWT, 'No user about the JWT')

    req.user = user
    rejectByUserStatus(user.userStatus)

    next()
  }
}

function _adminGuard () {
  return async function (req, res, next) {
    const { id } = await jwtGuard(UserType.Diary, req)

    const user = await User().findOne({ where: { id }, raw: true })
    if (!user) throw new Unauthorized(NO_USER_ABOUT_JWT, 'No user about the JWT')

    req.user = user
    rejectByUserStatus(user.userStatus)

    const admin = await Admin().findOne({ where: { userId: id }, raw: true })
    if (!admin) throw new Forbidden(NOT_ACTIVATED, '활성 어드민 유저가 아님')

    next()
  }
}

function _reissueGuard () {
  return async function (req, res, next) {
    const { refreshToken } = req.body
    if (!refreshToken) throw new BadRequest(NO_DATA, 'refresh token is required')

    const { id } = await refreshGuard(UserType.Diary, req, refreshToken)

    const user = await User().findOne({ where: { id, refreshToken }, raw: true })
    if (!user) throw new Unauthorized(NO_USER_ABOUT_JWT, 'No user about the JWT')

    req.user = user
    rejectByUserStatus(user.userStatus)

    next()
  }
}

function rejectByUserStatus (userStatus: string) {
  switch (userStatus) {
    case UserStatus.Deactivated:
      throw new Forbidden(NOT_ACTIVATED, '활성 어드민 유저가 아님')
  }
}

export const diaryGuard = asyncHandler(_diaryGuard())
export const adminGuard = asyncHandler(_adminGuard())
export const reissueGuard = asyncHandler(_reissueGuard())
