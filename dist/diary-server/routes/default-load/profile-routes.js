"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = profileRoutes;
var _express = require("express");
var _joi = _interopRequireDefault(require("joi"));
var _lodash = _interopRequireDefault(require("lodash"));
var _userGuard = require("@diary-server/routes/middleware/userGuard");
var _asyncHandler = _interopRequireDefault(require("@global-common/server/routes/helper/asyncHandler"));
var _profileController = require("@diary-server/controller/profile-controller");
var _utils = require("@global-common/server/routes/helper/utils");
var _validator = require("@global-common/utils/validator");
var _user = require("@global-common/db/model/user");
var _localUpload = require("@global-common/middleware/local-upload");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function profileRoutes(router = (0, _express.Router)()) {
  // 프로필 조회
  router.get('/profile', _userGuard.diaryGuard, (0, _asyncHandler.default)(getProfile));
  // 프로필 수정
  router.put('/profile/edit', _userGuard.diaryGuard, (0, _asyncHandler.default)(putProfile));
  // 프로필 아바타 수정
  router.put('/profile/avatar', _userGuard.diaryGuard, _localUpload.localUpload.single('file'), (0, _asyncHandler.default)(putAvatar));
  async function getProfile(req, res) {
    const result = await (0, _profileController.userProfile)(req.user.id, req);
    res.json(result);
  }
  async function putProfile(req, res) {
    const body = (0, _validator.validateInputData)(req.body, {
      name: _joi.default.string(),
      gender: _joi.default.string().valid(..._lodash.default.values(_user.UserGender)),
      birthDate: _joi.default.date()
    });
    await (0, _profileController.updateProfile)(body, req.user.id);
    (0, _utils.sendOk)(res);
  }
  async function putAvatar(req, res) {
    await (0, _profileController.saveUserAvatar)(req.user.id, req.file);
    (0, _utils.sendOk)(res);
  }
  return router;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJwcm9maWxlUm91dGVzIiwicm91dGVyIiwiUm91dGVyIiwiZ2V0IiwiZGlhcnlHdWFyZCIsImFzeW5jSGFuZGxlciIsImdldFByb2ZpbGUiLCJwdXQiLCJwdXRQcm9maWxlIiwibG9jYWxVcGxvYWQiLCJzaW5nbGUiLCJwdXRBdmF0YXIiLCJyZXEiLCJyZXMiLCJyZXN1bHQiLCJ1c2VyUHJvZmlsZSIsInVzZXIiLCJpZCIsImpzb24iLCJib2R5IiwidmFsaWRhdGVJbnB1dERhdGEiLCJuYW1lIiwiSm9pIiwic3RyaW5nIiwiZ2VuZGVyIiwidmFsaWQiLCJfIiwidmFsdWVzIiwiVXNlckdlbmRlciIsImJpcnRoRGF0ZSIsImRhdGUiLCJ1cGRhdGVQcm9maWxlIiwic2VuZE9rIiwic2F2ZVVzZXJBdmF0YXIiLCJmaWxlIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2RpYXJ5LXNlcnZlci9yb3V0ZXMvZGVmYXVsdC1sb2FkL3Byb2ZpbGUtcm91dGVzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlciB9IGZyb20gJ2V4cHJlc3MnXHJcbmltcG9ydCBKb2kgZnJvbSAnam9pJ1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnXHJcblxyXG5pbXBvcnQgeyBkaWFyeUd1YXJkIH0gZnJvbSAnQGRpYXJ5LXNlcnZlci9yb3V0ZXMvbWlkZGxld2FyZS91c2VyR3VhcmQnXHJcbmltcG9ydCBhc3luY0hhbmRsZXIgZnJvbSAnQGdsb2JhbC1jb21tb24vc2VydmVyL3JvdXRlcy9oZWxwZXIvYXN5bmNIYW5kbGVyJ1xyXG5pbXBvcnQgeyBzYXZlVXNlckF2YXRhciwgdXBkYXRlUHJvZmlsZSwgdXNlclByb2ZpbGUgfSBmcm9tICdAZGlhcnktc2VydmVyL2NvbnRyb2xsZXIvcHJvZmlsZS1jb250cm9sbGVyJ1xyXG5pbXBvcnQgeyBzZW5kT2sgfSBmcm9tICdAZ2xvYmFsLWNvbW1vbi9zZXJ2ZXIvcm91dGVzL2hlbHBlci91dGlscydcclxuaW1wb3J0IHsgdmFsaWRhdGVJbnB1dERhdGEgfSBmcm9tICdAZ2xvYmFsLWNvbW1vbi91dGlscy92YWxpZGF0b3InXHJcbmltcG9ydCB7IFVzZXJHZW5kZXIgfSBmcm9tICdAZ2xvYmFsLWNvbW1vbi9kYi9tb2RlbC91c2VyJ1xyXG5pbXBvcnQgeyBsb2NhbFVwbG9hZCB9IGZyb20gJ0BnbG9iYWwtY29tbW9uL21pZGRsZXdhcmUvbG9jYWwtdXBsb2FkJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcHJvZmlsZVJvdXRlcyAocm91dGVyID0gUm91dGVyKCkpIHtcclxuICAvLyDtlITroZztlYQg7KGw7ZqMXHJcbiAgcm91dGVyLmdldCgnL3Byb2ZpbGUnLCBkaWFyeUd1YXJkLCBhc3luY0hhbmRsZXIoZ2V0UHJvZmlsZSkpXHJcbiAgLy8g7ZSE66Gc7ZWEIOyImOyglVxyXG4gIHJvdXRlci5wdXQoJy9wcm9maWxlL2VkaXQnLCBkaWFyeUd1YXJkLCBhc3luY0hhbmRsZXIocHV0UHJvZmlsZSkpXHJcbiAgLy8g7ZSE66Gc7ZWEIOyVhOuwlO2DgCDsiJjsoJVcclxuICByb3V0ZXIucHV0KCcvcHJvZmlsZS9hdmF0YXInLCBkaWFyeUd1YXJkLCBsb2NhbFVwbG9hZC5zaW5nbGUoJ2ZpbGUnKSwgYXN5bmNIYW5kbGVyKHB1dEF2YXRhcikpXHJcblxyXG4gIGFzeW5jIGZ1bmN0aW9uIGdldFByb2ZpbGUgKHJlcSwgcmVzKSB7XHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB1c2VyUHJvZmlsZShyZXEudXNlci5pZCwgcmVxKVxyXG5cclxuICAgIHJlcy5qc29uKHJlc3VsdClcclxuICB9XHJcblxyXG4gIGFzeW5jIGZ1bmN0aW9uIHB1dFByb2ZpbGUgKHJlcSwgcmVzKSB7XHJcbiAgICBjb25zdCBib2R5ID0gdmFsaWRhdGVJbnB1dERhdGEocmVxLmJvZHksIHtcclxuICAgICAgbmFtZTogSm9pLnN0cmluZygpLFxyXG4gICAgICBnZW5kZXI6IEpvaS5zdHJpbmcoKS52YWxpZCguLi5fLnZhbHVlcyhVc2VyR2VuZGVyKSksXHJcbiAgICAgIGJpcnRoRGF0ZTogSm9pLmRhdGUoKSxcclxuICAgIH0pXHJcbiAgICBhd2FpdCB1cGRhdGVQcm9maWxlKGJvZHksIHJlcS51c2VyLmlkKVxyXG5cclxuICAgIHNlbmRPayhyZXMpXHJcbiAgfVxyXG5cclxuICBhc3luYyBmdW5jdGlvbiBwdXRBdmF0YXIgKHJlcSwgcmVzKSB7XHJcbiAgICBhd2FpdCBzYXZlVXNlckF2YXRhcihyZXEudXNlci5pZCwgcmVxLmZpbGUpXHJcblxyXG4gICAgc2VuZE9rKHJlcylcclxuICB9XHJcblxyXG4gIHJldHVybiByb3V0ZXJcclxufVxyXG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQW9FO0FBRXJELFNBQVNBLGFBQWEsQ0FBRUMsTUFBTSxHQUFHLElBQUFDLGVBQU0sR0FBRSxFQUFFO0VBQ3hEO0VBQ0FELE1BQU0sQ0FBQ0UsR0FBRyxDQUFDLFVBQVUsRUFBRUMscUJBQVUsRUFBRSxJQUFBQyxxQkFBWSxFQUFDQyxVQUFVLENBQUMsQ0FBQztFQUM1RDtFQUNBTCxNQUFNLENBQUNNLEdBQUcsQ0FBQyxlQUFlLEVBQUVILHFCQUFVLEVBQUUsSUFBQUMscUJBQVksRUFBQ0csVUFBVSxDQUFDLENBQUM7RUFDakU7RUFDQVAsTUFBTSxDQUFDTSxHQUFHLENBQUMsaUJBQWlCLEVBQUVILHFCQUFVLEVBQUVLLHdCQUFXLENBQUNDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFBTCxxQkFBWSxFQUFDTSxTQUFTLENBQUMsQ0FBQztFQUU5RixlQUFlTCxVQUFVLENBQUVNLEdBQUcsRUFBRUMsR0FBRyxFQUFFO0lBQ25DLE1BQU1DLE1BQU0sR0FBRyxNQUFNLElBQUFDLDhCQUFXLEVBQUNILEdBQUcsQ0FBQ0ksSUFBSSxDQUFDQyxFQUFFLEVBQUVMLEdBQUcsQ0FBQztJQUVsREMsR0FBRyxDQUFDSyxJQUFJLENBQUNKLE1BQU0sQ0FBQztFQUNsQjtFQUVBLGVBQWVOLFVBQVUsQ0FBRUksR0FBRyxFQUFFQyxHQUFHLEVBQUU7SUFDbkMsTUFBTU0sSUFBSSxHQUFHLElBQUFDLDRCQUFpQixFQUFDUixHQUFHLENBQUNPLElBQUksRUFBRTtNQUN2Q0UsSUFBSSxFQUFFQyxZQUFHLENBQUNDLE1BQU0sRUFBRTtNQUNsQkMsTUFBTSxFQUFFRixZQUFHLENBQUNDLE1BQU0sRUFBRSxDQUFDRSxLQUFLLENBQUMsR0FBR0MsZUFBQyxDQUFDQyxNQUFNLENBQUNDLGdCQUFVLENBQUMsQ0FBQztNQUNuREMsU0FBUyxFQUFFUCxZQUFHLENBQUNRLElBQUk7SUFDckIsQ0FBQyxDQUFDO0lBQ0YsTUFBTSxJQUFBQyxnQ0FBYSxFQUFDWixJQUFJLEVBQUVQLEdBQUcsQ0FBQ0ksSUFBSSxDQUFDQyxFQUFFLENBQUM7SUFFdEMsSUFBQWUsYUFBTSxFQUFDbkIsR0FBRyxDQUFDO0VBQ2I7RUFFQSxlQUFlRixTQUFTLENBQUVDLEdBQUcsRUFBRUMsR0FBRyxFQUFFO0lBQ2xDLE1BQU0sSUFBQW9CLGlDQUFjLEVBQUNyQixHQUFHLENBQUNJLElBQUksQ0FBQ0MsRUFBRSxFQUFFTCxHQUFHLENBQUNzQixJQUFJLENBQUM7SUFFM0MsSUFBQUYsYUFBTSxFQUFDbkIsR0FBRyxDQUFDO0VBQ2I7RUFFQSxPQUFPWixNQUFNO0FBQ2YifQ==