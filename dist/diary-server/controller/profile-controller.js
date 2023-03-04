"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ1c2VyUHJvZmlsZSIsImlkIiwidXNlciIsIlVzZXIiLCJmaW5kT25lIiwid2hlcmUiLCJhdHRyaWJ1dGVzIiwiZXhjbHVkZSIsIk5vdEZvdW5kIiwiTk9fVVNFUiIsInVwZGF0ZVByb2ZpbGUiLCJib2R5IiwidXBkYXRlIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RpYXJ5LXNlcnZlci9jb250cm9sbGVyL3Byb2ZpbGUtY29udHJvbGxlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVXNlciBmcm9tICdAZ2xvYmFsLWNvbW1vbi9kYi9tb2RlbC91c2VyJ1xyXG5pbXBvcnQgeyBOT19VU0VSLCBOb3RGb3VuZCB9IGZyb20gJ0BnbG9iYWwtY29tbW9uL2Vycm9yL2h0dHAtZXJyb3InXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXNlclByb2ZpbGUgKGlkOiBudW1iZXIpIHtcclxuICBjb25zdCB1c2VyID0gYXdhaXQgVXNlcigpLmZpbmRPbmUoeyB3aGVyZTogeyBpZCB9LCBhdHRyaWJ1dGVzOiB7IGV4Y2x1ZGU6IFsncGFzc3dvcmQnLCAncmVmcmVzaFRva2VuJ10gfSB9KVxyXG5cclxuICBpZiAoIXVzZXIpIHRocm93IG5ldyBOb3RGb3VuZChOT19VU0VSLCAn7IKs7Jqp7J6Q6rCAIOyXhuyKteuLiOuLpCcpXHJcblxyXG4gIHJldHVybiB1c2VyXHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVQcm9maWxlIChib2R5LCBpZDogbnVtYmVyKSB7XHJcbiAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIoKS5maW5kT25lKHsgd2hlcmU6IHsgaWQgfSB9KVxyXG5cclxuICBpZiAoIXVzZXIpIHRocm93IG5ldyBOb3RGb3VuZChOT19VU0VSLCAn7IKs7Jqp7J6Q6rCAIOyXhuyKteuLiOuLpCcpXHJcblxyXG4gIGF3YWl0IHVzZXIudXBkYXRlKHsgLi4uYm9keSB9KVxyXG59XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ0E7QUFBbUU7QUFFNUQsZUFBZUEsV0FBVyxDQUFFQyxFQUFVLEVBQUU7RUFDN0MsTUFBTUMsSUFBSSxHQUFHLE1BQU0sSUFBQUMsYUFBSSxHQUFFLENBQUNDLE9BQU8sQ0FBQztJQUFFQyxLQUFLLEVBQUU7TUFBRUo7SUFBRyxDQUFDO0lBQUVLLFVBQVUsRUFBRTtNQUFFQyxPQUFPLEVBQUUsQ0FBQyxVQUFVLEVBQUUsY0FBYztJQUFFO0VBQUUsQ0FBQyxDQUFDO0VBRTNHLElBQUksQ0FBQ0wsSUFBSSxFQUFFLE1BQU0sSUFBSU0sbUJBQVEsQ0FBQ0Msa0JBQU8sRUFBRSxXQUFXLENBQUM7RUFFbkQsT0FBT1AsSUFBSTtBQUNiO0FBRU8sZUFBZVEsYUFBYSxDQUFFQyxJQUFJLEVBQUVWLEVBQVUsRUFBRTtFQUNyRCxNQUFNQyxJQUFJLEdBQUcsTUFBTSxJQUFBQyxhQUFJLEdBQUUsQ0FBQ0MsT0FBTyxDQUFDO0lBQUVDLEtBQUssRUFBRTtNQUFFSjtJQUFHO0VBQUUsQ0FBQyxDQUFDO0VBRXBELElBQUksQ0FBQ0MsSUFBSSxFQUFFLE1BQU0sSUFBSU0sbUJBQVEsQ0FBQ0Msa0JBQU8sRUFBRSxXQUFXLENBQUM7RUFFbkQsTUFBTVAsSUFBSSxDQUFDVSxNQUFNLENBQUM7SUFBRSxHQUFHRDtFQUFLLENBQUMsQ0FBQztBQUNoQyJ9