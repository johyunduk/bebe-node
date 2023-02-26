"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDB = exports.ensureDbExistsAndSync = exports.default = void 0;
exports.loadAllModel = loadAllModel;
exports.newSequelize = newSequelize;
exports.setDB = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
var _sequelize = require("sequelize");
var _glob = _interopRequireDefault(require("glob"));
var _path = _interopRequireDefault(require("path"));
var _clsHooked = _interopRequireDefault(require("cls-hooked"));
var _ensuredSync = _interopRequireDefault(require("./ensuredSync"));
var _logger = require("../utils/logger");
var _env = require("@global-common/constants/env");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const logger = (0, _logger.getLogger)('common-db-setup.ts');
const namespace = _clsHooked.default.createNamespace('bebe-namespace');
_sequelize.Sequelize.useCLS(namespace);

/*
  decimalNumbers: raw query시 숫자가 string이 되는 이슈 해결용.
  dateStrings / typeCast: time이 +9로 저장되어도 불러올때 utc오는 현상 해결, https://devstudioonline.com/article/sequelize-set-timezone-and-datetime-format-for-mysql
*/
const dialectOptions = {
  decimalNumbers: true,
  dateStrings: true,
  typeCast: true
};
async function newSequelize(url, options = {}) {
  logger.info('newSequelize url:', url, options);

  // timezone +9 설정해준다. KST 사용
  options.timezone = '+09:00'; // DB저장시

  /**
   * default는 max 5이나, prod.에서 문제 발생할 수 있으므로 50으로 세팅
   * RDS 파라미터 그룹에서 max_connections 혹은 db 접속해서 show variables like '%max_connections%'로 검색해서
   * 각 서버의 max값의 합이 max_connections를 넘지 않는 선에서 맞춰줘야함. 넘어버리면 서버가 종료될 수 있음.
  */
  options.pool = {
    max: 50
  };

  // .env DB_LOGGING_TYPE으로 시퀄라이즈 로그옵션 조절. default는 console.log 임.
  _env.commonEnv.DB_LOGGING_TYPE === 'logger' && (options.logging = msg => logger.debug(msg));
  _env.commonEnv.DB_LOGGING_TYPE === 'no' && (options.logging = false);
  return new _sequelize.Sequelize(url, _lodash.default.merge({
    dialectOptions
  }, options));
}
async function loadAllModel(modelPath) {
  const modelPathList = _glob.default.sync(modelPath);
  for (const file of modelPathList) {
    logger.warn('loadAllModel :', file);
    const dbModel = await (specifier => new Promise(r => r(`${specifier}`)).then(s => _interopRequireWildcard(require(s))))(_path.default.resolve(file));
    if (typeof dbModel.default === 'function' && !dbModel.default.findAll) {
      dbModel.default();
    }
  }
}
const DBs = {};
const setDB = (dbName, db) => {
  logger.warn('setDB :', dbName);
  DBs[dbName] = db;
};
exports.setDB = setDB;
const getDB = dbName => {
  const db = DBs[dbName];
  if (!db) {
    throw new Error('Not initialized db:' + dbName);
  }
  return db;
};

/**
 * db를 sync 하다가 db가 없다고 할 때, db를 생성하고 sync해주는 함수.
 * @param toSyncDb sync할 db의 sequelize instance
 * @param DB_URL database가 없을 때, db를 생성하기 위해 db 접속 url도 받음.
 */
exports.getDB = getDB;
const ensureDbExistsAndSync = _ensuredSync.default;
exports.ensureDbExistsAndSync = ensureDbExistsAndSync;
var _default = _sequelize.Sequelize;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJsb2dnZXIiLCJnZXRMb2dnZXIiLCJuYW1lc3BhY2UiLCJjbHMiLCJjcmVhdGVOYW1lc3BhY2UiLCJTZXF1ZWxpemUiLCJ1c2VDTFMiLCJkaWFsZWN0T3B0aW9ucyIsImRlY2ltYWxOdW1iZXJzIiwiZGF0ZVN0cmluZ3MiLCJ0eXBlQ2FzdCIsIm5ld1NlcXVlbGl6ZSIsInVybCIsIm9wdGlvbnMiLCJpbmZvIiwidGltZXpvbmUiLCJwb29sIiwibWF4IiwiY29tbW9uRW52IiwiREJfTE9HR0lOR19UWVBFIiwibG9nZ2luZyIsIm1zZyIsImRlYnVnIiwiXyIsIm1lcmdlIiwibG9hZEFsbE1vZGVsIiwibW9kZWxQYXRoIiwibW9kZWxQYXRoTGlzdCIsImdsb2IiLCJzeW5jIiwiZmlsZSIsIndhcm4iLCJkYk1vZGVsIiwicGF0aCIsInJlc29sdmUiLCJkZWZhdWx0IiwiZmluZEFsbCIsIkRCcyIsInNldERCIiwiZGJOYW1lIiwiZGIiLCJnZXREQiIsIkVycm9yIiwiZW5zdXJlRGJFeGlzdHNBbmRTeW5jIiwiZW5zdXJlZFN5bmMiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZ2xvYmFsLWNvbW1vbi9kYi9jb21tb24tZGItc2V0dXAudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xyXG5pbXBvcnQgeyBTZXF1ZWxpemUgfSBmcm9tICdzZXF1ZWxpemUnXHJcbmltcG9ydCBnbG9iIGZyb20gJ2dsb2InXHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXHJcbmltcG9ydCBjbHMgZnJvbSAnY2xzLWhvb2tlZCdcclxuXHJcbmltcG9ydCBlbnN1cmVkU3luYyBmcm9tICcuL2Vuc3VyZWRTeW5jJ1xyXG5pbXBvcnQgeyBnZXRMb2dnZXIgfSBmcm9tICcuLi91dGlscy9sb2dnZXInXHJcbmltcG9ydCB7IGNvbW1vbkVudiB9IGZyb20gJ0BnbG9iYWwtY29tbW9uL2NvbnN0YW50cy9lbnYnXHJcblxyXG5jb25zdCBsb2dnZXIgPSBnZXRMb2dnZXIoJ2NvbW1vbi1kYi1zZXR1cC50cycpXHJcblxyXG5jb25zdCBuYW1lc3BhY2UgPSBjbHMuY3JlYXRlTmFtZXNwYWNlKCdiZWJlLW5hbWVzcGFjZScpXHJcblxyXG5TZXF1ZWxpemUudXNlQ0xTKG5hbWVzcGFjZSlcclxuXHJcbi8qXHJcbiAgZGVjaW1hbE51bWJlcnM6IHJhdyBxdWVyeeyLnCDsiKvsnpDqsIAgc3RyaW5n7J20IOuQmOuKlCDsnbTsiogg7ZW06rKw7JqpLlxyXG4gIGRhdGVTdHJpbmdzIC8gdHlwZUNhc3Q6IHRpbWXsnbQgKznroZwg7KCA7J6l65CY7Ja064+EIOu2iOufrOyYrOuVjCB1dGPsmKTripQg7ZiE7IOBIO2VtOqysCwgaHR0cHM6Ly9kZXZzdHVkaW9vbmxpbmUuY29tL2FydGljbGUvc2VxdWVsaXplLXNldC10aW1lem9uZS1hbmQtZGF0ZXRpbWUtZm9ybWF0LWZvci1teXNxbFxyXG4qL1xyXG5jb25zdCBkaWFsZWN0T3B0aW9ucyA9IHtcclxuICBkZWNpbWFsTnVtYmVyczogdHJ1ZSxcclxuICBkYXRlU3RyaW5nczogdHJ1ZSxcclxuICB0eXBlQ2FzdDogdHJ1ZSxcclxufVxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbmV3U2VxdWVsaXplICh1cmwsIG9wdGlvbnM6IGFueSA9IHt9KSB7XHJcbiAgbG9nZ2VyLmluZm8oJ25ld1NlcXVlbGl6ZSB1cmw6JywgdXJsLCBvcHRpb25zKVxyXG5cclxuICAvLyB0aW1lem9uZSArOSDshKTsoJXtlbTspIDri6QuIEtTVCDsgqzsmqlcclxuICBvcHRpb25zLnRpbWV6b25lID0gJyswOTowMCcgLy8gRELsoIDsnqXsi5xcclxuXHJcbiAgLyoqXHJcbiAgICogZGVmYXVsdOuKlCBtYXggNeydtOuCmCwgcHJvZC7sl5DshJwg66y47KCcIOuwnOyDne2VoCDsiJgg7J6I7Jy866+A66GcIDUw7Jy866GcIOyEuO2MhVxyXG4gICAqIFJEUyDtjIzrnbzrr7jthLAg6re466O57JeQ7IScIG1heF9jb25uZWN0aW9ucyDtmLnsnYAgZGIg7KCR7IaN7ZW07IScIHNob3cgdmFyaWFibGVzIGxpa2UgJyVtYXhfY29ubmVjdGlvbnMlJ+uhnCDqsoDsg4ntlbTshJxcclxuICAgKiDqsIEg7ISc67KE7J2YIG1heOqwkuydmCDtlansnbQgbWF4X2Nvbm5lY3Rpb25z66W8IOuEmOyngCDslYrripQg7ISg7JeQ7IScIOunnuy2sOykmOyVvO2VqC4g64SY7Ja067KE66as66m0IOyEnOuyhOqwgCDsooXro4zrkKAg7IiYIOyeiOydjC5cclxuICAqL1xyXG4gIG9wdGlvbnMucG9vbCA9IHsgbWF4OiA1MCB9XHJcblxyXG4gIC8vIC5lbnYgREJfTE9HR0lOR19UWVBF7Jy866GcIOyLnO2AhOudvOydtOymiCDroZzqt7jsmLXshZgg7KGw7KCILiBkZWZhdWx064qUIGNvbnNvbGUubG9nIOyehC5cclxuICBjb21tb25FbnYuREJfTE9HR0lOR19UWVBFID09PSAnbG9nZ2VyJyAmJiAob3B0aW9ucy5sb2dnaW5nID0gbXNnID0+IGxvZ2dlci5kZWJ1Zyhtc2cpKVxyXG4gIGNvbW1vbkVudi5EQl9MT0dHSU5HX1RZUEUgPT09ICdubycgJiYgKG9wdGlvbnMubG9nZ2luZyA9IGZhbHNlKVxyXG5cclxuICByZXR1cm4gbmV3IFNlcXVlbGl6ZSh1cmwsIF8ubWVyZ2UoeyBkaWFsZWN0T3B0aW9ucyB9LCBvcHRpb25zKSlcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvYWRBbGxNb2RlbCAobW9kZWxQYXRoKSB7XHJcbiAgY29uc3QgbW9kZWxQYXRoTGlzdCA9IGdsb2Iuc3luYyhtb2RlbFBhdGgpXHJcbiAgZm9yIChjb25zdCBmaWxlIG9mIG1vZGVsUGF0aExpc3QpIHtcclxuICAgIGxvZ2dlci53YXJuKCdsb2FkQWxsTW9kZWwgOicsIGZpbGUpXHJcbiAgICBjb25zdCBkYk1vZGVsID0gYXdhaXQgaW1wb3J0KHBhdGgucmVzb2x2ZShmaWxlKSlcclxuXHJcbiAgICBpZiAodHlwZW9mIGRiTW9kZWwuZGVmYXVsdCA9PT0gJ2Z1bmN0aW9uJyAmJiAhZGJNb2RlbC5kZWZhdWx0LmZpbmRBbGwpIHtcclxuICAgICAgZGJNb2RlbC5kZWZhdWx0KClcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IERCcyA9IHt9XHJcblxyXG5leHBvcnQgY29uc3Qgc2V0REIgPSAoZGJOYW1lLCBkYikgPT4ge1xyXG4gIGxvZ2dlci53YXJuKCdzZXREQiA6JywgZGJOYW1lKVxyXG4gIERCc1tkYk5hbWVdID0gZGJcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGdldERCID0gKGRiTmFtZSkgPT4ge1xyXG4gIGNvbnN0IGRiID0gREJzW2RiTmFtZV1cclxuICBpZiAoIWRiKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbml0aWFsaXplZCBkYjonICsgZGJOYW1lKVxyXG4gIH1cclxuICByZXR1cm4gZGJcclxufVxyXG5cclxuLyoqXHJcbiAqIGRi66W8IHN5bmMg7ZWY64uk6rCAIGRi6rCAIOyXhuuLpOqzoCDtlaAg65WMLCBkYuulvCDsg53shLHtlZjqs6Agc3luY+2VtOyjvOuKlCDtlajsiJguXHJcbiAqIEBwYXJhbSB0b1N5bmNEYiBzeW5j7ZWgIGRi7J2YIHNlcXVlbGl6ZSBpbnN0YW5jZVxyXG4gKiBAcGFyYW0gREJfVVJMIGRhdGFiYXNl6rCAIOyXhuydhCDrlYwsIGRi66W8IOyDneyEse2VmOq4sCDsnITtlbQgZGIg7KCR7IaNIHVybOuPhCDrsJvsnYwuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZW5zdXJlRGJFeGlzdHNBbmRTeW5jID0gZW5zdXJlZFN5bmNcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNlcXVlbGl6ZVxyXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBd0Q7QUFBQTtBQUFBO0FBRXhELE1BQU1BLE1BQU0sR0FBRyxJQUFBQyxpQkFBUyxFQUFDLG9CQUFvQixDQUFDO0FBRTlDLE1BQU1DLFNBQVMsR0FBR0Msa0JBQUcsQ0FBQ0MsZUFBZSxDQUFDLGdC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