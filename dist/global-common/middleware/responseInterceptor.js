"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _logger = require("../utils/logger");
const logger = (0, _logger.getLogger)('responseInterceptor.ts');
const responseInterceptor = intercept => (req, res, next) => {
  const {
    end
  } = res;
  // console.log('>> end/intercpt name:', end.name, intercept.name)

  res.end = function decoratedEnd(chunk, encoding, cb) {
    try {
      let utf8Chuck;
      if (Buffer.isBuffer(chunk)) {
        utf8Chuck = chunk.toString('utf-8');
      }

      // 주: statusCode가 304(Not modified)나 204(No Content)일 경우에는 chunk가 빈 string일 수 있음.
      intercept(utf8Chuck || chunk, req, res);

      // .pipe() 등으로 인해 이미 headersSent 된 상태라면 추가로 end를 해줄 필요는 없다.
      // 그러나 decoratedEnd는 무조건 호출해줘야 중첩으로 end가 overload된 경우에도 모든 intercept가 정상적으로 호출된다.
      if (end.name === 'decoratedEnd' || !res.headersSent) {
        // end.apply(res, arguments)
        end.apply(res, [chunk, encoding, cb]);
      }
    } catch (err) {
      logger.error('res.end() error:', err);
    }
  };
  next();
};
var _default = responseInterceptor;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJsb2dnZXIiLCJnZXRMb2dnZXIiLCJyZXNwb25zZUludGVyY2VwdG9yIiwiaW50ZXJjZXB0IiwicmVxIiwicmVzIiwibmV4dCIsImVuZCIsImRlY29yYXRlZEVuZCIsImNodW5rIiwiZW5jb2RpbmciLCJjYiIsInV0ZjhDaHVjayIsIkJ1ZmZlciIsImlzQnVmZmVyIiwidG9TdHJpbmciLCJuYW1lIiwiaGVhZGVyc1NlbnQiLCJhcHBseSIsImVyciIsImVycm9yIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2dsb2JhbC1jb21tb24vbWlkZGxld2FyZS9yZXNwb25zZUludGVyY2VwdG9yLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldExvZ2dlciB9IGZyb20gJy4uL3V0aWxzL2xvZ2dlcidcclxuXHJcbmNvbnN0IGxvZ2dlciA9IGdldExvZ2dlcigncmVzcG9uc2VJbnRlcmNlcHRvci50cycpXHJcbmNvbnN0IHJlc3BvbnNlSW50ZXJjZXB0b3IgPSAoaW50ZXJjZXB0KSA9PiAocmVxLCByZXMsIG5leHQpID0+IHtcclxuICBjb25zdCB7IGVuZCB9ID0gcmVzXHJcbiAgLy8gY29uc29sZS5sb2coJz4+IGVuZC9pbnRlcmNwdCBuYW1lOicsIGVuZC5uYW1lLCBpbnRlcmNlcHQubmFtZSlcclxuXHJcbiAgcmVzLmVuZCA9IGZ1bmN0aW9uIGRlY29yYXRlZEVuZCAoY2h1bmssIGVuY29kaW5nLCBjYikge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbGV0IHV0ZjhDaHVja1xyXG4gICAgICBpZiAoQnVmZmVyLmlzQnVmZmVyKGNodW5rKSkge1xyXG4gICAgICAgIHV0ZjhDaHVjayA9IGNodW5rLnRvU3RyaW5nKCd1dGYtOCcpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIOyjvDogc3RhdHVzQ29kZeqwgCAzMDQoTm90IG1vZGlmaWVkKeuCmCAyMDQoTm8gQ29udGVudCnsnbwg6rK97Jqw7JeQ64qUIGNodW5r6rCAIOu5iCBzdHJpbmfsnbwg7IiYIOyeiOydjC5cclxuICAgICAgaW50ZXJjZXB0KHV0ZjhDaHVjayB8fCBjaHVuaywgcmVxLCByZXMpXHJcblxyXG4gICAgICAvLyAucGlwZSgpIOuTseycvOuhnCDsnbjtlbQg7J2066+4IGhlYWRlcnNTZW50IOuQnCDsg4Htg5zrnbzrqbQg7LaU6rCA66GcIGVuZOulvCDtlbTspIQg7ZWE7JqU64qUIOyXhuuLpC5cclxuICAgICAgLy8g6re465+s64KYIGRlY29yYXRlZEVuZOuKlCDrrLTsobDqsbQg7Zi47Lac7ZW07KSY7JW8IOykkeyyqeycvOuhnCBlbmTqsIAgb3ZlcmxvYWTrkJwg6rK97Jqw7JeQ64+EIOuqqOuToCBpbnRlcmNlcHTqsIAg7KCV7IOB7KCB7Jy866GcIO2YuOy2nOuQnOuLpC5cclxuICAgICAgaWYgKGVuZC5uYW1lID09PSAnZGVjb3JhdGVkRW5kJyB8fCAhcmVzLmhlYWRlcnNTZW50KSB7XHJcbiAgICAgICAgLy8gZW5kLmFwcGx5KHJlcywgYXJndW1lbnRzKVxyXG4gICAgICAgIGVuZC5hcHBseShyZXMsIFtjaHVuaywgZW5jb2RpbmcsIGNiXSlcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGxvZ2dlci5lcnJvcigncmVzLmVuZCgpIGVycm9yOicsIGVycilcclxuICAgIH1cclxuICB9XHJcbiAgbmV4dCgpXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJlc3BvbnNlSW50ZXJjZXB0b3JcclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUVBLE1BQU1BLE1BQU0sR0FBRyxJQUFBQyxpQkFBUyxFQUFDLHdCQUF3QixDQUFDO0FBQ2xELE1BQU1DLG1CQUFtQixHQUFJQyxTQUFTLElBQUssQ0FBQ0MsR0FBRyxFQUFFQyxHQUFHLEVBQUVDLElBQUksS0FBSztFQUM3RCxNQUFNO0lBQUVDO0VBQUksQ0FBQyxHQUFHRixHQUFHO0VBQ25COztFQUVBQSxHQUFHLENBQUNFLEdBQUcsR0FBRyxTQUFTQyxZQUFZLENBQUVDLEtBQUssRUFBRUMsUUFBUSxFQUFFQyxFQUFFLEVBQUU7SUFDcEQsSUFBSTtNQUNGLElBQUlDLFNBQVM7TUFDYixJQUFJQyxNQUFNLENBQUNDLFFBQVEsQ0FBQ0wsS0FBSyxDQUFDLEVBQUU7UUFDMUJHLFNBQVMsR0FBR0gsS0FBSyxDQUFDTSxRQUFRLENBQUMsT0FBTyxDQUFDO01BQ3JDOztNQUVBO01BQ0FaLFNBQVMsQ0FBQ1MsU0FBUyxJQUFJSCxLQUFLLEVBQUVMLEdBQUcsRUFBRUMsR0FBRyxDQUFDOztNQUV2QztNQUNBO01BQ0EsSUFBSUUsR0FBRyxDQUFDUyxJQUFJLEtBQUssY0FBYyxJQUFJLENBQUNYLEdBQUcsQ0FBQ1ksV0FBVyxFQUFFO1FBQ25EO1FBQ0FWLEdBQUcsQ0FBQ1csS0FBSyxDQUFDYixHQUFHLEVBQUUsQ0FBQ0ksS0FBSyxFQUFFQyxRQUFRLEVBQUVDLEVBQUUsQ0FBQyxDQUFDO01BQ3ZDO0lBQ0YsQ0FBQyxDQUFDLE9BQU9RLEdBQUcsRUFBRTtNQUNabkIsTUFBTSxDQUFDb0IsS0FBSyxDQUFDLGtCQUFrQixFQUFFRCxHQUFHLENBQUM7SUFDdkM7RUFDRixDQUFDO0VBQ0RiLElBQUksRUFBRTtBQUNSLENBQUM7QUFBQSxlQUVjSixtQkFBbUI7QUFBQSJ9