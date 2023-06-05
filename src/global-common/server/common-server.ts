import express, { Router } from 'express'
import moment from 'moment-timezone'
import _ from 'lodash'
import axios from 'axios'
import cors from 'cors'
import helmet from 'helmet'
import nocache from 'nocache'

import { commonEnv } from '../constants/env'
import { corsOptions, IS_REAL_PRODUCTION } from '../constants/common'
import { getLogger } from '../utils/logger'
import requestIp from 'request-ip'
import { connectDb as commonConnectDb } from '@global-common/db/db-setup'
import path from 'path'

const logger = getLogger('common-server.ts')
const app = express()

// set default timezone
moment.tz.setDefault('Asia/Seoul')

const userAgent = _.replace(process.env.MY_NAME, '_SERVER', '')
axios.defaults.headers.common['user-agent'] = userAgent

/*
```
  // Test Error Code
  setTimeout(() => { throw new Error('Exception ERROR') }, 100)
```
*/
process.on('uncaughtException', async (err) => {
  console.error('whoops! There was an uncaught error:', err)
  process.send?.('ready')
  process.exit(1)
})

/*
```
  // Test Error Code
  const p = Promise.reject(new Error('reject ERROR'))
  setTimeout(() => p.catch(function () { return }), 86400)
```
*/
process.on('unhandledRejection', async (err: any) => {
  console.error('whoops! There was an uncaught error:', err)
  process.send?.('ready')
  process.exit(1)
})

export default function runServer ({
  preConfig = null,
  main,
  port,
  connectDb = commonConnectDb,
}) {
  (async function () {
    preConfig && await preConfig(app)

    await connectDb()

    logger.info('DB connected!')

    app.use(helmet())
    app.use(nocache())
    // app.use(cors(corsOptions))
    app.use(cors())

    app.use((req, res, next) => {
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin')
      next()
    })

    app.use('/uploads', express.static('uploads'))
    app.use(requestIp.mw())

    app.use(main())

    const httpServer = app.listen(port, '0.0.0.0', () => {
      logger.warn('######################################################')
      logger.warn(`${process.env.MY_NAME} is listening on port ${port} NODE_ENV:${commonEnv.NODE_ENV}`)
      logger.warn('######################################################')
      process.send?.('ready')
      logger.warn('SERVER IS READY.')
    })

    process.on('SIGINT', () => {
      logger.warn('SERVER GOT SIGINT.')
      httpServer.close(function (err) {
        logger.warn('SERVER IS CLOSED. hasError:', !!err)
        process.exit(err ? 1 : 0)
      })
      if (!IS_REAL_PRODUCTION) {
        setTimeout(() => {
          logger.warn('CLOSE SERVER IN FORCE')
          process.exit()
        }, 1000)
      }
    })
  })()

  return app
}
