import 'source-map-support/register'
import 'module-alias/register'
import './setup-dotenv'

import main from './routes'
import { IS_REAL_PRODUCTION } from '@global-common/constants/common'
import runServer from '@global-common/server/common-server'
import apiDocs from '@global-common/server/routes/api-docs-routes'
import { BEBE_DIARY_PORT } from './common/env'

async function preConfig (app) {
  if (!IS_REAL_PRODUCTION) {
    await apiDocs(app, 'diary-server/swagger.yaml', 'diary')
  }
}
const app = runServer({ preConfig, main, port: BEBE_DIARY_PORT })

export default app
