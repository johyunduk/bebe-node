import { Router } from 'express'
import { diaryGuard } from '@diary-server/routes/middleware/userGuard'
import asyncHandler from '@global-common/server/routes/helper/asyncHandler'
import { userProfile } from '@diary-server/controller/profile-controller'

export default function profileRoutes (router = Router()) {
  //
  router.get('/diary/profile', diaryGuard, asyncHandler(getProfile))

  async function getProfile (req, res) {
    const result = await userProfile(req.user.id)

    res.json(result)
  }

  return router
}
