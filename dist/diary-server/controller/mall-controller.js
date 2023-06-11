"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchCategoryList = fetchCategoryList;
exports.fetchItemDetail = fetchItemDetail;
exports.fetchItemList = fetchItemList;
exports.saveCategory = saveCategory;
exports.saveItem = saveItem;
var _mallItem = _interopRequireDefault(require("@global-common/db/model/mall-item"));
var _category = _interopRequireDefault(require("@global-common/db/model/category"));
var _httpError = require("@global-common/error/http-error");
var _itemCategory = _interopRequireDefault(require("@global-common/db/model/item-category"));
var _logger = require("@global-common/utils/logger");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const logger = (0, _logger.getLogger)('mall-controller.ts');
async function saveCategory(name) {
  const category = await (0, _category.default)().findOne({
    where: {
      name
    }
  });
  if (category) throw new _httpError.BadRequest(_httpError.ALREADY_EXISTS, '이미 존재하는 카테고리입니다.');
  await (0, _category.default)().create({
    name
  });
}
async function saveItem(param, file) {
  const {
    categoryId,
    name,
    price,
    description
  } = param;
  const category = await (0, _category.default)().findOne({
    where: {
      id: categoryId
    }
  });
  if (!category) throw new _httpError.BadRequest(_httpError.NO_DATA, '존재하지 않는 카테고리입니다.');
  const item = await (0, _mallItem.default)().create({
    name,
    price,
    description
  });
  const itemId = item.id;
  logger.info(`itemId: ${itemId}`);
  const itemCategory = await (0, _itemCategory.default)().findOne({
    where: {
      mallItemId: itemId,
      categoryId
    }
  });
  if (!itemCategory) {
    await (0, _itemCategory.default)().create({
      mallItemId: itemId,
      categoryId
    });
  }
  if (!file) throw new _httpError.BadRequest(_httpError.NO_DATA, '이미지 파일이 없습니다.');
  const fileName = file.filename;
  await item.update({
    image: fileName
  });
}
async function fetchItemList(param) {
  const {
    categoryId,
    page
  } = param;
  const where = {};
  if (categoryId) where.categoryId = categoryId;
  if (page) {
    where.offset = (page - 1) * 10;
    where.limit = 10;
  }
  const {
    count,
    rows
  } = await (0, _mallItem.default)().findAndCountAll({
    attributes: ['id', 'name', 'price', 'description', 'image'],
    where,
    orderBy: [['id', 'DESC']],
    include: {
      model: (0, _itemCategory.default)(),
      attributes: ['id'],
      include: {
        model: (0, _category.default)(),
        attributes: ['name']
      }
    }
  });
  const items = rows.map(row => {
    row.image = row.image ? `https://api.mybebe.net/uploads/images/${row.image}` : null;
    return row;
  });
  return {
    count,
    items
  };
}
async function fetchCategoryList() {
  return (0, _category.default)().findAll({
    attributes: ['id', 'name']
  });
}
async function fetchItemDetail(id) {
  const item = await (0, _mallItem.default)().findOne({
    where: {
      id
    },
    include: {
      model: (0, _itemCategory.default)(),
      attributes: ['id'],
      include: {
        model: (0, _category.default)(),
        attributes: ['name']
      }
    }
  });
  if (!item) throw new _httpError.BadRequest(_httpError.NO_DATA, '존재하지 않는 상품입니다.');
  item.image = item.image ? `https://api.mybebe.net/uploads/images/${item.image}` : null;
  return item;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJsb2dnZXIiLCJnZXRMb2dnZXIiLCJzYXZlQ2F0ZWdvcnkiLCJuYW1lIiwiY2F0ZWdvcnkiLCJDYXRlZ29yeSIsImZpbmRPbmUiLCJ3aGVyZSIsIkJhZFJlcXVlc3QiLCJBTFJFQURZX0VYSVNUUyIsImNyZWF0ZSIsInNhdmVJdGVtIiwicGFyYW0iLCJmaWxlIiwiY2F0ZWdvcnlJZCIsInByaWNlIiwiZGVzY3JpcHRpb24iLCJpZCIsIk5PX0RBVEEiLCJpdGVtIiwiTWFsbEl0ZW0iLCJpdGVtSWQiLCJpbmZvIiwiaXRlbUNhdGVnb3J5IiwiSXRlbUNhdGVnb3J5IiwibWFsbEl0ZW1JZCIsImZpbGVOYW1lIiwiZmlsZW5hbWUiLCJ1cGRhdGUiLCJpbWFnZSIsImZldGNoSXRlbUxpc3QiLCJwYWdlIiwib2Zmc2V0IiwibGltaXQiLCJjb3VudCIsInJvd3MiLCJmaW5kQW5kQ291bnRBbGwiLCJhdHRyaWJ1dGVzIiwib3JkZXJCeSIsImluY2x1ZGUiLCJtb2RlbCIsIml0ZW1zIiwibWFwIiwicm93IiwiZmV0Y2hDYXRlZ29yeUxpc3QiLCJmaW5kQWxsIiwiZmV0Y2hJdGVtRGV0YWlsIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RpYXJ5LXNlcnZlci9jb250cm9sbGVyL21hbGwtY29udHJvbGxlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWFsbEl0ZW0gZnJvbSAnQGdsb2JhbC1jb21tb24vZGIvbW9kZWwvbWFsbC1pdGVtJ1xyXG5pbXBvcnQgQ2F0ZWdvcnkgZnJvbSAnQGdsb2JhbC1jb21tb24vZGIvbW9kZWwvY2F0ZWdvcnknXHJcbmltcG9ydCB7IEFMUkVBRFlfRVhJU1RTLCBCYWRSZXF1ZXN0LCBOT19EQVRBIH0gZnJvbSAnQGdsb2JhbC1jb21tb24vZXJyb3IvaHR0cC1lcnJvcidcclxuaW1wb3J0IEl0ZW1DYXRlZ29yeSBmcm9tICdAZ2xvYmFsLWNvbW1vbi9kYi9tb2RlbC9pdGVtLWNhdGVnb3J5J1xyXG5pbXBvcnQgeyBnZXRMb2dnZXIgfSBmcm9tICdAZ2xvYmFsLWNvbW1vbi91dGlscy9sb2dnZXInXHJcblxyXG5jb25zdCBsb2dnZXIgPSBnZXRMb2dnZXIoJ21hbGwtY29udHJvbGxlci50cycpXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZUNhdGVnb3J5IChuYW1lOiBzdHJpbmcpIHtcclxuICBjb25zdCBjYXRlZ29yeSA9IGF3YWl0IENhdGVnb3J5KCkuZmluZE9uZSh7IHdoZXJlOiB7IG5hbWUgfSB9KVxyXG5cclxuICBpZiAoY2F0ZWdvcnkpIHRocm93IG5ldyBCYWRSZXF1ZXN0KEFMUkVBRFlfRVhJU1RTLCAn7J2066+4IOyhtOyerO2VmOuKlCDsubTthYzqs6DrpqzsnoXri4jri6QuJylcclxuXHJcbiAgYXdhaXQgQ2F0ZWdvcnkoKS5jcmVhdGUoeyBuYW1lIH0pXHJcbn1cclxuXHJcbmludGVyZmFjZSBpdGVtUGFyYW0ge1xyXG4gIGNhdGVnb3J5SWQ6IG51bWJlclxyXG4gIG5hbWU6IHN0cmluZ1xyXG4gIHByaWNlOiBudW1iZXJcclxuICBkZXNjcmlwdGlvbjogc3RyaW5nXHJcbn1cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNhdmVJdGVtIChwYXJhbTogaXRlbVBhcmFtLCBmaWxlKSB7XHJcbiAgY29uc3QgeyBjYXRlZ29yeUlkLCBuYW1lLCBwcmljZSwgZGVzY3JpcHRpb24gfSA9IHBhcmFtXHJcblxyXG4gIGNvbnN0IGNhdGVnb3J5ID0gYXdhaXQgQ2F0ZWdvcnkoKS5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IGNhdGVnb3J5SWQgfSB9KVxyXG5cclxuICBpZiAoIWNhdGVnb3J5KSB0aHJvdyBuZXcgQmFkUmVxdWVzdChOT19EQVRBLCAn7KG07J6s7ZWY7KeAIOyViuuKlCDsubTthYzqs6DrpqzsnoXri4jri6QuJylcclxuXHJcbiAgY29uc3QgaXRlbSA9IGF3YWl0IE1hbGxJdGVtKCkuY3JlYXRlKHsgbmFtZSwgcHJpY2UsIGRlc2NyaXB0aW9uIH0pXHJcblxyXG4gIGNvbnN0IGl0ZW1JZCA9IGl0ZW0uaWRcclxuXHJcbiAgbG9nZ2VyLmluZm8oYGl0ZW1JZDogJHtpdGVtSWR9YClcclxuXHJcbiAgY29uc3QgaXRlbUNhdGVnb3J5ID0gYXdhaXQgSXRlbUNhdGVnb3J5KCkuZmluZE9uZSh7IHdoZXJlOiB7IG1hbGxJdGVtSWQ6IGl0ZW1JZCwgY2F0ZWdvcnlJZCB9IH0pXHJcblxyXG4gIGlmICghaXRlbUNhdGVnb3J5KSB7XHJcbiAgICBhd2FpdCBJdGVtQ2F0ZWdvcnkoKS5jcmVhdGUoeyBtYWxsSXRlbUlkOiBpdGVtSWQsIGNhdGVnb3J5SWQgfSlcclxuICB9XHJcblxyXG4gIGlmICghZmlsZSkgdGhyb3cgbmV3IEJhZFJlcXVlc3QoTk9fREFUQSwgJ+ydtOuvuOyngCDtjIzsnbzsnbQg7JeG7Iq164uI64ukLicpXHJcblxyXG4gIGNvbnN0IGZpbGVOYW1lID0gZmlsZS5maWxlbmFtZVxyXG5cclxuICBhd2FpdCBpdGVtLnVwZGF0ZSh7IGltYWdlOiBmaWxlTmFtZSB9KVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hJdGVtTGlzdCAocGFyYW06IHtjYXRlZ29yeUlkPzogbnVtYmVyLCBwYWdlPzogbnVtYmVyfSkge1xyXG4gIGNvbnN0IHsgY2F0ZWdvcnlJZCwgcGFnZSB9ID0gcGFyYW1cclxuXHJcbiAgY29uc3Qgd2hlcmU6IGFueSA9IHt9XHJcblxyXG4gIGlmIChjYXRlZ29yeUlkKSB3aGVyZS5jYXRlZ29yeUlkID0gY2F0ZWdvcnlJZFxyXG4gIGlmIChwYWdlKSB7XHJcbiAgICB3aGVyZS5vZmZzZXQgPSAocGFnZSAtIDEpICogMTBcclxuICAgIHdoZXJlLmxpbWl0ID0gMTBcclxuICB9XHJcblxyXG4gIGNvbnN0IHsgY291bnQsIHJvd3MgfSA9IGF3YWl0IE1hbGxJdGVtKCkuZmluZEFuZENvdW50QWxsKHtcclxuICAgIGF0dHJpYnV0ZXM6IFsnaWQnLCAnbmFtZScsICdwcmljZScsICdkZXNjcmlwdGlvbicsICdpbWFnZSddLFxyXG4gICAgd2hlcmUsXHJcbiAgICBvcmRlckJ5OiBbWydpZCcsICdERVNDJ11dLFxyXG4gICAgaW5jbHVkZToge1xyXG4gICAgICBtb2RlbDogSXRlbUNhdGVnb3J5KCksXHJcbiAgICAgIGF0dHJpYnV0ZXM6IFsnaWQnXSxcclxuICAgICAgaW5jbHVkZToge1xyXG4gICAgICAgIG1vZGVsOiBDYXRlZ29yeSgpLFxyXG4gICAgICAgIGF0dHJpYnV0ZXM6IFsnbmFtZSddLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9KVxyXG5cclxuICBjb25zdCBpdGVtcyA9IHJvd3MubWFwKHJvdyA9PiB7XHJcbiAgICByb3cuaW1hZ2UgPSByb3cuaW1hZ2UgPyBgaHR0cHM6Ly9hcGkubXliZWJlLm5ldC91cGxvYWRzL2ltYWdlcy8ke3Jvdy5pbWFnZX1gIDogbnVsbFxyXG4gICAgcmV0dXJuIHJvd1xyXG4gIH0pXHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBjb3VudCxcclxuICAgIGl0ZW1zLFxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoQ2F0ZWdvcnlMaXN0ICgpIHtcclxuICByZXR1cm4gQ2F0ZWdvcnkoKS5maW5kQWxsKHtcclxuICAgIGF0dHJpYnV0ZXM6IFsnaWQnLCAnbmFtZSddLFxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaEl0ZW1EZXRhaWwgKGlkOiBudW1iZXIpIHtcclxuICBjb25zdCBpdGVtID0gYXdhaXQgTWFsbEl0ZW0oKS5maW5kT25lKHtcclxuICAgIHdoZXJlOiB7IGlkIH0sXHJcbiAgICBpbmNsdWRlOiB7XHJcbiAgICAgIG1vZGVsOiBJdGVtQ2F0ZWdvcnkoKSxcclxuICAgICAgYXR0cmlidXRlczogWydpZCddLFxyXG4gICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgbW9kZWw6IENhdGVnb3J5KCksXHJcbiAgICAgICAgYXR0cmlidXRlczogWyduYW1lJ10sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0pXHJcblxyXG4gIGlmICghaXRlbSkgdGhyb3cgbmV3IEJhZFJlcXVlc3QoTk9fREFUQSwgJ+yhtOyerO2VmOyngCDslYrripQg7IOB7ZKI7J6F64uI64ukLicpXHJcblxyXG4gIGl0ZW0uaW1hZ2UgPSBpdGVtLmltYWdlID8gYGh0dHBzOi8vYXBpLm15YmViZS5uZXQvdXBsb2Fkcy9pbWFnZXMvJHtpdGVtLmltYWdlfWAgOiBudWxsXHJcblxyXG4gIHJldHVybiBpdGVtXHJcbn1cclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUF1RDtBQUV2RCxNQUFNQSxNQUFNLEdBQUcsSUFBQUMsaUJBQVMsRUFBQyxvQkFBb0IsQ0FBQztBQUV2QyxlQUFlQyxZQUFZLENBQUVDLElBQVksRUFBRTtFQUNoRCxNQUFNQyxRQUFRLEdBQUcsTUFBTSxJQUFBQyxpQkFBUSxHQUFFLENBQUNDLE9BQU8sQ0FBQztJQUFFQyxLQUFLLEVBQUU7TUFBRUo7SUFBSztFQUFFLENBQUMsQ0FBQztFQUU5RCxJQUFJQyxRQUFRLEVBQUUsTUFBTSxJQUFJSSxxQkFBVSxDQUFDQyx5QkFBYyxFQUFFLGtCQUFrQixDQUFDO0VBRXRFLE1BQU0sSUFBQUosaUJBQVEsR0FBRSxDQUFDSyxNQUFNLENBQUM7SUFBRVA7RUFBSyxDQUFDLENBQUM7QUFDbkM7QUFRTyxlQUFlUSxRQUFRLENBQUVDLEtBQWdCLEVBQUVDLElBQUksRUFBRTtFQUN0RCxNQUFNO0lBQUVDLFVBQVU7SUFBRVgsSUFBSTtJQUFFWSxLQUFLO0lBQUVDO0VBQVksQ0FBQyxHQUFHSixLQUFLO0VBRXRELE1BQU1SLFFBQVEsR0FBRyxNQUFNLElBQUFDLGlCQUFRLEdBQUUsQ0FBQ0MsT0FBTyxDQUFDO0lBQUVDLEtBQUssRUFBRTtNQUFFVSxFQUFFLEVBQUVIO0lBQVc7RUFBRSxDQUFDLENBQUM7RUFFeEUsSUFBSSxDQUFDVixRQUFRLEVBQUUsTUFBTSxJQUFJSSxxQkFBVSxDQUFDVSxrQkFBTyxFQUFFLGtCQUFrQixDQUFDO0VBRWhFLE1BQU1DLElB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