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
    app.use((0, _cors.default)({
      origin: '*',
      credentials: true
    }));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJsb2dnZXIiLCJnZXRMb2dnZXIiLCJhcHAiLCJleHByZXNzIiwibW9tZW50IiwidHoiLCJzZXREZWZhdWx0IiwidXNlckFnZW50IiwiXyIsInJlcGxhY2UiLCJwcm9jZXNzIiwiZW52IiwiTVlfTkFNRSIsImF4aW9zIiwiZGVmYXVsdHMiLCJoZWFkZXJzIiwiY29tbW9uIiwib24iLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJzZW5kIiwiZXhpdCIsInJ1blNlcnZlciIsInByZUNvbmZpZyIsIm1haW4iLCJwb3J0IiwiY29ubmVjdERiIiwiY29tbW9uQ29ubmVjdERiIiwiaW5mbyIsInVzZSIsImhlbG1ldCIsIm5vY2FjaGUiLCJjb3JzIiwib3JpZ2luIiwiY3JlZGVudGlhbHMiLCJzdGF0aWMiLCJyZXF1ZXN0SXAiLCJtdyIsImh0dHBTZXJ2ZXIiLCJsaXN0ZW4iLCJ3YXJuIiwiY29tbW9uRW52IiwiTk9ERV9FTlYiLCJjbG9zZSIsIklTX1JFQUxfUFJPRFVDVElPTiIsInNldFRpbWVvdXQiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZ2xvYmFsLWNvbW1vbi9zZXJ2ZXIvY29tbW9uLXNlcnZlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcywgeyBSb3V0ZXIgfSBmcm9tICdleHByZXNzJ1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQtdGltZXpvbmUnXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnXG5pbXBvcnQgY29ycyBmcm9tICdjb3JzJ1xuaW1wb3J0IGhlbG1ldCBmcm9tICdoZWxtZXQnXG5pbXBvcnQgbm9jYWNoZSBmcm9tICdub2NhY2hlJ1xuXG5pbXBvcnQgeyBjb21tb25FbnYgfSBmcm9tICcuLi9jb25zdGFudHMvZW52J1xuaW1wb3J0IHsgY29yc09wdGlvbnMsIElTX1JFQUxfUFJPRFVDVElPTiB9IGZyb20gJy4uL2NvbnN0YW50cy9jb21tb24nXG5pbXBvcnQgeyBnZXRMb2dnZXIgfSBmcm9tICcuLi91dGlscy9sb2dnZXInXG5pbXBvcnQgcmVxdWVzdElwIGZyb20gJ3JlcXVlc3QtaXAnXG5pbXBvcnQgeyBjb25uZWN0RGIgYXMgY29tbW9uQ29ubmVjdERiIH0gZnJvbSAnQGdsb2JhbC1jb21tb24vZGIvZGItc2V0dXAnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuXG5jb25zdCBsb2dnZXIgPSBnZXRMb2dnZXIoJ2NvbW1vbi1zZXJ2ZXIudHMnKVxuY29uc3QgYXBwID0gZXhwcmVzcygpXG5cbi8vIHNldCBkZWZhdWx0IHRpbWV6b25lXG5tb21lbnQudHouc2V0RGVmYXVsdCgnQXNpYS9TZW91bCcpXG5cbmNvbnN0IHVzZXJBZ2VudCA9IF8ucmVwbGFjZShwcm9jZXNzLmVudi5NWV9OQU1FLCAnX1NFUlZFUicsICcnKVxuYXhpb3MuZGVmYXVsdHMuaGVhZGVycy5jb21tb25bJ3VzZXItYWdlbnQnXSA9IHVzZXJBZ2VudFxuXG4vKlxuYGBgXG4gIC8vIFRlc3QgRXJyb3IgQ29kZVxuICBzZXRUaW1lb3V0KCgpID0+IHsgdGhyb3cgbmV3IEVycm9yKCdFeGNlcHRpb24gRVJST1InKSB9LCAxMDApXG5gYGBcbiovXG5wcm9jZXNzLm9uKCd1bmNhdWdodEV4Y2VwdGlvbicsIGFzeW5jIChlcnIpID0+IHtcbiAgY29uc29sZS5lcnJvcignd2hvb3BzISBUaGVyZSB3YXMgYW4gdW5jYXVnaHQgZXJyb3I6JywgZXJyKVxuICBwcm9jZXNzLnNlbmQ/LigncmVhZHknKVxuICBwcm9jZXNzLmV4aXQoMSlcbn0pXG5cbi8qXG5gYGBcbiAgLy8gVGVzdCBFcnJvciBDb2RlXG4gIGNvbnN0IHAgPSBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ3JlamVjdCBFUlJPUicpKVxuICBzZXRUaW1lb3V0KCgpID0+IHAuY2F0Y2goZnVuY3Rpb24gKCkgeyByZXR1cm4gfSksIDg2NDAwKVxuYGBgXG4qL1xucHJvY2Vzcy5vbigndW5oYW5kbGVkUmVqZWN0aW9uJywgYXN5bmMgKGVycjogYW55KSA9PiB7XG4gIGNvbnNvbGUuZXJyb3IoJ3dob29wcyEgVGhlcmUgd2FzIGFuIHVuY2F1Z2h0IGVycm9yOicsIGVycilcbiAgcHJvY2Vzcy5zZW5kPy4oJ3JlYWR5JylcbiAgcHJvY2Vzcy5leGl0KDEpXG59KVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBydW5TZXJ2ZXIgKHtcbiAgcHJlQ29uZmlnID0gbnVsbCxcbiAgbWFpbixcbiAgcG9ydCxcbiAgY29ubmVjdERiID0gY29tbW9uQ29ubmVjdERiLFxufSkge1xuICAoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIHByZUNvbmZpZyAmJiBhd2FpdCBwcmVDb25maWcoYXBwKVxuXG4gICAgYXdhaXQgY29ubmVjdERiKClcblxuICAgIGxvZ2dlci5pbmZvKCdEQiBjb25uZWN0ZWQhJylcblxuICAgIGFwcC51c2UoaGVsbWV0KCkpXG4gICAgYXBwLnVzZShub2NhY2hlKCkpXG4gICAgLy8gYXBwLnVzZShjb3JzKGNvcnNPcHRpb25zKSlcbiAgICBhcHAudXNlKGNvcnMoe1xuICAgICAgb3JpZ2luOiAnKicsXG4gICAgICBjcmVkZW50aWFsczogdHJ1ZSxcbiAgICB9KSlcblxuICAgIGFwcC51c2UoJy91cGxvYWRzJywgZXhwcmVzcy5zdGF0aWMoJ3VwbG9hZHMnKSlcbiAgICBhcHAudXNlKHJlcXVlc3RJcC5tdygpKVxuXG4gICAgYXBwLnVzZShtYWluKCkpXG5cbiAgICBjb25zdCBodHRwU2VydmVyID0gYXBwLmxpc3Rlbihwb3J0LCAnMC4wLjAuMCcsICgpID0+IHtcbiAgICAgIGxvZ2dlci53YXJuKCcjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMnKVxuICAgICAgbG9nZ2VyLndhcm4oYCR7cHJvY2Vzcy5lbnYuTVlfTkFNRX0gaXMgbGlzdGVuaW5nIG9uIHBvcnQgJHtwb3J0fSBOT0RFX0VOVjoke2NvbW1vbkVudi5OT0RFX0VOVn1gKVxuICAgICAgbG9nZ2VyLndhcm4oJyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIycpXG4gICAgICBwcm9jZXNzLnNlbmQ/LigncmVhZHknKVxuICAgICAgbG9nZ2VyLndhcm4oJ1NFUlZFUiBJUyBSRUFEWS4nKVxuICAgIH0pXG5cbiAgICBwcm9jZXNzLm9uKCdTSUdJTlQnLCAoKSA9PiB7XG4gICAgICBsb2dnZXIud2FybignU0VSVkVSIEdPVCBTSUdJTlQuJylcbiAgICAgIGh0dHBTZXJ2ZXIuY2xvc2UoZnVuY3Rpb24gKGVycikge1xuICAgICAgICBsb2dnZXIud2FybignU0VSVkVSIElTIENMT1NFRC4gaGFzRXJyb3I6JywgISFlcnIpXG4gICAgICAgIHByb2Nlc3MuZXhpdChlcnIgPyAxIDogMClcbiAgICAgIH0pXG4gICAgICBpZiAoIUlTX1JFQUxfUFJPRFVDVElPTikge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBsb2dnZXIud2FybignQ0xPU0UgU0VSVkVSIElOIEZPUkNFJylcbiAgICAgICAgICBwcm9jZXNzLmV4aXQoKVxuICAgICAgICB9LCAxMDAwKVxuICAgICAgfVxuICAgIH0pXG4gIH0pKClcblxuICByZXR1cm4gYXBwXG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUF5RTtBQUd6RSxNQUFNQSxNQUFNLEdBQUcsSUFBQUMsaUJBQVMsRUFBQyxrQkFBa0IsQ0FBQztBQUM1QyxNQUFNQyxHQUFHLEdBQUcsSUFBQUMsZ0JBQU8sR0FBRTs7QUFFckI7QUFDQUMsdUJBQU0sQ0FBQ0MsRUFBRSxDQUFDQyxVQUFVLENBQUMsWUFBWSxDQUFDO0FBRWxDLE1BQU1DLFNBQVMsR0FBR0MsZUFBQyxDQUFDQyxPQUFPLENBQUNDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxPQUFPLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQztBQUMvREMsY0FBSyxDQUFDQyxRQUFR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