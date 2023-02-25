import { Router } from 'express'
import path from 'path'

import commonRoute from '@global-common/server/routes/common-routes'
import { getDB } from '@global-common/db/db-setup'
import { commonEnv } from '@global-common/constants/env'

export default function main (router = Router()) {
  const routePath = path.join(__dirname, '/default-load/*.js')
  const serverInfo = {
    name: 'gada-worker',
    api: `/${commonEnv.API_VERSION}`,
    docs: '/api-docs',
  }

  commonRoute({ router, getDB, routePath, serverInfo })

  return router
}
