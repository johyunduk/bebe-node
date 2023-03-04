import { Router } from 'express'
import Joi from 'joi'
import _ from 'lodash'

import { diaryGuard } from '@diary-server/routes/middleware/userGuard'
import asyncHandler from '@global-common/server/routes/helper/asyncHandler'
import { updateProfile, userProfile } from '@diary-server/controller/profile-controller'
import { sendOk } from '@global-common/server/routes/helper/utils'
import { validateInputData } from '@global-common/utils/validator'
import { UserGender } from '@global-common/db/model/user'

export default function profileRoutes (router = Router()) {
  // 프로필 조회
  router.get('/diary/profile', diaryGuard, asyncHandler(getProfile))
  // 프로필 수정
  router.put('/diary/profile/edit', diaryGuard, asyncHandler(putProfile))

  async function getProfile (req, res) {
    const result = await userProfile(req.user.id)

    res.json(result)
  }

  async function putProfile (req, res) {
    const body = validateInputData(req.body, {
      name: Joi.string(),
      gender: Joi.string().valid(..._.values(UserGender)),
      birthDate: Joi.date(),
    })
    await updateProfile(body, req.user.id)

    sendOk(res)
  }

  return router
}
