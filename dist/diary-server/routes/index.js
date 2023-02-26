"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = main;
var _express = require("express");
var _path = _interopRequireDefault(require("path"));
var _commonRoutes = _interopRequireDefault(require("@global-common/server/routes/common-routes"));
var _dbSetup = require("@global-common/db/db-setup");
var _env = require("@global-common/constants/env");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function main(router = (0, _express.Router)()) {
  const routePath = _path.default.join(__dirname, '/default-load/*.js');
  const serverInfo = {
    name: 'gada-worker',
    api: `/${_env.commonEnv.API_VERSION}`,
    docs: '/api-docs'
  };
  (0, _commonRoutes.default)({
    router,
    getDB: _dbSetup.getDB,
    routePath,
    serverInfo
  });
  return router;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtYWluIiwicm91dGVyIiwiUm91dGVyIiwicm91dGVQYXRoIiwicGF0aCIsImpvaW4iLCJfX2Rpcm5hbWUiLCJzZXJ2ZXJJbmZvIiwibmFtZSIsImFwaSIsImNvbW1vbkVudiIsIkFQSV9WRVJTSU9OIiwiZG9jcyIsImNvbW1vblJvdXRlIiwiZ2V0REIiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZGlhcnktc2VydmVyL3JvdXRlcy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdleHByZXNzJ1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xyXG5cclxuaW1wb3J0IGNvbW1vblJvdXRlIGZyb20gJ0BnbG9iYWwtY29tbW9uL3NlcnZlci9yb3V0ZXMvY29tbW9uLXJvdXRlcydcclxuaW1wb3J0IHsgZ2V0REIgfSBmcm9tICdAZ2xvYmFsLWNvbW1vbi9kYi9kYi1zZXR1cCdcclxuaW1wb3J0IHsgY29tbW9uRW52IH0gZnJvbSAnQGdsb2JhbC1jb21tb24vY29uc3RhbnRzL2VudidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1haW4gKHJvdXRlciA9IFJvdXRlcigpKSB7XHJcbiAgY29uc3Qgcm91dGVQYXRoID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJy9kZWZhdWx0LWxvYWQvKi5qcycpXHJcbiAgY29uc3Qgc2VydmVySW5mbyA9IHtcclxuICAgIG5hbWU6ICdnYWRhLXdvcmtlcicsXHJcbiAgICBhcGk6IGAvJHtjb21tb25FbnYuQVBJX1ZFUlNJT059YCxcclxuICAgIGRvY3M6ICcvYXBpLWRvY3MnLFxyXG4gIH1cclxuXHJcbiAgY29tbW9uUm91dGUoeyByb3V0ZXIsIGdldERCLCByb3V0ZVBhdGgsIHNlcnZlckluZm8gfSlcclxuXHJcbiAgcmV0dXJuIHJvdXRlclxyXG59XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUF3RDtBQUV6QyxTQUFTQSxJQUFJLENBQUVDLE1BQU0sR0FBRyxJQUFBQyxlQUFNLEdBQUUsRUFBRTtFQUMvQyxNQUFNQyxTQUFTLEdBQUdDLGFBQUksQ0FBQ0MsSUFBSSxDQUFDQyxTQUFTLEVBQUUsb0JBQW9CLENBQUM7RUFDNUQsTUFBTUMsVUFBVSxHQUFHO0lBQ2pCQyxJQUFJLEVBQUUsYUFBYTtJQUNuQkMsR0FBRyxFQUFHLElBQUdDLGNBQVMsQ0FBQ0MsV0FBWSxFQUFDO0lBQ2hDQyxJQUFJLEVBQUU7RUFDUixDQUFDO0VBRUQsSUFBQUMscUJBQVcsRUFBQztJQUFFWixNQUFNO0lBQUVhLEtBQUssRUFBTEEsY0FBSztJQUFFWCxTQUFTO0lBQUVJO0VBQVcsQ0FBQyxDQUFDO0VBRXJELE9BQU9OLE1BQU07QUFDZiJ9