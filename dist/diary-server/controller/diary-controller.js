"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadDiaryDetail = loadDiaryDetail;
exports.loadDiaryList = loadDiaryList;
exports.saveDiary = saveDiary;
var _diary = _interopRequireDefault(require("@global-common/db/model/diary"));
var _httpError = require("@global-common/error/http-error");
var _user = _interopRequireDefault(require("@global-common/db/model/user"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function loadDiaryList(userId) {
  return await (0, _diary.default)().findAll({
    where: {
      userId
    }
  });
}
async function loadDiaryDetail(id, userId) {
  const diary = await (0, _diary.default)().findOne({
    where: {
      id,
      userId
    }
  });
  if (!diary) throw new _httpError.NotFound('NO_DIARY', '존재하지 않는 일기입니다.');
  return diary;
}
async function saveDiary(body, userId) {
  const user = (0, _user.default)().findOne({
    where: {
      id: userId
    }
  });
  if (!user) throw new _httpError.NotFound(_httpError.NO_USER, '사용자가 없습니다.');
  await (0, _diary.default)().create({
    ...body,
    userId
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJsb2FkRGlhcnlMaXN0IiwidXNlcklkIiwiRGlhcnkiLCJmaW5kQWxsIiwid2hlcmUiLCJsb2FkRGlhcnlEZXRhaWwiLCJpZCIsImRpYXJ5IiwiZmluZE9uZSIsIk5vdEZvdW5kIiwic2F2ZURpYXJ5IiwiYm9keSIsInVzZXIiLCJVc2VyIiwiTk9fVVNFUiIsImNyZWF0ZSJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kaWFyeS1zZXJ2ZXIvY29udHJvbGxlci9kaWFyeS1jb250cm9sbGVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEaWFyeSBmcm9tICdAZ2xvYmFsLWNvbW1vbi9kYi9tb2RlbC9kaWFyeSdcclxuaW1wb3J0IHsgTk9fVVNFUiwgTm90Rm91bmQgfSBmcm9tICdAZ2xvYmFsLWNvbW1vbi9lcnJvci9odHRwLWVycm9yJ1xyXG5pbXBvcnQgVXNlciBmcm9tICdAZ2xvYmFsLWNvbW1vbi9kYi9tb2RlbC91c2VyJ1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvYWREaWFyeUxpc3QgKHVzZXJJZDogbnVtYmVyKSB7XHJcbiAgcmV0dXJuIGF3YWl0IERpYXJ5KCkuZmluZEFsbCh7IHdoZXJlOiB7IHVzZXJJZCB9IH0pXHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkRGlhcnlEZXRhaWwgKGlkOm51bWJlciwgdXNlcklkKSB7XHJcbiAgY29uc3QgZGlhcnkgPSBhd2FpdCBEaWFyeSgpLmZpbmRPbmUoeyB3aGVyZTogeyBpZCwgdXNlcklkIH0gfSlcclxuXHJcbiAgaWYgKCFkaWFyeSkgdGhyb3cgbmV3IE5vdEZvdW5kKCdOT19ESUFSWScsICfsobTsnqztlZjsp4Ag7JWK64qUIOydvOq4sOyeheuLiOuLpC4nKVxyXG5cclxuICByZXR1cm4gZGlhcnlcclxufVxyXG5cclxuaW50ZXJmYWNlIERpYXJ5SW5wdXRzIHtcclxuICB0aXRsZTogc3RyaW5nXHJcbiAgY29udGVudDogc3RyaW5nXHJcbiAgd2VpZ2h0OiBudW1iZXJcclxuICBoZWlnaHQ6IG51bWJlclxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZURpYXJ5IChib2R5OiBEaWFyeUlucHV0cywgdXNlcklkOiBudW1iZXIpIHtcclxuICBjb25zdCB1c2VyID0gVXNlcigpLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogdXNlcklkIH0gfSlcclxuXHJcbiAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgTm90Rm91bmQoTk9fVVNFUiwgJ+yCrOyaqeyekOqwgCDsl4bsirXri4jri6QuJylcclxuXHJcbiAgYXdhaXQgRGlhcnkoKS5jcmVhdGUoeyAuLi5ib2R5LCB1c2VySWQgfSlcclxufVxyXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQStDO0FBRXhDLGVBQWVBLGFBQWEsQ0FBRUMsTUFBYyxFQUFFO0VBQ25ELE9BQU8sTUFBTSxJQUFBQyxjQUFLLEdBQUUsQ0FBQ0MsT0FBTyxDQUFDO0lBQUVDLEtBQUssRUFBRTtNQUFFSDtJQUFPO0VBQUUsQ0FBQyxDQUFDO0FBQ3JEO0FBRU8sZUFBZUksZUFBZSxDQUFFQyxFQUFTLEVBQUVMLE1BQU0sRUFBRTtFQUN4RCxNQUFNTSxLQUFLLEdBQUcsTUFBTSxJQUFBTCxjQUFLLEdBQUUsQ0FBQ00sT0FBTyxDQUFDO0lBQUVKLEtBQUssRUFBRTtNQUFFRSxFQUFFO01BQUVMO0lBQU87RUFBRSxDQUFDLENBQUM7RUFFOUQsSUFBSSxDQUFDTSxLQUFLLEVBQUUsTUFBTSxJQUFJRSxtQkFBUSxDQUFDLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQztFQUU1RCxPQUFPRixLQUFLO0FBQ2Q7QUFTTyxlQUFlRyxTQUFTLENBQUVDLElBQWlCLEVBQUVWLE1BQWMsRUFBRTtFQUNsRSxNQUFNVyxJQUFJLEdBQUcsSUFBQUMsYUFBSSxHQUFFLENBQUNMLE9BQU8sQ0FBQztJQUFFSixLQUFLLEVBQUU7TUFBRUUsRUFBRSxFQUFFTDtJQUFPO0VBQUUsQ0FBQyxDQUFDO0VBRXRELElBQUksQ0FBQ1csSUFBSSxFQUFFLE1BQU0sSUFBSUgsbUJBQVEsQ0FBQ0ssa0JBQU8sRUFBRSxZQUFZLENBQUM7RUFFcEQsTUFBTSxJQUFBWixjQUFLLEdBQUUsQ0FBQ2EsTUFBTSxDQUFDO0lBQUUsR0FBR0osSUFBSTtJQUFFVjtFQUFPLENBQUMsQ0FBQztBQUMzQyJ9