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
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJsb2dnZXIiLCJnZXRMb2dnZXIiLCJhcHAiLCJleHByZXNzIiwibW9tZW50IiwidHoiLCJzZXREZWZhdWx0IiwidXNlckFnZW50IiwiXyIsInJlcGxhY2UiLCJwcm9jZXNzIiwiZW52IiwiTVlfTkFNRSIsImF4aW9zIiwiZGVmYXVsdHMiLCJoZWFkZXJzIiwiY29tbW9uIiwib24iLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJzZW5kIiwiZXhpdCIsInJ1blNlcnZlciIsInByZUNvbmZpZyIsIm1haW4iLCJwb3J0IiwiY29ubmVjdERiIiwiY29tbW9uQ29ubmVjdERiIiwiaW5mbyIsInVzZSIsImhlbG1ldCIsIm5vY2FjaGUiLCJjb3JzIiwicmVxIiwicmVzIiwibmV4dCIsImhlYWRlciIsInN0YXRpYyIsInBhdGgiLCJqb2luIiwiX19kaXJuYW1lIiwicmVxdWVzdElwIiwibXciLCJodHRwU2VydmVyIiwibGlzdGVuIiwid2FybiIsImNvbW1vbkVudiIsIk5PREVfRU5WIiwiY2xvc2UiLCJJU19SRUFMX1BST0RVQ1RJT04iLCJzZXRUaW1lb3V0Il0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2dsb2JhbC1jb21tb24vc2VydmVyL2NvbW1vbi1zZXJ2ZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MsIHsgUm91dGVyIH0gZnJvbSAnZXhwcmVzcydcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50LXRpbWV6b25lJ1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJ1xuaW1wb3J0IGNvcnMgZnJvbSAnY29ycydcbmltcG9ydCBoZWxtZXQgZnJvbSAnaGVsbWV0J1xuaW1wb3J0IG5vY2FjaGUgZnJvbSAnbm9jYWNoZSdcblxuaW1wb3J0IHsgY29tbW9uRW52IH0gZnJvbSAnLi4vY29uc3RhbnRzL2VudidcbmltcG9ydCB7IGNvcnNPcHRpb25zLCBJU19SRUFMX1BST0RVQ1RJT04gfSBmcm9tICcuLi9jb25zdGFudHMvY29tbW9uJ1xuaW1wb3J0IHsgZ2V0TG9nZ2VyIH0gZnJvbSAnLi4vdXRpbHMvbG9nZ2VyJ1xuaW1wb3J0IHJlcXVlc3RJcCBmcm9tICdyZXF1ZXN0LWlwJ1xuaW1wb3J0IHsgY29ubmVjdERiIGFzIGNvbW1vbkNvbm5lY3REYiB9IGZyb20gJ0BnbG9iYWwtY29tbW9uL2RiL2RiLXNldHVwJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcblxuY29uc3QgbG9nZ2VyID0gZ2V0TG9nZ2VyKCdjb21tb24tc2VydmVyLnRzJylcbmNvbnN0IGFwcCA9IGV4cHJlc3MoKVxuXG4vLyBzZXQgZGVmYXVsdCB0aW1lem9uZVxubW9tZW50LnR6LnNldERlZmF1bHQoJ0FzaWEvU2VvdWwnKVxuXG5jb25zdCB1c2VyQWdlbnQgPSBfLnJlcGxhY2UocHJvY2Vzcy5lbnYuTVlfTkFNRSwgJ19TRVJWRVInLCAnJylcbmF4aW9zLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uWyd1c2VyLWFnZW50J10gPSB1c2VyQWdlbnRcblxuLypcbmBgYFxuICAvLyBUZXN0IEVycm9yIENvZGVcbiAgc2V0VGltZW91dCgoKSA9PiB7IHRocm93IG5ldyBFcnJvcignRXhjZXB0aW9uIEVSUk9SJykgfSwgMTAwKVxuYGBgXG4qL1xucHJvY2Vzcy5vbigndW5jYXVnaHRFeGNlcHRpb24nLCBhc3luYyAoZXJyKSA9PiB7XG4gIGNvbnNvbGUuZXJyb3IoJ3dob29wcyEgVGhlcmUgd2FzIGFuIHVuY2F1Z2h0IGVycm9yOicsIGVycilcbiAgcHJvY2Vzcy5zZW5kPy4oJ3JlYWR5JylcbiAgcHJvY2Vzcy5leGl0KDEpXG59KVxuXG4vKlxuYGBgXG4gIC8vIFRlc3QgRXJyb3IgQ29kZVxuICBjb25zdCBwID0gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdyZWplY3QgRVJST1InKSlcbiAgc2V0VGltZW91dCgoKSA9PiBwLmNhdGNoKGZ1bmN0aW9uICgpIHsgcmV0dXJuIH0pLCA4NjQwMClcbmBgYFxuKi9cbnByb2Nlc3Mub24oJ3VuaGFuZGxlZFJlamVjdGlvbicsIGFzeW5jIChlcnI6IGFueSkgPT4ge1xuICBjb25zb2xlLmVycm9yKCd3aG9vcHMhIFRoZXJlIHdhcyBhbiB1bmNhdWdodCBlcnJvcjonLCBlcnIpXG4gIHByb2Nlc3Muc2VuZD8uKCdyZWFkeScpXG4gIHByb2Nlc3MuZXhpdCgxKVxufSlcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcnVuU2VydmVyICh7XG4gIHByZUNvbmZpZyA9IG51bGwsXG4gIG1haW4sXG4gIHBvcnQsXG4gIGNvbm5lY3REYiA9IGNvbW1vbkNvbm5lY3REYixcbn0pIHtcbiAgKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBwcmVDb25maWcgJiYgYXdhaXQgcHJlQ29uZmlnKGFwcClcblxuICAgIGF3YWl0IGNvbm5lY3REYigpXG5cbiAgICBsb2dnZXIuaW5mbygnREIgY29ubmVjdGVkIScpXG5cbiAgICBhcHAudXNlKGhlbG1ldCgpKVxuICAgIGFwcC51c2Uobm9jYWNoZSgpKVxuICAgIC8vIGFwcC51c2UoY29ycyhjb3JzT3B0aW9ucykpXG4gICAgYXBwLnVzZShjb3JzKCkpXG5cbiAgICBhcHAudXNlKChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgICAgcmVzLmhlYWRlcignQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJywgJ2h0dHA6Ly9sb2NhbGhvc3Q6NTE3MycpXG4gICAgICByZXMuaGVhZGVyKFxuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycycsXG4gICAgICAgICdPcmlnaW4sIFgtUmVxdWVzdGVkLVdpdGgsIENvbnRlbnQtVHlwZSwgQWNjZXB0JyxcbiAgICAgIClcbiAgICAgIG5leHQoKVxuICAgIH0pXG5cbiAgICBhcHAudXNlKCcvdXBsb2FkcycsIGV4cHJlc3Muc3RhdGljKHBhdGguam9pbihfX2Rpcm5hbWUsICd1cGxvYWRzJykpKVxuICAgIGFwcC51c2UocmVxdWVzdElwLm13KCkpXG5cbiAgICBhcHAudXNlKG1haW4oKSlcblxuICAgIGNvbnN0IGh0dHBTZXJ2ZXIgPSBhcHAubGlzdGVuKHBvcnQsICcwLjAuMC4wJywgKCkgPT4ge1xuICAgICAgbG9nZ2VyLndhcm4oJyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIycpXG4gICAgICBsb2dnZXIud2FybihgJHtwcm9jZXNzLmVudi5NWV9OQU1FfSBpcyBsaXN0ZW5pbmcgb24gcG9ydCAke3BvcnR9IE5PREVfRU5WOiR7Y29tbW9uRW52Lk5PREVfRU5WfWApXG4gICAgICBsb2dnZXIud2FybignIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjJylcbiAgICAgIHByb2Nlc3Muc2VuZD8uKCdyZWFkeScpXG4gICAgICBsb2dnZXIud2FybignU0VSVkVSIElTIFJFQURZLicpXG4gICAgfSlcblxuICAgIHByb2Nlc3Mub24oJ1NJR0lOVCcsICgpID0+IHtcbiAgICAgIGxvZ2dlci53YXJuKCdTRVJWRVIgR09UIFNJR0lOVC4nKVxuICAgICAgaHR0cFNlcnZlci5jbG9zZShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGxvZ2dlci53YXJuKCdTRVJWRVIgSVMgQ0xPU0VELiBoYXNFcnJvcjonLCAhIWVycilcbiAgICAgICAgcHJvY2Vzcy5leGl0KGVyciA/IDEgOiAwKVxuICAgICAgfSlcbiAgICAgIGlmICghSVNfUkVBTF9QUk9EVUNUSU9OKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGxvZ2dlci53YXJuKCdDTE9TRSBTRVJWRVIgSU4gRk9SQ0UnKVxuICAgICAgICAgIHByb2Nlc3MuZXhpdCgpXG4gICAgICAgIH0sIDEwMDApXG4gICAgICB9XG4gICAgfSlcbiAgfSkoKVxuXG4gIHJldHVybiBhcHBcbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBdUI7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