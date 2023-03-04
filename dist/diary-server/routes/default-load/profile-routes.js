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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function profileRoutes(router = (0, _express.Router)()) {
  // 프로필 조회
  router.get('/diary/profile', _userGuard.diaryGuard, (0, _asyncHandler.default)(getProfile));
  // 프로필 수정
  router.put('/diary/profile/edit', _userGuard.diaryGuard, (0, _asyncHandler.default)(putProfile));
  async function getProfile(req, res) {
    const result = await (0, _profileController.userProfile)(req.user.id);
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
  return router;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJwcm9maWxlUm91dGVzIiwicm91dGVyIiwiUm91dGVyIiwiZ2V0IiwiZGlhcnlHdWFyZCIsImFzeW5jSGFuZGxlciIsImdldFByb2ZpbGUiLCJwdXQiLCJwdXRQcm9maWxlIiwicmVxIiwicmVzIiwicmVzdWx0IiwidXNlclByb2ZpbGUiLCJ1c2VyIiwiaWQiLCJqc29uIiwiYm9keSIsInZhbGlkYXRlSW5wdXREYXRhIiwibmFtZSIsIkpvaSIsInN0cmluZyIsImdlbmRlciIsInZhbGlkIiwiXyIsInZhbHVlcyIsIlVzZXJHZW5kZXIiLCJiaXJ0aERhdGUiLCJkYXRlIiwidXBkYXRlUHJvZmlsZSIsInNlbmRPayJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kaWFyeS1zZXJ2ZXIvcm91dGVzL2RlZmF1bHQtbG9hZC9wcm9maWxlLXJvdXRlcy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdleHByZXNzJ1xyXG5pbXBvcnQgSm9pIGZyb20gJ2pvaSdcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xyXG5cclxuaW1wb3J0IHsgZGlhcnlHdWFyZCB9IGZyb20gJ0BkaWFyeS1zZXJ2ZXIvcm91dGVzL21pZGRsZXdhcmUvdXNlckd1YXJkJ1xyXG5pbXBvcnQgYXN5bmNIYW5kbGVyIGZyb20gJ0BnbG9iYWwtY29tbW9uL3NlcnZlci9yb3V0ZXMvaGVscGVyL2FzeW5jSGFuZGxlcidcclxuaW1wb3J0IHsgdXBkYXRlUHJvZmlsZSwgdXNlclByb2ZpbGUgfSBmcm9tICdAZGlhcnktc2VydmVyL2NvbnRyb2xsZXIvcHJvZmlsZS1jb250cm9sbGVyJ1xyXG5pbXBvcnQgeyBzZW5kT2sgfSBmcm9tICdAZ2xvYmFsLWNvbW1vbi9zZXJ2ZXIvcm91dGVzL2hlbHBlci91dGlscydcclxuaW1wb3J0IHsgdmFsaWRhdGVJbnB1dERhdGEgfSBmcm9tICdAZ2xvYmFsLWNvbW1vbi91dGlscy92YWxpZGF0b3InXHJcbmltcG9ydCB7IFVzZXJHZW5kZXIgfSBmcm9tICdAZ2xvYmFsLWNvbW1vbi9kYi9tb2RlbC91c2VyJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcHJvZmlsZVJvdXRlcyAocm91dGVyID0gUm91dGVyKCkpIHtcclxuICAvLyDtlITroZztlYQg7KGw7ZqMXHJcbiAgcm91dGVyLmdldCgnL2RpYXJ5L3Byb2ZpbGUnLCBkaWFyeUd1YXJkLCBhc3luY0hhbmRsZXIoZ2V0UHJvZmlsZSkpXHJcbiAgLy8g7ZSE66Gc7ZWEIOyImOyglVxyXG4gIHJvdXRlci5wdXQoJy9kaWFyeS9wcm9maWxlL2VkaXQnLCBkaWFyeUd1YXJkLCBhc3luY0hhbmRsZXIocHV0UHJvZmlsZSkpXHJcblxyXG4gIGFzeW5jIGZ1bmN0aW9uIGdldFByb2ZpbGUgKHJlcSwgcmVzKSB7XHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB1c2VyUHJvZmlsZShyZXEudXNlci5pZClcclxuXHJcbiAgICByZXMuanNvbihyZXN1bHQpXHJcbiAgfVxyXG5cclxuICBhc3luYyBmdW5jdGlvbiBwdXRQcm9maWxlIChyZXEsIHJlcykge1xyXG4gICAgY29uc3QgYm9keSA9IHZhbGlkYXRlSW5wdXREYXRhKHJlcS5ib2R5LCB7XHJcbiAgICAgIG5hbWU6IEpvaS5zdHJpbmcoKSxcclxuICAgICAgZ2VuZGVyOiBKb2kuc3RyaW5nKCkudmFsaWQoLi4uXy52YWx1ZXMoVXNlckdlbmRlcikpLFxyXG4gICAgICBiaXJ0aERhdGU6IEpvaS5kYXRlKCksXHJcbiAgICB9KVxyXG4gICAgYXdhaXQgdXBkYXRlUHJvZmlsZShib2R5LCByZXEudXNlci5pZClcclxuXHJcbiAgICBzZW5kT2socmVzKVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHJvdXRlclxyXG59XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQXlEO0FBRTFDLFNBQVNBLGFBQWEsQ0FBRUMsTUFBTSxHQUFHLElBQUFDLGVBQU0sR0FBRSxFQUFFO0VBQ3hEO0VBQ0FELE1BQU0sQ0FBQ0UsR0FBRyxDQUFDLGdCQUFnQixFQUFFQyxxQkFBVSxFQUFFLElBQUFDLHFCQUFZLEVBQUNDLFVBQVUsQ0FBQyxDQUFDO0VBQ2xFO0VBQ0FMLE1BQU0sQ0FBQ00sR0FBRyxDQUFDLHFCQUFxQixFQUFFSCxxQkFBVSxFQUFFLElBQUFDLHFCQUFZLEVBQUNHLFVBQVUsQ0FBQyxDQUFDO0VBRXZFLGVBQWVGLFVBQVUsQ0FBRUcsR0FBRyxFQUFFQyxHQUFHLEVBQUU7SUFDbkMsTUFBTUMsTUFBTSxHQUFHLE1BQU0sSUFBQUMsOEJBQVcsRUFBQ0gsR0FBRyxDQUFDSSxJQUFJLENBQUNDLEVBQUUsQ0FBQztJQUU3Q0osR0FBRyxDQUFDSyxJQUFJLENBQUNKLE1BQU0sQ0FBQztFQUNsQjtFQUVBLGVBQWVILFVBQVUsQ0FBRUMsR0FBRyxFQUFFQyxHQUFHLEVBQUU7SUFDbkMsTUFBTU0sSUFBSSxHQUFHLElBQUFDLDRCQUFpQixFQUFDUixHQUFHLENBQUNPLElBQUksRUFBRTtNQUN2Q0UsSUFBSSxFQUFFQyxZQUFHLENBQUNDLE1BQU0sRUFBRTtNQUNsQkMsTUFBTSxFQUFFRixZQUFHLENBQUNDLE1BQU0sRUFBRSxDQUFDRSxLQUFLLENBQUMsR0FBR0MsZUFBQyxDQUFDQyxNQUFNLENBQUNDLGdCQUFVLENBQUMsQ0FBQztNQUNuREMsU0FBUyxFQUFFUCxZQUFHLENBQUNRLElBQUk7SUFDckIsQ0FBQyxDQUFDO0lBQ0YsTUFBTSxJQUFBQyxnQ0FBYSxFQUFDWixJQUFJLEVBQUVQLEdBQUcsQ0FBQ0ksSUFBSSxDQUFDQyxFQUFFLENBQUM7SUFFdEMsSUFBQWUsYUFBTSxFQUFDbkIsR0FBRyxDQUFDO0VBQ2I7RUFFQSxPQUFPVCxNQUFNO0FBQ2YifQ==