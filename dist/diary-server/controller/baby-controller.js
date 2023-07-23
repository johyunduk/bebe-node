"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadBabyList = loadBabyList;
exports.modifyBaby = modifyBaby;
exports.removeBaby = removeBaby;
exports.saveBaby = saveBaby;
exports.saveBabyFace = saveBabyFace;
var _userBaby = _interopRequireDefault(require("@global-common/db/model/user-baby"));
var _httpError = require("@global-common/error/http-error");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function loadBabyList(userId) {
  const list = await (0, _userBaby.default)().findAll({
    where: {
      userId
    },
    order: [['id', 'DESC']],
    raw: true
  });
  return list.map(baby => {
    return {
      ...baby,
      face: baby.face ? `https://api.mybebe.net/uploads/images/${baby.face}` : null
    };
  });
}
async function saveBaby(params, userId) {
  await (0, _userBaby.default)().create({
    ...params,
    userId
  });
}
async function modifyBaby(params, id) {
  const baby = await (0, _userBaby.default)().findOne({
    where: {
      id
    }
  });
  if (!baby) throw new _httpError.BadRequest(_httpError.NO_DATA, '해당 아이가 없습니다.');
  await baby.update(params);
}
async function removeBaby(id) {
  await (0, _userBaby.default)().destroy({
    where: {
      id
    }
  });
}
async function saveBabyFace(userId, babyId, file) {
  const baby = await (0, _userBaby.default)().findOne({
    where: {
      id: babyId
    }
  });
  if (!baby) throw new _httpError.BadRequest(_httpError.NO_DATA, '해당 아이가 없습니다.');
  const fileName = file.filename;
  await baby.update({
    face: fileName
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJsb2FkQmFieUxpc3QiLCJ1c2VySWQiLCJsaXN0IiwiVXNlckJhYnkiLCJmaW5kQWxsIiwid2hlcmUiLCJvcmRlciIsInJhdyIsIm1hcCIsImJhYnkiLCJmYWNlIiwic2F2ZUJhYnkiLCJwYXJhbXMiLCJjcmVhdGUiLCJtb2RpZnlCYWJ5IiwiaWQiLCJmaW5kT25lIiwiQmFkUmVxdWVzdCIsIk5PX0RBVEEiLCJ1cGRhdGUiLCJyZW1vdmVCYWJ5IiwiZGVzdHJveSIsInNhdmVCYWJ5RmFjZSIsImJhYnlJZCIsImZpbGUiLCJmaWxlTmFtZSIsImZpbGVuYW1lIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RpYXJ5LXNlcnZlci9jb250cm9sbGVyL2JhYnktY29udHJvbGxlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVXNlckJhYnkgZnJvbSAnQGdsb2JhbC1jb21tb24vZGIvbW9kZWwvdXNlci1iYWJ5J1xyXG5pbXBvcnQgeyBCYWRSZXF1ZXN0LCBOT19EQVRBIH0gZnJvbSAnQGdsb2JhbC1jb21tb24vZXJyb3IvaHR0cC1lcnJvcidcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkQmFieUxpc3QgKHVzZXJJZDogbnVtYmVyKSB7XHJcbiAgY29uc3QgbGlzdCA9IGF3YWl0IFVzZXJCYWJ5KCkuZmluZEFsbCh7XHJcbiAgICB3aGVyZToge1xyXG4gICAgICB1c2VySWQsXHJcbiAgICB9LFxyXG4gICAgb3JkZXI6IFtbJ2lkJywgJ0RFU0MnXV0sXHJcbiAgICByYXc6IHRydWUsXHJcbiAgfSlcclxuXHJcbiAgcmV0dXJuIGxpc3QubWFwKGJhYnkgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgLi4uYmFieSxcclxuICAgICAgZmFjZTogYmFieS5mYWNlID8gYGh0dHBzOi8vYXBpLm15YmViZS5uZXQvdXBsb2Fkcy9pbWFnZXMvJHtiYWJ5LmZhY2V9YCA6IG51bGwsXHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNhdmVCYWJ5IChwYXJhbXMsIHVzZXJJZCkge1xyXG4gIGF3YWl0IFVzZXJCYWJ5KCkuY3JlYXRlKHtcclxuICAgIC4uLnBhcmFtcyxcclxuICAgIHVzZXJJZCxcclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbW9kaWZ5QmFieSAocGFyYW1zLCBpZCkge1xyXG4gIGNvbnN0IGJhYnkgPSBhd2FpdCBVc2VyQmFieSgpLmZpbmRPbmUoeyB3aGVyZTogeyBpZCB9IH0pXHJcblxyXG4gIGlmICghYmFieSkgdGhyb3cgbmV3IEJhZFJlcXVlc3QoTk9fREFUQSwgJ+2VtOuLuSDslYTsnbTqsIAg7JeG7Iq164uI64ukLicpXHJcblxyXG4gIGF3YWl0IGJhYnkudXBkYXRlKHBhcmFtcylcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlbW92ZUJhYnkgKGlkKSB7XHJcbiAgYXdhaXQgVXNlckJhYnkoKS5kZXN0cm95KHtcclxuICAgIHdoZXJlOiB7XHJcbiAgICAgIGlkLFxyXG4gICAgfSxcclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZUJhYnlGYWNlICh1c2VySWQsIGJhYnlJZCwgZmlsZSkge1xyXG4gIGNvbnN0IGJhYnkgPSBhd2FpdCBVc2VyQmFieSgpLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogYmFieUlkIH0gfSlcclxuXHJcbiAgaWYgKCFiYWJ5KSB0aHJvdyBuZXcgQmFkUmVxdWVzdChOT19EQVRBLCAn7ZW064u5IOyVhOydtOqwgCDsl4bsirXri4jri6QuJylcclxuXHJcbiAgY29uc3QgZmlsZU5hbWUgPSBmaWxlLmZpbGVuYW1lXHJcblxyXG4gIGF3YWl0IGJhYnkudXBkYXRlKHsgZmFjZTogZmlsZU5hbWUgfSlcclxufVxyXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQXFFO0FBRTlELGVBQWVBLFlBQVksQ0FBRUMsTUFBYyxFQUFFO0VBQ2xELE1BQU1DLElBQUksR0FBRyxNQUFNLElBQUFDLGlCQUFRLEdBQUUsQ0FBQ0MsT0FBTyxDQUFDO0lBQ3BDQyxLQUFLLEVBQUU7TUFDTEo7SUFDRixDQUFDO0lBQ0RLLEtBQUssRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZCQyxHQUFHLEVBQUU7RUFDUCxDQUFDLENBQUM7RUFFRixPQUFPTCxJQUFJLENBQUNNLEdBQUcsQ0FBQ0MsSUFBSSxJQUFJO0lBQ3RCLE9BQU87TUFDTCxHQUFHQSxJQUFJO01BQ1BDLElBQUksRUFBRUQsSUFBSSxDQUFDQyxJQUFJLEdBQUkseUNBQXdDRCxJQUFJLENBQUNDLElBQUssRUFBQyxHQUFHO0lBQzNFLENBQUM7RUFDSCxDQUFDLENBQUM7QUFDSjtBQUVPLGVBQWVDLFFBQVEsQ0FBRUMsTUFBTSxFQUFFWCxNQUFNLEVBQUU7RUFDOUMsTUFBTSxJQUFBRSxpQkFBUSxHQUFFLENBQUNVLE1BQU0sQ0FBQztJQUN0QixHQUFHRCxNQUFNO0lBQ1RYO0VBQ0YsQ0FBQyxDQUFDO0FBQ0o7QUFFTyxlQUFlYSxVQUFVLENBQUVGLE1BQU0sRUFBRUcsRUFBRSxFQUFFO0VBQzVDLE1BQU1OLElBQUksR0FBRyxNQUFNLElBQUFOLGlCQUFRLEdBQUUsQ0FBQ2EsT0FBTyxDQUFDO0lBQUVYLEtBQUssRUFBRTtNQUFFVTtJQUFHO0VBQUUsQ0FBQyxDQUFDO0VBRXhELElBQUksQ0FBQ04sSUFBSSxFQUFFLE1BQU0sSUFBSVEscUJBQVUsQ0FBQ0Msa0JBQU8sRUFBRSxjQUFjLENBQUM7RUFFeEQsTUFBTVQsSUFBSSxDQUFDVSxNQUFNLENBQUNQLE1BQU0sQ0FBQztBQUMzQjtBQUVPLGVBQWVRLFVBQVUsQ0FBRUwsRUFBRSxFQUFFO0VBQ3BDLE1BQU0sSUFBQVosaUJBQVEsR0FBRSxDQUFDa0IsT0FBTyxDQUFDO0lBQ3ZCaEIsS0FBSyxFQUFFO01BQ0xVO0lBQ0Y7RUFDRixDQUFDLENBQUM7QUFDSjtBQUVPLGVBQWVPLFlBQVksQ0FBRXJCLE1BQU0sRUFBRXNCLE1BQU0sRUFBRUMsSUFBSSxFQUFFO0VBQ3hELE1BQU1mLElBQUksR0FBRyxNQUFNLElBQUFOLGlCQUFRLEdBQUUsQ0FBQ2EsT0FBTyxDQUFDO0lBQUVYLEtBQUssRUFBRTtNQUFFVSxFQUFFLEVBQUVRO0lBQU87RUFBRSxDQUFDLENBQUM7RUFFaEUsSUFBSSxDQUFDZCxJQUFJLEVBQUUsTUFBTSxJQUFJUSxxQkFBVSxDQUFDQyxrQkFBTyxFQUFFLGNBQWMsQ0FBQztFQUV4RCxNQUFNTyxRQUFRLEdBQUdELElBQUksQ0FBQ0UsUUFBUTtFQUU5QixNQUFNakIsSUFBSSxDQUFDVSxNQUFNLENBQUM7SUFBRVQsSUFBSSxFQUFFZTtFQUFTLENBQUMsQ0FBQztBQUN2QyJ9