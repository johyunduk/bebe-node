import _ from 'lodash'
import { Sequelize } from 'sequelize'
import glob from 'glob'
import path from 'path'
import cls from 'cls-hooked'

import ensuredSync from './ensuredSync'
import { getLogger } from '../utils/logger'
import { commonEnv } from '@global-common/constants/env'

const logger = getLogger('common-db-setup.ts')

const namespace = cls.createNamespace('bebe-namespace')

Sequelize.useCLS(namespace)

/*
  decimalNumbers: raw query시 숫자가 string이 되는 이슈 해결용.
  dateStrings / typeCast: time이 +9로 저장되어도 불러올때 utc오는 현상 해결, https://devstudioonline.com/article/sequelize-set-timezone-and-datetime-format-for-mysql
*/
const dialectOptions = {
  decimalNumbers: true,
  dateStrings: true,
  typeCast: true,
}
export async function newSequelize (url, options: any = {}) {
  logger.info('newSequelize url:', url, options)

  // timezone +9 설정해준다. KST 사용
  options.timezone = '+09:00' // DB저장시

  /**
   * default는 max 5이나, prod.에서 문제 발생할 수 있으므로 50으로 세팅
   * RDS 파라미터 그룹에서 max_connections 혹은 db 접속해서 show variables like '%max_connections%'로 검색해서
   * 각 서버의 max값의 합이 max_connections를 넘지 않는 선에서 맞춰줘야함. 넘어버리면 서버가 종료될 수 있음.
  */
  options.pool = { max: 50 }

  // .env DB_LOGGING_TYPE으로 시퀄라이즈 로그옵션 조절. default는 console.log 임.
  commonEnv.DB_LOGGING_TYPE === 'logger' && (options.logging = msg => logger.debug(msg))
  commonEnv.DB_LOGGING_TYPE === 'no' && (options.logging = false)

  return new Sequelize(url, _.merge({ dialectOptions }, options))
}

export async function loadAllModel (modelPath) {
  const modelPathList = glob.sync(modelPath)
  for (const file of modelPathList) {
    logger.warn('loadAllModel :', file)
    const dbModel = await import(path.resolve(file))

    if (typeof dbModel.default === 'function' && !dbModel.default.findAll) {
      dbModel.default()
    }
  }
}

const DBs = {}

export const setDB = (dbName, db) => {
  logger.warn('setDB :', dbName)
  DBs[dbName] = db
}

export const getDB = (dbName) => {
  const db = DBs[dbName]
  if (!db) {
    throw new Error('Not initialized db:' + dbName)
  }
  return db
}

/**
 * db를 sync 하다가 db가 없다고 할 때, db를 생성하고 sync해주는 함수.
 * @param toSyncDb sync할 db의 sequelize instance
 * @param DB_URL database가 없을 때, db를 생성하기 위해 db 접속 url도 받음.
 */
export const ensureDbExistsAndSync = ensuredSync

export default Sequelize
