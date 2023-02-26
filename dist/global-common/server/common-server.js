"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = runServer;
var _express = _interopRequireDefault(require("express"));
var _momentTimezone = _interopRequireDefault(require("moment-timezone"));
var _lodash = _interopRequireDefault(require("lodash"));
var _axios = _interopRequireDefault(require("axios"));
var _cors = _interopRequireDefault(require("cors"));
var _helmet = _interopRequireDefault(require("helmet"));
var _nocache = _interopRequireDefault(require("nocache"));
var _env = require("../constants/env");
var _common = require("../constants/common");
var _logger = require("../utils/logger");
var _requestIp = _interopRequireDefault(require("request-ip"));
var _dbSetup = require("@global-common/db/db-setup");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const logger = (0, _logger.getLogger)('common-server.ts');
const app = (0, _express.default)();

// set default timezone
_momentTimezone.default.tz.setDefault('Asia/Seoul');
const userAgent = _lodash.default.replace(process.env.MY_NAME, '_SERVER', '');
_axios.default.defaults.headers.common['user-agent'] = userAgent;

/*
```
  // Test Error Code
  setTimeout(() => { throw new Error('Exception ERROR') }, 100)
```
*/
process.on('uncaughtException', async err => {
  console.error('whoops! There was an uncaught error:', err);
  process.send?.('ready');
  process.exit(1);
});

/*
```
  // Test Error Code
  const p = Promise.reject(new Error('reject ERROR'))
  setTimeout(() => p.catch(function () { return }), 86400)
```
*/
process.on('unhandledRejection', async err => {
  console.error('whoops! There was an uncaught error:', err);
  process.send?.('ready');
  process.exit(1);
});
function runServer({
  preConfig = null,
  main,
  port,
  connectDb = _dbSetup.connectDb
}) {
  (async function () {
    preConfig && (await preConfig(app));
    await connectDb();
    logger.info('DB connected!');
    app.use((0, _helmet.default)());
    app.use((0, _nocache.default)());
    app.use((0, _cors.default)(_common.corsOptions));
    app.use(_requestIp.default.mw());
    app.use(main());
    const httpServer = app.listen(port, '0.0.0.0', () => {
      logger.warn('######################################################');
      logger.warn(`${process.env.MY_NAME} is listening on port ${port} NODE_ENV:${_env.commonEnv.NODE_ENV}`);
      logger.warn('######################################################');
      process.send?.('ready');
      logger.warn('SERVER IS READY.');
    });
    process.on('SIGINT', () => {
      logger.warn('SERVER GOT SIGINT.');
      httpServer.close(function (err) {
        logger.warn('SERVER IS CLOSED. hasError:', !!err);
        process.exit(err ? 1 : 0);
      });
      if (!_common.IS_REAL_PRODUCTION) {
        setTimeout(() => {
          logger.warn('CLOSE SERVER IN FORCE');
          process.exit();
        }, 1000);
      }
    });
  })();
  return app;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJsb2dnZXIiLCJnZXRMb2dnZXIiLCJhcHAiLCJleHByZXNzIiwibW9tZW50IiwidHoiLCJzZXREZWZhdWx0IiwidXNlckFnZW50IiwiXyIsInJlcGxhY2UiLCJwcm9jZXNzIiwiZW52IiwiTVlfTkFNRSIsImF4aW9zIiwiZGVmYXVsdHMiLCJoZWFkZXJzIiwiY29tbW9uIiwib24iLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJzZW5kIiwiZXhpdCIsInJ1blNlcnZlciIsInByZUNvbmZpZyIsIm1haW4iLCJwb3J0IiwiY29ubmVjdERiIiwiY29tbW9uQ29ubmVjdERiIiwiaW5mbyIsInVzZSIsImhlbG1ldCIsIm5vY2FjaGUiLCJjb3JzIiwiY29yc09wdGlvbnMiLCJyZXF1ZXN0SXAiLCJtdyIsImh0dHBTZXJ2ZXIiLCJsaXN0ZW4iLCJ3YXJuIiwiY29tbW9uRW52IiwiTk9ERV9FTlYiLCJjbG9zZSIsIklTX1JFQUxfUFJPRFVDVElPTiIsInNldFRpbWVvdXQiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZ2xvYmFsLWNvbW1vbi9zZXJ2ZXIvY29tbW9uLXNlcnZlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcywgeyBSb3V0ZXIgfSBmcm9tICdleHByZXNzJ1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQtdGltZXpvbmUnXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnXG5pbXBvcnQgY29ycyBmcm9tICdjb3JzJ1xuaW1wb3J0IGhlbG1ldCBmcm9tICdoZWxtZXQnXG5pbXBvcnQgbm9jYWNoZSBmcm9tICdub2NhY2hlJ1xuXG5pbXBvcnQgeyBjb21tb25FbnYgfSBmcm9tICcuLi9jb25zdGFudHMvZW52J1xuaW1wb3J0IHsgY29yc09wdGlvbnMsIElTX1JFQUxfUFJPRFVDVElPTiB9IGZyb20gJy4uL2NvbnN0YW50cy9jb21tb24nXG5pbXBvcnQgeyBnZXRMb2dnZXIgfSBmcm9tICcuLi91dGlscy9sb2dnZXInXG5pbXBvcnQgcmVxdWVzdElwIGZyb20gJ3JlcXVlc3QtaXAnXG5pbXBvcnQgeyBjb25uZWN0RGIgYXMgY29tbW9uQ29ubmVjdERiIH0gZnJvbSAnQGdsb2JhbC1jb21tb24vZGIvZGItc2V0dXAnXG5cbmNvbnN0IGxvZ2dlciA9IGdldExvZ2dlcignY29tbW9uLXNlcnZlci50cycpXG5jb25zdCBhcHAgPSBleHByZXNzKClcblxuLy8gc2V0IGRlZmF1bHQgdGltZXpvbmVcbm1vbWVudC50ei5zZXREZWZhdWx0KCdBc2lhL1Nlb3VsJylcblxuY29uc3QgdXNlckFnZW50ID0gXy5yZXBsYWNlKHByb2Nlc3MuZW52Lk1ZX05BTUUsICdfU0VSVkVSJywgJycpXG5heGlvcy5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsndXNlci1hZ2VudCddID0gdXNlckFnZW50XG5cbi8qXG5gYGBcbiAgLy8gVGVzdCBFcnJvciBDb2RlXG4gIHNldFRpbWVvdXQoKCkgPT4geyB0aHJvdyBuZXcgRXJyb3IoJ0V4Y2VwdGlvbiBFUlJPUicpIH0sIDEwMClcbmBgYFxuKi9cbnByb2Nlc3Mub24oJ3VuY2F1Z2h0RXhjZXB0aW9uJywgYXN5bmMgKGVycikgPT4ge1xuICBjb25zb2xlLmVycm9yKCd3aG9vcHMhIFRoZXJlIHdhcyBhbiB1bmNhdWdodCBlcnJvcjonLCBlcnIpXG4gIHByb2Nlc3Muc2VuZD8uKCdyZWFkeScpXG4gIHByb2Nlc3MuZXhpdCgxKVxufSlcblxuLypcbmBgYFxuICAvLyBUZXN0IEVycm9yIENvZGVcbiAgY29uc3QgcCA9IFByb21pc2UucmVqZWN0KG5ldyBFcnJvcigncmVqZWN0IEVSUk9SJykpXG4gIHNldFRpbWVvdXQoKCkgPT4gcC5jYXRjaChmdW5jdGlvbiAoKSB7IHJldHVybiB9KSwgODY0MDApXG5gYGBcbiovXG5wcm9jZXNzLm9uKCd1bmhhbmRsZWRSZWplY3Rpb24nLCBhc3luYyAoZXJyOiBhbnkpID0+IHtcbiAgY29uc29sZS5lcnJvcignd2hvb3BzISBUaGVyZSB3YXMgYW4gdW5jYXVnaHQgZXJyb3I6JywgZXJyKVxuICBwcm9jZXNzLnNlbmQ/LigncmVhZHknKVxuICBwcm9jZXNzLmV4aXQoMSlcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJ1blNlcnZlciAoe1xuICBwcmVDb25maWcgPSBudWxsLFxuICBtYWluLFxuICBwb3J0LFxuICBjb25uZWN0RGIgPSBjb21tb25Db25uZWN0RGIsXG59KSB7XG4gIChhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgcHJlQ29uZmlnICYmIGF3YWl0IHByZUNvbmZpZyhhcHApXG5cbiAgICBhd2FpdCBjb25uZWN0RGIoKVxuXG4gICAgbG9nZ2VyLmluZm8oJ0RCIGNvbm5lY3RlZCEnKVxuXG4gICAgYXBwLnVzZShoZWxtZXQoKSlcbiAgICBhcHAudXNlKG5vY2FjaGUoKSlcbiAgICBhcHAudXNlKGNvcnMoY29yc09wdGlvbnMpKVxuICAgIGFwcC51c2UocmVxdWVzdElwLm13KCkpXG5cbiAgICBhcHAudXNlKG1haW4oKSlcblxuICAgIGNvbnN0IGh0dHBTZXJ2ZXIgPSBhcHAubGlzdGVuKHBvcnQsICcwLjAuMC4wJywgKCkgPT4ge1xuICAgICAgbG9nZ2VyLndhcm4oJyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIycpXG4gICAgICBsb2dnZXIud2FybihgJHtwcm9jZXNzLmVudi5NWV9OQU1FfSBpcyBsaXN0ZW5pbmcgb24gcG9ydCAke3BvcnR9IE5PREVfRU5WOiR7Y29tbW9uRW52Lk5PREVfRU5WfWApXG4gICAgICBsb2dnZXIud2FybignIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjJylcbiAgICAgIHByb2Nlc3Muc2VuZD8uKCdyZWFkeScpXG4gICAgICBsb2dnZXIud2FybignU0VSVkVSIElTIFJFQURZLicpXG4gICAgfSlcblxuICAgIHByb2Nlc3Mub24oJ1NJR0lOVCcsICgpID0+IHtcbiAgICAgIGxvZ2dlci53YXJuKCdTRVJWRVIgR09UIFNJR0lOVC4nKVxuICAgICAgaHR0cFNlcnZlci5jbG9zZShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGxvZ2dlci53YXJuKCdTRVJWRVIgSVMgQ0xPU0VELiBoYXNFcnJvcjonLCAhIWVycilcbiAgICAgICAgcHJvY2Vzcy5leGl0KGVyciA/IDEgOiAwKVxuICAgICAgfSlcbiAgICAgIGlmICghSVNfUkVBTF9QUk9EVUNUSU9OKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGxvZ2dlci53YXJuKCdDTE9TRSBTRVJWRVIgSU4gRk9SQ0UnKVxuICAgICAgICAgIHByb2Nlc3MuZXhpdCgpXG4gICAgICAgIH0sIDEwMDApXG4gICAgICB9XG4gICAgfSlcbiAgfSkoKVxuXG4gIHJldHVybiBhcHBcbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQXlFO0FBRXpFLE1BQU1BLE1BQU0sR0FBRyxJQUFBQyxpQkFBUyxFQUFDLGtCQUFrQixDQUFDO0FBQzVDLE1BQU1DLEdBQUcsR0FBRyxJQUFBQyxnQkFBTyxHQUFFOztBQUVyQjtBQUNBQyx1QkFBTSxDQUFDQyxFQUFFLENBQUNDLFVBQVUsQ0FBQyxZQUFZLENBQUM7QUFFbEMsTUFBTUMsU0FBUyxHQUFHQyxlQUFDLENBQUNDLE9BQU8sQ0FBQ0MsT0FBTyxDQUFDQyxHQUFHLENBQUNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsRUFBRSxDQUFDO0FBQy9EQyxjQUFLLENBQUNDLFFBQVEsQ0FBQ0MsT0FBTyxDQUFDQyxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUdULFNBQVM7O0FBRXZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBRyxPQUFPLENBQUNPLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxNQUFPQyxHQUFHLElBQUs7RUFDN0NDLE9BQU8sQ0FBQ0MsS0FBSyxDQUFDLHNDQUFzQyxFQUFF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