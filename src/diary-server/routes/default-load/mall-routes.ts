import { Router } from 'express'
import asyncHandler from '@global-common/server/routes/helper/asyncHandler'
import { adminGuard } from '@diary-server/routes/middleware/userGuard'

export default function mallRoutes (router = Router()) {
  // 쇼핑몰 리스트 조회
  router.get('/mall', adminGuard, asyncHandler(getMallList))

  async function getMallList (req, res) {
    res.json({ result: [] })
  }

  return router
}
