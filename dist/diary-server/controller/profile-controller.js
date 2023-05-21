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
    avatar: user.avatar ?? `${req.protocol}://${req.get('host')}/uploads/images/${user.avatar}`
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJsb2dnZXIiLCJnZXRMb2dnZXIiLCJ1c2VyUHJvZmlsZSIsImlkIiwicmVxIiwidXNlciIsIlVzZXIiLCJmaW5kT25lIiwid2hlcmUiLCJhdHRyaWJ1dGVzIiwiZXhjbHVkZSIsInJhdyIsIk5vdEZvdW5kIiwiTk9fVVNFUiIsImF2YXRhciIsInByb3RvY29sIiwiZ2V0IiwidXBkYXRlUHJvZmlsZSIsImJvZHkiLCJ1cGRhdGUiLCJzYXZlVXNlckF2YXRhciIsImZpbGUiLCJmaWxlTmFtZSIsImZpbGVuYW1lIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RpYXJ5LXNlcnZlci9jb250cm9sbGVyL3Byb2ZpbGUtY29udHJvbGxlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVXNlciBmcm9tICdAZ2xvYmFsLWNvbW1vbi9kYi9tb2RlbC91c2VyJ1xyXG5pbXBvcnQgeyBOT19VU0VSLCBOb3RGb3VuZCB9IGZyb20gJ0BnbG9iYWwtY29tbW9uL2Vycm9yL2h0dHAtZXJyb3InXHJcbmltcG9ydCB7IGdldExvZ2dlciB9IGZyb20gJ0BnbG9iYWwtY29tbW9uL3V0aWxzL2xvZ2dlcidcclxuXHJcbmNvbnN0IGxvZ2dlciA9IGdldExvZ2dlcigncHJvZmlsZS1jb250cm9sbGVyLnRzJylcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1c2VyUHJvZmlsZSAoaWQ6IG51bWJlciwgcmVxKSB7XHJcbiAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIoKS5maW5kT25lKHsgd2hlcmU6IHsgaWQgfSwgYXR0cmlidXRlczogeyBleGNsdWRlOiBbJ3Bhc3N3b3JkJywgJ3JlZnJlc2hUb2tlbiddIH0sIHJhdzogdHJ1ZSB9KVxyXG5cclxuICBpZiAoIXVzZXIpIHRocm93IG5ldyBOb3RGb3VuZChOT19VU0VSLCAn7IKs7Jqp7J6Q6rCAIOyXhuyKteuLiOuLpCcpXHJcblxyXG4gIHJldHVybiB7IC4uLnVzZXIsIGF2YXRhcjogdXNlci5hdmF0YXIgPz8gYCR7cmVxLnByb3RvY29sfTovLyR7cmVxLmdldCgnaG9zdCcpfS91cGxvYWRzL2ltYWdlcy8ke3VzZXIuYXZhdGFyfWAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlUHJvZmlsZSAoYm9keSwgaWQ6IG51bWJlcikge1xyXG4gIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyKCkuZmluZE9uZSh7IHdoZXJlOiB7IGlkIH0gfSlcclxuXHJcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgTm90Rm91bmQoTk9fVVNFUiwgJ+yCrOyaqeyekOqwgCDsl4bsirXri4jri6QnKVxyXG5cclxuICBhd2FpdCB1c2VyLnVwZGF0ZSh7IC4uLmJvZHkgfSlcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNhdmVVc2VyQXZhdGFyIChpZDogbnVtYmVyLCBmaWxlKSB7XHJcbiAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIoKS5maW5kT25lKHsgd2hlcmU6IHsgaWQgfSB9KVxyXG5cclxuICBjb25zdCBmaWxlTmFtZSA9IGZpbGUuZmlsZW5hbWVcclxuXHJcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgTm90Rm91bmQoTk9fVVNFUiwgJ+yCrOyaqeyekOqwgCDsobTsnqztlZjsp4Ag7JWK7Iq164uI64ukJylcclxuXHJcbiAgYXdhaXQgdXNlci51cGRhdGUoeyBhdmF0YXI6IGZpbGVOYW1lIH0pXHJcbn1cclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUF1RDtBQUV2RCxNQUFNQSxNQUFNLEdBQUcsSUFBQUMsaUJBQVMsRUFBQyx1QkFBdUIsQ0FBQztBQUUxQyxlQUFlQyxXQUFXLENBQUVDLEVBQVUsRUFBRUMsR0FBRyxFQUFFO0VBQ2xELE1BQU1DLElBQUksR0FBRyxNQUFNLElBQUFDLGFBQUksR0FBRSxDQUFDQyxPQUFPLENBQUM7SUFBRUMsS0FBSyxFQUFFO01BQUVMO0lBQUcsQ0FBQztJQUFFTSxVQUFVLEVBQUU7TUFBRUMsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLGNBQWM7SUFBRSxDQUFDO0lBQUVDLEdBQUcsRUFBRTtFQUFLLENBQUMsQ0FBQztFQUV0SCxJQUFJLENBQUNOLElBQUksRUFBRSxNQUFNLElBQUlPLG1CQUFRLENBQUNDLGtCQUFPLEVBQUUsV0FBVyxDQUFDO0VBRW5ELE9BQU87SUFBRSxHQUFHUixJQUFJO0lBQUVTLE1BQU0sRUFBRVQsSUFBSSxDQUFDUyxNQUFNLElBQUssR0FBRVYsR0FBRyxDQUFDVyxRQUFTLE1BQUtYLEdBQUcsQ0FBQ1ksR0FBRyxDQUFDLE1BQU0sQ0FBRSxtQkFBa0JYLElBQUksQ0FBQ1MsTUFBTztFQUFFLENBQUM7QUFDakg7QUFFTyxlQUFlRyxhQUFhLENBQUVDLElBQUksRUFBRWYsRUFBVSxFQUFFO0VBQ3JELE1BQU1FLElBQUksR0FBRyxNQUFNLElBQUFDLGFBQUksR0FBRSxDQUFDQyxPQUFPLENBQUM7SUFBRUMsS0FBSyxFQUFFO01BQUVMO0lBQUc7RUFBRSxDQUFDLENBQUM7RUFFcEQsSUFBSSxDQUFDRSxJQUFJLEVBQUUsTUFBTSxJQUFJTyxtQkFBUSxDQUFDQyxrQkFBTyxFQUFFLFdBQVcsQ0FBQztFQUVuRCxNQUFNUixJQUFJLENBQUNjLE1BQU0sQ0FBQztJQUFFLEdBQUdEO0VBQUssQ0FBQyxDQUFDO0FBQ2hDO0FBRU8sZUFBZUUsY0FBYyxDQUFFakIsRUFBVSxFQUFFa0IsSUFBSSxFQUFFO0VBQ3RELE1BQU1oQixJQUFJLEdBQUcsTUFBTSxJQUFBQyxhQUFJLEdBQUUsQ0FBQ0MsT0FBTyxDQUFDO0lBQUVDLEtBQUssRUFBRTtNQUFFTDtJQUFHO0VBQUUsQ0FBQyxDQUFDO0VBRXBELE1BQU1tQixRQUFRLEdBQUdELElBQUksQ0FBQ0UsUUFBUTtFQUU5QixJQUFJLENBQUNsQixJQUFJLEVBQUUsTUFBTSxJQUFJTyxtQkFBUSxDQUFDQyxrQkFBTyxFQUFFLGdCQUFnQixDQUFDO0VBRXhELE1BQU1SLElBQUksQ0FBQ2MsTUFBTSxDQUFDO0lBQUVMLE1BQU0sRUFBRVE7RUFBUyxDQUFDLENBQUM7QUFDekMifQ==