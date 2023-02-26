import User from '@global-common/db/model/user'
import {
  ALREADY_EXISTS,
  BadEntity,
  NO_USER,
  NOT_AUTHORIZED,
  NotFound,
  Unauthorized,
} from '@global-common/error/http-error'
import { encrypt, validateCode } from '@global-common/utils/authenticator'
import { makeJWT } from '@global-common/utils/make-jwt'
import { UserType } from '@global-common/constants/enum'

interface JoinInputs {
  name: string
  email: string
  password: string
  gender: string
  birthDate: string
}
export async function userJoin (body: JoinInputs) {
  const { name, email, password, gender, birthDate } = body

  const user = await User().findOne({ where: { email } })

  if (user) throw new BadEntity(ALREADY_EXISTS, '이미 등록된 이메일입니다.')

  const hashedPassword = encrypt(password)

  User().create({ name, email, password: hashedPassword, gender, birthDate })
}

export async function userLogin (email: string, password: string) {
  const user = await User().findOne({ where: { email } })

  if (!user) throw new Unauthorized(NOT_AUTHORIZED, '등록되지 않은 이메일입니다.')

  if (!validateCode(password, user.password)) throw new Unauthorized(NOT_AUTHORIZED, '비밀번호가 일치하지 않습니다')

  const { accessToken, refreshToken } = makeJWT(user.id, UserType.Diary)

  user.refreshToken = refreshToken
  user.save()

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      name: user.name,
    },
  }
}

export async function userLogout (id: number) {
  const user = await User().findOne({ where: { id } })

  if (!user) throw new NotFound(NO_USER, '사용자가 없습니다.')

  user.refreshToken = null
  user.save()
}
