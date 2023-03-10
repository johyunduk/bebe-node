"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = apiDocs;
var _express = require("express");
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _yamljs = _interopRequireDefault(require("yamljs"));
var _env = require("@global-common/constants/env");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function apiDocs(router = (0, _express.Router)(), swaggerFile, server) {
  const swaggerDocument = _yamljs.default.load(`./dist/${swaggerFile}`);
  router.use(`/${_env.commonEnv.API_VERSION}/${server}/api-docs`, _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(swaggerDocument));
  return router;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJhcGlEb2NzIiwicm91dGVyIiwiUm91dGVyIiwic3dhZ2dlckZpbGUiLCJzZXJ2ZXIiLCJzd2FnZ2VyRG9jdW1lbnQiLCJZQU1MIiwibG9hZCIsInVzZSIsImNvbW1vbkVudiIsIkFQSV9WRVJTSU9OIiwic3dhZ2dlclVpIiwic2VydmUiLCJzZXR1cCJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9nbG9iYWwtY29tbW9uL3NlcnZlci9yb3V0ZXMvYXBpLWRvY3Mtcm91dGVzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlciB9IGZyb20gJ2V4cHJlc3MnXHJcbmltcG9ydCBzd2FnZ2VyVWkgZnJvbSAnc3dhZ2dlci11aS1leHByZXNzJ1xyXG5pbXBvcnQgWUFNTCBmcm9tICd5YW1sanMnXHJcbmltcG9ydCB7IGNvbW1vbkVudiB9IGZyb20gJ0BnbG9iYWwtY29tbW9uL2NvbnN0YW50cy9lbnYnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhcGlEb2NzIChyb3V0ZXIgPSBSb3V0ZXIoKSwgc3dhZ2dlckZpbGU6IGFueSwgc2VydmVyOiBzdHJpbmcpIHtcclxuICBjb25zdCBzd2FnZ2VyRG9jdW1lbnQgPSBZQU1MLmxvYWQoYC4vZGlzdC8ke3N3YWdnZXJGaWxlfWApXHJcbiAgcm91dGVyLnVzZShcclxuICAgIGAvJHtjb21tb25FbnYuQVBJX1ZFUlNJT059LyR7c2VydmVyfS9hcGktZG9jc2AsXHJcbiAgICBzd2FnZ2VyVWkuc2VydmUsXHJcbiAgICBzd2FnZ2VyVWkuc2V0dXAoc3dhZ2dlckRvY3VtZW50KSxcclxuICApXHJcblxyXG4gIHJldHVybiByb3V0ZXJcclxufVxyXG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQXdEO0FBRXpDLFNBQVNBLE9BQU8sQ0FBRUMsTUFBTSxHQUFHLElBQUFDLGVBQU0sR0FBRSxFQUFFQyxXQUFnQixFQUFFQyxNQUFjLEVBQUU7RUFDcEYsTUFBTUMsZUFBZSxHQUFHQyxlQUFJLENBQUNDLElBQUksQ0FBRSxVQUFTSixXQUFZLEVBQUMsQ0FBQztFQUMxREYsTUFBTSxDQUFDTyxHQUFHLENBQ1AsSUFBR0MsY0FBUyxDQUFDQyxXQUFZLElBQUdOLE1BQU8sV0FBVSxFQUM5Q08seUJBQVMsQ0FBQ0MsS0FBSyxFQUNmRCx5QkFBUyxDQUFDRSxLQUFLLENBQUNSLGVBQWUsQ0FBQyxDQUNqQztFQUVELE9BQU9KLE1BQU07QUFDZiJ9