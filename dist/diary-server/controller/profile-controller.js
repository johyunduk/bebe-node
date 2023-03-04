"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveUserAvatar = saveUserAvatar;
exports.updateProfile = updateProfile;
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
  if (!user) throw new _httpError.NotFound(_httpError.NO_USER, '사용자가 존재하지 않습니다');
  await user.update({
    avatar: file.key
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ1c2VyUHJvZmlsZSIsImlkIiwidXNlciIsIlVzZXIiLCJmaW5kT25lIiwid2hlcmUiLCJhdHRyaWJ1dGVzIiwiZXhjbHVkZSIsIk5vdEZvdW5kIiwiTk9fVVNFUiIsInVwZGF0ZVByb2ZpbGUiLCJib2R5IiwidXBkYXRlIiwic2F2ZVVzZXJBdmF0YXIiLCJmaWxlIiwiYXZhdGFyIiwia2V5Il0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RpYXJ5LXNlcnZlci9jb250cm9sbGVyL3Byb2ZpbGUtY29udHJvbGxlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVXNlciBmcm9tICdAZ2xvYmFsLWNvbW1vbi9kYi9tb2RlbC91c2VyJ1xyXG5pbXBvcnQgeyBOT19VU0VSLCBOb3RGb3VuZCB9IGZyb20gJ0BnbG9iYWwtY29tbW9uL2Vycm9yL2h0dHAtZXJyb3InXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXNlclByb2ZpbGUgKGlkOiBudW1iZXIpIHtcclxuICBjb25zdCB1c2VyID0gYXdhaXQgVXNlcigpLmZpbmRPbmUoeyB3aGVyZTogeyBpZCB9LCBhdHRyaWJ1dGVzOiB7IGV4Y2x1ZGU6IFsncGFzc3dvcmQnLCAncmVmcmVzaFRva2VuJ10gfSB9KVxyXG5cclxuICBpZiAoIXVzZXIpIHRocm93IG5ldyBOb3RGb3VuZChOT19VU0VSLCAn7IKs7Jqp7J6Q6rCAIOyXhuyKteuLiOuLpCcpXHJcblxyXG4gIHJldHVybiB1c2VyXHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVQcm9maWxlIChib2R5LCBpZDogbnVtYmVyKSB7XHJcbiAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIoKS5maW5kT25lKHsgd2hlcmU6IHsgaWQgfSB9KVxyXG5cclxuICBpZiAoIXVzZXIpIHRocm93IG5ldyBOb3RGb3VuZChOT19VU0VSLCAn7IKs7Jqp7J6Q6rCAIOyXhuyKteuLiOuLpCcpXHJcblxyXG4gIGF3YWl0IHVzZXIudXBkYXRlKHsgLi4uYm9keSB9KVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZVVzZXJBdmF0YXIgKGlkOiBudW1iZXIsIGZpbGU6IHtrZXk6IHN0cmluZ30pIHtcclxuICBjb25zdCB1c2VyID0gYXdhaXQgVXNlcigpLmZpbmRPbmUoeyB3aGVyZTogeyBpZCB9IH0pXHJcblxyXG4gIGlmICghdXNlcikgdGhyb3cgbmV3IE5vdEZvdW5kKE5PX1VTRVIsICfsgqzsmqnsnpDqsIAg7KG07J6s7ZWY7KeAIOyViuyKteuLiOuLpCcpXHJcblxyXG4gIGF3YWl0IHVzZXIudXBkYXRlKHsgYXZhdGFyOiBmaWxlLmtleSB9KVxyXG59XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBO0FBQW1FO0FBRTVELGVBQWVBLFdBQVcsQ0FBRUMsRUFBVSxFQUFFO0VBQzdDLE1BQU1DLElBQUksR0FBRyxNQUFNLElBQUFDLGFBQUksR0FBRSxDQUFDQyxPQUFPLENBQUM7SUFBRUMsS0FBSyxFQUFFO01BQUVKO0lBQUcsQ0FBQztJQUFFSyxVQUFVLEVBQUU7TUFBRUMsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLGNBQWM7SUFBRTtFQUFFLENBQUMsQ0FBQztFQUUzRyxJQUFJLENBQUNMLElBQUksRUFBRSxNQUFNLElBQUlNLG1CQUFRLENBQUNDLGtCQUFPLEVBQUUsV0FBVyxDQUFDO0VBRW5ELE9BQU9QLElBQUk7QUFDYjtBQUVPLGVBQWVRLGFBQWEsQ0FBRUMsSUFBSSxFQUFFVixFQUFVLEVBQUU7RUFDckQsTUFBTUMsSUFBSSxHQUFHLE1BQU0sSUFBQUMsYUFBSSxHQUFFLENBQUNDLE9BQU8sQ0FBQztJQUFFQyxLQUFLLEVBQUU7TUFBRUo7SUFBRztFQUFFLENBQUMsQ0FBQztFQUVwRCxJQUFJLENBQUNDLElBQUksRUFBRSxNQUFNLElBQUlNLG1CQUFRLENBQUNDLGtCQUFPLEVBQUUsV0FBVyxDQUFDO0VBRW5ELE1BQU1QLElBQUksQ0FBQ1UsTUFBTSxDQUFDO0lBQUUsR0FBR0Q7RUFBSyxDQUFDLENBQUM7QUFDaEM7QUFFTyxlQUFlRSxjQUFjLENBQUVaLEVBQVUsRUFBRWEsSUFBbUIsRUFBRTtFQUNyRSxNQUFNWixJQUFJLEdBQUcsTUFBTSxJQUFBQyxhQUFJLEdBQUUsQ0FBQ0MsT0FBTyxDQUFDO0lBQUVDLEtBQUssRUFBRTtNQUFFSjtJQUFHO0VBQUUsQ0FBQyxDQUFDO0VBRXBELElBQUksQ0FBQ0MsSUFBSSxFQUFFLE1BQU0sSUFBSU0sbUJBQVEsQ0FBQ0Msa0JBQU8sRUFBRSxnQkFBZ0IsQ0FBQztFQUV4RCxNQUFNUCxJQUFJLENBQUNVLE1BQU0sQ0FBQztJQUFFRyxNQUFNLEVBQUVELElBQUksQ0FBQ0U7RUFBSSxDQUFDLENBQUM7QUFDekMifQ==