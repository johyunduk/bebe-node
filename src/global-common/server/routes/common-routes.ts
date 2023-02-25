import os from 'os'
import bodyParser from 'body-parser'
import glob from 'glob'
import path from 'path'
import _ from 'lodash'
import rTracer from 'cls-rtracer'
import git from 'git-last-commit'

import { loggingMiddleware } from './helper/logging-middleware'
import { commonEnv } from '../../constants/env'
import commonUtilsRoutes from './common-util-routes'
import { getLogger } from '../../utils/logger'
import fallbackErrorHandler from './helper/fallbackErrorHandler'

const logger = getLogger('common-routes.ts')

const hostname = os.hostname()

async function loadRoutes (router, routePathList) {
  logger.warn('loadRoutes routePathList:', routePathList)
  if (!Array.isArray(routePathList)) {
    routePathList = [routePathList]
  }

  // 지정된 routePath의 모든 route를 load해서 세팅함.
  for (const routePath of routePathList) {
    logger.warn('routePath :', routePath)
    for (const file of glob.sync(routePath)) {
      logger.warn('route file :', file)
      const { default: route } = await import(path.resolve(file))
      router.use(`/${commonEnv.API_VERSION}`, route())
    }
  }
}

async function mainRoute (router, routePathList) {
  if (typeof routePathList === 'function') {
    return routePathList(loadRoutes.bind(null, router))
  }

  await loadRoutes(router, routePathList)
}

async function setLastCommitInfo (router) {
  logger.info('setLastCommitInfo')
  const lastCommitInfo: any = { appVersion: 'should be set', shortHash: 'not set!' }

  git.getLastCommit(function (err, gitCommitInfo) {
    if (err) {
      logger.warn(err.message)
    }
    lastCommitInfo.appVersion = process.env.npm_package_version
    if (gitCommitInfo) {
      lastCommitInfo.shortHash = gitCommitInfo.shortHash
      lastCommitInfo.committedOn = new Date(+gitCommitInfo.committedOn * 1000).toISOString()
    }
    logger.debug(JSON.stringify(lastCommitInfo))
  })

  router.use((req, res, next) => {
    req.lastCommitInfo = lastCommitInfo
    next()
  })
}

async function setupDefaultHealthCheckInfo (router, serverInfo) {
  function sendServerInfo (req, res) {
    const { appVersion, shortHash: gitHash, committedOn } = req.lastCommitInfo
    res.send({
      ...serverInfo,
      hostname,
      appVersion,
      gitHash,
      committedOn,
      NODE_ENV: commonEnv.NODE_ENV,
    })
  }

  router.get('/', sendServerInfo)
  const serviceName = _.last(serverInfo.name.split('-'))
  // 예: serverInfo.api = '/api/v1' , serviceName = 'service'

  // 주: ELB 에서 /api/v1/service/* 로 라우팅 하고 있다면 /api/v1/service 이렇게 하면 안걸리고,
  // 마지막 /까지 입력 해야 여기에 걸리게 됨.
  // /api/v1/service/ 이런식으로 url 입력해도 서버 정보 제대로 보여주도록 아래 추가.
  router.get(`${serverInfo.api}/${serverInfo.name}`, sendServerInfo)
}

interface CommonRouteParam {
  router: any
  getDB: any
  routePath: any
  serverInfo: any
}
export default async function commonRoute ({
  router,
  getDB,
  routePath,
  serverInfo,
}: CommonRouteParam) {
  logger.info('main setup routes')

  router.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
  router.use(bodyParser.json({ limit: '10mb' }))

  // ignore favicon
  router.get('/favicon.ico', (req, res) => res.status(204))

  await setLastCommitInfo(router)

  router.use(rTracer.expressMiddleware())
  !commonEnv.NO_DEFAULT_LOGGER && router.use(loggingMiddleware)
  commonUtilsRoutes(getDB, router)

  await mainRoute(router, routePath)

  // health check
  setupDefaultHealthCheckInfo(router, serverInfo)

  fallbackErrorHandler(router)

  return router
}
