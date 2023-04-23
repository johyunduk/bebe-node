"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reissueGuard = exports.diaryGuard = exports.adminGuard = void 0;
var _httpError = require("@global-common/error/http-error");
var _asyncHandler = _interopRequireDefault(require("@global-common/server/routes/helper/asyncHandler"));
var _user = _interopRequireWildcard(require("@global-common/db/model/user"));
var _logger = require("@global-common/utils/logger");
var _jwtVerify = require("@global-common/middleware/jwtVerify");
var _enum = require("@global-common/constants/enum");
var _admin = _interopRequireDefault(require("@global-common/db/model/admin"));
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
function _adminGuard() {
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
    const admin = await (0, _admin.default)().findOne({
      where: {
        userId: id
      },
      raw: true
    });
    if (!admin) throw new _httpError.Forbidden(_httpError.NOT_ACTIVATED, '활성 어드민 유저가 아님');
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
const adminGuard = (0, _asyncHandler.default)(_adminGuard());
exports.adminGuard = adminGuard;
const reissueGuard = (0, _asyncHandler.default)(_reissueGuard());
exports.reissueGuard = reissueGuard;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJsb2dnZXIiLCJnZXRMb2dnZXIiLCJfZGlhcnlHdWFyZCIsInJlcSIsInJlcyIsIm5leHQiLCJpZCIsImp3dEd1YXJkIiwiVXNlclR5cGUiLCJEaWFyeSIsInVzZXIiLCJVc2VyIiwiZmluZE9uZSIsIndoZXJlIiwicmF3IiwiVW5hdXRob3JpemVkIiwiTk9fVVNFUl9BQk9VVF9KV1QiLCJyZWplY3RCeVVzZXJTdGF0dXMiLCJ1c2VyU3RhdHVzIiwiX2FkbWluR3VhcmQiLCJhZG1pbiIsIkFkbWluIiwidXNlcklkIiwiRm9yYmlkZGVuIiwiTk9UX0FDVElWQVRFRCIsIl9yZWlzc3VlR3VhcmQiLCJyZWZyZXNoVG9rZW4iLCJib2R5IiwiQmFkUmVxdWVzdCIsIk5PX0RBVEEiLCJyZWZyZXNoR3VhcmQiLCJVc2VyU3RhdHVzIiwiRGVhY3RpdmF0ZWQiLCJkaWFyeUd1YXJkIiwiYXN5bmNIYW5kbGVyIiwiYWRtaW5HdWFyZCIsInJlaXNzdWVHdWFyZCJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kaWFyeS1zZXJ2ZXIvcm91dGVzL21pZGRsZXdhcmUvdXNlckd1YXJkLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhZFJlcXVlc3QsIEZvcmJpZGRlbiwgTk9UX0FDVElWQVRFRCwgTk9fREFUQSwgTk9fVVNFUl9BQk9VVF9KV1QsIFVuYXV0aG9yaXplZCB9IGZyb20gJ0BnbG9iYWwtY29tbW9uL2Vycm9yL2h0dHAtZXJyb3InXHJcbmltcG9ydCBhc3luY0hhbmRsZXIgZnJvbSAnQGdsb2JhbC1jb21tb24vc2VydmVyL3JvdXRlcy9oZWxwZXIvYXN5bmNIYW5kbGVyJ1xyXG5pbXBvcnQgVXNlciwgeyBVc2VyU3RhdHVzIH0gZnJvbSAnQGdsb2JhbC1jb21tb24vZGIvbW9kZWwvdXNlcidcclxuaW1wb3J0IHsgZ2V0TG9nZ2VyIH0gZnJvbSAnQGdsb2JhbC1jb21tb24vdXRpbHMvbG9nZ2VyJ1xyXG5pbXBvcnQgeyBqd3RHdWFyZCwgcmVmcmVzaEd1YXJkIH0gZnJvbSAnQGdsb2JhbC1jb21tb24vbWlkZGxld2FyZS9qd3RWZXJpZnknXHJcbmltcG9ydCB7IFVzZXJUeXBlIH0gZnJvbSAnQGdsb2JhbC1jb21tb24vY29uc3RhbnRzL2VudW0nXHJcbmltcG9ydCBBZG1pbiBmcm9tICdAZ2xvYmFsLWNvbW1vbi9kYi9tb2RlbC9hZG1pbidcclxuXHJcbmNvbnN0IGxvZ2dlciA9IGdldExvZ2dlcignZGlhcnlHdWFyZC50cycpXHJcblxyXG5mdW5jdGlvbiBfZGlhcnlHdWFyZCAoKSB7XHJcbiAgcmV0dXJuIGFzeW5jIGZ1bmN0aW9uIChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgY29uc3QgeyBpZCB9ID0gYXdhaXQgand0R3VhcmQoVXNlclR5cGUuRGlhcnksIHJlcSlcclxuXHJcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlcigpLmZpbmRPbmUoeyB3aGVyZTogeyBpZCB9LCByYXc6IHRydWUgfSlcclxuICAgIGlmICghdXNlcikgdGhyb3cgbmV3IFVuYXV0aG9yaXplZChOT19VU0VSX0FCT1VUX0pXVCwgJ05vIHVzZXIgYWJvdXQgdGhlIEpXVCcpXHJcblxyXG4gICAgcmVxLnVzZXIgPSB1c2VyXHJcbiAgICByZWplY3RCeVVzZXJTdGF0dXModXNlci51c2VyU3RhdHVzKVxyXG5cclxuICAgIG5leHQoKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gX2FkbWluR3VhcmQgKCkge1xyXG4gIHJldHVybiBhc3luYyBmdW5jdGlvbiAocmVxLCByZXMsIG5leHQpIHtcclxuICAgIGNvbnN0IHsgaWQgfSA9IGF3YWl0IGp3dEd1YXJkKFVzZXJUeXBlLkRpYXJ5LCByZXEpXHJcblxyXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIoKS5maW5kT25lKHsgd2hlcmU6IHsgaWQgfSwgcmF3OiB0cnVlIH0pXHJcbiAgICBpZiAoIXVzZXIpIHRocm93IG5ldyBVbmF1dGhvcml6ZWQoTk9fVVNFUl9BQk9VVF9KV1QsICdObyB1c2VyIGFib3V0IHRoZSBKV1QnKVxyXG5cclxuICAgIHJlcS51c2VyID0gdXNlclxyXG4gICAgcmVqZWN0QnlVc2VyU3RhdHVzKHVzZXIudXNlclN0YXR1cylcclxuXHJcbiAgICBjb25zdCBhZG1pbiA9IGF3YWl0IEFkbWluKCkuZmluZE9uZSh7IHdoZXJlOiB7IHVzZXJJZDogaWQgfSwgcmF3OiB0cnVlIH0pXHJcbiAgICBpZiAoIWFkbWluKSB0aHJvdyBuZXcgRm9yYmlkZGVuKE5PVF9BQ1RJVkFURUQsICftmZzshLEg7Ja065Oc66+8IOycoOyggOqwgCDslYTri5gnKVxyXG5cclxuICAgIG5leHQoKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gX3JlaXNzdWVHdWFyZCAoKSB7XHJcbiAgcmV0dXJuIGFzeW5jIGZ1bmN0aW9uIChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgY29uc3QgeyByZWZyZXNoVG9rZW4gfSA9IHJlcS5ib2R5XHJcbiAgICBpZiAoIXJlZnJlc2hUb2tlbikgdGhyb3cgbmV3IEJhZFJlcXVlc3QoTk9fREFUQSwgJ3JlZnJlc2ggdG9rZW4gaXMgcmVxdWlyZWQnKVxyXG5cclxuICAgIGNvbnN0IHsgaWQgfSA9IGF3YWl0IHJlZnJlc2hHdWFyZChVc2VyVHlwZS5EaWFyeSwgcmVxLCByZWZyZXNoVG9rZW4pXHJcblxyXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIoKS5maW5kT25lKHsgd2hlcmU6IHsgaWQsIHJlZnJlc2hUb2tlbiB9LCByYXc6IHRydWUgfSlcclxuICAgIGlmICghdXNlcikgdGhyb3cgbmV3IFVuYXV0aG9yaXplZChOT19VU0VSX0FCT1VUX0pXVCwgJ05vIHVzZXIgYWJvdXQgdGhlIEpXVCcpXHJcblxyXG4gICAgcmVxLnVzZXIgPSB1c2VyXHJcbiAgICByZWplY3RCeVVzZXJTdGF0dXModXNlci51c2VyU3RhdHVzKVxyXG5cclxuICAgIG5leHQoKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVqZWN0QnlVc2VyU3RhdHVzICh1c2VyU3RhdHVzOiBzdHJpbmcpIHtcclxuICBzd2l0Y2ggKHVzZXJTdGF0dXMpIHtcclxuICAgIGNhc2UgVXNlclN0YXR1cy5EZWFjdGl2YXRlZDpcclxuICAgICAgdGhyb3cgbmV3IEZvcmJpZGRlbihOT1RfQUNUSVZBVEVELCAn7Zmc7ISxIOyWtOuTnOuvvCDsnKDsoIDqsIAg7JWE64uYJylcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBkaWFyeUd1YXJkID0gYXN5bmNIYW5kbGVyKF9kaWFyeUd1YXJkKCkpXHJcbmV4cG9ydCBjb25zdCBhZG1pbkd1YXJkID0gYXN5bmNIYW5kbGVyKF9hZG1pbkd1YXJkKCkpXHJcbmV4cG9ydCBjb25zdCByZWlzc3VlR3VhcmQgPSBhc3luY0hhbmRsZXIoX3JlaXNzdWVHdWFyZCgpKVxyXG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQWlEO0FBQUE7QUFBQTtBQUVqRCxNQUFNQSxNQUFNLEdBQUcsSUFBQUMsaUJBQVMsRUFBQyxlQUFlLENBQUM7QUFFekMsU0FBU0MsV0FBVyxHQUFJO0VBQ3RCLE9BQU8sZ0JBQWdCQyxHQUFHLEVBQUVDLEdBQUcsRUFBRUMsSUFBSSxFQUFFO0lBQ3JDLE1BQU07TUFBRUM7SUFBRyxDQUFDLEdBQUcsTUFBTSxJQUFBQyxtQkFBUSxFQUFDQyxjQUFRLENBQUNDLEtBQUssRUFBRU4sR0FBRyxDQUFDO0lBRWxELE1BQU1PLElBQUksR0FBRyxNQUFNLElBQUFDLGFBQUksR0FBRSxDQUFDQyxPQUFPLENBQUM7TUFBRUMsS0FBSyxFQUFFO1FBQUVQO01BQUcsQ0FBQztNQUFFUSxHQUFHLEVBQUU7SUFBSyxDQUFDLENBQUM7SUFDL0QsSUFBSSxDQUFDSixJQUFJLEVBQUUsTUFBTSxJQUFJSyx1QkFBWSxDQUFDQyw0QkFBaUIsRUFBRSx1QkFBdUIsQ0FBQztJQUU3RWIsR0FBRyxDQUFDTyxJQUFJLEdBQUdBLElBQUk7SUFDZk8sa0JBQWtCLENBQUNQLElBQUksQ0FBQ1EsVUFBVSxDQUFDO0lBRW5DYixJ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