import Diary from '@global-common/db/model/diary'
import { NO_USER, NotFound } from '@global-common/error/http-error'
import User from '@global-common/db/model/user'

export async function loadDiaryList (userId: number) {
  return await Diary().findAll({ where: { userId } })
}

export async function loadDiaryDetail (id:number, userId) {
  const diary = await Diary().findOne({ where: { id, userId } })

  if (!diary) throw new NotFound('NO_DIARY', '존재하지 않는 일기입니다.')

  return diary
}

interface DiaryInputs {
  title: string
  content: string
  weight: number
  height: number
}

export async function saveDiary (body: DiaryInputs, userId: number) {
  const user = User().findOne({ where: { id: userId } })

  if (!user) throw new NotFound(NO_USER, '사용자가 없습니다.')

  await Diary().create({ ...body, userId })
}
