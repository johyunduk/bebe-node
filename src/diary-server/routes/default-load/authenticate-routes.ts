import { Router } from 'express'
import _ from 'lodash'
import Joi from 'joi'

import asyncHandler from '@global-common/server/routes/helper/asyncHandler'
import { userJoin, userLogin, userLogout } from '@diary-server/controller/authenticate-controller'
import { validateInputData } from '@global-common/utils/validator'
import { sendOk } from '@global-common/server/routes/helper/utils'
import { diaryGuard, reissueGuard } from '@diary-server/routes/middleware/userGuard'
import { makeNewAccessToken } from '@global-common/utils/make-jwt'
import { UserType } from '@global-common/constants/enum'
import { UserGender } from '@global-common/db/model/user'

export default function authenticateRoutes (router = Router()) {
  // 사용자 회원가입
  router.post('/auth/join', asyncHandler(postJoin))
  // 사용자 로그인
  router.post('/auth/login', asyncHandler(postLogin))
  // 사용자 로그아웃
  router.post('/auth/logout', diaryGuard, asyncHandler(postLogout))
  // 사용자 신규 accessToken 발급
  router.put('/auth/tokenRefresh', reissueGuard, asyncHandler(putTokenRefresh))

  async function postJoin (req, res) {
    const body = validateInputData(req.body, {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().min(8).required(),
      gender: Joi.string().required().valid(..._.values(UserGender)),
      birthDate: Joi.date().required(),
    })

    await userJoin(body)

    sendOk(res)
  }

  async function postLogin (req, res) {
    const { email, password } = validateInputData(req.body, {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    })

    const result = await userLogin(email, password)

    res.json(result)
  }

  async function postLogout (req, res) {
    await userLogout(req.user.id)

    sendOk(res)
  }

  async function putTokenRefresh (req, res) {
    const result = makeNewAccessToken(req.user.id, UserType.Diary)

    res.json(result)
  }

  return router
}
