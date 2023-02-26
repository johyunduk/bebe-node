"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("source-map-support/register");
require("module-alias/register");
require("./setup-dotenv");
var _routes = _interopRequireDefault(require("./routes"));
var _common = require("@global-common/constants/common");
var _commonServer = _interopRequireDefault(require("@global-common/server/common-server"));
var _apiDocsRoutes = _interopRequireDefault(require("@global-common/server/routes/api-docs-routes"));
var _env = require("./common/env");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function preConfig(app) {
  if (!_common.IS_REAL_PRODUCTION) {
    await (0, _apiDocsRoutes.default)(app, 'diary-server/swagger.yaml', 'diary');
  }
}
const app = (0, _commonServer.default)({
  preConfig,
  main: _routes.default,
  port: _env.BEBE_DIARY_PORT
});
var _default = app;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJwcmVDb25maWciLCJhcHAiLCJJU19SRUFMX1BST0RVQ1RJT04iLCJhcGlEb2NzIiwicnVuU2VydmVyIiwibWFpbiIsInBvcnQiLCJCRUJFX0RJQVJZX1BPUlQiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvZGlhcnktc2VydmVyL2RpYXJ5LXNlcnZlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3NvdXJjZS1tYXAtc3VwcG9ydC9yZWdpc3RlcidcclxuaW1wb3J0ICdtb2R1bGUtYWxpYXMvcmVnaXN0ZXInXHJcbmltcG9ydCAnLi9zZXR1cC1kb3RlbnYnXHJcblxyXG5pbXBvcnQgbWFpbiBmcm9tICcuL3JvdXRlcydcclxuaW1wb3J0IHsgSVNfUkVBTF9QUk9EVUNUSU9OIH0gZnJvbSAnQGdsb2JhbC1jb21tb24vY29uc3RhbnRzL2NvbW1vbidcclxuaW1wb3J0IHJ1blNlcnZlciBmcm9tICdAZ2xvYmFsLWNvbW1vbi9zZXJ2ZXIvY29tbW9uLXNlcnZlcidcclxuaW1wb3J0IGFwaURvY3MgZnJvbSAnQGdsb2JhbC1jb21tb24vc2VydmVyL3JvdXRlcy9hcGktZG9jcy1yb3V0ZXMnXHJcbmltcG9ydCB7IEJFQkVfRElBUllfUE9SVCB9IGZyb20gJy4vY29tbW9uL2VudidcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHByZUNvbmZpZyAoYXBwKSB7XHJcbiAgaWYgKCFJU19SRUFMX1BST0RVQ1RJT04pIHtcclxuICAgIGF3YWl0IGFwaURvY3MoYXBwLCAnZGlhcnktc2VydmVyL3N3YWdnZXIueWFtbCcsICdkaWFyeScpXHJcbiAgfVxyXG59XHJcbmNvbnN0IGFwcCA9IHJ1blNlcnZlcih7IHByZUNvbmZpZywgbWFpbiwgcG9ydDogQkVCRV9ESUFSWV9QT1JUIH0pXHJcblxyXG5leHBvcnQgZGVmYXVsdCBhcHBcclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQThDO0FBRTlDLGVBQWVBLFNBQVMsQ0FBRUMsR0FBRyxFQUFFO0VBQzdCLElBQUksQ0FBQ0MsMEJBQWtCLEVBQUU7SUFDdkIsTUFBTSxJQUFBQyxzQkFBTyxFQUFDRixHQUFHLEVBQUUsMkJBQTJCLEVBQUUsT0FBTyxDQUFDO0VBQzFEO0FBQ0Y7QUFDQSxNQUFNQSxHQUFHLEdBQUcsSUFBQUcscUJBQVMsRUFBQztFQUFFSixTQUFTO0VBQUVLLElBQUksRUFBSkEsZUFBSTtFQUFFQyxJQUFJLEVBQUVDO0FBQWdCLENBQUMsQ0FBQztBQUFBLGVBRWxETixHQUFHO0FBQUEifQ==