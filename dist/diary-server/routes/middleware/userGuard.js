"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reissueGuard = exports.diaryGuard = void 0;
var _httpError = require("@global-common/error/http-error");
var _asyncHandler = _interopRequireDefault(require("@global-common/server/routes/helper/asyncHandler"));
var _user = _interopRequireWildcard(require("@global-common/db/model/user"));
var _logger = require("@global-common/utils/logger");
var _jwtVerify = require("@global-common/middleware/jwtVerify");
var _enum = require("@global-common/constants/enum");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const logger = (0, _logger.getLogger)('diaryGuard.ts');
function _diaryGuard() {
  return async function (req, res, next) {
    const {
      id
    } = await (0, _jwtVerify.jwtGuard)(_enum.UserType.Diary, req);
    const user = await (0, _user.default)().findOne({
      where: {
        id
      },
      raw: true
    });
    if (!user) throw new _httpError.Unauthorized(_httpError.NO_USER_ABOUT_JWT, 'No user about the JWT');
    req.user = user;
    rejectByUserStatus(user.userStatus);
    next();
  };
}
function _reissueGuard() {
  return async function (req, res, next) {
    const {
      refreshToken
    } = req.body;
    if (!refreshToken) throw new _httpError.BadRequest(_httpError.NO_DATA, 'refresh token is required');
    const {
      id
    } = await (0, _jwtVerify.refreshGuard)(_enum.UserType.Diary, req, refreshToken);
    const user = await (0, _user.default)().findOne({
      where: {
        id,
        refreshToken
      },
      raw: true
    });
    if (!user) throw new _httpError.Unauthorized(_httpError.NO_USER_ABOUT_JWT, 'No user about the JWT');
    req.user = user;
    rejectByUserStatus(user.userStatus);
    next();
  };
}
function rejectByUserStatus(userStatus) {
  switch (userStatus) {
    case _user.UserStatus.Deactivated:
      throw new _httpError.Forbidden(_httpError.NOT_ACTIVATED, '활성 어드민 유저가 아님');
  }
}
const diaryGuard = (0, _asyncHandler.default)(_diaryGuard());
exports.diaryGuard = diaryGuard;
const reissueGuard = (0, _asyncHandler.default)(_reissueGuard());
exports.reissueGuard = reissueGuard;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJsb2dnZXIiLCJnZXRMb2dnZXIiLCJfZGlhcnlHdWFyZCIsInJlcSIsInJlcyIsIm5leHQiLCJpZCIsImp3dEd1YXJkIiwiVXNlclR5cGUiLCJEaWFyeSIsInVzZXIiLCJVc2VyIiwiZmluZE9uZSIsIndoZXJlIiwicmF3IiwiVW5hdXRob3JpemVkIiwiTk9fVVNFUl9BQk9VVF9KV1QiLCJyZWplY3RCeVVzZXJTdGF0dXMiLCJ1c2VyU3RhdHVzIiwiX3JlaXNzdWVHdWFyZCIsInJlZnJlc2hUb2tlbiIsImJvZHkiLCJCYWRSZXF1ZXN0IiwiTk9fREFUQSIsInJlZnJlc2hHdWFyZCIsIlVzZXJTdGF0dXMiLCJEZWFjdGl2YXRlZCIsIkZvcmJpZGRlbiIsIk5PVF9BQ1RJVkFURUQiLCJkaWFyeUd1YXJkIiwiYXN5bmNIYW5kbGVyIiwicmVpc3N1ZUd1YXJkIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2RpYXJ5LXNlcnZlci9yb3V0ZXMvbWlkZGxld2FyZS91c2VyR3VhcmQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFkUmVxdWVzdCwgRm9yYmlkZGVuLCBOT1RfQUNUSVZBVEVELCBOT19EQVRBLCBOT19VU0VSX0FCT1VUX0pXVCwgVW5hdXRob3JpemVkIH0gZnJvbSAnQGdsb2JhbC1jb21tb24vZXJyb3IvaHR0cC1lcnJvcidcclxuaW1wb3J0IGFzeW5jSGFuZGxlciBmcm9tICdAZ2xvYmFsLWNvbW1vbi9zZXJ2ZXIvcm91dGVzL2hlbHBlci9hc3luY0hhbmRsZXInXHJcbmltcG9ydCBVc2VyLCB7IFVzZXJTdGF0dXMgfSBmcm9tICdAZ2xvYmFsLWNvbW1vbi9kYi9tb2RlbC91c2VyJ1xyXG5pbXBvcnQgeyBnZXRMb2dnZXIgfSBmcm9tICdAZ2xvYmFsLWNvbW1vbi91dGlscy9sb2dnZXInXHJcbmltcG9ydCB7IGp3dEd1YXJkLCByZWZyZXNoR3VhcmQgfSBmcm9tICdAZ2xvYmFsLWNvbW1vbi9taWRkbGV3YXJlL2p3dFZlcmlmeSdcclxuaW1wb3J0IHsgVXNlclR5cGUgfSBmcm9tICdAZ2xvYmFsLWNvbW1vbi9jb25zdGFudHMvZW51bSdcclxuXHJcbmNvbnN0IGxvZ2dlciA9IGdldExvZ2dlcignZGlhcnlHdWFyZC50cycpXHJcblxyXG5mdW5jdGlvbiBfZGlhcnlHdWFyZCAoKSB7XHJcbiAgcmV0dXJuIGFzeW5jIGZ1bmN0aW9uIChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgY29uc3QgeyBpZCB9ID0gYXdhaXQgand0R3VhcmQoVXNlclR5cGUuRGlhcnksIHJlcSlcclxuXHJcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlcigpLmZpbmRPbmUoeyB3aGVyZTogeyBpZCB9LCByYXc6IHRydWUgfSlcclxuICAgIGlmICghdXNlcikgdGhyb3cgbmV3IFVuYXV0aG9yaXplZChOT19VU0VSX0FCT1VUX0pXVCwgJ05vIHVzZXIgYWJvdXQgdGhlIEpXVCcpXHJcblxyXG4gICAgcmVxLnVzZXIgPSB1c2VyXHJcbiAgICByZWplY3RCeVVzZXJTdGF0dXModXNlci51c2VyU3RhdHVzKVxyXG5cclxuICAgIG5leHQoKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gX3JlaXNzdWVHdWFyZCAoKSB7XHJcbiAgcmV0dXJuIGFzeW5jIGZ1bmN0aW9uIChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgY29uc3QgeyByZWZyZXNoVG9rZW4gfSA9IHJlcS5ib2R5XHJcbiAgICBpZiAoIXJlZnJlc2hUb2tlbikgdGhyb3cgbmV3IEJhZFJlcXVlc3QoTk9fREFUQSwgJ3JlZnJlc2ggdG9rZW4gaXMgcmVxdWlyZWQnKVxyXG5cclxuICAgIGNvbnN0IHsgaWQgfSA9IGF3YWl0IHJlZnJlc2hHdWFyZChVc2VyVHlwZS5EaWFyeSwgcmVxLCByZWZyZXNoVG9rZW4pXHJcblxyXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIoKS5maW5kT25lKHsgd2hlcmU6IHsgaWQsIHJlZnJlc2hUb2tlbiB9LCByYXc6IHRydWUgfSlcclxuICAgIGlmICghdXNlcikgdGhyb3cgbmV3IFVuYXV0aG9yaXplZChOT19VU0VSX0FCT1VUX0pXVCwgJ05vIHVzZXIgYWJvdXQgdGhlIEpXVCcpXHJcblxyXG4gICAgcmVxLnVzZXIgPSB1c2VyXHJcbiAgICByZWplY3RCeVVzZXJTdGF0dXModXNlci51c2VyU3RhdHVzKVxyXG5cclxuICAgIG5leHQoKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVqZWN0QnlVc2VyU3RhdHVzICh1c2VyU3RhdHVzOiBzdHJpbmcpIHtcclxuICBzd2l0Y2ggKHVzZXJTdGF0dXMpIHtcclxuICAgIGNhc2UgVXNlclN0YXR1cy5EZWFjdGl2YXRlZDpcclxuICAgICAgdGhyb3cgbmV3IEZvcmJpZGRlbihOT1RfQUNUSVZBVEVELCAn7Zmc7ISxIOyWtOuTnOuvvCDsnKDsoIDqsIAg7JWE64uYJylcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBkaWFyeUd1YXJkID0gYXN5bmNIYW5kbGVyKF9kaWFyeUd1YXJkKCkpXHJcbmV4cG9ydCBjb25zdCByZWlzc3VlR3VhcmQgPSBhc3luY0hhbmRsZXIoX3JlaXNzdWVHdWFyZCgpKVxyXG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUF3RDtBQUFBO0FBQUE7QUFFeEQsTUFBTUEsTUFBTSxHQUFHLElBQUFDLGlCQUFTLEVBQUMsZUFBZSxDQUFDO0FBRXpDLFNBQVNDLFdBQVcsR0FBSTtFQUN0QixPQUFPLGdCQUFnQkMsR0FBRyxFQUFFQyxHQUFHLEVBQUVDLElBQUksRUFBRTtJQUNyQyxNQUFNO01BQUVDO0lBQUcsQ0FBQyxHQUFHLE1BQU0sSUFBQUMsbUJBQVEsRUFBQ0MsY0FBUSxDQUFDQyxLQUFLLEVBQUVOLEdBQUcsQ0FBQztJQUVsRCxNQUFNTyxJQUFJLEdBQUcsTUFBTSxJQUFBQyxhQUFJLEdBQUUsQ0FBQ0MsT0FBTyxDQUFDO01BQUVDLEtBQUssRUFBRTtRQUFFUDtNQUFHLENBQUM7TUFBRVEsR0FBRyxFQUFFO0lBQUssQ0FBQyxDQUFDO0lBQy9ELElBQUksQ0FBQ0osSUFBSSxFQUFFLE1BQU0sSUFBSUssdUJBQVksQ0FBQ0MsNEJBQWlCLEVBQUUsdUJBQXVCLENBQUM7SUFFN0ViLEdBQUcsQ0FBQ08sSUFBSSxHQUFHQSxJQUFJO0lBQ2ZPLGtCQUFrQixDQUFDUCxJQUFJLENBQUNRLFVBQVUsQ0FBQztJQUVuQ2IsSUFBSSxFQUFFO0VBQ1IsQ0FBQztBQUNIO0FBRUEsU0FBU2MsYUFBYSxHQUFJO0VBQ3hCLE9BQU8sZ0JBQWdCaEIsR0FBRyxFQUFFQyxHQUFHLEVBQUVDLElBQUksRUFBRTtJQUNyQyxNQUFNO01BQUVlO0lBQWEsQ0FBQyxHQUFHakIsR0FBRyxDQUFDa0IsSUFBSTtJQUNqQyxJQUFJLENBQUNELFlBQVksRUFBRSxNQUFNLElBQUlFLHFCQUFVLENBQUNDLGtCQUFPLEVBQUUsMkJBQTJCLENBQUM7SUFFN0UsTUFBTTtNQUFFakI7SUFBRyxDQUFDLEdBQUcsTUFBTSxJQUFBa0IsdUJBQVksRUFBQ2hCLGNBQVEsQ0FBQ0MsS0FBSyxFQUFFTixHQUFHLEVBQUVpQixZQUFZLENBQUM7SUFFcEUsTUFBTVYsSUFBSSxHQUFHLE1BQU0sSUFBQUMsYUFBSSxHQUFFLENBQUNDLE9BQU8sQ0FBQztNQUFFQyxLQUFLLEVBQUU7UUFBRVAsRUFBRTtRQUFFYztNQUFhLENBQUM7TUFBRU4sR0FBRyxFQUFFO0lBQUssQ0FBQyxDQUFDO0lBQzdFLElBQUksQ0FBQ0osSUFBSSxFQUFFLE1BQU0sSUFBSUssdUJBQVksQ0FBQ0MsNEJBQWlCLEVBQUUsdUJBQXVCLENBQUM7SUFFN0ViLEdBQUcsQ0FBQ08sSUFBSSxHQUFHQSxJQUFJO0lBQ2ZPLGtCQUFrQixDQUFDUCxJQUFJLENBQUNRLFVBQVUsQ0FBQztJQUVuQ2IsSUFBSSxFQUFFO0VBQ1IsQ0FBQztBQUNIO0FBRUEsU0FBU1ksa0JBQWtCLENBQUVDLFVBQWtCLEVBQUU7RUFDL0MsUUFBUUEsVUFBVTtJQUNoQixLQUFLTyxnQkFBVSxDQUFDQyxXQUFXO01BQ3pCLE1BQU0sSUFBSUMsb0JBQVMsQ0FBQ0Msd0JBQWEsRUFBRSxlQUFlLENBQUM7RUFBQTtBQUV6RDtBQUVPLE1BQU1DLFVBQVUsR0FBRyxJQUFBQyxxQkFBWSxFQUFDNUIsV0FBVyxFQUFFLENBQUM7QUFBQTtBQUM5QyxNQUFNNkIsWUFBWSxHQUFHLElBQUFELHFCQUFZLEVBQUNYLGFBQWEsRUFBRSxDQUFDO0FBQUEifQ==