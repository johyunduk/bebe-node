import _ from 'lodash'
import axios from 'axios'

import { commonEnv } from '../constants/env'
import { TEST_CODE_SYMBOL } from '@global-common/constants/common'

const API_VERSION = commonEnv.API_VERSION

export function testApi (baseURL, symbol, errorLogOn = false) {
  let failCount = 0
  const client: any = axios.create({
    baseURL,
    headers: { [symbol]: 'true' },
  })

  if (errorLogOn) {
    client.failData = []

    client.interceptors.response.use(
      (res) => res,
      (err) => {
        const { method, path } = err.request
        console.log('#### HTTP ERROR :', failCount++, method, path)
        console.log('#### error:', err?.response?.data?.error)
        client.failData.push(err?.response?.data)
        throw err
      },
    )
  }

  return client
}

export function getApi (baseURL, errorLogOn = false) {
  return testApi(`${baseURL}/${API_VERSION}`, TEST_CODE_SYMBOL, errorLogOn)
}

export function getDBApi<T extends string> (baseURL, db) {
  const _dbApi = testApi(`${baseURL}/db`, 'x-e2e-test-db')
  const dbApi = {
    async count (table: T, condition?) {
      const res = await _dbApi
        .post(`/${db}/${table}/count`, condition)
        .catch((err) => err.response)
      return res?.data
    },
    async selectLast (table: T) {
      const condition = { $order: [['id', 'DESC']], $limit: 1 }
      const [one] = await this.select(table, condition)
      return one
    },
    async selectOne (table: T, condition?) {
      condition = _.assign({ $limit: 1 }, condition)
      const [one] = await this.select(table, condition)
      return one
    },
    async select (table: T, condition?) {
      const res = await _dbApi
        .post(`/${db}/${table}/select`, condition)
        .catch((err) => err.response)

      if (!res) {
        throw new Error('Please clean build and re-run the test!!')
      }

      return res?.data
    },
    async delete (table: T, condition?) {
      const res: any = await _dbApi
        .post(`/${db}/${table}/delete`, condition)
        .catch((err) => err.response)
      return res?.data
    },
    async insert (table: T, object) {
      const res = await _dbApi.post(`/${db}/${table}/insert`, object).catch((err) => err.response)
      return res?.data
    },
    async update (table: T, toUpdate, where) {
      const res = await _dbApi
        .post(`/${db}/${table}/update`, { toUpdate, where })
        .catch((err) => err.response)
      return res?.data
    },
    async ensureExist (table: T, object: any, targetColumn: string, query?: any) {
      let result
      try {
        const whereObj = query || object
        result = await this.select(table, whereObj)
        let [obj] = result
        if (!obj) {
          if (['admin'].includes(table)) {
            let whereToDel
            if (whereObj.id) {
              whereToDel = { id: whereObj.id }
            }

            if (whereObj[targetColumn]) {
              whereToDel = { [targetColumn]: whereObj[targetColumn] }
            }
            whereToDel && (await this.delete(table, whereToDel))
          }
          const data = await this.insert(table, object)
          obj = data
        }
        if (!obj || obj.error) {
          obj && obj.error && console.error('ensureExist ERROR! error:', obj.error)
          throw new Error('ensureExist Failed!')
        }
        return obj
      } catch (err) {
        console.error(
          `ensureExist ERROR catch! baseURL:${baseURL}, db:${db}.${table} `,
          query,
          object,
        )
        console.error('ensureExist select result:', result)
        console.warn('ensureExist err:', err)
        throw err
      }
    },
  }

  return dbApi
}
