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
    // app.use(cors(corsOptions))
    app.use((0, _cors.default)());
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });
    app.use('/uploads', _express.default.static('uploads'));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJsb2dnZXIiLCJnZXRMb2dnZXIiLCJhcHAiLCJleHByZXNzIiwibW9tZW50IiwidHoiLCJzZXREZWZhdWx0IiwidXNlckFnZW50IiwiXyIsInJlcGxhY2UiLCJwcm9jZXNzIiwiZW52IiwiTVlfTkFNRSIsImF4aW9zIiwiZGVmYXVsdHMiLCJoZWFkZXJzIiwiY29tbW9uIiwib24iLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJzZW5kIiwiZXhpdCIsInJ1blNlcnZlciIsInByZUNvbmZpZyIsIm1haW4iLCJwb3J0IiwiY29ubmVjdERiIiwiY29tbW9uQ29ubmVjdERiIiwiaW5mbyIsInVzZSIsImhlbG1ldCIsIm5vY2FjaGUiLCJjb3JzIiwicmVxIiwicmVzIiwibmV4dCIsImhlYWRlciIsInN0YXRpYyIsInJlcXVlc3RJcCIsIm13IiwiaHR0cFNlcnZlciIsImxpc3RlbiIsIndhcm4iLCJjb21tb25FbnYiLCJOT0RFX0VOViIsImNsb3NlIiwiSVNfUkVBTF9QUk9EVUNUSU9OIiwic2V0VGltZW91dCJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9nbG9iYWwtY29tbW9uL3NlcnZlci9jb21tb24tc2VydmVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzLCB7IFJvdXRlciB9IGZyb20gJ2V4cHJlc3MnXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudC10aW1lem9uZSdcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCdcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcydcbmltcG9ydCBjb3JzIGZyb20gJ2NvcnMnXG5pbXBvcnQgaGVsbWV0IGZyb20gJ2hlbG1ldCdcbmltcG9ydCBub2NhY2hlIGZyb20gJ25vY2FjaGUnXG5cbmltcG9ydCB7IGNvbW1vbkVudiB9IGZyb20gJy4uL2NvbnN0YW50cy9lbnYnXG5pbXBvcnQgeyBjb3JzT3B0aW9ucywgSVNfUkVBTF9QUk9EVUNUSU9OIH0gZnJvbSAnLi4vY29uc3RhbnRzL2NvbW1vbidcbmltcG9ydCB7IGdldExvZ2dlciB9IGZyb20gJy4uL3V0aWxzL2xvZ2dlcidcbmltcG9ydCByZXF1ZXN0SXAgZnJvbSAncmVxdWVzdC1pcCdcbmltcG9ydCB7IGNvbm5lY3REYiBhcyBjb21tb25Db25uZWN0RGIgfSBmcm9tICdAZ2xvYmFsLWNvbW1vbi9kYi9kYi1zZXR1cCdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5cbmNvbnN0IGxvZ2dlciA9IGdldExvZ2dlcignY29tbW9uLXNlcnZlci50cycpXG5jb25zdCBhcHAgPSBleHByZXNzKClcblxuLy8gc2V0IGRlZmF1bHQgdGltZXpvbmVcbm1vbWVudC50ei5zZXREZWZhdWx0KCdBc2lhL1Nlb3VsJylcblxuY29uc3QgdXNlckFnZW50ID0gXy5yZXBsYWNlKHByb2Nlc3MuZW52Lk1ZX05BTUUsICdfU0VSVkVSJywgJycpXG5heGlvcy5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsndXNlci1hZ2VudCddID0gdXNlckFnZW50XG5cbi8qXG5gYGBcbiAgLy8gVGVzdCBFcnJvciBDb2RlXG4gIHNldFRpbWVvdXQoKCkgPT4geyB0aHJvdyBuZXcgRXJyb3IoJ0V4Y2VwdGlvbiBFUlJPUicpIH0sIDEwMClcbmBgYFxuKi9cbnByb2Nlc3Mub24oJ3VuY2F1Z2h0RXhjZXB0aW9uJywgYXN5bmMgKGVycikgPT4ge1xuICBjb25zb2xlLmVycm9yKCd3aG9vcHMhIFRoZXJlIHdhcyBhbiB1bmNhdWdodCBlcnJvcjonLCBlcnIpXG4gIHByb2Nlc3Muc2VuZD8uKCdyZWFkeScpXG4gIHByb2Nlc3MuZXhpdCgxKVxufSlcblxuLypcbmBgYFxuICAvLyBUZXN0IEVycm9yIENvZGVcbiAgY29uc3QgcCA9IFByb21pc2UucmVqZWN0KG5ldyBFcnJvcigncmVqZWN0IEVSUk9SJykpXG4gIHNldFRpbWVvdXQoKCkgPT4gcC5jYXRjaChmdW5jdGlvbiAoKSB7IHJldHVybiB9KSwgODY0MDApXG5gYGBcbiovXG5wcm9jZXNzLm9uKCd1bmhhbmRsZWRSZWplY3Rpb24nLCBhc3luYyAoZXJyOiBhbnkpID0+IHtcbiAgY29uc29sZS5lcnJvcignd2hvb3BzISBUaGVyZSB3YXMgYW4gdW5jYXVnaHQgZXJyb3I6JywgZXJyKVxuICBwcm9jZXNzLnNlbmQ/LigncmVhZHknKVxuICBwcm9jZXNzLmV4aXQoMSlcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJ1blNlcnZlciAoe1xuICBwcmVDb25maWcgPSBudWxsLFxuICBtYWluLFxuICBwb3J0LFxuICBjb25uZWN0RGIgPSBjb21tb25Db25uZWN0RGIsXG59KSB7XG4gIChhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgcHJlQ29uZmlnICYmIGF3YWl0IHByZUNvbmZpZyhhcHApXG5cbiAgICBhd2FpdCBjb25uZWN0RGIoKVxuXG4gICAgbG9nZ2VyLmluZm8oJ0RCIGNvbm5lY3RlZCEnKVxuXG4gICAgYXBwLnVzZShoZWxtZXQoKSlcbiAgICBhcHAudXNlKG5vY2FjaGUoKSlcbiAgICAvLyBhcHAudXNlKGNvcnMoY29yc09wdGlvbnMpKVxuICAgIGFwcC51c2UoY29ycygpKVxuXG4gICAgYXBwLnVzZSgocmVxLCByZXMsIG5leHQpID0+IHtcbiAgICAgIHJlcy5oZWFkZXIoJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbicsICdodHRwOi8vbG9jYWxob3N0OjUxNzMnKVxuICAgICAgcmVzLmhlYWRlcihcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMnLFxuICAgICAgICAnT3JpZ2luLCBYLVJlcXVlc3RlZC1XaXRoLCBDb250ZW50LVR5cGUsIEFjY2VwdCcsXG4gICAgICApXG4gICAgICBuZXh0KClcbiAgICB9KVxuXG4gICAgYXBwLnVzZSgnL3VwbG9hZHMnLCBleHByZXNzLnN0YXRpYygndXBsb2FkcycpKVxuICAgIGFwcC51c2UocmVxdWVzdElwLm13KCkpXG5cbiAgICBhcHAudXNlKG1haW4oKSlcblxuICAgIGNvbnN0IGh0dHBTZXJ2ZXIgPSBhcHAubGlzdGVuKHBvcnQsICcwLjAuMC4wJywgKCkgPT4ge1xuICAgICAgbG9nZ2VyLndhcm4oJyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIycpXG4gICAgICBsb2dnZXIud2FybihgJHtwcm9jZXNzLmVudi5NWV9OQU1FfSBpcyBsaXN0ZW5pbmcgb24gcG9ydCAke3BvcnR9IE5PREVfRU5WOiR7Y29tbW9uRW52Lk5PREVfRU5WfWApXG4gICAgICBsb2dnZXIud2FybignIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjJylcbiAgICAgIHByb2Nlc3Muc2VuZD8uKCdyZWFkeScpXG4gICAgICBsb2dnZXIud2FybignU0VSVkVSIElTIFJFQURZLicpXG4gICAgfSlcblxuICAgIHByb2Nlc3Mub24oJ1NJR0lOVCcsICgpID0+IHtcbiAgICAgIGxvZ2dlci53YXJuKCdTRVJWRVIgR09UIFNJR0lOVC4nKVxuICAgICAgaHR0cFNlcnZlci5jbG9zZShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGxvZ2dlci53YXJuKCdTRVJWRVIgSVMgQ0xPU0VELiBoYXNFcnJvcjonLCAhIWVycilcbiAgICAgICAgcHJvY2Vzcy5leGl0KGVyciA/IDEgOiAwKVxuICAgICAgfSlcbiAgICAgIGlmICghSVNfUkVBTF9QUk9EVUNUSU9OKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGxvZ2dlci53YXJuKCdDTE9TRSBTRVJWRVIgSU4gRk9SQ0UnKVxuICAgICAgICAgIHByb2Nlc3MuZXhpdCgpXG4gICAgICAgIH0sIDEwMDApXG4gICAgICB9XG4gICAgfSlcbiAgfSkoKVxuXG4gIHJldHVybiBhcHBcbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQXlFO0FBR3pFLE1BQU1BLE1BQU0sR0FBRyxJQUFBQyxpQkFBUyxFQUFDLGtCQUFrQixDQUFDO0FB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