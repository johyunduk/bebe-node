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
    },
    attributes: {
      exclude: ['password']
    }
  });
  if (!user) throw new _httpError.NotFound(_httpError.NO_USER, '사용자가 없습니다');
  return user;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ1c2VyUHJvZmlsZSIsImlkIiwidXNlciIsIlVzZXIiLCJmaW5kT25lIiwid2hlcmUiLCJhdHRyaWJ1dGVzIiwiZXhjbHVkZSIsIk5vdEZvdW5kIiwiTk9fVVNFUiJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kaWFyeS1zZXJ2ZXIvY29udHJvbGxlci9wcm9maWxlLWNvbnRyb2xsZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFVzZXIgZnJvbSAnQGdsb2JhbC1jb21tb24vZGIvbW9kZWwvdXNlcidcclxuaW1wb3J0IHsgTk9fVVNFUiwgTm90Rm91bmQgfSBmcm9tICdAZ2xvYmFsLWNvbW1vbi9lcnJvci9odHRwLWVycm9yJ1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVzZXJQcm9maWxlIChpZDogbnVtYmVyKSB7XHJcbiAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIoKS5maW5kT25lKHsgd2hlcmU6IHsgaWQgfSwgYXR0cmlidXRlczogeyBleGNsdWRlOiBbJ3Bhc3N3b3JkJ10gfSB9KVxyXG5cclxuICBpZiAoIXVzZXIpIHRocm93IG5ldyBOb3RGb3VuZChOT19VU0VSLCAn7IKs7Jqp7J6Q6rCAIOyXhuyKteuLiOuLpCcpXHJcblxyXG4gIHJldHVybiB1c2VyXHJcbn1cclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBO0FBQW1FO0FBRTVELGVBQWVBLFdBQVcsQ0FBRUMsRUFBVSxFQUFFO0VBQzdDLE1BQU1DLElBQUksR0FBRyxNQUFNLElBQUFDLGFBQUksR0FBRSxDQUFDQyxPQUFPLENBQUM7SUFBRUMsS0FBSyxFQUFFO01BQUVKO0lBQUcsQ0FBQztJQUFFSyxVQUFVLEVBQUU7TUFBRUMsT0FBTyxFQUFFLENBQUMsVUFBVTtJQUFFO0VBQUUsQ0FBQyxDQUFDO0VBRTNGLElBQUksQ0FBQ0wsSUFBSSxFQUFFLE1BQU0sSUFBSU0sbUJBQVEsQ0FBQ0Msa0JBQU8sRUFBRSxXQUFXLENBQUM7RUFFbkQsT0FBT1AsSUFBSTtBQUNiIn0=