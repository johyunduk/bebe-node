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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtYWxsUm91dGVzIiwicm91dGVyIiwiUm91dGVyIiwiZ2V0IiwiYXN5bmNIYW5kbGVyIiwiZ2V0U2l6ZUxpc3QiLCJwb3N0IiwiZGlhcnlHdWFyZCIsInBvc3RNYWxsQ2F0ZWdvcnkiLCJsb2NhbFVwbG9hZCIsInNpbmdsZSIsInBvc3RNYWxsSXRlbSIsImdldE1hbGxMaXN0IiwicmVxIiwicmVzIiwic2l6ZUxpc3QiLCJpZCIsIm5hbWUiLCJqc29uIiwiYm9keSIsInZhbGlkYXRlSW5wdXREYXRhIiwiSm9pIiwic3RyaW5nIiwicmVxdWlyZWQiLCJzYXZlQ2F0ZWdvcnkiLCJzZW5kT2siLCJwYXJhbSIsImNhdGVnb3J5SWQiLCJudW1iZXIiLCJwcmljZSIsImRlc2NyaXB0aW9uIiwic2F2ZUl0ZW0iLCJmaWxlIiwicXVlcnkiLCJwYWdlIiwicmVzdWx0IiwiZmV0Y2hJdGVtTGlzdCJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kaWFyeS1zZXJ2ZXIvcm91dGVzL2RlZmF1bHQtbG9hZC9tYWxsLXJvdXRlcy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdleHByZXNzJ1xyXG5pbXBvcnQgYXN5bmNIYW5kbGVyIGZyb20gJ0BnbG9iYWwtY29tbW9uL3NlcnZlci9yb3V0ZXMvaGVscGVyL2FzeW5jSGFuZGxlcidcclxuaW1wb3J0IHsgYWRtaW5HdWFyZCwgZGlhcnlHdWFyZCB9IGZyb20gJ0BkaWFyeS1zZXJ2ZXIvcm91dGVzL21pZGRsZXdhcmUvdXNlckd1YXJkJ1xyXG5pbXBvcnQgeyB2YWxpZGF0ZUlucHV0RGF0YSB9IGZyb20gJ0BnbG9iYWwtY29tbW9uL3V0aWxzL3ZhbGlkYXRvcidcclxuaW1wb3J0IEpvaSBmcm9tICdqb2knXHJcbmltcG9ydCB7IGZldGNoSXRlbUxpc3QsIHNhdmVDYXRlZ29yeSwgc2F2ZUl0ZW0gfSBmcm9tICdAZGlhcnktc2VydmVyL2NvbnRyb2xsZXIvbWFsbC1jb250cm9sbGVyJ1xyXG5pbXBvcnQgeyBzZW5kT2sgfSBmcm9tICdAZ2xvYmFsLWNvbW1vbi9zZXJ2ZXIvcm91dGVzL2hlbHBlci91dGlscydcclxuaW1wb3J0IHsgbG9jYWxVcGxvYWQgfSBmcm9tICdAZ2xvYmFsLWNvbW1vbi9taWRkbGV3YXJlL2xvY2FsLXVwbG9hZCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1hbGxSb3V0ZXMgKHJvdXRlciA9IFJvdXRlcigpKSB7XHJcbiAgLy8g7Ie87ZWR66qwIOyCrOydtOymiCDrqqnroZ1cclxuICByb3V0ZXIuZ2V0KCcvbWFsbC9zaXplJywgYXN5bmNIYW5kbGVyKGdldFNpemVMaXN0KSlcclxuICAvLyDsh7ztlZHrqrAg7Lm07YWM6rOg66asIOuTseuhnVxyXG4gIHJvdXRlci5wb3N0KCcvbWFsbC9jYXRlZ29yeScsIGRpYXJ5R3VhcmQsIGFzeW5jSGFuZGxlcihwb3N0TWFsbENhdGVnb3J5KSlcclxuICAvLyDsh7ztlZHrqrAg7IOB7ZKIIOuTseuhnVxyXG4gIHJvdXRlci5wb3N0KCcvbWFsbC9pdGVtJywgZGlhcnlHdWFyZCwgbG9jYWxVcGxvYWQuc2luZ2xlKCdmaWxlJyksIGFzeW5jSGFuZGxlcihwb3N0TWFsbEl0ZW0pKVxyXG4gIC8vIOyHvO2VkeuqsCDrpqzsiqTtirgg7KGw7ZqMXHJcbiAgcm91dGVyLmdldCgnL21hbGwvaXRlbScsIGRpYXJ5R3VhcmQsIGFzeW5jSGFuZGxlcihnZXRNYWxsTGlzdCkpXHJcblxyXG4gIGFzeW5jIGZ1bmN0aW9uIGdldFNpemVMaXN0IChyZXEsIHJlcykge1xyXG4gICAgY29uc3Qgc2l6ZUxpc3QgPSBbXHJcbiAgICAgIHsgaWQ6IDEsIG5hbWU6ICdTJyB9LFxyXG4gICAgICB7IGlkOiAyLCBuYW1lOiAnTScgfSxcclxuICAgICAgeyBpZDogMywgbmFtZTogJ0wnIH0sXHJcbiAgICAgIHsgaWQ6IDQsIG5hbWU6ICdYTCcgfSxcclxuICAgICAgeyBpZDogNSwgbmFtZTogJ1hYTCcgfSxcclxuICAgIF1cclxuXHJcbiAgICByZXMuanNvbihzaXplTGlzdClcclxuICB9XHJcblxyXG4gIGFzeW5jIGZ1bmN0aW9uIHBvc3RNYWxsQ2F0ZWdvcnkgKHJlcSwgcmVzKSB7XHJcbiAgICBjb25zdCB7IGJvZHkgfSA9IHJlcVxyXG5cclxuICAgIGNvbnN0IHsgbmFtZSB9ID0gdmFsaWRhdGVJbnB1dERhdGEoYm9keSwge1xyXG4gICAgICBuYW1lOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcclxuICAgIH0pXHJcblxyXG4gICAgYXdhaXQgc2F2ZUNhdGVnb3J5KG5hbWUpXHJcblxyXG4gICAgc2VuZE9rKHJlcylcclxuICB9XHJcblxyXG4gIGFzeW5jIGZ1bmN0aW9uIHBvc3RNYWxsSXRlbSAocmVxLCByZXMpIHtcclxuICAgIGNvbnN0IHsgYm9keSB9ID0gcmVxXHJcblxyXG4gICAgY29uc3QgcGFyYW0gPSB2YWxpZGF0ZUlucHV0RGF0YShib2R5LCB7XHJcbiAgICAgIGNhdGVnb3J5SWQ6IEpvaS5udW1iZXIoKS5yZXF1aXJlZCgpLFxyXG4gICAgICBuYW1lOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcclxuICAgICAgcHJpY2U6IEpvaS5udW1iZXIoKS5yZXF1aXJlZCgpLFxyXG4gICAgICBkZXNjcmlwdGlvbjogSm9pLnN0cmluZygpLnJlcXVpcmVkKCksXHJcbiAgICB9KVxyXG5cclxuICAgIGF3YWl0IHNhdmVJdGVtKHBhcmFtLCByZXEuZmlsZSlcclxuXHJcbiAgICBzZW5kT2socmVzKVxyXG4gIH1cclxuICBhc3luYyBmdW5jdGlvbiBnZXRNYWxsTGlzdCAocmVxLCByZXMpIHtcclxuICAgIGNvbnN0IHsgcXVlcnkgfSA9IHJlcVxyXG5cclxuICAgIGNvbnN0IHBhcmFtID0gdmFsaWRhdGVJbnB1dERhdGEocXVlcnksIHtcclxuICAgICAgY2F0ZWdvcnlJZDogSm9pLm51bWJlcigpLFxyXG4gICAgICBwYWdlOiBKb2kubnVtYmVyKCksXHJcbiAgICB9KVxyXG5cclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGZldGNoSXRlbUxpc3QocGFyYW0pXHJcblxyXG4gICAgcmVzLmpzb24ocmVzdWx0KVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHJvdXRlclxyXG59XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFvRTtBQUVyRCxTQUFTQSxVQUFVLENBQUVDLE1BQU0sR0FBRyxJQUFBQyxlQUFNLEdBQUUsRUFBRTtFQUNyRDtFQUNBRCxNQUFNLENBQUNFLEdBQUcsQ0FBQyxZQUFZLEVBQUUsSUFBQUMscUJBQVksRUFBQ0MsV0FBVyxDQUFDLENBQUM7RUFDbkQ7RUFDQUosTUFBTSxDQUFDSyxJQUFJLENBQUMsZ0JBQWdCLEVBQUVDLHFCQUFVLEVBQUUsSUFBQUgscUJBQVksRUFBQ0ksZ0JBQWdCLENBQUMsQ0FBQztFQUN6RTtFQUNBUCxNQUFNLENBQUNLLElBQUksQ0FBQyxZQUFZLEVBQUVDLHFCQUFVLEVBQUVFLHdCQUFXLENBQUNDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFBTixxQkFBWSxFQUFDTyxZQUFZLENBQUMsQ0FBQztFQUM3RjtFQUNBVixNQUFNLENBQUNFLEdBQUcsQ0FBQyxZQUFZLEVBQUVJLHFCQUFVLEVBQUUsSUFBQUgscUJBQVksRUFBQ1EsV0FBVyxDQUFDLENBQUM7RUFFL0QsZUFBZVAsV0FBVyxDQUFFUSxHQUFHLEVBQUVDLEdBQUcsRUFBRTtJQUNwQyxNQUFNQyxRQUFRLEdBQUcsQ0FDZjtNQUFFQyxFQUFFLEVBQUUsQ0FBQztNQUFFQyxJQUFJLEVBQUU7SUFBSSxDQUFDLEVBQ3BCO01BQUVELEVBQUUsRUFBRSxDQUFDO01BQUVDLElBQUksRUFBRTtJQUFJLENBQUMsRUFDcEI7TUFBRUQsRUFBRSxFQUFFLENBQUM7TUFBRUMsSUFBSSxFQUFFO0lBQUksQ0FBQyxFQUNwQjtNQUFFRCxFQUFFLEVBQUUsQ0FBQztNQUFFQyxJQUFJLEVBQUU7SUFBSyxDQUFDLEVBQ3JCO01BQUVELEVBQUUsRUFBRSxDQUFDO01BQUVDLElBQUksRUFBRTtJQUFNLENBQUMsQ0FDdkI7SUFFREgsR0FBRyxDQUFDSSxJQUFJLENBQUNILFFBQVEsQ0FBQztFQUNwQjtFQUVBLGVBQWVQLGdCQUFnQixDQUFFSyxHQUFHLEVBQUVDLEdBQUcsRUFBRTtJQUN6QyxNQUFNO01BQUVLO0lBQUssQ0FBQyxHQUFHTixHQUFHO0lBRXBCLE1BQU07TUFBRUk7SUFBSyxDQUFDLEdBQUcsSUFBQUcsNEJBQWlCLEVBQUNELElBQUksRUFBRTtNQUN2Q0YsSUFBSSxFQUFFSSxZQUFHLENBQUNDLE1BQU0sRUFBRSxDQUFDQyxRQUFRO0lBQzdCLENBQUMsQ0FBQztJQUVGLE1BQU0sSUFBQUMsNEJBQVksRUFBQ1AsSUFBSSxDQUFDO0lBRXhCLElBQUFRLGFBQU0sRUFBQ1gsR0FBRyxDQUFDO0VBQ2I7RUFFQSxlQUFlSCxZQUFZLENBQUVFLEdBQUcsRUFBRUMsR0FBRyxFQUFFO0lBQ3JDLE1BQU07TUFBRUs7SUFBSyxDQUFDLEdBQUdOLEdBQUc7SUFFcEIsTUFBTWEsS0FBSyxHQUFHLElBQUFOLDRCQUFpQixFQUFDRCxJQUFJLEVBQUU7TUFDcENRLFVBQVUsRUFBRU4sWUFBRyxDQUFDTyxNQUFNLEVBQUUsQ0FBQ0wsUUFBUSxFQUFFO01BQ25DTixJQUFJLEVBQUVJLFlBQUcsQ0FBQ0MsTUFBTSxFQUFFLENBQUNDLFFBQVEsRUFBRTtNQUM3Qk0sS0FBSyxFQUFFUixZQUFHLENBQUNPLE1BQU0sRUFBRSxDQUFDTCxRQUFRLEVBQUU7TUFDOUJPLFdBQVcsRUFBRVQsWUFBRyxDQUFDQyxNQUFNLEVBQUUsQ0FBQ0MsUUFBUTtJQUNwQyxDQUFDLENBQUM7SUFFRixNQUFNLElBQUFRLHdCQUFRLEVBQUNMLEtBQUssRUFBRWIsR0FBRyxDQUFDbUIsSUFBSSxDQUFDO0lBRS9CLElBQUFQLGFBQU0sRUFBQ1gsR0FBRyxDQUFDO0VBQ2I7RUFDQSxlQUFlRixXQUFXLENBQUVDLEdBQUcsRUFBRUMsR0FBRyxFQUFFO0lBQ3BDLE1BQU07TUFBRW1CO0lBQU0sQ0FBQyxHQUFHcEIsR0FBRztJQUVyQixNQUFNYSxLQUFLLEdBQUcsSUFBQU4sNEJBQWlCLEVBQUNhLEtBQUssRUFBRTtNQUNyQ04sVUFBVSxFQUFFTixZQUFHLENBQUNPLE1BQU0sRUFBRTtNQUN4Qk0sSUFBSSxFQUFFYixZQUFHLENBQUNPLE1BQU07SUFDbEIsQ0FBQyxDQUFDO0lBRUYsTUFBTU8sTUFBTSxHQUFHLE1BQU0sSUFBQUMsNkJBQWEsRUFBQ1YsS0FBSyxDQUFDO0lBRXpDWixHQUFHLENBQUNJLElBQUksQ0FBQ2lCLE1BQU0sQ0FBQztFQUNsQjtFQUVBLE9BQU9sQyxNQUFNO0FBQ2YifQ==