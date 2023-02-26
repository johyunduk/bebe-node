"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLogger = getLogger;
var _log4js = _interopRequireDefault(require("log4js"));
var _common = require("../constants/common");
var _clsRtracer = _interopRequireDefault(require("cls-rtracer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let level = 'debug';
if (_common.IS_REAL_PRODUCTION) {
  level = 'info';
}
const layout = {
  type: 'pattern',
  pattern: '%[[%d] [%p] %c%] - %x{traceId} %m%n',
  tokens: {
    traceId: () => {
      return _clsRtracer.default.id() ? `[${_clsRtracer.default.id()}]` : '';
    }
  }
};
_log4js.default.configure({
  appenders: {
    out: {
      type: 'stdout',
      layout
    }
  },
  categories: {
    default: {
      appenders: ['out'],
      level: 'info'
    }
  },
  disableClustering: true
});
function getLogger(label = '') {
  const logger = _log4js.default.getLogger(label);
  logger.level = level;
  if (_common.NO_DEFAULT_LOGGER) {
    logger.level = 'warn';
  }
  return logger;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJsZXZlbCIsIklTX1JFQUxfUFJPRFVDVElPTiIsImxheW91dCIsInR5cGUiLCJwYXR0ZXJuIiwidG9rZW5zIiwidHJhY2VJZCIsInJUcmFjZXIiLCJpZCIsImxvZzRqcyIsImNvbmZpZ3VyZSIsImFwcGVuZGVycyIsIm91dCIsImNhdGVnb3JpZXMiLCJkZWZhdWx0IiwiZGlzYWJsZUNsdXN0ZXJpbmciLCJnZXRMb2dnZXIiLCJsYWJlbCIsImxvZ2dlciIsIk5PX0RFRkFVTFRfTE9HR0VSIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2dsb2JhbC1jb21tb24vdXRpbHMvbG9nZ2VyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBsb2c0anMsIHsgTG9nZ2VyIH0gZnJvbSAnbG9nNGpzJ1xuaW1wb3J0IHsgSVNfUkVBTF9QUk9EVUNUSU9OLCBOT19ERUZBVUxUX0xPR0dFUiB9IGZyb20gJy4uL2NvbnN0YW50cy9jb21tb24nXG5pbXBvcnQgclRyYWNlciBmcm9tICdjbHMtcnRyYWNlcidcblxubGV0IGxldmVsID0gJ2RlYnVnJ1xuaWYgKElTX1JFQUxfUFJPRFVDVElPTikge1xuICBsZXZlbCA9ICdpbmZvJ1xufVxuXG5jb25zdCBsYXlvdXQgPSB7XG4gIHR5cGU6ICdwYXR0ZXJuJyxcbiAgcGF0dGVybjogJyVbWyVkXSBbJXBdICVjJV0gLSAleHt0cmFjZUlkfSAlbSVuJyxcbiAgdG9rZW5zOiB7XG4gICAgdHJhY2VJZDogKCkgPT4ge1xuICAgICAgcmV0dXJuIHJUcmFjZXIuaWQoKSA/IGBbJHtyVHJhY2VyLmlkKCl9XWAgOiAnJ1xuICAgIH0sXG4gIH0sXG59XG5sb2c0anMuY29uZmlndXJlKHtcbiAgYXBwZW5kZXJzOiB7IG91dDogeyB0eXBlOiAnc3Rkb3V0JywgbGF5b3V0IH0gfSxcbiAgY2F0ZWdvcmllczogeyBkZWZhdWx0OiB7IGFwcGVuZGVyczogWydvdXQnXSwgbGV2ZWw6ICdpbmZvJyB9IH0sXG4gIGRpc2FibGVDbHVzdGVyaW5nOiB0cnVlLFxufSlcblxuZXhwb3J0IGZ1bmN0aW9uIGdldExvZ2dlciAobGFiZWwgPSAnJykge1xuICBjb25zdCBsb2dnZXI6IExvZ2dlciA9IGxvZzRqcy5nZXRMb2dnZXIobGFiZWwpXG4gIGxvZ2dlci5sZXZlbCA9IGxldmVsXG4gIGlmIChOT19ERUZBVUxUX0xPR0dFUikge1xuICAgIGxvZ2dlci5sZXZlbCA9ICd3YXJuJ1xuICB9XG4gIHJldHVybiBsb2dnZXJcbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQWlDO0FBRWpDLElBQUlBLEtBQUssR0FBRyxPQUFPO0FBQ25CLElBQUlDLDBCQUFrQixFQUFFO0VBQ3RCRCxLQUFLLEdBQUcsTUFBTTtBQUNoQjtBQUVBLE1BQU1FLE1BQU0sR0FBRztFQUNiQyxJQUFJLEVBQUUsU0FBUztFQUNmQyxPQUFPLEVBQUUscUNBQXFDO0VBQzlDQyxNQUFNLEVBQUU7SUFDTkMsT0FBTyxFQUFFLE1BQU07TUFDYixPQUFPQyxtQkFBTyxDQUFDQyxFQUFFLEVBQUUsR0FBSSxJQUFHRCxtQkFBTyxDQUFDQyxFQUFFLEVBQUcsR0FBRSxHQUFHLEVBQUU7SUFDaEQ7RUFDRjtBQUNGLENBQUM7QUFDREMsZUFBTSxDQUFDQyxTQUFTLENBQUM7RUFDZkMsU0FBUyxFQUFFO0lBQUVDLEdBQUcsRUFBRTtNQUFFVCxJQUFJLEVBQUUsUUFBUTtNQUFFRDtJQUFPO0VBQUUsQ0FBQztFQUM5Q1csVUFBVSxFQUFFO0lBQUVDLE9BQU8sRUFBRTtNQUFFSCxTQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUM7TUFBRVgsS0FBSyxFQUFFO0lBQU87RUFBRSxDQUFDO0VBQzlEZSxpQkFBaUIsRUFBRTtBQUNyQixDQUFDLENBQUM7QUFFSyxTQUFTQyxTQUFTLENBQUVDLEtBQUssR0FBRyxFQUFFLEVBQUU7RUFDckMsTUFBTUMsTUFBYyxHQUFHVCxlQUFNLENBQUNPLFNBQVMsQ0FBQ0MsS0FBSyxDQUFDO0VBQzlDQyxNQUFNLENBQUNsQixLQUFLLEdBQUdBLEtBQUs7RUFDcEIsSUFBSW1CLHlCQUFpQixFQUFFO0lBQ3JCRCxNQUFNLENBQUNsQixLQUFLLEdBQUcsTUFBTTtFQUN2QjtFQUNBLE9BQU9rQixNQUFNO0FBQ2YifQ==