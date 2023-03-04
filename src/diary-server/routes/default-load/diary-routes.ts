import { Router } from 'express'
import asyncHandler from '@global-common/server/routes/helper/asyncHandler'
import {
  destroyDiary,
  loadDiaryDetail,
  loadDiaryList,
  saveDiary,
  updateDiary,
} from '@diary-server/controller/diary-controller'
import { validateInputData } from '@global-common/utils/validator'
import Joi from 'joi'
import { sendOk } from '@global-common/server/routes/helper/utils'
import { diaryGuard } from '@diary-server/routes/middleware/userGuard'

export default function diaryRoutes (router = Router()) {
  // 육아일기 목록
  router.get('/diary', diaryGuard, asyncHandler(getDiaryList))
  // 육아일기 상세 조회
  router.get('/diary/detail/:id', diaryGuard, asyncHandler(getDiaryDetail))
  // 육아일기 작성
  router.post('/diary', diaryGuard, asyncHandler(postDiary))
  // 육아일기 수정
  router.put('/diary/edit/:id', diaryGuard, asyncHandler(putDiary))
  // 육아일기 삭제
  router.delete('/diary/delete/:id', diaryGuard, asyncHandler(deleteDiary))

  async function getDiaryList (req, res) {
    const result = await loadDiaryList(req.user.id)

    res.json(result)
  }

  async function getDiaryDetail (req, res) {
    const { id } = req.params

    const result = await loadDiaryDetail(id, req.user.id)

    res.json(result)
  }

  async function postDiary (req, res) {
    const body = validateInputData(req.body, {
      title: Joi.string().required(),
      content: Joi.string().required(),
      weight: Joi.number().positive().precision(2),
      height: Joi.number().positive().precision(2),
    })

    await saveDiary(body, req.user.id)

    sendOk(res)
  }

  async function putDiary (req, res) {
    const { id: diaryId } = req.params

    const body = validateInputData(req.body, {
      title: Joi.string(),
      content: Joi.string(),
      weight: Joi.number().positive(),
      height: Joi.number().positive(),
    })

    await updateDiary(body, req.user.id, diaryId)

    sendOk(res)
  }

  async function deleteDiary (req, res) {
    const { id: diaryId } = req.params

    await destroyDiary(req.user.id, diaryId)

    sendOk(res)
  }

  return router
}
