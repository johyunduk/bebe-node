import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import { commonEnv } from '@global-common/constants/env'

export default function apiDocs (router = Router(), swaggerFile: any, server: string) {
  const swaggerDocument = YAML.load(`./dist/${swaggerFile}`)
  router.use(
    `/${commonEnv.API_VERSION}/${server}/api-docs`,
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument),
  )

  return router
}
