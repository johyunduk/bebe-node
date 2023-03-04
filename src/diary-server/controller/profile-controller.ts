import User from '@global-common/db/model/user'
import { NO_USER, NotFound } from '@global-common/error/http-error'

export async function userProfile (id: number) {
  const user = await User().findOne({ where: { id }, attributes: { exclude: ['password', 'refreshToken'] } })

  if (!user) throw new NotFound(NO_USER, '사용자가 없습니다')

  return user
}

export async function updateProfile (body, id: number) {
  const user = await User().findOne({ where: { id } })

  if (!user) throw new NotFound(NO_USER, '사용자가 없습니다')

  await user.update({ ...body })
}

export async function saveUserAvatar (id: number, file: {key: string}) {
  const user = await User().findOne({ where: { id } })

  if (!user) throw new NotFound(NO_USER, '사용자가 존재하지 않습니다')

  await user.update({ avatar: file.key })
}
