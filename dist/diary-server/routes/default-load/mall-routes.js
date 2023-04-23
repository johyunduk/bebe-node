"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mallRoutes;
var _express = require("express");
var _asyncHandler = _interopRequireDefault(require("@global-common/server/routes/helper/asyncHandler"));
var _userGuard = require("@diary-server/routes/middleware/userGuard");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function mallRoutes(router = (0, _express.Router)()) {
  // 쇼핑몰 리스트 조회
  router.get('/mall', _userGuard.adminGuard, (0, _asyncHandler.default)(getMallList));
  async function getMallList(req, res) {
    res.json({
      result: []
    });
  }
  return router;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtYWxsUm91dGVzIiwicm91dGVyIiwiUm91dGVyIiwiZ2V0IiwiYWRtaW5HdWFyZCIsImFzeW5jSGFuZGxlciIsImdldE1hbGxMaXN0IiwicmVxIiwicmVzIiwianNvbiIsInJlc3VsdCJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kaWFyeS1zZXJ2ZXIvcm91dGVzL2RlZmF1bHQtbG9hZC9tYWxsLXJvdXRlcy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdleHByZXNzJ1xyXG5pbXBvcnQgYXN5bmNIYW5kbGVyIGZyb20gJ0BnbG9iYWwtY29tbW9uL3NlcnZlci9yb3V0ZXMvaGVscGVyL2FzeW5jSGFuZGxlcidcclxuaW1wb3J0IHsgYWRtaW5HdWFyZCB9IGZyb20gJ0BkaWFyeS1zZXJ2ZXIvcm91dGVzL21pZGRsZXdhcmUvdXNlckd1YXJkJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFsbFJvdXRlcyAocm91dGVyID0gUm91dGVyKCkpIHtcclxuICAvLyDsh7ztlZHrqrAg66as7Iqk7Yq4IOyhsO2ajFxyXG4gIHJvdXRlci5nZXQoJy9tYWxsJywgYWRtaW5HdWFyZCwgYXN5bmNIYW5kbGVyKGdldE1hbGxMaXN0KSlcclxuXHJcbiAgYXN5bmMgZnVuY3Rpb24gZ2V0TWFsbExpc3QgKHJlcSwgcmVzKSB7XHJcbiAgICByZXMuanNvbih7IHJlc3VsdDogW10gfSlcclxuICB9XHJcblxyXG4gIHJldHVybiByb3V0ZXJcclxufVxyXG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUFzRTtBQUV2RCxTQUFTQSxVQUFVLENBQUVDLE1BQU0sR0FBRyxJQUFBQyxlQUFNLEdBQUUsRUFBRTtFQUNyRDtFQUNBRCxNQUFNLENBQUNFLEdBQUcsQ0FBQyxPQUFPLEVBQUVDLHFCQUFVLEVBQUUsSUFBQUMscUJBQVksRUFBQ0MsV0FBVyxDQUFDLENBQUM7RUFFMUQsZUFBZUEsV0FBVyxDQUFFQyxHQUFHLEVBQUVDLEdBQUcsRUFBRTtJQUNwQ0EsR0FBRyxDQUFDQyxJQUFJLENBQUM7TUFBRUMsTUFBTSxFQUFFO0lBQUcsQ0FBQyxDQUFDO0VBQzFCO0VBRUEsT0FBT1QsTUFBTTtBQUNmIn0=