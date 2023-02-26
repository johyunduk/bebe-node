"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logResponseBody = void 0;
exports.loggingMiddleware = loggingMiddleware;
var _lodash = _interopRequireDefault(require("lodash"));
var _clsRtracer = _interopRequireDefault(require("cls-rtracer"));
var _logger = require("../../../utils/logger");
var _responseInterceptor = _interopRequireDefault(require("../../../middleware/responseInterceptor"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const logger = (0, _logger.getLogger)('logging-middleware.ts');
function loggingMiddleware(req, res, next) {
  if (req.originalUrl === '/') return next();
  if (_lodash.default.startsWith(req.headers['user-agent'], 'ELB-HealthChecker')) return next();
  if (_lodash.default.startsWith(req.originalUrl, '/db/')) return next();
  logger.info(`
->>>>>>>>>>>>>>>>>
#@# [${_clsRtracer.default.id()}] API ${req.method} ${req.originalUrl}
=>>>>>>>>>>>>>>>>>`);
  if (req.method !== 'GET') {
    let {
      body
    } = req;
    if (body && body.password) {
      body = _lodash.default.clone(body);
      // password는 보이지 않게
      body.password = '### PW IS HIDDEN ###';
    }
    logger.info(`
#body:`, body);
  }
  next();
}
const MAX_BODY_LOG_LENGTH = 1500;
// response.send를 intercept 해서 로그 남김.
const logResponseBody = (0, _responseInterceptor.default)(function logResInterceptor(body, req, res) {
  if (req.originalUrl === '/') return;
  if (_lodash.default.startsWith(req.headers['user-agent'], 'ELB-HealthChecker')) return;
  if (_lodash.default.startsWith(req.originalUrl, '/db/')) return;
  if (body && body.length > MAX_BODY_LOG_LENGTH) {
    // 너무 긴 body는 출력 짤라서 출력.
    body = body.substr(0, 1000) + '...';
  }
  // 주: statusCode가 304(Not modified)나 204(No Content)일 경우에는 body가 빈 string일 수 있음.
  logger.info(`
<<<<<<<<<<<<<<<-
#@# [${_clsRtracer.default.id()}] RES ${req.method} ${req.originalUrl} ${res.statusCode}:
<<<<<<<<<<<<<<<=`, body);
});
exports.logResponseBody = logResponseBody;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJsb2dnZXIiLCJnZXRMb2dnZXIiLCJsb2dnaW5nTWlkZGxld2FyZSIsInJlcSIsInJlcyIsIm5leHQiLCJvcmlnaW5hbFVybCIsIl8iLCJzdGFydHNXaXRoIiwiaGVhZGVycyIsImluZm8iLCJyVHJhY2VyIiwiaWQiLCJtZXRob2QiLCJib2R5IiwicGFzc3dvcmQiLCJjbG9uZSIsIk1BWF9CT0RZX0xPR19MRU5HVEgiLCJsb2dSZXNwb25zZUJvZHkiLCJyZXNwb25zZUludGVyY2VwdG9yIiwibG9nUmVzSW50ZXJjZXB0b3IiLCJsZW5ndGgiLCJzdWJzdHIiLCJzdGF0dXNDb2RlIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2dsb2JhbC1jb21tb24vc2VydmVyL3JvdXRlcy9oZWxwZXIvbG9nZ2luZy1taWRkbGV3YXJlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCdcclxuaW1wb3J0IHJUcmFjZXIgZnJvbSAnY2xzLXJ0cmFjZXInXHJcblxyXG5pbXBvcnQgeyBnZXRMb2dnZXIgfSBmcm9tICcuLi8uLi8uLi91dGlscy9sb2dnZXInXHJcbmltcG9ydCByZXNwb25zZUludGVyY2VwdG9yIGZyb20gJy4uLy4uLy4uL21pZGRsZXdhcmUvcmVzcG9uc2VJbnRlcmNlcHRvcidcclxuXHJcbmNvbnN0IGxvZ2dlciA9IGdldExvZ2dlcignbG9nZ2luZy1taWRkbGV3YXJlLnRzJylcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsb2dnaW5nTWlkZGxld2FyZSAocmVxLCByZXMsIG5leHQpIHtcclxuICBpZiAocmVxLm9yaWdpbmFsVXJsID09PSAnLycpIHJldHVybiBuZXh0KClcclxuICBpZiAoXy5zdGFydHNXaXRoKHJlcS5oZWFkZXJzWyd1c2VyLWFnZW50J10sICdFTEItSGVhbHRoQ2hlY2tlcicpKSByZXR1cm4gbmV4dCgpXHJcbiAgaWYgKF8uc3RhcnRzV2l0aChyZXEub3JpZ2luYWxVcmwsICcvZGIvJykpIHJldHVybiBuZXh0KClcclxuXHJcbiAgbG9nZ2VyLmluZm8oXHJcbiAgICBgXHJcbi0+Pj4+Pj4+Pj4+Pj4+Pj4+PlxyXG4jQCMgWyR7clRyYWNlci5pZCgpfV0gQVBJICR7cmVxLm1ldGhvZH0gJHtyZXEub3JpZ2luYWxVcmx9XHJcbj0+Pj4+Pj4+Pj4+Pj4+Pj4+PmAsXHJcbiAgKVxyXG5cclxuICBpZiAocmVxLm1ldGhvZCAhPT0gJ0dFVCcpIHtcclxuICAgIGxldCB7IGJvZHkgfSA9IHJlcVxyXG4gICAgaWYgKGJvZHkgJiYgYm9keS5wYXNzd29yZCkge1xyXG4gICAgICBib2R5ID0gXy5jbG9uZShib2R5KVxyXG4gICAgICAvLyBwYXNzd29yZOuKlCDrs7TsnbTsp4Ag7JWK6rKMXHJcbiAgICAgIGJvZHkucGFzc3dvcmQgPSAnIyMjIFBXIElTIEhJRERFTiAjIyMnXHJcbiAgICB9XHJcbiAgICBsb2dnZXIuaW5mbyhcclxuICAgICAgYFxyXG4jYm9keTpgLFxyXG4gICAgICBib2R5LFxyXG4gICAgKVxyXG4gIH1cclxuICBuZXh0KClcclxufVxyXG5cclxuY29uc3QgTUFYX0JPRFlfTE9HX0xFTkdUSCA9IDE1MDBcclxuLy8gcmVzcG9uc2Uuc2VuZOulvCBpbnRlcmNlcHQg7ZW07IScIOuhnOq3uCDrgqjquYAuXHJcbmV4cG9ydCBjb25zdCBsb2dSZXNwb25zZUJvZHkgPSByZXNwb25zZUludGVyY2VwdG9yKGZ1bmN0aW9uIGxvZ1Jlc0ludGVyY2VwdG9yIChib2R5LCByZXEsIHJlcykge1xyXG4gIGlmIChyZXEub3JpZ2luYWxVcmwgPT09ICcvJykgcmV0dXJuXHJcbiAgaWYgKF8uc3RhcnRzV2l0aChyZXEuaGVhZGVyc1sndXNlci1hZ2VudCddLCAnRUxCLUhlYWx0aENoZWNrZXInKSkgcmV0dXJuXHJcbiAgaWYgKF8uc3RhcnRzV2l0aChyZXEub3JpZ2luYWxVcmwsICcvZGIvJykpIHJldHVyblxyXG5cclxuICBpZiAoYm9keSAmJiBib2R5Lmxlbmd0aCA+IE1BWF9CT0RZX0xPR19MRU5HVEgpIHtcclxuICAgIC8vIOuEiOustCDquLQgYm9keeuKlCDstpzroKUg7Kek65287IScIOy2nOugpS5cclxuICAgIGJvZHkgPSBib2R5LnN1YnN0cigwLCAxMDAwKSArICcuLi4nXHJcbiAgfVxyXG4gIC8vIOyjvDogc3RhdHVzQ29kZeqwgCAzMDQoTm90IG1vZGlmaWVkKeuCmCAyMDQoTm8gQ29udGVudCnsnbwg6rK97Jqw7JeQ64qUIGJvZHnqsIAg67mIIHN0cmluZ+ydvCDsiJgg7J6I7J2MLlxyXG4gIGxvZ2dlci5pbmZvKFxyXG4gICAgYFxyXG48PDw8PDw8PDw8PDw8PDwtXHJcbiNAIyBbJHtyVHJhY2VyLmlkKCl9XSBSRVMgJHtyZXEubWV0aG9kfSAke3JlcS5vcmlnaW5hbFVybH0gJHtyZXMuc3RhdHVzQ29kZX06XHJcbjw8PDw8PDw8PDw8PDw8PD1gLFxyXG4gICAgYm9keSxcclxuICApXHJcbn0pXHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQXlFO0FBRXpFLE1BQU1BLE1BQU0sR0FBRyxJQUFBQyxpQkFBUyxFQUFDLHVCQUF1QixDQUFDO0FBRTFDLFNBQVNDLGlCQUFpQixDQUFFQyxHQUFHLEVBQUVDLEdBQUcsRUFBRUMsSUFBSSxFQUFFO0VBQ2pELElBQUlGLEdBQUcsQ0FBQ0csV0FBVyxLQUFLLEdBQUcsRUFBRSxPQUFPRCxJQUFJLEVBQUU7RUFDMUMsSUFBSUUsZUFBQyxDQUFDQyxVQUFVLENBQUNMLEdBQUcsQ0FBQ00sT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFLG1CQUFtQixDQUFDLEVBQUUsT0FBT0osSUFBSSxFQUFFO0VBQy9FLElBQUlFLGVBQUMsQ0FBQ0MsVUFBVSxDQUFDTCxHQUFHLENBQUNHLFdBQVcsRUFBRSxNQUFNLENBQUMsRUFBRSxPQUFPRCxJQUFJLEVBQUU7RUFFeERMLE1BQU0sQ0FBQ1UsSUFBSSxDQUNSO0FBQ0w7QUFDQSxPQUFPQyxtQkFBTyxDQUFDQyxFQUFFLEVBQUcsU0FBUVQsR0FBRyxDQUFDVSxNQUFPLElBQUdWLEdBQUcsQ0FBQ0csV0FBWTtBQUMxRCxtQkFBbUIsQ0FDaEI7RUFFRCxJQUFJSCxHQUFHLENBQUNVLE1BQU0sS0FBSyxLQUFLLEVBQUU7SUFDeEIsSUFBSTtNQUFFQztJQUFLLENBQUMsR0FBR1gsR0FBRztJQUNsQixJQUFJVyxJQUFJLElBQUlBLElBQUksQ0FBQ0MsUUFBUSxFQUFFO01BQ3pCRCxJQUFJLEdBQUdQLGVBQUMsQ0FBQ1MsS0FBSyxDQUFDRixJQUFJLENBQUM7TUFDcEI7TUFDQUEsSUFBSSxDQUFDQyxRQUFRLEdBQUcsc0JBQXNCO0lBQ3hDO0lBQ0FmLE1BQU0sQ0FBQ1UsSUFBSSxDQUNSO0FBQ1AsT0FBTyxFQUNESSxJQUFJLENBQ0w7RUFDSDtFQUNBVCxJQUFJLEVBQUU7QUFDUjtBQUVBLE1BQU1ZLG1CQUFtQixHQUFHLElBQUk7QUFDaEM7QUFDTyxNQUFNQyxlQUFlLEdBQUcsSUFBQUMsNEJBQW1CLEVBQUMsU0FBU0MsaUJBQWlCLENBQUVOLElBQUksRUFBRVgsR0FBRyxFQUFFQyxHQUFHLEVBQUU7RUFDN0YsSUFBSUQsR0FBRyxDQUFDRyxXQUFXLEtBQUssR0FBRyxFQUFFO0VBQzdCLElBQUlDLGVBQUMsQ0FBQ0MsVUFBVSxDQUFDTCxHQUFHLENBQUNNLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRSxtQkFBbUIsQ0FBQyxFQUFFO0VBQ2xFLElBQUlGLGVBQUMsQ0FBQ0MsVUFBVSxDQUFDTCxHQUFHLENBQUNHLFdBQVcsRUFBRSxNQUFNLENBQUMsRUFBRTtFQUUzQyxJQUFJUSxJQUFJLElBQUlBLElBQUksQ0FBQ08sTUFBTSxHQUFHSixtQkFBbUIsRUFBRTtJQUM3QztJQUNBSCxJQUFJLEdBQUdBLElBQUksQ0FBQ1EsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxLQUFLO0VBQ3JDO0VBQ0E7RUFDQXRCLE1BQU0sQ0FBQ1UsSUFBSSxDQUNSO0FBQ0w7QUFDQSxPQUFPQyxtQkFBTyxDQUFDQyxFQUFFLEVBQUcsU0FBUVQsR0FBRyxDQUFDVSxNQUFPLElBQUdWLEdBQUcsQ0FBQ0csV0FBWSxJQUFHRixHQUFHLENBQUNtQixVQUFXO0FBQzVFLGlCQUFpQixFQUNiVCxJQUFJLENBQ0w7QUFDSCxDQUFDLENBQUM7QUFBQSJ9