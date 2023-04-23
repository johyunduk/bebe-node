import { Router } from 'express'
import asyncHandler from '@global-common/server/routes/helper/asyncHandler'
import { adminGuard, diaryGuard } from '@diary-server/routes/middleware/userGuard'

export default function mallRoutes (router = Router()) {
  // 쇼핑몰 상품 등록
  router.post('/mall', adminGuard, asyncHandler(postMallList))
  // 쇼핑몰 리스트 조회
  router.get('/mall', diaryGuard, asyncHandler(getMallList))

  async function postMallList (req, res) {
    res.json({ result: 'Success' })
  }
  async function getMallList (req, res) {
    res.json({ result: [] })
  }

  return router
}
