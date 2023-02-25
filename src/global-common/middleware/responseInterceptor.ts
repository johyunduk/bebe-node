import { getLogger } from '../utils/logger'

const logger = getLogger('responseInterceptor.ts')
const responseInterceptor = (intercept) => (req, res, next) => {
  const { end } = res
  // console.log('>> end/intercpt name:', end.name, intercept.name)

  res.end = function decoratedEnd (chunk, encoding, cb) {
    try {
      let utf8Chuck
      if (Buffer.isBuffer(chunk)) {
        utf8Chuck = chunk.toString('utf-8')
      }

      // 주: statusCode가 304(Not modified)나 204(No Content)일 경우에는 chunk가 빈 string일 수 있음.
      intercept(utf8Chuck || chunk, req, res)

      // .pipe() 등으로 인해 이미 headersSent 된 상태라면 추가로 end를 해줄 필요는 없다.
      // 그러나 decoratedEnd는 무조건 호출해줘야 중첩으로 end가 overload된 경우에도 모든 intercept가 정상적으로 호출된다.
      if (end.name === 'decoratedEnd' || !res.headersSent) {
        // end.apply(res, arguments)
        end.apply(res, [chunk, encoding, cb])
      }
    } catch (err) {
      logger.error('res.end() error:', err)
    }
  }
  next()
}

export default responseInterceptor
