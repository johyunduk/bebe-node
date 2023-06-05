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
var _path = _interopRequireDefault(require("path"));
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
    app.use('/uploads', _express.default.static(_path.default.join(__dirname, 'uploads')));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJsb2dnZXIiLCJnZXRMb2dnZXIiLCJhcHAiLCJleHByZXNzIiwibW9tZW50IiwidHoiLCJzZXREZWZhdWx0IiwidXNlckFnZW50IiwiXyIsInJlcGxhY2UiLCJwcm9jZXNzIiwiZW52IiwiTVlfTkFNRSIsImF4aW9zIiwiZGVmYXVsdHMiLCJoZWFkZXJzIiwiY29tbW9uIiwib24iLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJzZW5kIiwiZXhpdCIsInJ1blNlcnZlciIsInByZUNvbmZpZyIsIm1haW4iLCJwb3J0IiwiY29ubmVjdERiIiwiY29tbW9uQ29ubmVjdERiIiwiaW5mbyIsInVzZSIsImhlbG1ldCIsIm5vY2FjaGUiLCJjb3JzIiwic3RhdGljIiwicGF0aCIsImpvaW4iLCJfX2Rpcm5hbWUiLCJyZXF1ZXN0SXAiLCJtdyIsImh0dHBTZXJ2ZXIiLCJsaXN0ZW4iLCJ3YXJuIiwiY29tbW9uRW52IiwiTk9ERV9FTlYiLCJjbG9zZSIsIklTX1JFQUxfUFJPRFVDVElPTiIsInNldFRpbWVvdXQiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZ2xvYmFsLWNvbW1vbi9zZXJ2ZXIvY29tbW9uLXNlcnZlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcywgeyBSb3V0ZXIgfSBmcm9tICdleHByZXNzJ1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQtdGltZXpvbmUnXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnXG5pbXBvcnQgY29ycyBmcm9tICdjb3JzJ1xuaW1wb3J0IGhlbG1ldCBmcm9tICdoZWxtZXQnXG5pbXBvcnQgbm9jYWNoZSBmcm9tICdub2NhY2hlJ1xuXG5pbXBvcnQgeyBjb21tb25FbnYgfSBmcm9tICcuLi9jb25zdGFudHMvZW52J1xuaW1wb3J0IHsgY29yc09wdGlvbnMsIElTX1JFQUxfUFJPRFVDVElPTiB9IGZyb20gJy4uL2NvbnN0YW50cy9jb21tb24nXG5pbXBvcnQgeyBnZXRMb2dnZXIgfSBmcm9tICcuLi91dGlscy9sb2dnZXInXG5pbXBvcnQgcmVxdWVzdElwIGZyb20gJ3JlcXVlc3QtaXAnXG5pbXBvcnQgeyBjb25uZWN0RGIgYXMgY29tbW9uQ29ubmVjdERiIH0gZnJvbSAnQGdsb2JhbC1jb21tb24vZGIvZGItc2V0dXAnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuXG5jb25zdCBsb2dnZXIgPSBnZXRMb2dnZXIoJ2NvbW1vbi1zZXJ2ZXIudHMnKVxuY29uc3QgYXBwID0gZXhwcmVzcygpXG5cbi8vIHNldCBkZWZhdWx0IHRpbWV6b25lXG5tb21lbnQudHouc2V0RGVmYXVsdCgnQXNpYS9TZW91bCcpXG5cbmNvbnN0IHVzZXJBZ2VudCA9IF8ucmVwbGFjZShwcm9jZXNzLmVudi5NWV9OQU1FLCAnX1NFUlZFUicsICcnKVxuYXhpb3MuZGVmYXVsdHMuaGVhZGVycy5jb21tb25bJ3VzZXItYWdlbnQnXSA9IHVzZXJBZ2VudFxuXG4vKlxuYGBgXG4gIC8vIFRlc3QgRXJyb3IgQ29kZVxuICBzZXRUaW1lb3V0KCgpID0+IHsgdGhyb3cgbmV3IEVycm9yKCdFeGNlcHRpb24gRVJST1InKSB9LCAxMDApXG5gYGBcbiovXG5wcm9jZXNzLm9uKCd1bmNhdWdodEV4Y2VwdGlvbicsIGFzeW5jIChlcnIpID0+IHtcbiAgY29uc29sZS5lcnJvcignd2hvb3BzISBUaGVyZSB3YXMgYW4gdW5jYXVnaHQgZXJyb3I6JywgZXJyKVxuICBwcm9jZXNzLnNlbmQ/LigncmVhZHknKVxuICBwcm9jZXNzLmV4aXQoMSlcbn0pXG5cbi8qXG5gYGBcbiAgLy8gVGVzdCBFcnJvciBDb2RlXG4gIGNvbnN0IHAgPSBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ3JlamVjdCBFUlJPUicpKVxuICBzZXRUaW1lb3V0KCgpID0+IHAuY2F0Y2goZnVuY3Rpb24gKCkgeyByZXR1cm4gfSksIDg2NDAwKVxuYGBgXG4qL1xucHJvY2Vzcy5vbigndW5oYW5kbGVkUmVqZWN0aW9uJywgYXN5bmMgKGVycjogYW55KSA9PiB7XG4gIGNvbnNvbGUuZXJyb3IoJ3dob29wcyEgVGhlcmUgd2FzIGFuIHVuY2F1Z2h0IGVycm9yOicsIGVycilcbiAgcHJvY2Vzcy5zZW5kPy4oJ3JlYWR5JylcbiAgcHJvY2Vzcy5leGl0KDEpXG59KVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBydW5TZXJ2ZXIgKHtcbiAgcHJlQ29uZmlnID0gbnVsbCxcbiAgbWFpbixcbiAgcG9ydCxcbiAgY29ubmVjdERiID0gY29tbW9uQ29ubmVjdERiLFxufSkge1xuICAoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIHByZUNvbmZpZyAmJiBhd2FpdCBwcmVDb25maWcoYXBwKVxuXG4gICAgYXdhaXQgY29ubmVjdERiKClcblxuICAgIGxvZ2dlci5pbmZvKCdEQiBjb25uZWN0ZWQhJylcblxuICAgIGFwcC51c2UoaGVsbWV0KCkpXG4gICAgYXBwLnVzZShub2NhY2hlKCkpXG4gICAgLy8gYXBwLnVzZShjb3JzKGNvcnNPcHRpb25zKSlcbiAgICBhcHAudXNlKGNvcnMoKSlcbiAgICBhcHAudXNlKCcvdXBsb2FkcycsIGV4cHJlc3Muc3RhdGljKHBhdGguam9pbihfX2Rpcm5hbWUsICd1cGxvYWRzJykpKVxuICAgIGFwcC51c2UocmVxdWVzdElwLm13KCkpXG5cbiAgICBhcHAudXNlKG1haW4oKSlcblxuICAgIGNvbnN0IGh0dHBTZXJ2ZXIgPSBhcHAubGlzdGVuKHBvcnQsICcwLjAuMC4wJywgKCkgPT4ge1xuICAgICAgbG9nZ2VyLndhcm4oJyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIycpXG4gICAgICBsb2dnZXIud2FybihgJHtwcm9jZXNzLmVudi5NWV9OQU1FfSBpcyBsaXN0ZW5pbmcgb24gcG9ydCAke3BvcnR9IE5PREVfRU5WOiR7Y29tbW9uRW52Lk5PREVfRU5WfWApXG4gICAgICBsb2dnZXIud2FybignIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjJylcbiAgICAgIHByb2Nlc3Muc2VuZD8uKCdyZWFkeScpXG4gICAgICBsb2dnZXIud2FybignU0VSVkVSIElTIFJFQURZLicpXG4gICAgfSlcblxuICAgIHByb2Nlc3Mub24oJ1NJR0lOVCcsICgpID0+IHtcbiAgICAgIGxvZ2dlci53YXJuKCdTRVJWRVIgR09UIFNJR0lOVC4nKVxuICAgICAgaHR0cFNlcnZlci5jbG9zZShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGxvZ2dlci53YXJuKCdTRVJWRVIgSVMgQ0xPU0VELiBoYXNFcnJvcjonLCAhIWVycilcbiAgICAgICAgcHJvY2Vzcy5leGl0KGVyciA/IDEgOiAwKVxuICAgICAgfSlcbiAgICAgIGlmICghSVNfUkVBTF9QUk9EVUNUSU9OKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGxvZ2dlci53YXJuKCdDTE9TRSBTRVJWRVIgSU4gRk9SQ0UnKVxuICAgICAgICAgIHByb2Nlc3MuZXhpdCgpXG4gICAgICAgIH0sIDEwMDApXG4gICAgICB9XG4gICAgfSlcbiAgfSkoKVxuXG4gIHJldHVybiBhcHBcbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBdUI7QUFFdkIsTUFBTUEsTUFBTSxHQUFHLElBQUFDLGlCQUFTLEVBQUMsa0JBQWtCLENBQUM7QUFDNUMsTUFBTUMsR0FBRyxHQUFHLElBQUFDLGdCQUFPLEdBQUU7O0FBRXJCO0FBQ0FDLHVCQUFNLENBQUNDLEVBQUUsQ0FBQ0MsVUFBVSxDQUFDLFlBQVksQ0FBQztBQUVsQyxNQUFNQyxTQUFTLEdBQUdDLGVBQUMsQ0FBQ0MsT0FBTyxDQUFDQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxFQUFFLENBQUM7QUFDL0RDLGNBQUssQ0FBQ0MsUUFBUSxDQUFDQyxPQUFPLENBQUNDLE1BQU0sQ0FB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