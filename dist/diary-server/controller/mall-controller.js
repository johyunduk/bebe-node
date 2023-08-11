"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchCategoryList = fetchCategoryList;
exports.fetchItemDetail = fetchItemDetail;
exports.fetchItemList = fetchItemList;
exports.modifyItem = modifyItem;
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
      attributes: ['id', 'categoryId'],
      include: {
        model: (0, _category.default)(),
        attributes: ['id', 'name']
      }
    }
  });
  if (!item) throw new _httpError.BadRequest(_httpError.NO_DATA, '존재하지 않는 상품입니다.');
  item.image = item.image ? `https://api.mybebe.net/uploads/images/${item.image}` : null;
  return item;
}
async function modifyItem(param) {
  const {
    id
  } = param;
  const item = await (0, _mallItem.default)().findOne({
    where: {
      id
    }
  });
  if (!item) throw new _httpError.BadRequest(_httpError.NO_DATA, '존재하지 않는 상품입니다.');
  await item.update({
    ...param
  });
  const itemCategory = await (0, _itemCategory.default)().findOne({
    where: {
      mallItemId: id
    }
  });
  await itemCategory.update({
    categoryId: param.categoryId
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJsb2dnZXIiLCJnZXRMb2dnZXIiLCJzYXZlQ2F0ZWdvcnkiLCJuYW1lIiwiY2F0ZWdvcnkiLCJDYXRlZ29yeSIsImZpbmRPbmUiLCJ3aGVyZSIsIkJhZFJlcXVlc3QiLCJBTFJFQURZX0VYSVNUUyIsImNyZWF0ZSIsInNhdmVJdGVtIiwicGFyYW0iLCJmaWxlIiwiY2F0ZWdvcnlJZCIsInByaWNlIiwiZGVzY3JpcHRpb24iLCJpZCIsIk5PX0RBVEEiLCJpdGVtIiwiTWFsbEl0ZW0iLCJpdGVtSWQiLCJpbmZvIiwiaXRlbUNhdGVnb3J5IiwiSXRlbUNhdGVnb3J5IiwibWFsbEl0ZW1JZCIsImZpbGVOYW1lIiwiZmlsZW5hbWUiLCJ1cGRhdGUiLCJpbWFnZSIsImZldGNoSXRlbUxpc3QiLCJwYWdlIiwib2Zmc2V0IiwibGltaXQiLCJjb3VudCIsInJvd3MiLCJmaW5kQW5kQ291bnRBbGwiLCJhdHRyaWJ1dGVzIiwib3JkZXJCeSIsImluY2x1ZGUiLCJtb2RlbCIsIml0ZW1zIiwibWFwIiwicm93IiwiZmV0Y2hDYXRlZ29yeUxpc3QiLCJmaW5kQWxsIiwiZmV0Y2hJdGVtRGV0YWlsIiwibW9kaWZ5SXRlbSJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kaWFyeS1zZXJ2ZXIvY29udHJvbGxlci9tYWxsLWNvbnRyb2xsZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1hbGxJdGVtIGZyb20gJ0BnbG9iYWwtY29tbW9uL2RiL21vZGVsL21hbGwtaXRlbSdcclxuaW1wb3J0IENhdGVnb3J5IGZyb20gJ0BnbG9iYWwtY29tbW9uL2RiL21vZGVsL2NhdGVnb3J5J1xyXG5pbXBvcnQgeyBBTFJFQURZX0VYSVNUUywgQmFkUmVxdWVzdCwgTk9fREFUQSB9IGZyb20gJ0BnbG9iYWwtY29tbW9uL2Vycm9yL2h0dHAtZXJyb3InXHJcbmltcG9ydCBJdGVtQ2F0ZWdvcnkgZnJvbSAnQGdsb2JhbC1jb21tb24vZGIvbW9kZWwvaXRlbS1jYXRlZ29yeSdcclxuaW1wb3J0IHsgZ2V0TG9nZ2VyIH0gZnJvbSAnQGdsb2JhbC1jb21tb24vdXRpbHMvbG9nZ2VyJ1xyXG5cclxuY29uc3QgbG9nZ2VyID0gZ2V0TG9nZ2VyKCdtYWxsLWNvbnRyb2xsZXIudHMnKVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNhdmVDYXRlZ29yeSAobmFtZTogc3RyaW5nKSB7XHJcbiAgY29uc3QgY2F0ZWdvcnkgPSBhd2FpdCBDYXRlZ29yeSgpLmZpbmRPbmUoeyB3aGVyZTogeyBuYW1lIH0gfSlcclxuXHJcbiAgaWYgKGNhdGVnb3J5KSB0aHJvdyBuZXcgQmFkUmVxdWVzdChBTFJFQURZX0VYSVNUUywgJ+ydtOuvuCDsobTsnqztlZjripQg7Lm07YWM6rOg66as7J6F64uI64ukLicpXHJcblxyXG4gIGF3YWl0IENhdGVnb3J5KCkuY3JlYXRlKHsgbmFtZSB9KVxyXG59XHJcblxyXG5pbnRlcmZhY2UgaXRlbVBhcmFtIHtcclxuICBjYXRlZ29yeUlkOiBudW1iZXJcclxuICBuYW1lOiBzdHJpbmdcclxuICBwcmljZTogbnVtYmVyXHJcbiAgZGVzY3JpcHRpb246IHN0cmluZ1xyXG59XHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzYXZlSXRlbSAocGFyYW06IGl0ZW1QYXJhbSwgZmlsZSkge1xyXG4gIGNvbnN0IHsgY2F0ZWdvcnlJZCwgbmFtZSwgcHJpY2UsIGRlc2NyaXB0aW9uIH0gPSBwYXJhbVxyXG5cclxuICBjb25zdCBjYXRlZ29yeSA9IGF3YWl0IENhdGVnb3J5KCkuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBjYXRlZ29yeUlkIH0gfSlcclxuXHJcbiAgaWYgKCFjYXRlZ29yeSkgdGhyb3cgbmV3IEJhZFJlcXVlc3QoTk9fREFUQSwgJ+yhtOyerO2VmOyngCDslYrripQg7Lm07YWM6rOg66as7J6F64uI64ukLicpXHJcblxyXG4gIGNvbnN0IGl0ZW0gPSBhd2FpdCBNYWxsSXRlbSgpLmNyZWF0ZSh7IG5hbWUsIHByaWNlLCBkZXNjcmlwdGlvbiB9KVxyXG5cclxuICBjb25zdCBpdGVtSWQgPSBpdGVtLmlkXHJcblxyXG4gIGxvZ2dlci5pbmZvKGBpdGVtSWQ6ICR7aXRlbUlkfWApXHJcblxyXG4gIGNvbnN0IGl0ZW1DYXRlZ29yeSA9IGF3YWl0IEl0ZW1DYXRlZ29yeSgpLmZpbmRPbmUoeyB3aGVyZTogeyBtYWxsSXRlbUlkOiBpdGVtSWQsIGNhdGVnb3J5SWQgfSB9KVxyXG5cclxuICBpZiAoIWl0ZW1DYXRlZ29yeSkge1xyXG4gICAgYXdhaXQgSXRlbUNhdGVnb3J5KCkuY3JlYXRlKHsgbWFsbEl0ZW1JZDogaXRlbUlkLCBjYXRlZ29yeUlkIH0pXHJcbiAgfVxyXG5cclxuICBpZiAoIWZpbGUpIHRocm93IG5ldyBCYWRSZXF1ZXN0KE5PX0RBVEEsICfsnbTrr7jsp4Ag7YyM7J287J20IOyXhuyKteuLiOuLpC4nKVxyXG5cclxuICBjb25zdCBmaWxlTmFtZSA9IGZpbGUuZmlsZW5hbWVcclxuXHJcbiAgYXdhaXQgaXRlbS51cGRhdGUoeyBpbWFnZTogZmlsZU5hbWUgfSlcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoSXRlbUxpc3QgKHBhcmFtOiB7Y2F0ZWdvcnlJZD86IG51bWJlciwgcGFnZT86IG51bWJlcn0pIHtcclxuICBjb25zdCB7IGNhdGVnb3J5SWQsIHBhZ2UgfSA9IHBhcmFtXHJcblxyXG4gIGNvbnN0IHdoZXJlOiBhbnkgPSB7fVxyXG5cclxuICBpZiAoY2F0ZWdvcnlJZCkgd2hlcmUuY2F0ZWdvcnlJZCA9IGNhdGVnb3J5SWRcclxuICBpZiAocGFnZSkge1xyXG4gICAgd2hlcmUub2Zmc2V0ID0gKHBhZ2UgLSAxKSAqIDEwXHJcbiAgICB3aGVyZS5saW1pdCA9IDEwXHJcbiAgfVxyXG5cclxuICBjb25zdCB7IGNvdW50LCByb3dzIH0gPSBhd2FpdCBNYWxsSXRlbSgpLmZpbmRBbmRDb3VudEFsbCh7XHJcbiAgICBhdHRyaWJ1dGVzOiBbJ2lkJywgJ25hbWUnLCAncHJpY2UnLCAnZGVzY3JpcHRpb24nLCAnaW1hZ2UnXSxcclxuICAgIHdoZXJlLFxyXG4gICAgb3JkZXJCeTogW1snaWQnLCAnREVTQyddXSxcclxuICAgIGluY2x1ZGU6IHtcclxuICAgICAgbW9kZWw6IEl0ZW1DYXRlZ29yeSgpLFxyXG4gICAgICBhdHRyaWJ1dGVzOiBbJ2lkJ10sXHJcbiAgICAgIGluY2x1ZGU6IHtcclxuICAgICAgICBtb2RlbDogQ2F0ZWdvcnkoKSxcclxuICAgICAgICBhdHRyaWJ1dGVzOiBbJ25hbWUnXSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSlcclxuXHJcbiAgY29uc3QgaXRlbXMgPSByb3dzLm1hcChyb3cgPT4ge1xyXG4gICAgcm93LmltYWdlID0gcm93LmltYWdlID8gYGh0dHBzOi8vYXBpLm15YmViZS5uZXQvdXBsb2Fkcy9pbWFnZXMvJHtyb3cuaW1hZ2V9YCA6IG51bGxcclxuICAgIHJldHVybiByb3dcclxuICB9KVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgY291bnQsXHJcbiAgICBpdGVtcyxcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaENhdGVnb3J5TGlzdCAoKSB7XHJcbiAgcmV0dXJuIENhdGVnb3J5KCkuZmluZEFsbCh7XHJcbiAgICBhdHRyaWJ1dGVzOiBbJ2lkJywgJ25hbWUnXSxcclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hJdGVtRGV0YWlsIChpZDogbnVtYmVyKSB7XHJcbiAgY29uc3QgaXRlbSA9IGF3YWl0IE1hbGxJdGVtKCkuZmluZE9uZSh7XHJcbiAgICB3aGVyZTogeyBpZCB9LFxyXG4gICAgaW5jbHVkZToge1xyXG4gICAgICBtb2RlbDogSXRlbUNhdGVnb3J5KCksXHJcbiAgICAgIGF0dHJpYnV0ZXM6IFsnaWQnLCAnY2F0ZWdvcnlJZCddLFxyXG4gICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgbW9kZWw6IENhdGVnb3J5KCksXHJcbiAgICAgICAgYXR0cmlidXRlczogWydpZCcsICduYW1lJ10sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0pXHJcblxyXG4gIGlmICghaXRlbSkgdGhyb3cgbmV3IEJhZFJlcXVlc3QoTk9fREFUQSwgJ+yhtOyerO2VmOyngCDslYrripQg7IOB7ZKI7J6F64uI64ukLicpXHJcblxyXG4gIGl0ZW0uaW1hZ2UgPSBpdGVtLmltYWdlID8gYGh0dHBzOi8vYXBpLm15YmViZS5uZXQvdXBsb2Fkcy9pbWFnZXMvJHtpdGVtLmltYWdlfWAgOiBudWxsXHJcblxyXG4gIHJldHVybiBpdGVtXHJcbn1cclxuXHJcbmludGVyZmFjZSBtb2RpZnlQYXJhbSB7XHJcbiAgaWQ6IG51bWJlclxyXG4gIGNhdGVnb3J5SWQ6IG51bWJlclxyXG4gIG5hbWU6IHN0cmluZ1xyXG4gIHByaWNlOiBudW1iZXJcclxuICBkZXNjcmlwdGlvbjogc3RyaW5nXHJcbn1cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG1vZGlmeUl0ZW0gKHBhcmFtOiBtb2RpZnlQYXJhbSkge1xyXG4gIGNvbnN0IHsgaWQgfSA9IHBhcmFtXHJcblxyXG4gIGNvbnN0IGl0ZW0gPSBhd2FpdCBNYWxsSXRlbSgpLmZpbmRPbmUoeyB3aGVyZTogeyBpZCB9IH0pXHJcblxyXG4gIGlmICghaXRlbSkgdGhyb3cgbmV3IEJhZFJlcXVlc3QoTk9fREFUQSwgJ+yhtOyerO2VmOyngCDslYrripQg7IOB7ZKI7J6F64uI64ukLicpXHJcblxyXG4gIGF3YWl0IGl0ZW0udXBkYXRlKHsgLi4ucGFyYW0gfSlcclxuXHJcbiAgY29uc3QgaXRlbUNhdGVnb3J5ID0gYXdhaXQgSXRlbUNhdGVnb3J5KCkuZmluZE9uZSh7IHdoZXJlOiB7IG1hbGxJdGVtSWQ6IGlkIH0gfSlcclxuXHJcbiAgYXdhaXQgaXRlbUNhdGVnb3J5LnVwZGF0ZSh7IGNhdGVnb3J5SWQ6IHBhcmFtLmNhdGVnb3J5SWQgfSlcclxufVxyXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUF1RDtBQUV2RCxNQUFNQSxNQUFNLEdBQUcs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