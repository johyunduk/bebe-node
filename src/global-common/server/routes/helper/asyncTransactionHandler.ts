import { getDB } from '@global-common/db/db-setup'
import { getLogger } from '../../../utils/logger'
const logger = getLogger('asyncTransactionHandler.ts')

const defaultErrorHandler = console.error

const asyncTransactionHandler = (route) => (req, res, next = defaultErrorHandler) => {
  Promise.resolve(
    (async function task () {
      const orgSend = res.send
      let flushSend
      res.send = function (data) {
        flushSend = () => {
          res.send = orgSend
          res.send(data)
        }
      }

      try {
        logger.info('Start transaction for ', route.name)
        await getDB().transaction(async () => {
          await route(req, res, next)
        })
        logger.info('Commit transaction for ', route.name) // 여기 왔다는 것은 transaction의 commit이 수행된 것임!
      } catch (err) {
        res.send = orgSend // ErrorHandler에서 에러 메시저 전송할 수 있도록 되돌려 놓음.
        logger.debug('Abort transaction err:', err.message)
        logger.info('Abort transaction for ', route.name)
        throw err
      } finally {
        // Transaction 처리가 모두 마무리 되면 그 때 send해줌.
        if (flushSend) {
          logger.info('Finish send for ', route.name)
          flushSend()
        }
      }
    })(),
  ).catch(next)
}

export default asyncTransactionHandler
