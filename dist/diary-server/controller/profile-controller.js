"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveUserAvatar = saveUserAvatar;
exports.updateProfile = updateProfile;
exports.userProfile = userProfile;
var _user = _interopRequireDefault(require("@global-common/db/model/user"));
var _httpError = require("@global-common/error/http-error");
var _logger = require("@global-common/utils/logger");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const logger = (0, _logger.getLogger)('profile-controller.ts');
async function userProfile(id, req) {
  const user = await (0, _user.default)().findOne({
    where: {
      id
    },
    attributes: {
      exclude: ['password', 'refreshToken']
    },
    raw: true
  });
  if (!user) throw new _httpError.NotFound(_httpError.NO_USER, '사용자가 없습니다');
  return {
    ...user,
    avatar: user.avatar ? `https://api.mybebe.net/uploads/images/${user.avatar}` : null
  };
}
async function updateProfile(body, id) {
  const user = await (0, _user.default)().findOne({
    where: {
      id
    }
  });
  if (!user) throw new _httpError.NotFound(_httpError.NO_USER, '사용자가 없습니다');
  await user.update({
    ...body
  });
}
async function saveUserAvatar(id, file) {
  const user = await (0, _user.default)().findOne({
    where: {
      id
    }
  });
  const fileName = file.filename;
  if (!user) throw new _httpError.NotFound(_httpError.NO_USER, '사용자가 존재하지 않습니다');
  await user.update({
    avatar: fileName
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJsb2dnZXIiLCJnZXRMb2dnZXIiLCJ1c2VyUHJvZmlsZSIsImlkIiwicmVxIiwidXNlciIsIlVzZXIiLCJmaW5kT25lIiwid2hlcmUiLCJhdHRyaWJ1dGVzIiwiZXhjbHVkZSIsInJhdyIsIk5vdEZvdW5kIiwiTk9fVVNFUiIsImF2YXRhciIsInVwZGF0ZVByb2ZpbGUiLCJib2R5IiwidXBkYXRlIiwic2F2ZVVzZXJBdmF0YXIiLCJmaWxlIiwiZmlsZU5hbWUiLCJmaWxlbmFtZSJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kaWFyeS1zZXJ2ZXIvY29udHJvbGxlci9wcm9maWxlLWNvbnRyb2xsZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFVzZXIgZnJvbSAnQGdsb2JhbC1jb21tb24vZGIvbW9kZWwvdXNlcidcclxuaW1wb3J0IHsgTk9fVVNFUiwgTm90Rm91bmQgfSBmcm9tICdAZ2xvYmFsLWNvbW1vbi9lcnJvci9odHRwLWVycm9yJ1xyXG5pbXBvcnQgeyBnZXRMb2dnZXIgfSBmcm9tICdAZ2xvYmFsLWNvbW1vbi91dGlscy9sb2dnZXInXHJcblxyXG5jb25zdCBsb2dnZXIgPSBnZXRMb2dnZXIoJ3Byb2ZpbGUtY29udHJvbGxlci50cycpXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXNlclByb2ZpbGUgKGlkOiBudW1iZXIsIHJlcSkge1xyXG4gIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyKCkuZmluZE9uZSh7IHdoZXJlOiB7IGlkIH0sIGF0dHJpYnV0ZXM6IHsgZXhjbHVkZTogWydwYXNzd29yZCcsICdyZWZyZXNoVG9rZW4nXSB9LCByYXc6IHRydWUgfSlcclxuXHJcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgTm90Rm91bmQoTk9fVVNFUiwgJ+yCrOyaqeyekOqwgCDsl4bsirXri4jri6QnKVxyXG5cclxuICByZXR1cm4geyAuLi51c2VyLCBhdmF0YXI6IHVzZXIuYXZhdGFyID8gYGh0dHBzOi8vYXBpLm15YmViZS5uZXQvdXBsb2Fkcy9pbWFnZXMvJHt1c2VyLmF2YXRhcn1gIDogbnVsbCB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVQcm9maWxlIChib2R5LCBpZDogbnVtYmVyKSB7XHJcbiAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIoKS5maW5kT25lKHsgd2hlcmU6IHsgaWQgfSB9KVxyXG5cclxuICBpZiAoIXVzZXIpIHRocm93IG5ldyBOb3RGb3VuZChOT19VU0VSLCAn7IKs7Jqp7J6Q6rCAIOyXhuyKteuLiOuLpCcpXHJcblxyXG4gIGF3YWl0IHVzZXIudXBkYXRlKHsgLi4uYm9keSB9KVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZVVzZXJBdmF0YXIgKGlkOiBudW1iZXIsIGZpbGUpIHtcclxuICBjb25zdCB1c2VyID0gYXdhaXQgVXNlcigpLmZpbmRPbmUoeyB3aGVyZTogeyBpZCB9IH0pXHJcblxyXG4gIGNvbnN0IGZpbGVOYW1lID0gZmlsZS5maWxlbmFtZVxyXG5cclxuICBpZiAoIXVzZXIpIHRocm93IG5ldyBOb3RGb3VuZChOT19VU0VSLCAn7IKs7Jqp7J6Q6rCAIOyhtOyerO2VmOyngCDslYrsirXri4jri6QnKVxyXG5cclxuICBhd2FpdCB1c2VyLnVwZGF0ZSh7IGF2YXRhcjogZmlsZU5hbWUgfSlcclxufVxyXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQXVEO0FBRXZELE1BQU1BLE1BQU0sR0FBRyxJQUFBQyxpQkFBUyxFQUFDLHVCQUF1QixDQUFDO0FBRTFDLGVBQWVDLFdBQVcsQ0FBRUMsRUFBVSxFQUFFQyxHQUFHLEVBQUU7RUFDbEQsTUFBTUMsSUFBSSxHQUFHLE1BQU0sSUFBQUMsYUFBSSxHQUFFLENBQUNDLE9BQU8sQ0FBQztJQUFFQyxLQUFLLEVBQUU7TUFBRUw7SUFBRyxDQUFDO0lBQUVNLFVBQVUsRUFBRTtNQUFFQyxPQUFPLEVBQUUsQ0FBQyxVQUFVLEVBQUUsY0FBYztJQUFFLENBQUM7SUFBRUMsR0FBRyxFQUFFO0VBQUssQ0FBQyxDQUFDO0VBRXRILElBQUksQ0FBQ04sSUFBSSxFQUFFLE1BQU0sSUFBSU8sbUJBQVEsQ0FBQ0Msa0JBQU8sRUFBRSxXQUFXLENBQUM7RUFFbkQsT0FBTztJQUFFLEdBQUdSLElBQUk7SUFBRVMsTUFBTSxFQUFFVCxJQUFJLENBQUNTLE1BQU0sR0FBSSx5Q0FBd0NULElBQUksQ0FBQ1MsTUFBTyxFQUFDLEdBQUc7RUFBSyxDQUFDO0FBQ3pHO0FBRU8sZUFBZUMsYUFBYSxDQUFFQyxJQUFJLEVBQUViLEVBQVUsRUFBRTtFQUNyRCxNQUFNRSxJQUFJLEdBQUcsTUFBTSxJQUFBQyxhQUFJLEdBQUUsQ0FBQ0MsT0FBTyxDQUFDO0lBQUVDLEtBQUssRUFBRTtNQUFFTDtJQUFHO0VBQUUsQ0FBQyxDQUFDO0VBRXBELElBQUksQ0FBQ0UsSUFBSSxFQUFFLE1BQU0sSUFBSU8sbUJBQVEsQ0FBQ0Msa0JBQU8sRUFBRSxXQUFXLENBQUM7RUFFbkQsTUFBTVIsSUFBSSxDQUFDWSxNQUFNLENBQUM7SUFBRSxHQUFHRDtFQUFLLENBQUMsQ0FBQztBQUNoQztBQUVPLGVBQWVFLGNBQWMsQ0FBRWYsRUFBVSxFQUFFZ0IsSUFBSSxFQUFFO0VBQ3RELE1BQU1kLElBQUksR0FBRyxNQUFNLElBQUFDLGFBQUksR0FBRSxDQUFDQyxPQUFPLENBQUM7SUFBRUMsS0FBSyxFQUFFO01BQUVMO0lBQUc7RUFBRSxDQUFDLENBQUM7RUFFcEQsTUFBTWlCLFFBQVEsR0FBR0QsSUFBSSxDQUFDRSxRQUFRO0VBRTlCLElBQUksQ0FBQ2hCLElBQUksRUFBRSxNQUFNLElBQUlPLG1CQUFRLENBQUNDLGtCQUFPLEVBQUUsZ0JBQWdCLENBQUM7RUFFeEQsTUFBTVIsSUFBSSxDQUFDWSxNQUFNLENBQUM7SUFBRUgsTUFBTSxFQUFFTTtFQUFTLENBQUMsQ0FBQztBQUN6QyJ9