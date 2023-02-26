import User from '@global-common/db/model/user'
import { NO_USER, NotFound } from '@global-common/error/http-error'

export async function userProfile (id: number) {
  const user = User().findOne({ where: { id } })

  if (!user) throw new NotFound(NO_USER, '사용자가 없습니다')

  return user
}
