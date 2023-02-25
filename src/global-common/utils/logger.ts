import log4js, { Logger } from 'log4js'
import { IS_REAL_PRODUCTION, NO_DEFAULT_LOGGER } from '../constants/common'
import rTracer from 'cls-rtracer'

let level = 'debug'
if (IS_REAL_PRODUCTION) {
  level = 'info'
}

const layout = {
  type: 'pattern',
  pattern: '%[[%d] [%p] %c%] - %x{traceId} %m%n',
  tokens: {
    traceId: () => {
      return rTracer.id() ? `[${rTracer.id()}]` : ''
    },
  },
}
log4js.configure({
  appenders: { out: { type: 'stdout', layout } },
  categories: { default: { appenders: ['out'], level: 'info' } },
  disableClustering: true,
})

export function getLogger (label = '') {
  const logger: Logger = log4js.getLogger(label)
  logger.level = level
  if (NO_DEFAULT_LOGGER) {
    logger.level = 'warn'
  }
  return logger
}
