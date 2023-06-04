"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mallRoutes;
var _express = require("express");
var _asyncHandler = _interopRequireDefault(require("@global-common/server/routes/helper/asyncHandler"));
var _userGuard = require("@diary-server/routes/middleware/userGuard");
var _validator = require("@global-common/utils/validator");
var _joi = _interopRequireDefault(require("joi"));
var _mallController = require("@diary-server/controller/mall-controller");
var _utils = require("@global-common/server/routes/helper/utils");
var _localUpload = require("@global-common/middleware/local-upload");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function mallRoutes(router = (0, _express.Router)()) {
  // 쇼핑몰 사이즈 목록
  router.get('/mall/size', (0, _asyncHandler.default)(getSizeList));
  // 쇼핑몰 카테고리 등록
  router.post('/mall/category', _userGuard.diaryGuard, (0, _asyncHandler.default)(postMallCategory));
  // 쇼핑몰 카테고리 목록
  router.get('/mall/category', _userGuard.diaryGuard, (0, _asyncHandler.default)(getMallCategory));
  // 쇼핑몰 상품 등록
  router.post('/mall/item', _userGuard.diaryGuard, _localUpload.localUpload.single('file'), (0, _asyncHandler.default)(postMallItem));
  // 쇼핑몰 리스트 조회
  router.get('/mall/item', _userGuard.diaryGuard, (0, _asyncHandler.default)(getMallList));
  async function getSizeList(req, res) {
    const sizeList = [{
      id: 1,
      name: 'S'
    }, {
      id: 2,
      name: 'M'
    }, {
      id: 3,
      name: 'L'
    }, {
      id: 4,
      name: 'XL'
    }, {
      id: 5,
      name: 'XXL'
    }];
    res.json(sizeList);
  }
  async function postMallCategory(req, res) {
    const {
      body
    } = req;
    const {
      name
    } = (0, _validator.validateInputData)(body, {
      name: _joi.default.string().required()
    });
    await (0, _mallController.saveCategory)(name);
    (0, _utils.sendOk)(res);
  }
  async function getMallCategory(req, res) {
    const result = await (0, _mallController.fetchCategoryList)();
    res.json(result);
  }
  async function postMallItem(req, res) {
    const {
      body
    } = req;
    const param = (0, _validator.validateInputData)(body, {
      categoryId: _joi.default.number().required(),
      name: _joi.default.string().required(),
      price: _joi.default.number().required(),
      description: _joi.default.string().required()
    });
    await (0, _mallController.saveItem)(param, req.file);
    (0, _utils.sendOk)(res);
  }
  async function getMallList(req, res) {
    const {
      query
    } = req;
    const param = (0, _validator.validateInputData)(query, {
      categoryId: _joi.default.number(),
      page: _joi.default.number()
    });
    const result = await (0, _mallController.fetchItemList)(param);
    res.json(result);
  }
  return router;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtYWxsUm91dGVzIiwicm91dGVyIiwiUm91dGVyIiwiZ2V0IiwiYXN5bmNIYW5kbGVyIiwiZ2V0U2l6ZUxpc3QiLCJwb3N0IiwiZGlhcnlHdWFyZCIsInBvc3RNYWxsQ2F0ZWdvcnkiLCJnZXRNYWxsQ2F0ZWdvcnkiLCJsb2NhbFVwbG9hZCIsInNpbmdsZSIsInBvc3RNYWxsSXRlbSIsImdldE1hbGxMaXN0IiwicmVxIiwicmVzIiwic2l6ZUxpc3QiLCJpZCIsIm5hbWUiLCJqc29uIiwiYm9keSIsInZhbGlkYXRlSW5wdXREYXRhIiwiSm9pIiwic3RyaW5nIiwicmVxdWlyZWQiLCJzYXZlQ2F0ZWdvcnkiLCJzZW5kT2siLCJyZXN1bHQiLCJmZXRjaENhdGVnb3J5TGlzdCIsInBhcmFtIiwiY2F0ZWdvcnlJZCIsIm51bWJlciIsInByaWNlIiwiZGVzY3JpcHRpb24iLCJzYXZlSXRlbSIsImZpbGUiLCJxdWVyeSIsInBhZ2UiLCJmZXRjaEl0ZW1MaXN0Il0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2RpYXJ5LXNlcnZlci9yb3V0ZXMvZGVmYXVsdC1sb2FkL21hbGwtcm91dGVzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlciB9IGZyb20gJ2V4cHJlc3MnXHJcbmltcG9ydCBhc3luY0hhbmRsZXIgZnJvbSAnQGdsb2JhbC1jb21tb24vc2VydmVyL3JvdXRlcy9oZWxwZXIvYXN5bmNIYW5kbGVyJ1xyXG5pbXBvcnQgeyBhZG1pbkd1YXJkLCBkaWFyeUd1YXJkIH0gZnJvbSAnQGRpYXJ5LXNlcnZlci9yb3V0ZXMvbWlkZGxld2FyZS91c2VyR3VhcmQnXHJcbmltcG9ydCB7IHZhbGlkYXRlSW5wdXREYXRhIH0gZnJvbSAnQGdsb2JhbC1jb21tb24vdXRpbHMvdmFsaWRhdG9yJ1xyXG5pbXBvcnQgSm9pIGZyb20gJ2pvaSdcclxuaW1wb3J0IHsgZmV0Y2hDYXRlZ29yeUxpc3QsIGZldGNoSXRlbUxpc3QsIHNhdmVDYXRlZ29yeSwgc2F2ZUl0ZW0gfSBmcm9tICdAZGlhcnktc2VydmVyL2NvbnRyb2xsZXIvbWFsbC1jb250cm9sbGVyJ1xyXG5pbXBvcnQgeyBzZW5kT2sgfSBmcm9tICdAZ2xvYmFsLWNvbW1vbi9zZXJ2ZXIvcm91dGVzL2hlbHBlci91dGlscydcclxuaW1wb3J0IHsgbG9jYWxVcGxvYWQgfSBmcm9tICdAZ2xvYmFsLWNvbW1vbi9taWRkbGV3YXJlL2xvY2FsLXVwbG9hZCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1hbGxSb3V0ZXMgKHJvdXRlciA9IFJvdXRlcigpKSB7XHJcbiAgLy8g7Ie87ZWR66qwIOyCrOydtOymiCDrqqnroZ1cclxuICByb3V0ZXIuZ2V0KCcvbWFsbC9zaXplJywgYXN5bmNIYW5kbGVyKGdldFNpemVMaXN0KSlcclxuICAvLyDsh7ztlZHrqrAg7Lm07YWM6rOg66asIOuTseuhnVxyXG4gIHJvdXRlci5wb3N0KCcvbWFsbC9jYXRlZ29yeScsIGRpYXJ5R3VhcmQsIGFzeW5jSGFuZGxlcihwb3N0TWFsbENhdGVnb3J5KSlcclxuICAvLyDsh7ztlZHrqrAg7Lm07YWM6rOg66asIOuqqeuhnVxyXG4gIHJvdXRlci5nZXQoJy9tYWxsL2NhdGVnb3J5JywgZGlhcnlHdWFyZCwgYXN5bmNIYW5kbGVyKGdldE1hbGxDYXRlZ29yeSkpXHJcbiAgLy8g7Ie87ZWR66qwIOyDge2SiCDrk7HroZ1cclxuICByb3V0ZXIucG9zdCgnL21hbGwvaXRlbScsIGRpYXJ5R3VhcmQsIGxvY2FsVXBsb2FkLnNpbmdsZSgnZmlsZScpLCBhc3luY0hhbmRsZXIocG9zdE1hbGxJdGVtKSlcclxuICAvLyDsh7ztlZHrqrAg66as7Iqk7Yq4IOyhsO2ajFxyXG4gIHJvdXRlci5nZXQoJy9tYWxsL2l0ZW0nLCBkaWFyeUd1YXJkLCBhc3luY0hhbmRsZXIoZ2V0TWFsbExpc3QpKVxyXG5cclxuICBhc3luYyBmdW5jdGlvbiBnZXRTaXplTGlzdCAocmVxLCByZXMpIHtcclxuICAgIGNvbnN0IHNpemVMaXN0ID0gW1xyXG4gICAgICB7IGlkOiAxLCBuYW1lOiAnUycgfSxcclxuICAgICAgeyBpZDogMiwgbmFtZTogJ00nIH0sXHJcbiAgICAgIHsgaWQ6IDMsIG5hbWU6ICdMJyB9LFxyXG4gICAgICB7IGlkOiA0LCBuYW1lOiAnWEwnIH0sXHJcbiAgICAgIHsgaWQ6IDUsIG5hbWU6ICdYWEwnIH0sXHJcbiAgICBdXHJcblxyXG4gICAgcmVzLmpzb24oc2l6ZUxpc3QpXHJcbiAgfVxyXG5cclxuICBhc3luYyBmdW5jdGlvbiBwb3N0TWFsbENhdGVnb3J5IChyZXEsIHJlcykge1xyXG4gICAgY29uc3QgeyBib2R5IH0gPSByZXFcclxuXHJcbiAgICBjb25zdCB7IG5hbWUgfSA9IHZhbGlkYXRlSW5wdXREYXRhKGJvZHksIHtcclxuICAgICAgbmFtZTogSm9pLnN0cmluZygpLnJlcXVpcmVkKCksXHJcbiAgICB9KVxyXG5cclxuICAgIGF3YWl0IHNhdmVDYXRlZ29yeShuYW1lKVxyXG5cclxuICAgIHNlbmRPayhyZXMpXHJcbiAgfVxyXG5cclxuICBhc3luYyBmdW5jdGlvbiBnZXRNYWxsQ2F0ZWdvcnkgKHJlcSwgcmVzKSB7XHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBmZXRjaENhdGVnb3J5TGlzdCgpXHJcblxyXG4gICAgcmVzLmpzb24ocmVzdWx0KVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZnVuY3Rpb24gcG9zdE1hbGxJdGVtIChyZXEsIHJlcykge1xyXG4gICAgY29uc3QgeyBib2R5IH0gPSByZXFcclxuXHJcbiAgICBjb25zdCBwYXJhbSA9IHZhbGlkYXRlSW5wdXREYXRhKGJvZHksIHtcclxuICAgICAgY2F0ZWdvcnlJZDogSm9pLm51bWJlcigpLnJlcXVpcmVkKCksXHJcbiAgICAgIG5hbWU6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxyXG4gICAgICBwcmljZTogSm9pLm51bWJlcigpLnJlcXVpcmVkKCksXHJcbiAgICAgIGRlc2NyaXB0aW9uOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcclxuICAgIH0pXHJcblxyXG4gICAgYXdhaXQgc2F2ZUl0ZW0ocGFyYW0sIHJlcS5maWxlKVxyXG5cclxuICAgIHNlbmRPayhyZXMpXHJcbiAgfVxyXG4gIGFzeW5jIGZ1bmN0aW9uIGdldE1hbGxMaXN0IChyZXEsIHJlcykge1xyXG4gICAgY29uc3QgeyBxdWVyeSB9ID0gcmVxXHJcblxyXG4gICAgY29uc3QgcGFyYW0gPSB2YWxpZGF0ZUlucHV0RGF0YShxdWVyeSwge1xyXG4gICAgICBjYXRlZ29yeUlkOiBKb2kubnVtYmVyKCksXHJcbiAgICAgIHBhZ2U6IEpvaS5udW1iZXIoKSxcclxuICAgIH0pXHJcblxyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZmV0Y2hJdGVtTGlzdChwYXJhbSlcclxuXHJcbiAgICByZXMuanNvbihyZXN1bHQpXHJcbiAgfVxyXG5cclxuICByZXR1cm4gcm91dGVyXHJcbn1cclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQW9FO0FBRXJELFNBQVNBLFVBQVUsQ0FBRUMsTUFBTSxHQUFHLElBQUFDLGVBQU0sR0FBRSxFQUFFO0VBQ3JEO0VBQ0FELE1BQU0sQ0FBQ0UsR0FBRyxDQUFDLFlBQVksRUFBRSxJQUFBQyxxQkFBWSxFQUFDQyxXQUFXLENBQUMsQ0FBQztFQUNuRDtFQUNBSixNQUFNLENBQUNLLElBQUksQ0FBQyxnQkFBZ0IsRUFBRUMscUJBQVUsRUFBRSxJQUFBSCxxQkFBWSxFQUFDSSxnQkFBZ0IsQ0FBQyxDQUFDO0VBQ3pFO0VBQ0FQLE1BQU0sQ0FBQ0UsR0FBRyxDQUFDLGdCQUFnQixFQUFFSSxxQkFBVSxFQUFFLElBQUFILHFCQUFZLEVBQUNLLGVBQWUsQ0FBQyxDQUFDO0VBQ3ZFO0VBQ0FSLE1BQU0sQ0FBQ0ssSUFBSSxDQUFDLFlBQVksRUFBRUMscUJBQVUsRUFBRUcsd0JBQVcsQ0FBQ0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUFQLHFCQUFZLEVBQUNRLFlBQVksQ0FBQyxDQUFDO0VB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