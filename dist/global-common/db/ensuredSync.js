"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ensuredSync;
var _sequelize = require("sequelize");
var _common = require("../constants/common");
var _logger = require("../utils/logger");
const logger = (0, _logger.getLogger)('ensuredSync.ts');

/**
 * db를 sync 하다가 db가 없다고 할 때, db를 생성하고 sync해주는 함수.
 * @param toSyncDb sync할 db의 sequelize instance
 * @param DB_URL database가 없을 때, db를 생성하기 위해 db 접속 url도 받음.
 */
async function ensuredSync(toSyncDb, DB_URL) {
  try {
    await toSyncDb.sync(_common.syncOptions);
  } catch (err) {
    logger.warn('ensuredSync err.message:', err.message);
    if (err.message.indexOf('Unknown database') >= 0) {
      let dbUrl = DB_URL.split('/');
      const dbName = dbUrl.pop();
      dbUrl = dbUrl.join('/');
      logger.warn(`ensuredSync Try to make database:${dbName} dbUrl:${dbUrl}`);
      const sequelize = new _sequelize.Sequelize(dbUrl);
      await sequelize.query(`CREATE DATABASE ${dbName};`);
      logger.info(`CREATE DATABASE ${dbName};`);
      await toSyncDb.sync(_common.syncOptions);
    } else {
      logger.warn('ensuredSync DB Sync Error!! message:', err.message);
      throw err;
    }
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJsb2dnZXIiLCJnZXRMb2dnZXIiLCJlbnN1cmVkU3luYyIsInRvU3luY0RiIiwiREJfVVJMIiwic3luYyIsInN5bmNPcHRpb25zIiwiZXJyIiwid2FybiIsIm1lc3NhZ2UiLCJpbmRleE9mIiwiZGJVcmwiLCJzcGxpdCIsImRiTmFtZSIsInBvcCIsImpvaW4iLCJzZXF1ZWxpemUiLCJTZXF1ZWxpemUiLCJxdWVyeSIsImluZm8iXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZ2xvYmFsLWNvbW1vbi9kYi9lbnN1cmVkU3luYy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZXF1ZWxpemUgfSBmcm9tICdzZXF1ZWxpemUnXHJcblxyXG5pbXBvcnQgeyBzeW5jT3B0aW9ucyB9IGZyb20gJy4uL2NvbnN0YW50cy9jb21tb24nXHJcbmltcG9ydCB7IGdldExvZ2dlciB9IGZyb20gJy4uL3V0aWxzL2xvZ2dlcidcclxuXHJcbmNvbnN0IGxvZ2dlciA9IGdldExvZ2dlcignZW5zdXJlZFN5bmMudHMnKVxyXG5cclxuLyoqXHJcbiAqIGRi66W8IHN5bmMg7ZWY64uk6rCAIGRi6rCAIOyXhuuLpOqzoCDtlaAg65WMLCBkYuulvCDsg53shLHtlZjqs6Agc3luY+2VtOyjvOuKlCDtlajsiJguXHJcbiAqIEBwYXJhbSB0b1N5bmNEYiBzeW5j7ZWgIGRi7J2YIHNlcXVlbGl6ZSBpbnN0YW5jZVxyXG4gKiBAcGFyYW0gREJfVVJMIGRhdGFiYXNl6rCAIOyXhuydhCDrlYwsIGRi66W8IOyDneyEse2VmOq4sCDsnITtlbQgZGIg7KCR7IaNIHVybOuPhCDrsJvsnYwuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBlbnN1cmVkU3luYyAodG9TeW5jRGIsIERCX1VSTCkge1xyXG4gIHRyeSB7XHJcbiAgICBhd2FpdCB0b1N5bmNEYi5zeW5jKHN5bmNPcHRpb25zKVxyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgbG9nZ2VyLndhcm4oJ2Vuc3VyZWRTeW5jIGVyci5tZXNzYWdlOicsIGVyci5tZXNzYWdlKVxyXG5cclxuICAgIGlmIChlcnIubWVzc2FnZS5pbmRleE9mKCdVbmtub3duIGRhdGFiYXNlJykgPj0gMCkge1xyXG4gICAgICBsZXQgZGJVcmwgPSBEQl9VUkwuc3BsaXQoJy8nKVxyXG4gICAgICBjb25zdCBkYk5hbWUgPSBkYlVybC5wb3AoKVxyXG4gICAgICBkYlVybCA9IGRiVXJsLmpvaW4oJy8nKVxyXG5cclxuICAgICAgbG9nZ2VyLndhcm4oYGVuc3VyZWRTeW5jIFRyeSB0byBtYWtlIGRhdGFiYXNlOiR7ZGJOYW1lfSBkYlVybDoke2RiVXJsfWApXHJcbiAgICAgIGNvbnN0IHNlcXVlbGl6ZSA9IG5ldyBTZXF1ZWxpemUoZGJVcmwpXHJcbiAgICAgIGF3YWl0IHNlcXVlbGl6ZS5xdWVyeShgQ1JFQVRFIERBVEFCQVNFICR7ZGJOYW1lfTtgKVxyXG4gICAgICBsb2dnZXIuaW5mbyhgQ1JFQVRFIERBVEFCQVNFICR7ZGJOYW1lfTtgKVxyXG4gICAgICBhd2FpdCB0b1N5bmNEYi5zeW5jKHN5bmNPcHRpb25zKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbG9nZ2VyLndhcm4oJ2Vuc3VyZWRTeW5jIERCIFN5bmMgRXJyb3IhISBtZXNzYWdlOicsIGVyci5tZXNzYWdlKVxyXG4gICAgICB0aHJvdyBlcnJcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUVBO0FBQ0E7QUFFQSxNQUFNQSxNQUFNLEdBQUcsSUFBQUMsaUJBQVMsRUFBQyxnQkFBZ0IsQ0FBQzs7QUFFMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlLGVBQWVDLFdBQVcsQ0FBRUMsUUFBUSxFQUFFQyxNQUFNLEVBQUU7RUFDM0QsSUFBSTtJQUNGLE1BQU1ELFFBQVEsQ0FBQ0UsSUFBSSxDQUFDQyxtQkFBVyxDQUFDO0VBQ2xDLENBQUMsQ0FBQyxPQUFPQyxHQUFHLEVBQUU7SUFDWlAsTUFBTSxDQUFDUSxJQUFJLENBQUMsMEJBQTBCLEVBQUVELEdBQUcsQ0FBQ0UsT0FBTyxDQUFDO0lBRXBELElBQUlGLEdBQUcsQ0FBQ0UsT0FBTyxDQUFDQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUU7TUFDaEQsSUFBSUMsS0FBSyxHQUFHUCxNQUFNLENBQUNRLEtBQUssQ0FBQyxHQUFHLENBQUM7TUFDN0IsTUFBTUMsTUFBTSxHQUFHRixLQUFLLENBQUNHLEdBQUcsRUFBRTtNQUMxQkgsS0FBSyxHQUFHQSxLQUFLLENBQUNJLElBQUksQ0FBQyxHQUFHLENBQUM7TUFFdkJmLE1BQU0sQ0FBQ1EsSUFBSSxDQUFFLG9DQUFtQ0ssTUFBTyxVQUFTRixLQUFNLEVBQUMsQ0FBQztNQUN4RSxNQUFNSyxTQUFTLEdBQUcsSUFBSUMsb0JBQVMsQ0FBQ04sS0FBSyxDQUFDO01BQ3RDLE1BQU1LLFNBQVMsQ0FBQ0UsS0FBSyxDQUFFLG1CQUFrQkwsTUFBTyxHQUFFLENBQUM7TUFDbkRiLE1BQU0sQ0FBQ21CLElBQUksQ0FBRSxtQkFBa0JOLE1BQU8sR0FBRSxDQUFDO01BQ3pDLE1BQU1WLFFBQVEsQ0FBQ0UsSUFBSSxDQUFDQyxtQkFBVyxDQUFDO0lBQ2xDLENBQUMsTUFBTTtNQUNMTixNQUFNLENBQUNRLElBQUksQ0FBQyxzQ0FBc0MsRUFBRUQsR0FBRyxDQUFDRSxPQUFPLENBQUM7TUFDaEUsTUFBTUYsR0FBRztJQUNYO0VBQ0Y7QUFDRiJ9