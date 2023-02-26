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
      exclude: ['password', 'refreshToken']
    }
  });
  if (!user) throw new _httpError.NotFound(_httpError.NO_USER, '사용자가 없습니다');
  return user;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ1c2VyUHJvZmlsZSIsImlkIiwidXNlciIsIlVzZXIiLCJmaW5kT25lIiwid2hlcmUiLCJhdHRyaWJ1dGVzIiwiZXhjbHVkZSIsIk5vdEZvdW5kIiwiTk9fVVNFUiJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kaWFyeS1zZXJ2ZXIvY29udHJvbGxlci9wcm9maWxlLWNvbnRyb2xsZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFVzZXIgZnJvbSAnQGdsb2JhbC1jb21tb24vZGIvbW9kZWwvdXNlcidcclxuaW1wb3J0IHsgTk9fVVNFUiwgTm90Rm91bmQgfSBmcm9tICdAZ2xvYmFsLWNvbW1vbi9lcnJvci9odHRwLWVycm9yJ1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVzZXJQcm9maWxlIChpZDogbnVtYmVyKSB7XHJcbiAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIoKS5maW5kT25lKHsgd2hlcmU6IHsgaWQgfSwgYXR0cmlidXRlczogeyBleGNsdWRlOiBbJ3Bhc3N3b3JkJywgJ3JlZnJlc2hUb2tlbiddIH0gfSlcclxuXHJcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgTm90Rm91bmQoTk9fVVNFUiwgJ+yCrOyaqeyekOqwgCDsl4bsirXri4jri6QnKVxyXG5cclxuICByZXR1cm4gdXNlclxyXG59XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUFtRTtBQUU1RCxlQUFlQSxXQUFXLENBQUVDLEVBQVUsRUFBRTtFQUM3QyxNQUFNQyxJQUFJLEdBQUcsTUFBTSxJQUFBQyxhQUFJLEdBQUUsQ0FBQ0MsT0FBTyxDQUFDO0lBQUVDLEtBQUssRUFBRTtNQUFFSjtJQUFHLENBQUM7SUFBRUssVUFBVSxFQUFFO01BQUVDLE9BQU8sRUFBRSxDQUFDLFVBQVUsRUFBRSxjQUFjO0lBQUU7RUFBRSxDQUFDLENBQUM7RUFFM0csSUFBSSxDQUFDTCxJQUFJLEVBQUUsTUFBTSxJQUFJTSxtQkFBUSxDQUFDQyxrQkFBTyxFQUFFLFdBQVcsQ0FBQztFQUVuRCxPQUFPUCxJQUFJO0FBQ2IifQ==