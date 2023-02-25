import { Sequelize } from 'sequelize'

import { syncOptions } from '../constants/common'
import { getLogger } from '../utils/logger'

const logger = getLogger('ensuredSync.ts')

/**
 * db를 sync 하다가 db가 없다고 할 때, db를 생성하고 sync해주는 함수.
 * @param toSyncDb sync할 db의 sequelize instance
 * @param DB_URL database가 없을 때, db를 생성하기 위해 db 접속 url도 받음.
 */
export default async function ensuredSync (toSyncDb, DB_URL) {
  try {
    await toSyncDb.sync(syncOptions)
  } catch (err) {
    logger.warn('ensuredSync err.message:', err.message)

    if (err.message.indexOf('Unknown database') >= 0) {
      let dbUrl = DB_URL.split('/')
      const dbName = dbUrl.pop()
      dbUrl = dbUrl.join('/')

      logger.warn(`ensuredSync Try to make database:${dbName} dbUrl:${dbUrl}`)
      const sequelize = new Sequelize(dbUrl)
      await sequelize.query(`CREATE DATABASE ${dbName};`)
      logger.info(`CREATE DATABASE ${dbName};`)
      await toSyncDb.sync(syncOptions)
    } else {
      logger.warn('ensuredSync DB Sync Error!! message:', err.message)
      throw err
    }
  }
}
