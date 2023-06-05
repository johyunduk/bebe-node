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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJsb2dnZXIiLCJnZXRMb2dnZXIiLCJhcHAiLCJleHByZXNzIiwibW9tZW50IiwidHoiLCJzZXREZWZhdWx0IiwidXNlckFnZW50IiwiXyIsInJlcGxhY2UiLCJwcm9jZXNzIiwiZW52IiwiTVlfTkFNRSIsImF4aW9zIiwiZGVmYXVsdHMiLCJoZWFkZXJzIiwiY29tbW9uIiwib24iLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJzZW5kIiwiZXhpdCIsInJ1blNlcnZlciIsInByZUNvbmZpZyIsIm1haW4iLCJwb3J0IiwiY29ubmVjdERiIiwiY29tbW9uQ29ubmVjdERiIiwiaW5mbyIsInVzZSIsImhlbG1ldCIsIm5vY2FjaGUiLCJjb3JzIiwic3RhdGljIiwicmVxdWVzdElwIiwibXciLCJodHRwU2VydmVyIiwibGlzdGVuIiwid2FybiIsImNvbW1vbkVudiIsIk5PREVfRU5WIiwiY2xvc2UiLCJJU19SRUFMX1BST0RVQ1RJT04iLCJzZXRUaW1lb3V0Il0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2dsb2JhbC1jb21tb24vc2VydmVyL2NvbW1vbi1zZXJ2ZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MsIHsgUm91dGVyIH0gZnJvbSAnZXhwcmVzcydcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50LXRpbWV6b25lJ1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJ1xuaW1wb3J0IGNvcnMgZnJvbSAnY29ycydcbmltcG9ydCBoZWxtZXQgZnJvbSAnaGVsbWV0J1xuaW1wb3J0IG5vY2FjaGUgZnJvbSAnbm9jYWNoZSdcblxuaW1wb3J0IHsgY29tbW9uRW52IH0gZnJvbSAnLi4vY29uc3RhbnRzL2VudidcbmltcG9ydCB7IGNvcnNPcHRpb25zLCBJU19SRUFMX1BST0RVQ1RJT04gfSBmcm9tICcuLi9jb25zdGFudHMvY29tbW9uJ1xuaW1wb3J0IHsgZ2V0TG9nZ2VyIH0gZnJvbSAnLi4vdXRpbHMvbG9nZ2VyJ1xuaW1wb3J0IHJlcXVlc3RJcCBmcm9tICdyZXF1ZXN0LWlwJ1xuaW1wb3J0IHsgY29ubmVjdERiIGFzIGNvbW1vbkNvbm5lY3REYiB9IGZyb20gJ0BnbG9iYWwtY29tbW9uL2RiL2RiLXNldHVwJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcblxuY29uc3QgbG9nZ2VyID0gZ2V0TG9nZ2VyKCdjb21tb24tc2VydmVyLnRzJylcbmNvbnN0IGFwcCA9IGV4cHJlc3MoKVxuXG4vLyBzZXQgZGVmYXVsdCB0aW1lem9uZVxubW9tZW50LnR6LnNldERlZmF1bHQoJ0FzaWEvU2VvdWwnKVxuXG5jb25zdCB1c2VyQWdlbnQgPSBfLnJlcGxhY2UocHJvY2Vzcy5lbnYuTVlfTkFNRSwgJ19TRVJWRVInLCAnJylcbmF4aW9zLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uWyd1c2VyLWFnZW50J10gPSB1c2VyQWdlbnRcblxuLypcbmBgYFxuICAvLyBUZXN0IEVycm9yIENvZGVcbiAgc2V0VGltZW91dCgoKSA9PiB7IHRocm93IG5ldyBFcnJvcignRXhjZXB0aW9uIEVSUk9SJykgfSwgMTAwKVxuYGBgXG4qL1xucHJvY2Vzcy5vbigndW5jYXVnaHRFeGNlcHRpb24nLCBhc3luYyAoZXJyKSA9PiB7XG4gIGNvbnNvbGUuZXJyb3IoJ3dob29wcyEgVGhlcmUgd2FzIGFuIHVuY2F1Z2h0IGVycm9yOicsIGVycilcbiAgcHJvY2Vzcy5zZW5kPy4oJ3JlYWR5JylcbiAgcHJvY2Vzcy5leGl0KDEpXG59KVxuXG4vKlxuYGBgXG4gIC8vIFRlc3QgRXJyb3IgQ29kZVxuICBjb25zdCBwID0gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdyZWplY3QgRVJST1InKSlcbiAgc2V0VGltZW91dCgoKSA9PiBwLmNhdGNoKGZ1bmN0aW9uICgpIHsgcmV0dXJuIH0pLCA4NjQwMClcbmBgYFxuKi9cbnByb2Nlc3Mub24oJ3VuaGFuZGxlZFJlamVjdGlvbicsIGFzeW5jIChlcnI6IGFueSkgPT4ge1xuICBjb25zb2xlLmVycm9yKCd3aG9vcHMhIFRoZXJlIHdhcyBhbiB1bmNhdWdodCBlcnJvcjonLCBlcnIpXG4gIHByb2Nlc3Muc2VuZD8uKCdyZWFkeScpXG4gIHByb2Nlc3MuZXhpdCgxKVxufSlcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcnVuU2VydmVyICh7XG4gIHByZUNvbmZpZyA9IG51bGwsXG4gIG1haW4sXG4gIHBvcnQsXG4gIGNvbm5lY3REYiA9IGNvbW1vbkNvbm5lY3REYixcbn0pIHtcbiAgKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBwcmVDb25maWcgJiYgYXdhaXQgcHJlQ29uZmlnKGFwcClcblxuICAgIGF3YWl0IGNvbm5lY3REYigpXG5cbiAgICBsb2dnZXIuaW5mbygnREIgY29ubmVjdGVkIScpXG5cbiAgICBhcHAudXNlKGhlbG1ldCgpKVxuICAgIGFwcC51c2Uobm9jYWNoZSgpKVxuICAgIC8vIGFwcC51c2UoY29ycyhjb3JzT3B0aW9ucykpXG4gICAgYXBwLnVzZShjb3JzKCkpXG5cbiAgICBhcHAudXNlKCcvdXBsb2FkcycsIGV4cHJlc3Muc3RhdGljKCd1cGxvYWRzJykpXG4gICAgYXBwLnVzZShyZXF1ZXN0SXAubXcoKSlcblxuICAgIGFwcC51c2UobWFpbigpKVxuXG4gICAgY29uc3QgaHR0cFNlcnZlciA9IGFwcC5saXN0ZW4ocG9ydCwgJzAuMC4wLjAnLCAoKSA9PiB7XG4gICAgICBsb2dnZXIud2FybignIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjJylcbiAgICAgIGxvZ2dlci53YXJuKGAke3Byb2Nlc3MuZW52Lk1ZX05BTUV9IGlzIGxpc3RlbmluZyBvbiBwb3J0ICR7cG9ydH0gTk9ERV9FTlY6JHtjb21tb25FbnYuTk9ERV9FTlZ9YClcbiAgICAgIGxvZ2dlci53YXJuKCcjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMnKVxuICAgICAgcHJvY2Vzcy5zZW5kPy4oJ3JlYWR5JylcbiAgICAgIGxvZ2dlci53YXJuKCdTRVJWRVIgSVMgUkVBRFkuJylcbiAgICB9KVxuXG4gICAgcHJvY2Vzcy5vbignU0lHSU5UJywgKCkgPT4ge1xuICAgICAgbG9nZ2VyLndhcm4oJ1NFUlZFUiBHT1QgU0lHSU5ULicpXG4gICAgICBodHRwU2VydmVyLmNsb3NlKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgbG9nZ2VyLndhcm4oJ1NFUlZFUiBJUyBDTE9TRUQuIGhhc0Vycm9yOicsICEhZXJyKVxuICAgICAgICBwcm9jZXNzLmV4aXQoZXJyID8gMSA6IDApXG4gICAgICB9KVxuICAgICAgaWYgKCFJU19SRUFMX1BST0RVQ1RJT04pIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyLndhcm4oJ0NMT1NFIFNFUlZFUiBJTiBGT1JDRScpXG4gICAgICAgICAgcHJvY2Vzcy5leGl0KClcbiAgICAgICAgfSwgMTAwMClcbiAgICAgIH1cbiAgICB9KVxuICB9KSgpXG5cbiAgcmV0dXJuIGFwcFxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBeUU7QUFHekUsTUFBTUEsTUFBTSxHQUFHLElBQUFDLGlCQUFTLEVBQUMsa0JBQWtCLENBQUM7QUFDNUMsTUFBTUMsR0FBRyxHQUFHLElBQUFDLGdCQUFPLEdBQUU7O0FBRXJCO0FBQ0FDLHVCQUFNLENBQUNDLEVBQUUsQ0FBQ0MsVUFBVSxDQUFDLFlBQVksQ0FBQztBQUVsQyxNQUFNQyxTQUFTLEdBQUdDLGVBQUMsQ0FBQ0MsT0FBTyxDQUFDQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxFQUFFLENBQUM7QUFDL0RDLGNBQUssQ0FBQ0MsUUFBUSxDQUFDQyxPQUFPLENBQUNDLE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBR1QsU0FBUzs7QUFFdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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