import Diary from '@global-common/db/model/diary'
import { NO_RESOURCE, NO_USER, NotFound } from '@global-common/error/http-error'
import User from '@global-common/db/model/user'

export async function loadDiaryList (userId: number) {
  return await Diary().findAll({ where: { userId } })
}

export async function loadDiaryDetail (id:number, userId) {
  const diary = await Diary().findOne({ where: { id, userId } })

  if (!diary) throw new NotFound(NO_RESOURCE, '존재하지 않는 일기입니다.')

  return diary
}

interface DiaryInputs {
  title: string
  content: string
  weight: number
  height: number
}

export async function saveDiary (body: DiaryInputs, userId: number) {
  const user = await User().findOne({ where: { id: userId } })

  if (!user) throw new NotFound(NO_USER, '사용자가 없습니다.')

  await Diary().create({ ...body, userId })
}

export async function updateDiary (body, userId, diaryId) {
  const diary = await Diary().findOne({ where: { userId, id: diaryId } })

  if (!diary) throw new NotFound(NO_RESOURCE, '존재하지 않는 일기입니다.')

  await diary.update({ ...body })
}

export async function destroyDiary (userId, diaryId) {
  const diary = await Diary().findOne({ where: { userId, id: diaryId } })

  if (!diary) throw new NotFound(NO_RESOURCE, '존재하지 않는 일기이비니다.')

  await diary.destroy()
}
