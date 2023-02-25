import path from 'path'
import { QueryTypes } from 'sequelize'

import {
  loadAllModel,
  getDB as getDb,
  setDB,
  newSequelize,
  ensureDbExistsAndSync,
} from '@global-common/db/common-db-setup'
import { commonEnv } from '@global-common/constants/env'
import { getLogger } from '@global-common/utils/logger'
import { PRODUCTION } from '@global-common/constants/common'

const logger = getLogger('db-setup.ts')

const { NODE_ENV, BEBE_DB_URL, BEBE_DB_NAME } = commonEnv

export async function connectDb () {
  if (NODE_ENV !== PRODUCTION) {
    logger.debug(`db-setup DB_URL: ${BEBE_DB_URL}`)
  }

  const sequelize = await newSequelize(BEBE_DB_URL)
  setDB(BEBE_DB_NAME, sequelize)
  await loadAllModel(path.join(__dirname, '/model/*.js'))
  await ensureDbExistsAndSync(sequelize, BEBE_DB_URL)
}

export const getDB = getDb.bind(null, BEBE_DB_NAME)
export const selectQuery = (sql, replacements?) => getDB().query(sql, { replacements, type: QueryTypes.SELECT })
export const updateQuery = (sql, replacements?) => getDB().query(sql, { replacements, type: QueryTypes.UPDATE })
