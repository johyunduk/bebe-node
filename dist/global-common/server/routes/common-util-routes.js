"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = commonUtilsRoutes;
var _express = require("express");
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _loggingMiddleware = require("./helper/logging-middleware");
var _common = require("../../constants/common");
var _logger = require("../../utils/logger");
var _dbAccessRoutes = _interopRequireDefault(require("./db-access-routes"));
var _asyncHandler = _interopRequireDefault(require("./helper/asyncHandler"));
var _env = require("@global-common/constants/env");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const logger = (0, _logger.getLogger)('common-util-routes.ts');
/**
 * e2e 테스트를 위한 공통 api 기능 모음.
 * @param router
 */
function commonUtilsRoutes(getDB, router = (0, _express.Router)()) {
  logger.info('IS_REAL_PRODUCTION:', _common.IS_REAL_PRODUCTION);
  if (!_common.IS_REAL_PRODUCTION) {
    router.use(_loggingMiddleware.logResponseBody);
    router.use('/db', (0, _dbAccessRoutes.default)(getDB));
    router.post(`/${_env.commonEnv.API_VERSION}/utils/jwt`, (0, _asyncHandler.default)(postJwt));
  } else {
    process.env.LOG_RESPONSE && router.use(_loggingMiddleware.logResponseBody);
  }
  async function postJwt(req, res) {
    const {
      id,
      type,
      isRefreshTest,
      deviceId
    } = req.body;
    let expiresIn = '600000';
    const refreshToken = _jsonwebtoken.default.sign({
      id,
      type,
      token: 'REFRESH',
      deviceId
    }, _env.commonEnv.JWT_SECRET_KEY, {
      expiresIn
    });
    if (isRefreshTest) expiresIn = '10';
    const accessToken = _jsonwebtoken.default.sign({
      id,
      type,
      token: 'ACCESS',
      deviceId
    }, _env.commonEnv.JWT_SECRET_KEY, {
      expiresIn
    });
    logger.debug('테스트 JWT 발급', req.body, accessToken);
    res.send({
      accessToken,
      refreshToken
    });
  }
  return router;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJsb2dnZXIiLCJnZXRMb2dnZXIiLCJjb21tb25VdGlsc1JvdXRlcyIsImdldERCIiwicm91dGVyIiwiUm91dGVyIiwiaW5mbyIsIklTX1JFQUxfUFJPRFVDVElPTiIsInVzZSIsImxvZ1Jlc3BvbnNlQm9keSIsImRiQWNjZXNzUm91dGVzIiwicG9zdCIsImNvbW1vbkVudiIsIkFQSV9WRVJTSU9OIiwiYXN5bmNIYW5kbGVyIiwicG9zdEp3dCIsInByb2Nlc3MiLCJlbnYiLCJMT0dfUkVTUE9OU0UiLCJyZXEiLCJyZXMiLCJpZCIsInR5cGUiLCJpc1JlZnJlc2hUZXN0IiwiZGV2aWNlSWQiLCJib2R5IiwiZXhwaXJlc0luIiwicmVmcmVzaFRva2VuIiwiand0Iiwic2lnbiIsInRva2VuIiwiSldUX1NFQ1JFVF9LRVkiLCJhY2Nlc3NUb2tlbiIsImRlYnVnIiwic2VuZCJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9nbG9iYWwtY29tbW9uL3NlcnZlci9yb3V0ZXMvY29tbW9uLXV0aWwtcm91dGVzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlciB9IGZyb20gJ2V4cHJlc3MnXHJcbmltcG9ydCBqd3QgZnJvbSAnanNvbndlYnRva2VuJ1xyXG5pbXBvcnQgeyBsb2dSZXNwb25zZUJvZHkgfSBmcm9tICcuL2hlbHBlci9sb2dnaW5nLW1pZGRsZXdhcmUnXHJcbmltcG9ydCB7IElTX1JFQUxfUFJPRFVDVElPTiB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9jb21tb24nXHJcbmltcG9ydCB7IGdldExvZ2dlciB9IGZyb20gJy4uLy4uL3V0aWxzL2xvZ2dlcidcclxuaW1wb3J0IGRiQWNjZXNzUm91dGVzIGZyb20gJy4vZGItYWNjZXNzLXJvdXRlcydcclxuaW1wb3J0IGFzeW5jSGFuZGxlciBmcm9tICcuL2hlbHBlci9hc3luY0hhbmRsZXInXHJcbmltcG9ydCB7IGNvbW1vbkVudiB9IGZyb20gJ0BnbG9iYWwtY29tbW9uL2NvbnN0YW50cy9lbnYnXHJcblxyXG5jb25zdCBsb2dnZXIgPSBnZXRMb2dnZXIoJ2NvbW1vbi11dGlsLXJvdXRlcy50cycpXHJcbi8qKlxyXG4gKiBlMmUg7YWM7Iqk7Yq466W8IOychO2VnCDqs7XthrUgYXBpIOq4sOuKpSDrqqjsnYwuXHJcbiAqIEBwYXJhbSByb3V0ZXJcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbW1vblV0aWxzUm91dGVzIChnZXREQiwgcm91dGVyID0gUm91dGVyKCkpIHtcclxuICBsb2dnZXIuaW5mbygnSVNfUkVBTF9QUk9EVUNUSU9OOicsIElTX1JFQUxfUFJPRFVDVElPTilcclxuICBpZiAoIUlTX1JFQUxfUFJPRFVDVElPTikge1xyXG4gICAgcm91dGVyLnVzZShsb2dSZXNwb25zZUJvZHkpXHJcbiAgICByb3V0ZXIudXNlKCcvZGInLCBkYkFjY2Vzc1JvdXRlcyhnZXREQikpXHJcbiAgICByb3V0ZXIucG9zdChgLyR7Y29tbW9uRW52LkFQSV9WRVJTSU9OfS91dGlscy9qd3RgLCBhc3luY0hhbmRsZXIocG9zdEp3dCkpXHJcbiAgfSBlbHNlIHtcclxuICAgIHByb2Nlc3MuZW52LkxPR19SRVNQT05TRSAmJiByb3V0ZXIudXNlKGxvZ1Jlc3BvbnNlQm9keSlcclxuICB9XHJcblxyXG4gIGFzeW5jIGZ1bmN0aW9uIHBvc3RKd3QgKHJlcSwgcmVzKSB7XHJcbiAgICBjb25zdCB7IGlkLCB0eXBlLCBpc1JlZnJlc2hUZXN0LCBkZXZpY2VJZCB9ID0gcmVxLmJvZHlcclxuXHJcbiAgICBsZXQgZXhwaXJlc0luID0gJzYwMDAwMCdcclxuICAgIGNvbnN0IHJlZnJlc2hUb2tlbiA9IGp3dC5zaWduKHsgaWQsIHR5cGUsIHRva2VuOiAnUkVGUkVTSCcsIGRldmljZUlkIH0sIGNvbW1vbkVudi5KV1RfU0VDUkVUX0tFWSwgeyBleHBpcmVzSW4gfSlcclxuICAgIGlmIChpc1JlZnJlc2hUZXN0KSBleHBpcmVzSW4gPSAnMTAnXHJcbiAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IGp3dC5zaWduKHsgaWQsIHR5cGUsIHRva2VuOiAnQUNDRVNTJywgZGV2aWNlSWQgfSwgY29tbW9uRW52LkpXVF9TRUNSRVRfS0VZLCB7IGV4cGlyZXNJbiB9KVxyXG5cclxuICAgIGxvZ2dlci5kZWJ1Zygn7YWM7Iqk7Yq4IEpXVCDrsJzquIknLCByZXEuYm9keSwgYWNjZXNzVG9rZW4pXHJcblxyXG4gICAgcmVzLnNlbmQoeyBhY2Nlc3NUb2tlbiwgcmVmcmVzaFRva2VuIH0pXHJcbiAgfVxyXG5cclxuICByZXR1cm4gcm91dGVyXHJcbn1cclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQXdEO0FBRXhELE1BQU1BLE1BQU0sR0FBRyxJQUFBQyxpQkFBUyxFQUFDLHVCQUF1QixDQUFDO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ2UsU0FBU0MsaUJBQWlCLENBQUVDLEtBQUssRUFBRUMsTUFBTSxHQUFHLElBQUFDLGVBQU0sR0FBRSxFQUFFO0VBQ25FTCxNQUFNLENBQUNNLElBQUksQ0FBQyxxQkFBcUIsRUFBRUMsMEJBQWtCLENBQUM7RUFDdEQsSUFBSSxDQUFDQSwwQkFBa0IsRUFBRTtJQUN2QkgsTUFBTSxDQUFDSSxHQUFHLENBQUNDLGtDQUFlLENBQUM7SUFDM0JMLE1BQU0sQ0FBQ0ksR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFBRSx1QkFBYyxFQUFDUCxLQUFLLENBQUMsQ0FBQztJQUN4Q0MsTUFBTSxDQUFDTyxJQUFJLENBQUUsSUFBR0MsY0FBUyxDQUFDQyxXQUFZLFlBQVcsRUFBRSxJQUFBQyxxQkFBWSxFQUFDQyxPQUFPLENBQUMsQ0FBQztFQUMzRSxDQUFDLE1BQU07SUFDTEMsT0FBTyxDQUFDQyxHQUFHLENBQUNDLFlBQVksSUFBSWQsTUFBTSxDQUFDSSxHQUFHLENBQUNDLGtDQUFlLENBQUM7RUFDekQ7RUFFQSxlQUFlTSxPQUFPLENBQUVJLEdBQUcsRUFBRUMsR0FBRyxFQUFFO0lBQ2hDLE1BQU07TUFBRUMsRUFBRTtNQUFFQyxJQUFJO01BQUVDLGFBQWE7TUFBRUM7SUFBUyxDQUFDLEdBQUdMLEdBQUcsQ0FBQ00sSUFBSTtJQUV0RCxJQUFJQyxTQUFTLEdBQUcsUUFBUTtJQUN4QixNQUFNQyxZQUFZLEdBQUdDLHFCQUFHLENBQUNDLElBQUksQ0FBQztNQUFFUixFQUFFO01BQUVDLElBQUk7TUFBRVEsS0FBSyxFQUFFLFNBQVM7TUFBRU47SUFBUyxDQUFDLEVBQUVaLGNBQVMsQ0FBQ21CLGNBQWMsRUFBRTtNQUFFTDtJQUFVLENBQUMsQ0FBQztJQUNoSCxJQUFJSCxhQUFhLEVBQUVHLFNBQVMsR0FBRyxJQUFJO0lBQ25DLE1BQU1NLFdBQVcsR0FBR0oscUJBQUcsQ0FBQ0MsSUFBSSxDQUFDO01BQUVSLEVBQUU7TUFBRUMsSUFBSTtNQUFFUSxLQUFLLEVBQUUsUUFBUTtNQUFFTjtJQUFTLENBQUMsRUFBRVosY0FBUyxDQUFDbUIsY0FBYyxFQUFFO01BQUVMO0lBQVUsQ0FBQyxDQUFDO0lBRTlHMUIsTUFBTSxDQUFDaUMsS0FBSyxDQUFDLFlBQVksRUFBRWQsR0FBRyxDQUFDTSxJQUFJLEVBQUVPLFdBQVcsQ0FBQztJQUVqRFosR0FBRyxDQUFDYyxJQUFJLENBQUM7TUFBRUYsV0FBVztNQUFFTDtJQUFhLENBQUMsQ0FBQztFQUN6QztFQUVBLE9BQU92QixNQUFNO0FBQ2YifQ==