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
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJsb2dnZXIiLCJnZXRMb2dnZXIiLCJhcHAiLCJleHByZXNzIiwibW9tZW50IiwidHoiLCJzZXREZWZhdWx0IiwidXNlckFnZW50IiwiXyIsInJlcGxhY2UiLCJwcm9jZXNzIiwiZW52IiwiTVlfTkFNRSIsImF4aW9zIiwiZGVmYXVsdHMiLCJoZWFkZXJzIiwiY29tbW9uIiwib24iLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJzZW5kIiwiZXhpdCIsInJ1blNlcnZlciIsInByZUNvbmZpZyIsIm1haW4iLCJwb3J0IiwiY29ubmVjdERiIiwiY29tbW9uQ29ubmVjdERiIiwiaW5mbyIsInVzZSIsImhlbG1ldCIsIm5vY2FjaGUiLCJjb3JzIiwicmVxIiwicmVzIiwibmV4dCIsInNldEhlYWRlciIsInN0YXRpYyIsInJlcXVlc3RJcCIsIm13IiwiaHR0cFNlcnZlciIsImxpc3RlbiIsIndhcm4iLCJjb21tb25FbnYiLCJOT0RFX0VOViIsImNsb3NlIiwiSVNfUkVBTF9QUk9EVUNUSU9OIiwic2V0VGltZW91dCJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9nbG9iYWwtY29tbW9uL3NlcnZlci9jb21tb24tc2VydmVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzLCB7IFJvdXRlciB9IGZyb20gJ2V4cHJlc3MnXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudC10aW1lem9uZSdcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCdcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcydcbmltcG9ydCBjb3JzIGZyb20gJ2NvcnMnXG5pbXBvcnQgaGVsbWV0IGZyb20gJ2hlbG1ldCdcbmltcG9ydCBub2NhY2hlIGZyb20gJ25vY2FjaGUnXG5cbmltcG9ydCB7IGNvbW1vbkVudiB9IGZyb20gJy4uL2NvbnN0YW50cy9lbnYnXG5pbXBvcnQgeyBjb3JzT3B0aW9ucywgSVNfUkVBTF9QUk9EVUNUSU9OIH0gZnJvbSAnLi4vY29uc3RhbnRzL2NvbW1vbidcbmltcG9ydCB7IGdldExvZ2dlciB9IGZyb20gJy4uL3V0aWxzL2xvZ2dlcidcbmltcG9ydCByZXF1ZXN0SXAgZnJvbSAncmVxdWVzdC1pcCdcbmltcG9ydCB7IGNvbm5lY3REYiBhcyBjb21tb25Db25uZWN0RGIgfSBmcm9tICdAZ2xvYmFsLWNvbW1vbi9kYi9kYi1zZXR1cCdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5cbmNvbnN0IGxvZ2dlciA9IGdldExvZ2dlcignY29tbW9uLXNlcnZlci50cycpXG5jb25zdCBhcHAgPSBleHByZXNzKClcblxuLy8gc2V0IGRlZmF1bHQgdGltZXpvbmVcbm1vbWVudC50ei5zZXREZWZhdWx0KCdBc2lhL1Nlb3VsJylcblxuY29uc3QgdXNlckFnZW50ID0gXy5yZXBsYWNlKHByb2Nlc3MuZW52Lk1ZX05BTUUsICdfU0VSVkVSJywgJycpXG5heGlvcy5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsndXNlci1hZ2VudCddID0gdXNlckFnZW50XG5cbi8qXG5gYGBcbiAgLy8gVGVzdCBFcnJvciBDb2RlXG4gIHNldFRpbWVvdXQoKCkgPT4geyB0aHJvdyBuZXcgRXJyb3IoJ0V4Y2VwdGlvbiBFUlJPUicpIH0sIDEwMClcbmBgYFxuKi9cbnByb2Nlc3Mub24oJ3VuY2F1Z2h0RXhjZXB0aW9uJywgYXN5bmMgKGVycikgPT4ge1xuICBjb25zb2xlLmVycm9yKCd3aG9vcHMhIFRoZXJlIHdhcyBhbiB1bmNhdWdodCBlcnJvcjonLCBlcnIpXG4gIHByb2Nlc3Muc2VuZD8uKCdyZWFkeScpXG4gIHByb2Nlc3MuZXhpdCgxKVxufSlcblxuLypcbmBgYFxuICAvLyBUZXN0IEVycm9yIENvZGVcbiAgY29uc3QgcCA9IFByb21pc2UucmVqZWN0KG5ldyBFcnJvcigncmVqZWN0IEVSUk9SJykpXG4gIHNldFRpbWVvdXQoKCkgPT4gcC5jYXRjaChmdW5jdGlvbiAoKSB7IHJldHVybiB9KSwgODY0MDApXG5gYGBcbiovXG5wcm9jZXNzLm9uKCd1bmhhbmRsZWRSZWplY3Rpb24nLCBhc3luYyAoZXJyOiBhbnkpID0+IHtcbiAgY29uc29sZS5lcnJvcignd2hvb3BzISBUaGVyZSB3YXMgYW4gdW5jYXVnaHQgZXJyb3I6JywgZXJyKVxuICBwcm9jZXNzLnNlbmQ/LigncmVhZHknKVxuICBwcm9jZXNzLmV4aXQoMSlcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJ1blNlcnZlciAoe1xuICBwcmVDb25maWcgPSBudWxsLFxuICBtYWluLFxuICBwb3J0LFxuICBjb25uZWN0RGIgPSBjb21tb25Db25uZWN0RGIsXG59KSB7XG4gIChhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgcHJlQ29uZmlnICYmIGF3YWl0IHByZUNvbmZpZyhhcHApXG5cbiAgICBhd2FpdCBjb25uZWN0RGIoKVxuXG4gICAgbG9nZ2VyLmluZm8oJ0RCIGNvbm5lY3RlZCEnKVxuXG4gICAgYXBwLnVzZShoZWxtZXQoKSlcbiAgICBhcHAudXNlKG5vY2FjaGUoKSlcbiAgICAvLyBhcHAudXNlKGNvcnMoY29yc09wdGlvbnMpKVxuICAgIGFwcC51c2UoY29ycygpKVxuXG4gICAgYXBwLnVzZSgocmVxLCByZXMsIG5leHQpID0+IHtcbiAgICAgIHJlcy5zZXRIZWFkZXIoJ0Nyb3NzLU9yaWdpbi1SZXNvdXJjZS1Qb2xpY3knLCAnY3Jvc3Mtb3JpZ2luJylcbiAgICAgIG5leHQoKVxuICAgIH0pXG5cbiAgICBhcHAudXNlKCcvdXBsb2FkcycsIGV4cHJlc3Muc3RhdGljKCd1cGxvYWRzJykpXG4gICAgYXBwLnVzZShyZXF1ZXN0SXAubXcoKSlcblxuICAgIGFwcC51c2UobWFpbigpKVxuXG4gICAgY29uc3QgaHR0cFNlcnZlciA9IGFwcC5saXN0ZW4ocG9ydCwgJzAuMC4wLjAnLCAoKSA9PiB7XG4gICAgICBsb2dnZXIud2FybignIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjJylcbiAgICAgIGxvZ2dlci53YXJuKGAke3Byb2Nlc3MuZW52Lk1ZX05BTUV9IGlzIGxpc3RlbmluZyBvbiBwb3J0ICR7cG9ydH0gTk9ERV9FTlY6JHtjb21tb25FbnYuTk9ERV9FTlZ9YClcbiAgICAgIGxvZ2dlci53YXJuKCcjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMnKVxuICAgICAgcHJvY2Vzcy5zZW5kPy4oJ3JlYWR5JylcbiAgICAgIGxvZ2dlci53YXJuKCdTRVJWRVIgSVMgUkVBRFkuJylcbiAgICB9KVxuXG4gICAgcHJvY2Vzcy5vbignU0lHSU5UJywgKCkgPT4ge1xuICAgICAgbG9nZ2VyLndhcm4oJ1NFUlZFUiBHT1QgU0lHSU5ULicpXG4gICAgICBodHRwU2VydmVyLmNsb3NlKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgbG9nZ2VyLndhcm4oJ1NFUlZFUiBJUyBDTE9TRUQuIGhhc0Vycm9yOicsICEhZXJyKVxuICAgICAgICBwcm9jZXNzLmV4aXQoZXJyID8gMSA6IDApXG4gICAgICB9KVxuICAgICAgaWYgKCFJU19SRUFMX1BST0RVQ1RJT04pIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyLndhcm4oJ0NMT1NFIFNFUlZFUiBJTiBGT1JDRScpXG4gICAgICAgICAgcHJvY2Vzcy5leGl0KClcbiAgICAgICAgfSwgMTAwMClcbiAgICAgIH1cbiAgICB9KVxuICB9KSgpXG5cbiAgcmV0dXJuIGFwcFxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBeUU7QUFHekUsTUFBTUEsTUFBTSxHQUFHLElBQUFDLGlCQUFTLEVBQUMsa0JBQWtCLENBQUM7QUFDNUMsTUFBTUMsR0FBRyxHQUFHLElBQUFDLGdCQUFPLEdBQUU7O0FBRXJCO0FBQ0FDLHVCQUFNLENBQUNDLEVBQUUsQ0FBQ0MsVUFBVSxDQUFDLFlBQVksQ0FBQztBQUVsQyxNQUFNQyxTQUFTLEdBQUdDLGVBQUMsQ0FBQ0MsT0FB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