import { Router } from 'express'
import asyncHandler from '@global-common/server/routes/helper/asyncHandler'
import { controllerTest } from '@diary-server/controller/authenticate-controller'

export default function authenticateRoutes (router = Router()) {
  //
  router.get('/diary/auth/test', asyncHandler(testRoute))

  async function testRoute (req, res) {
    const result = await controllerTest()

    res.send(result)
  }

  return router
}
