"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userProfile = userProfile;
var _user = _interopRequireDefault(require("@global-common/db/model/user"));
var _httpError = require("@global-common/error/http-error");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function userProfile(id) {
  const user = await (0, _user.default)().findOne({
    where: {
      id
    }
  });
  if (!user) throw new _httpError.NotFound(_httpError.NO_USER, '사용자가 없습니다');
  return user;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ1c2VyUHJvZmlsZSIsImlkIiwidXNlciIsIlVzZXIiLCJmaW5kT25lIiwid2hlcmUiLCJOb3RGb3VuZCIsIk5PX1VTRVIiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZGlhcnktc2VydmVyL2NvbnRyb2xsZXIvcHJvZmlsZS1jb250cm9sbGVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBVc2VyIGZyb20gJ0BnbG9iYWwtY29tbW9uL2RiL21vZGVsL3VzZXInXHJcbmltcG9ydCB7IE5PX1VTRVIsIE5vdEZvdW5kIH0gZnJvbSAnQGdsb2JhbC1jb21tb24vZXJyb3IvaHR0cC1lcnJvcidcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1c2VyUHJvZmlsZSAoaWQ6IG51bWJlcikge1xyXG4gIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyKCkuZmluZE9uZSh7IHdoZXJlOiB7IGlkIH0gfSlcclxuXHJcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgTm90Rm91bmQoTk9fVVNFUiwgJ+yCrOyaqeyekOqwgCDsl4bsirXri4jri6QnKVxyXG5cclxuICByZXR1cm4gdXNlclxyXG59XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUFtRTtBQUU1RCxlQUFlQSxXQUFXLENBQUVDLEVBQVUsRUFBRTtFQUM3QyxNQUFNQyxJQUFJLEdBQUcsTUFBTSxJQUFBQyxhQUFJLEdBQUUsQ0FBQ0MsT0FBTyxDQUFDO0lBQUVDLEtBQUssRUFBRTtNQUFFSjtJQUFHO0VBQUUsQ0FBQyxDQUFDO0VBRXBELElBQUksQ0FBQ0MsSUFBSSxFQUFFLE1BQU0sSUFBSUksbUJBQVEsQ0FBQ0Msa0JBQU8sRUFBRSxXQUFXLENBQUM7RUFFbkQsT0FBT0wsSUFBSTtBQUNiIn0=