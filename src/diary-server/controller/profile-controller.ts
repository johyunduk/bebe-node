import User from '@global-common/db/model/user'
import { NO_USER, NotFound } from '@global-common/error/http-error'
import { getLogger } from '@global-common/utils/logger'

const logger = getLogger('profile-controller.ts')

export async function userProfile (id: number, req) {
  const user = await User().findOne({ where: { id }, attributes: { exclude: ['password', 'refreshToken'] }, raw: true })

  if (!user) throw new NotFound(NO_USER, '사용자가 없습니다')

  return { ...user, avatar: user.avatar ?? `${req.protocol}://${req.get('host')}/uploads/images/${user.avatar}` }
}

export async function updateProfile (body, id: number) {
  const user = await User().findOne({ where: { id } })

  if (!user) throw new NotFound(NO_USER, '사용자가 없습니다')

  await user.update({ ...body })
}

export async function saveUserAvatar (id: number, file) {
  const user = await User().findOne({ where: { id } })

  const fileName = file.filename

  if (!user) throw new NotFound(NO_USER, '사용자가 존재하지 않습니다')

  await user.update({ avatar: fileName })
}
