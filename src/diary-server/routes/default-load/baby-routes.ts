import { Router } from 'express'
import Joi from 'joi'

import { diaryGuard } from '@diary-server/routes/middleware/userGuard'
import asyncHandler from '@global-common/server/routes/helper/asyncHandler'
import { loadBabyList, modifyBaby, removeBaby, saveBaby, saveBabyFace } from '@diary-server/controller/baby-controller'
import { validateInputData } from '@global-common/utils/validator'
import { sendOk } from '@global-common/server/routes/helper/utils'
import { localUpload } from '@global-common/middleware/local-upload'

export default function babyRoutes (router = Router()) {
  // 아이 목록
  router.get('/baby', diaryGuard, asyncHandler(getBabyList))
  // 아이 등록
  router.post('/baby', diaryGuard, asyncHandler(postBaby))
  // 아이 수정
  router.put('/baby/:id', diaryGuard, asyncHandler(putBaby))
  // 아이 삭제
  router.delete('/baby/:id', diaryGuard, asyncHandler(deleteBaby))
  // 아이 사진 등록
  router.patch('/baby/:id/face', diaryGuard, localUpload.single('file'), asyncHandler(patchBabyFace))

  async function getBabyList (req, res) {
    const result = await loadBabyList(req.user.id)

    res.json(result)
  }

  async function postBaby (req, res) {
    const params = validateInputData(req.body, {
      name: Joi.string().required(),
      birthDate: Joi.date(),
      gender: Joi.string(),
      expectDate: Joi.date(),
      pregnantDate: Joi.date(),
    })

    await saveBaby(params, req.user.id)

    sendOk(res)
  }

  async function putBaby (req, res) {
    const params = validateInputData(req.body, {
      name: Joi.string().required(),
      birthDate: Joi.date(),
      gender: Joi.string(),
      face: Joi.string(),
      expectDate: Joi.date(),
      pregnantDate: Joi.date(),
    })

    await modifyBaby(params, req.params.id)

    sendOk(res)
  }

  async function deleteBaby (req, res) {
    const { id } = req.params

    await removeBaby(id)

    sendOk(res)
  }

  async function patchBabyFace (req, res) {
    await saveBabyFace(req.user.id, req.params.id, req.file)

    sendOk(res)
  }

  return router
}
