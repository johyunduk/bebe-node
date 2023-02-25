import _ from 'lodash'
import { Op, QueryTypes } from 'sequelize'
import { Router } from 'express'
import asyncHandler from './helper/asyncHandler'
import { NotFound } from '../../error/http-error'
import { toPlain } from '../../utils'
import { getLogger } from '../../utils/logger'

const logger = getLogger('db-access-routes.ts')

function toRawInsertQuery (model, obj) {
  const keys = Object.keys(obj).join(',')
  const values = Object.values(obj)
    .map((it) => (typeof it === 'number' ? it : `'${it}'`))
    .join(',')
  const query = `INSERT INTO ${model.name} (${keys}) VALUES (${values})`
  return query
}

export default function dbRoutes (getDB) {
  const router = Router()
  const insertQuery = (sql) => getDB().query(sql, { type: QueryTypes.INSERT })
  // API 요청 형태는 api 버전과 관계 없이 다음과 같음. 예) http://localhost:7001/db/app_user/select
  router.get('/:db/:table/:op?', asyncHandler(crud))
  router.post('/:db/:table/:op', asyncHandler(crud))

  async function crud (req, res) {
    const { db, table } = req.params
    const op = req.params.op || 'select'

    let body = req.body
    if (_.isEmpty(body)) {
      body = req.query
    }
    const limit = +body.$limit || undefined
    const order = body.$order
    const raw = body.$raw
    delete body.$raw
    delete body.$limit
    delete body.$order

    const database = getDB(db).models

    logger.debug('crud db, table, op, body:', db, table, op, body)
    const dbModel = database[table]

    if (!dbModel) {
      throw new NotFound('NO_MODEL_DEFINITION', `Model ${db}.${table} does not exist!`)
    }

    let result

    try {
      logger.debug(`db-access-routes op:${op} BEGIN:`)
      switch (op) {
        case 'count':
          result = await dbModel.count({ where: body })
          result = { count: result }
          break
        case 'select':
          result = await dbModel.findAll({ where: body, limit, order, raw: true })
          break
        case 'insert':
          if (_.isArray(body)) {
            await dbModel.bulkCreate(body)
            result = body.length + ' inserted!'
          } else if (raw) {
            // updatedAt등을 강제로 세팅하기 위해 raw query로 insert 함.
            const [id] = await insertQuery(toRawInsertQuery(dbModel, body))
            result = await dbModel.findOne({ id }, { raw: true })
          } else {
            const data = await dbModel.create(body)
            result = data.get()
          }
          break
        case 'update':
          result = await dbModel.update(body.toUpdate, { where: body.where })
          break
        case 'delete':
          result = await dbModel.destroy({ where: body })
          result = { deleted: result }
          break
        default:
          throw new NotFound('OPERATION_NOT_FOUND', 'db operation is not supported:' + op)
      }
      logger.debug(`db-access-routes op:${op} END:`)
    } catch (err) {
      logger.error(`db-access-routes op:${op} error:`, err.message)
      throw err
    }
    logger.debug('db-access-routes dbRoutes result:', toPlain(result))
    res.send(result)
  }

  return router
}
